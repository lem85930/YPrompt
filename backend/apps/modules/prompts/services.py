"""
提示词服务类
处理提示词相关的业务逻辑
"""
import json
import datetime
from sanic.log import logger


class PromptService:
    """提示词服务类"""
    
    def __init__(self, db):
        """
        初始化提示词服务
        
        Args:
            db: 数据库连接对象(ezmysql ConnectionAsync)
        """
        self.db = db
    
    async def create_prompt(self, user_id, data):
        """
        创建提示词
        
        Args:
            user_id: 用户ID
            data: 提示词数据字典
            
        Returns:
            int: 提示词ID
        """
        try:
            # 处理数组字段(转为JSON字符串)
            thinking_points = json.dumps(data.get('thinking_points', []), ensure_ascii=False) if data.get('thinking_points') else None
            advice = json.dumps(data.get('advice', []), ensure_ascii=False) if data.get('advice') else None
            tags_list = data.get('tags', [])
            tags = ','.join(tags_list) if tags_list else None
            
            # 准备插入数据
            fields = {
                'user_id': user_id,
                'title': data.get('title', '未命名提示词'),
                'description': data.get('description', ''),
                'requirement_report': data.get('requirement_report', ''),
                'thinking_points': thinking_points,
                'initial_prompt': data.get('initial_prompt', ''),
                'advice': advice,
                'final_prompt': data.get('final_prompt', ''),
                'language': data.get('language', 'zh'),
                'format': data.get('format', 'markdown'),
                'prompt_type': data.get('prompt_type', 'system'),
                'is_favorite': 0,
                'is_public': data.get('is_public', 0),
                'tags': tags,
                'current_version': '1.0.0',
                'total_versions': 1,
                'last_version_time': datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                # 用户提示词专用字段
                'system_prompt': data.get('system_prompt', '') if data.get('prompt_type') == 'user' else None,
                'conversation_history': data.get('conversation_history', '') if data.get('prompt_type') == 'user' else None
            }
            
            # 插入数据库
            prompt_id = await self.db.table_insert('prompts', fields)
            
            # 更新标签统计
            if tags_list:
                await self._update_tags(user_id, tags_list)
            
            logger.info(f'✅ 提示词创建成功: prompt_id={prompt_id}, user_id={user_id}, title={fields["title"]}')
            
            return prompt_id
            
        except Exception as e:
            logger.error(f'❌ 创建提示词失败: {e}')
            raise
    
    async def get_prompts_list(self, user_id, page=1, limit=10, keyword='', tag='', is_favorite='', sort='create_time'):
        """
        获取提示词列表(分页)
        """
        try:
            offset = (page - 1) * limit if page > 0 else 0
            
            # 构建基础查询
            base_query = """
                SELECT id, title, description, final_prompt, language, format, 
                       prompt_type, system_prompt, conversation_history,
                       is_favorite, is_public, view_count, use_count, tags, 
                       current_version, total_versions, last_version_time, 
                       create_time, update_time
                FROM prompts
            """
            
            # 构建WHERE条件
            conditions = ["user_id = " + str(user_id)]
            
            if keyword and keyword.strip():
                # 安全处理搜索关键词
                safe_keyword = keyword.replace("'", "").replace("\"", "").replace("\\", "").replace("%", "%%")
                conditions.append("(title LIKE '%%{}%%' OR description LIKE '%%{}%%')".format(safe_keyword, safe_keyword))
            
            if tag and tag.strip():
                # 安全处理标签
                safe_tag = tag.replace("'", "").replace("\"", "").replace("\\", "").replace("%", "%%")
                conditions.append("tags LIKE '%%{}%%'".format(safe_tag))
            
            if is_favorite != '':
                conditions.append("is_favorite = " + str(int(is_favorite)))
            
            where_clause = " WHERE " + " AND ".join(conditions)
            
            # 排序
            sort_options = {
                'create_time': 'create_time DESC',
                'update_time': 'update_time DESC',
                'view_count': 'view_count DESC', 
                'use_count': 'use_count DESC'
            }
            order_by = sort_options.get(sort, 'create_time DESC')
            
            # 分页
            pagination = " LIMIT " + str(limit) + " OFFSET " + str(offset)
            
            # 完整查询
            list_sql = base_query + where_clause + " ORDER BY " + order_by + pagination
            
            # 执行查询
            items = await self.db.query(list_sql)
            
            # 计数查询
            count_sql = "SELECT COUNT(*) as total FROM prompts" + where_clause
            count_result = await self.db.get(count_sql)
            total = count_result['total'] if count_result else 0
            
            # 处理标签
            for item in items:
                tags_str = item.get('tags', '')
                if tags_str and tags_str.strip():
                    # 检测是否是Python list字符串表示（如 "['tag1', 'tag2']"）
                    if tags_str.startswith('[') and tags_str.endswith(']'):
                        try:
                            # 尝试使用json.loads解析
                            item['tags'] = json.loads(tags_str)
                        except:
                            # 如果失败，按逗号分割
                            item['tags'] = [tag.strip() for tag in tags_str.split(',') if tag.strip()]
                    else:
                        # 正常的逗号分隔格式
                        item['tags'] = [tag.strip() for tag in tags_str.split(',') if tag.strip()]
                else:
                    item['tags'] = []
                item['create_time'] = str(item['create_time']) if item.get('create_time') else ''
                item['update_time'] = str(item['update_time']) if item.get('update_time') else ''
                item['last_version_time'] = str(item['last_version_time']) if item.get('last_version_time') else ''
            
            return {
                'total': total,
                'page': page,
                'limit': limit,
                'items': items
            }
            
        except Exception as e:
            logger.error(f'❌ 查询提示词列表失败: {e}')
            raise
    
    async def get_prompt_detail(self, user_id, prompt_id):
        """
        获取提示词详情
        """
        try:
            where_condition = "id = " + str(prompt_id) + " AND user_id = " + str(user_id)
            sql = "SELECT * FROM prompts WHERE " + where_condition
            prompt = await self.db.get(sql)
            
            if prompt:
                # 解析JSON字段
                if prompt.get('thinking_points'):
                    try:
                        prompt['thinking_points'] = json.loads(prompt['thinking_points'])
                    except:
                        prompt['thinking_points'] = []
                else:
                    prompt['thinking_points'] = []
                
                if prompt.get('advice'):
                    try:
                        prompt['advice'] = json.loads(prompt['advice'])
                    except:
                        prompt['advice'] = []
                else:
                    prompt['advice'] = []
                
                if prompt.get('tags'):
                    tags_str = prompt['tags']
                    # 检测是否是Python list字符串表示（如 "['tag1', 'tag2']"）
                    if tags_str.startswith('[') and tags_str.endswith(']'):
                        try:
                            # 尝试使用json.loads解析
                            prompt['tags'] = json.loads(tags_str)
                        except:
                            # 如果失败，按逗号分割
                            prompt['tags'] = [tag.strip() for tag in tags_str.split(',') if tag.strip()]
                    else:
                        # 正常的逗号分隔格式
                        prompt['tags'] = [tag.strip() for tag in tags_str.split(',') if tag.strip()]
                else:
                    prompt['tags'] = []
                
                # 时间格式化
                prompt['create_time'] = str(prompt['create_time']) if prompt.get('create_time') else ''
                prompt['update_time'] = str(prompt['update_time']) if prompt.get('update_time') else ''
                prompt['last_version_time'] = str(prompt['last_version_time']) if prompt.get('last_version_time') else ''
                
                logger.debug(f'✅ 查询提示词详情成功: prompt_id={prompt_id}, user_id={user_id}')
            else:
                logger.warning(f'⚠️  提示词不存在或无权限: prompt_id={prompt_id}, user_id={user_id}')
            
            return prompt
            
        except Exception as e:
            logger.error(f'❌ 查询提示词详情失败: {e}')
            raise
    
    async def update_prompt(self, user_id, prompt_id, data):
        """
        更新提示词
        
        Args:
            user_id: 用户ID
            prompt_id: 提示词ID
            data: 更新数据
            
        Returns:
            bool: 是否成功
        """
        try:
            # 先检查权限
            check_sql = "SELECT id FROM prompts WHERE id = " + str(prompt_id) + " AND user_id = " + str(user_id)
            exists = await self.db.get(check_sql)
            
            if not exists:
                logger.warning(f'⚠️  无权限更新提示词: prompt_id={prompt_id}, user_id={user_id}')
                return False
            
            # 构建更新语句
            update_fields = []
            
            def escape_sql_string(value):
                """转义SQL字符串中的特殊字符"""
                if value is None:
                    return ''
                s = str(value)
                # 转义单引号和反斜杠,同时转义 % 字符避免格式化错误
                s = s.replace("\\", "\\\\")  # 先转义反斜杠
                s = s.replace("'", "''")      # 转义单引号
                s = s.replace("%", "%%")      # 转义百分号
                return s
            
            if 'title' in data:
                update_fields.append("title = '" + escape_sql_string(data['title']) + "'")
            
            if 'description' in data:
                update_fields.append("description = '" + escape_sql_string(data.get('description', '')) + "'")
            
            if 'requirement_report' in data:
                update_fields.append("requirement_report = '" + escape_sql_string(data.get('requirement_report', '')) + "'")
            
            if 'thinking_points' in data:
                thinking_points = escape_sql_string(json.dumps(data['thinking_points'], ensure_ascii=False))
                update_fields.append("thinking_points = '" + thinking_points + "'")
            
            if 'initial_prompt' in data:
                update_fields.append("initial_prompt = '" + escape_sql_string(data.get('initial_prompt', '')) + "'")
            
            if 'advice' in data:
                advice = escape_sql_string(json.dumps(data['advice'], ensure_ascii=False))
                update_fields.append("advice = '" + advice + "'")
            
            if 'final_prompt' in data:
                update_fields.append("final_prompt = '" + escape_sql_string(data.get('final_prompt', '')) + "'")
            
            if 'language' in data:
                update_fields.append("language = '" + escape_sql_string(data['language']) + "'")
            
            if 'format' in data:
                update_fields.append("format = '" + escape_sql_string(data['format']) + "'")
            
            if 'prompt_type' in data:
                update_fields.append("prompt_type = '" + escape_sql_string(data['prompt_type']) + "'")
            
            # 用户提示词专用字段
            if 'system_prompt' in data:
                update_fields.append("system_prompt = '" + escape_sql_string(data.get('system_prompt', '')) + "'")
            
            if 'conversation_history' in data:
                update_fields.append("conversation_history = '" + escape_sql_string(data.get('conversation_history', '')) + "'")
            
            if 'tags' in data:
                tags = ','.join(data['tags']) if data['tags'] else ''
                update_fields.append("tags = '" + escape_sql_string(tags) + "'")
                # 更新标签统计
                if data['tags']:
                    await self._update_tags(user_id, data['tags'])
            
            if not update_fields:
                logger.warning('⚠️  没有需要更新的字段')
                return False
            
            update_sql = """
                UPDATE prompts SET """ + ', '.join(update_fields) + """
                WHERE id = """ + str(prompt_id) + """ AND user_id = """ + str(user_id)
            
            await self.db.execute(update_sql)
            
            logger.info(f'✅ 更新提示词成功: prompt_id={prompt_id}, user_id={user_id}')
            return True
            
        except Exception as e:
            logger.error(f'❌ 更新提示词失败: {e}')
            raise
    
    async def delete_prompt(self, user_id, prompt_id):
        """
        删除提示词
        
        Args:
            user_id: 用户ID
            prompt_id: 提示词ID
            
        Returns:
            bool: 是否成功
        """
        try:
            # 先检查权限
            check_sql = "SELECT id FROM prompts WHERE id = " + str(prompt_id) + " AND user_id = " + str(user_id)
            exists = await self.db.get(check_sql)
            
            if not exists:
                logger.warning(f'⚠️  无权限删除提示词: prompt_id={prompt_id}, user_id={user_id}')
                return False
            
            # 删除提示词(级联删除关联的分享记录)
            delete_sql = "DELETE FROM prompts WHERE id = " + str(prompt_id) + " AND user_id = " + str(user_id)
            await self.db.execute(delete_sql)
            
            logger.info(f'✅ 删除提示词成功: prompt_id={prompt_id}, user_id={user_id}')
            return True
            
        except Exception as e:
            logger.error(f'❌ 删除提示词失败: {e}')
            raise
    
    async def toggle_favorite(self, user_id, prompt_id, is_favorite):
        """
        收藏/取消收藏提示词
        
        Args:
            user_id: 用户ID
            prompt_id: 提示词ID
            is_favorite: True收藏, False取消
            
        Returns:
            bool: 是否成功
        """
        try:
            # 先检查权限
            check_sql = "SELECT id FROM prompts WHERE id = " + str(prompt_id) + " AND user_id = " + str(user_id)
            exists = await self.db.get(check_sql)
            
            if not exists:
                logger.warning(f'⚠️  无权限操作提示词: prompt_id={prompt_id}, user_id={user_id}')
                return False
            
            # 更新收藏状态
            favorite_value = 1 if is_favorite else 0
            update_sql = """
                UPDATE prompts SET is_favorite = """ + str(favorite_value) + """
                WHERE id = """ + str(prompt_id) + """ AND user_id = """ + str(user_id)
            
            await self.db.execute(update_sql)
            
            action = '收藏' if is_favorite else '取消收藏'
            logger.info(f'✅ {action}提示词成功: prompt_id={prompt_id}, user_id={user_id}')
            return True
            
        except Exception as e:
            logger.error(f'❌ 操作收藏状态失败: {e}')
            raise
    
    async def increase_view_count(self, prompt_id):
        """
        增加查看次数
        """
        try:
            sql = "UPDATE prompts SET view_count = view_count + 1 WHERE id = " + str(prompt_id)
            await self.db.execute(sql)
            logger.debug(f'✅ 增加查看次数: prompt_id={prompt_id}')
            
        except Exception as e:
            logger.error(f'❌ 增加查看次数失败: {e}')
            # 不抛出异常,因为这不是关键操作
    
    async def increase_use_count(self, user_id, prompt_id):
        """
        增加使用次数
        """
        try:
            # 先检查权限
            check_sql = "SELECT id FROM prompts WHERE id = " + str(prompt_id) + " AND user_id = " + str(user_id)
            exists = await self.db.get(check_sql)
            
            if not exists:
                return False
            
            sql = "UPDATE prompts SET use_count = use_count + 1 WHERE id = " + str(prompt_id)
            await self.db.execute(sql)
            logger.debug(f'✅ 增加使用次数: prompt_id={prompt_id}')
            return True
            
        except Exception as e:
            logger.error(f'❌ 增加使用次数失败: {e}')
            raise
    
    async def _update_tags(self, user_id, tags):
        """
        更新标签统计(内部方法)
        
        Args:
            user_id: 用户ID
            tags: 标签列表
        """
        try:
            for tag in tags:
                if not tag:
                    continue
                
                # 检查标签是否存在
                safe_tag = tag.replace("'", "''")
                check_sql = "SELECT id, use_count FROM prompt_tags WHERE user_id = " + str(user_id) + " AND tag_name = '" + safe_tag + "'"
                existing = await self.db.get(check_sql)
                
                if existing:
                    # 更新使用次数
                    update_sql = "UPDATE prompt_tags SET use_count = use_count + 1 WHERE id = " + str(existing['id'])
                    await self.db.execute(update_sql)
                else:
                    # 创建新标签
                    fields = {
                        'tag_name': tag,
                        'user_id': user_id,
                        'use_count': 1
                    }
                    await self.db.table_insert('prompt_tags', fields)
                
            logger.debug(f'✅ 更新标签统计成功: user_id={user_id}, tags={tags}')
            
        except Exception as e:
            logger.error(f'❌ 更新标签统计失败: {e}')
            # 不抛出异常,因为这不是关键操作

