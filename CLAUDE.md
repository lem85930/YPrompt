# YPrompt 提示词管理系统 - 项目文档

## 项目概述

YPrompt 是一个完整的提示词管理系统，包含前端（Vue 3）和后端（Sanic），提供基于 AI 对话的提示词生成、优化、版本管理和个人提示词库功能。系统采用飞书 OAuth 2.0 认证，支持桌面端和移动端响应式布局。

**主要功能**:
- 🤖 AI 引导式需求收集与提示词生成
- 📝 提示词优化与质量分析
- 📚 个人提示词库管理（收藏、标签、版本控制）
- 🔐 飞书 OAuth 登录认证
- 📱 响应式设计（桌面端侧边栏 + 移动端底部导航）

## 技术栈

### 前端 (frontend/)
- **框架**: Vue 3.4 + TypeScript 5.3 + Composition API
- **路由**: Vue Router 4.2
- **状态管理**: Pinia 2.1
- **构建工具**: Vite 5.0
- **UI**: Tailwind CSS 3.3
- **图标**: Lucide Vue Next
- **Markdown**: Marked 16.3

### 后端 (backend/)
- **框架**: Sanic 23.12.1 (异步高性能)
- **数据库**: MySQL 8.0+ (使用 ezmysql ORM)
- **认证**: 飞书 OAuth 2.0 + JWT (PyJWT 2.8.0)
- **API文档**: Sanic-Ext 23.12.0 (OpenAPI/Swagger)
- **HTTP客户端**: requests 2.31.0 + httpx 0.25.2

## 项目结构

```
YPrompt/
├── frontend/                          # 前端项目
│   ├── src/
│   │   ├── components/               # Vue 组件
│   │   │   ├── layout/              # 布局组件
│   │   │   │   ├── DesktopLayout.vue      # 桌面端布局
│   │   │   │   ├── MobileLayout.vue       # 移动端布局
│   │   │   │   ├── DesktopSidebar.vue     # 侧边栏导航
│   │   │   │   └── MobileBottomNav.vue    # 底部导航
│   │   │   ├── modules/             # 功能模块
│   │   │   │   ├── GenerateModule.vue     # 生成模块
│   │   │   │   ├── OptimizeModule.vue     # 优化模块
│   │   │   │   ├── PlaygroundModule.vue   # 操练场
│   │   │   │   └── LibraryModule.vue      # 我的提示词
│   │   │   ├── chat/                # 对话组件
│   │   │   │   ├── composables/     # 对话业务逻辑
│   │   │   │   └── components/      # 对话UI组件
│   │   │   ├── preview/             # 预览组件
│   │   │   │   ├── composables/     # 预览业务逻辑
│   │   │   │   └── components/      # 预览UI组件
│   │   │   └── settings/            # 设置组件
│   │   ├── stores/                  # Pinia状态管理
│   │   │   ├── authStore.ts         # 认证状态
│   │   │   ├── promptStore.ts       # 提示词状态
│   │   │   ├── settingsStore.ts     # 设置状态
│   │   │   ├── navigationStore.ts   # 导航状态
│   │   │   └── optimizeStore.ts     # 优化模块状态
│   │   ├── services/                # 业务服务层
│   │   │   ├── aiService.ts         # AI服务统一入口
│   │   │   ├── apiService.ts        # 后端API调用
│   │   │   ├── aiGuideService.ts    # AI引导对话
│   │   │   ├── promptGeneratorService.ts  # 提示词生成
│   │   │   ├── ai/                  # AI服务模块化实现
│   │   │   │   ├── providers/       # OpenAI/Anthropic/Google
│   │   │   │   ├── streaming/       # 流式处理
│   │   │   │   ├── multimodal/      # 多模态转换
│   │   │   │   └── errors/          # 错误处理
│   │   │   └── versionService.ts    # 版本管理服务
│   │   ├── config/                  # 配置文件
│   │   │   ├── prompts.ts           # 提示词配置
│   │   │   └── prompts/             # 内置提示词规则
│   │   └── utils/                   # 工具函数
│   ├── builtin-providers.json       # 内置AI提供商配置
│   └── package.json                 # 依赖配置
│
├── backend/                          # 后端项目
│
└── data/                             # 数据目录（统一存储）
    ├── yprompt.db                   # SQLite数据库
    ├── cache/                        # 缓存文件
    └── logs/                         # 日志文件
        ├── backend/                  # 后端日志
        │   ├── info.log
        │   └── error.log
        └── nginx/                    # Nginx日志
            ├── access.log
            └── error.log
    ├── apps/
    │   ├── __init__.py              # 应用初始化、蓝图自动注册
    │   ├── modules/                 # 业务模块
    │   │   ├── auth/               # 认证模块
    │   │   │   ├── models.py       # OpenAPI数据模型
    │   │   │   ├── services.py     # 业务逻辑层
    │   │   │   └── views.py        # API路由
    │   │   ├── prompts/            # 提示词模块
    │   │   ├── tags/               # 标签模块
    │   │   └── versions/           # 版本管理模块
    │   └── utils/                  # 工具类
    │       ├── auth_middleware.py  # JWT认证中间件
    │       ├── db_utils.py         # 数据库连接管理
    │       ├── feishu_utils.py     # 飞书API封装
    │       ├── http_utils.py       # HTTP工具
    │       └── jwt_utils.py        # JWT工具类
    ├── config/                     # 配置文件
    │   ├── base.py                 # 基础配置
    │   ├── dev.py                  # 开发环境配置
    │   ├── prd.py                  # 生产环境配置
    │   └── settings.py             # 配置加载器
    ├── migrations/                 # 数据库迁移脚本
    │   └── yprompt.sql            # 初始化脚本
    ├── logs/                       # 日志目录
    ├── requirements.txt            # Python依赖
    └── run.py                      # 启动入口
```

## 快速开始

### 前端开发

```bash
cd frontend

# 安装依赖
npm install

# 配置AI提供商（可选）
cp builtin-providers.example.json builtin-providers.json
# 编辑 builtin-providers.json 添加API密钥

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 类型检查
npm run type-check
```

### 后端开发

```bash
cd backend

# 创建虚拟环境
python3 -m venv venv
source venv/bin/activate  # Linux/Mac

# 安装依赖
pip install -r requirements.txt

# 配置数据库和飞书应用
# 编辑 config/dev.py 或 config/prd.py

# 初始化数据库
mysql -u root -p < migrations/yprompt.sql

# 启动开发服务器
python run.py

# 访问API文档
# http://localhost:8888/docs
```

## 核心功能模块

### 1. 认证模块 (auth)

**技术方案**: 飞书 OAuth 2.0 + JWT Token

**认证流程**:
1. 前端获取飞书授权码 (code)
2. 后端通过 code 获取用户 open_id
3. 老用户: 直接更新登录时间（性能优化，不调用飞书API）
4. 新用户: 调用飞书API获取完整信息并创建用户
5. 生成 JWT Token (7天有效期)
6. 返回 Token 和用户信息

**关键文件**:
- 后端: `apps/modules/auth/views.py` - 登录/刷新/用户信息接口
- 后端: `apps/utils/jwt_utils.py` - JWT生成和验证
- 后端: `apps/utils/auth_middleware.py` - 认证装饰器
- 前端: `src/stores/authStore.ts` - 认证状态管理

**API端点**:
```
POST   /api/auth/login        # 飞书code登录
POST   /api/auth/refresh      # 刷新Token
GET    /api/auth/userinfo     # 获取用户信息
POST   /api/auth/logout       # 登出
```

### 2. 提示词模块 (prompts)

**功能**:
- 创建、编辑、删除提示词
- 收藏/取消收藏
- 标签分类
- 分页查询
- 查看统计

**数据模型**:
```python
prompts表字段:
- id, user_id, title, description
- requirement_report           # 需求报告
- thinking_points              # 关键指令(JSON)
- initial_prompt              # 初始提示词
- advice                      # 优化建议(JSON)
- final_prompt                # 最终提示词
- prompt_type                 # system/user
- language, format, tags
- is_favorite, is_public
- view_count, use_count
- current_version, total_versions
```

**关键文件**:
- 后端: `apps/modules/prompts/views.py` - 提示词API
- 后端: `apps/modules/prompts/services.py` - 提示词业务逻辑
- 前端: `src/services/apiService.ts` - API调用封装
- 前端: `src/components/modules/LibraryModule.vue` - 提示词库UI

**API端点**:
```
POST   /api/prompts/           # 创建提示词
GET    /api/prompts/           # 获取列表（支持分页、筛选）
GET    /api/prompts/{id}       # 获取详情
PUT    /api/prompts/{id}       # 更新提示词
DELETE /api/prompts/{id}       # 删除提示词
POST   /api/prompts/{id}/favorite    # 收藏/取消收藏
```

### 3. 版本管理模块 (versions)

**功能**:
- 语义化版本控制 (major.minor.patch)
- 版本标签 (draft/beta/stable/production)
- 版本回滚
- 版本对比
- 完整内容快照

**数据模型**:
```sql
prompt_versions表:
- version_number              # 版本号
- version_type               # manual/auto/rollback
- version_tag                # draft/stable/production
- 完整内容快照 (title, description, final_prompt等)
- change_log, change_summary
- parent_version_id          # 父版本追溯
- use_count, rollback_count
```

**API端点**:
```
POST   /api/versions/{prompt_id}        # 创建新版本
GET    /api/versions/{prompt_id}        # 获取版本列表
POST   /api/versions/{prompt_id}/{version}/rollback  # 回滚版本
GET    /api/versions/{prompt_id}/compare  # 对比版本
```

### 4. AI服务层 (前端)

**架构**: 模块化 + 提供商抽象

**支持的AI提供商**:
- OpenAI (GPT-3.5/GPT-4)
- Anthropic (Claude)
- Google (Gemini)
- 自定义提供商

**关键组件**:
- `src/services/ai/providers/BaseProvider.ts` - 提供商基类
- `src/services/ai/streaming/SSEParser.ts` - 流式输出解析
- `src/services/ai/multimodal/` - 多模态文件转换
- `src/services/ai/errors/` - 错误处理

**提示词生成流程 (GPrompt)**:
1. **关键指令提取** - 分析需求提取核心思考点
2. **初始提示词生成** - 基于关键指令生成初版
3. **优化建议** - 分析提示词提供改进方向
4. **最终提示词** - 应用优化建议生成最终版本

## 数据库设计

### 核心表结构

#### users (用户表)
```sql
CREATE TABLE `users` (
  `id` INT(11) PRIMARY KEY AUTO_INCREMENT,
  `open_id` VARCHAR(64) UNIQUE NOT NULL,    -- 飞书用户ID
  `union_id` VARCHAR(64),                   -- 飞书Union ID
  `name` VARCHAR(100) NOT NULL,
  `avatar` VARCHAR(255),
  `email` VARCHAR(100),
  `mobile` VARCHAR(20),
  `is_active` TINYINT(1) DEFAULT 1,
  `last_login_time` DATETIME,
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `idx_open_id` (`open_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

#### prompts (提示词表)
```sql
CREATE TABLE `prompts` (
  `id` INT(11) PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `title` VARCHAR(200) NOT NULL,
  `description` TEXT,
  `requirement_report` TEXT,              -- 需求报告
  `thinking_points` TEXT,                 -- 关键指令(JSON)
  `initial_prompt` TEXT,                  -- 初始提示词
  `advice` TEXT,                          -- 优化建议(JSON)
  `final_prompt` TEXT,                    -- 最终提示词
  `language` VARCHAR(10) DEFAULT 'zh',
  `format` VARCHAR(10) DEFAULT 'markdown',
  `prompt_type` VARCHAR(10) DEFAULT 'system',  -- system/user
  `is_favorite` TINYINT(1) DEFAULT 0,
  `is_public` TINYINT(1) DEFAULT 0,
  `view_count` INT(11) DEFAULT 0,
  `use_count` INT(11) DEFAULT 0,
  `tags` VARCHAR(500),                    -- 逗号分隔
  `current_version` VARCHAR(20) DEFAULT '1.0.0',
  `total_versions` INT(11) DEFAULT 1,
  `last_version_time` DATETIME,
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

#### prompt_versions (版本表)
```sql
CREATE TABLE `prompt_versions` (
  `id` INT(11) PRIMARY KEY AUTO_INCREMENT,
  `prompt_id` INT(11) NOT NULL,
  `version_number` VARCHAR(20) NOT NULL,    -- 1.2.3
  `version_type` VARCHAR(10) DEFAULT 'manual',
  `version_tag` VARCHAR(50),                -- draft/stable/production
  -- 完整内容快照
  `title` VARCHAR(200),
  `description` TEXT,
  `final_prompt` TEXT NOT NULL,
  -- 其他字段省略...
  `change_log` TEXT,
  `change_summary` VARCHAR(500),
  `created_by` INT(11),
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_prompt_version` (`prompt_id`, `version_number`),
  FOREIGN KEY (`prompt_id`) REFERENCES `prompts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

#### prompt_tags (标签表)
```sql
CREATE TABLE `prompt_tags` (
  `id` INT(11) PRIMARY KEY AUTO_INCREMENT,
  `tag_name` VARCHAR(50) NOT NULL,
  `user_id` INT(11) NOT NULL,
  `use_count` INT(11) DEFAULT 0,
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_user_tag` (`user_id`, `tag_name`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

## 后端开发规范

### 三层架构

```
Controller (views.py)  ← API路由和请求处理
    ↓
Service (services.py)  ← 业务逻辑
    ↓
Model (ezmysql)       ← 数据访问
```

### 蓝图自动发现

系统自动扫描 `apps/modules/` 下的所有模块，查找与模块名相同的 Blueprint 变量并注册：

```python
# apps/modules/your_module/views.py
from sanic import Blueprint

your_module = Blueprint('your_module', url_prefix='/api/your_module')
# 变量名必须与模块名相同
```

### 添加新模块

1. **创建模块目录**
```bash
mkdir apps/modules/your_module
touch apps/modules/your_module/{__init__.py,models.py,services.py,views.py}
```

2. **定义数据模型** (models.py)
```python
from sanic_ext import openapi

@openapi.component
class YourModel:
    field1: str = openapi.String(description="字段1")
```

3. **实现业务逻辑** (services.py)
```python
class YourService:
    def __init__(self, db):
        self.db = db
    
    async def get_data(self, id):
        return await self.db.get(f"SELECT * FROM table WHERE id = {id}")
```

4. **定义API路由** (views.py)
```python
from sanic import Blueprint
from sanic.response import json
from apps.utils.auth_middleware import auth_required

your_module = Blueprint('your_module', url_prefix='/api/your_module')

@your_module.get('/<id:int>')
@auth_required
async def get_data(request, id):
    service = YourService(request.app.ctx.db)
    data = await service.get_data(id)
    return json({'code': 200, 'data': data})
```

### 数据库操作

```python
# 查询单条
user = await db.get("SELECT * FROM users WHERE id = 1")

# 查询多条
users = await db.query("SELECT * FROM users WHERE is_active = 1")

# 插入
user_id = await db.table_insert('users', {'name': '张三'})

# 更新
await db.table_update('users', {'name': '李四'}, "id = 1")

# 事务
async with db.transaction():
    await db.execute("UPDATE ...")
```

### 认证保护

```python
from apps.utils.auth_middleware import auth_required

@your_bp.get('/protected')
@auth_required
async def protected_route(request):
    user_id = request.ctx.user_id  # 当前用户ID
    open_id = request.ctx.open_id  # 飞书Open ID
    return json({'user_id': user_id})
```

## 前端开发规范

### 代码组织

```
模块/
├── composables/        # 业务逻辑 (Composition API)
│   ├── useFeatureA.ts
│   └── useFeatureB.ts
└── components/         # UI 组件
    ├── ComponentA.vue
    └── ComponentB.vue
```

### 命名规范

- **组件**: PascalCase (`ChatInterface.vue`)
- **Composables**: `use` + PascalCase (`useChatMessages.ts`)
- **Store**: camelCase + `Store` (`promptStore.ts`)
- **Service**: camelCase + `Service` (`aiService.ts`)

### 添加新功能模块

1. 创建 `src/components/modules/NewModule.vue`
2. 在 `src/stores/navigationStore.ts` 添加模块配置
3. 在 `src/main.ts` 添加路由
4. 模块完全自定义布局和功能

## 计划改造

### 1. 认证改造 - 迁移到 linux.do OAuth

**当前方案**: 飞书 OAuth 2.0
**目标方案**: linux.do OAuth

**需要改造的文件**:

**后端**:
- `apps/utils/feishu_utils.py` → 改为 `linux_do_utils.py`
- `apps/modules/auth/views.py` - 修改登录流程
- `apps/modules/auth/services.py` - 用户信息字段适配
- `config/dev.py` / `config/prd.py` - 配置项调整
  - `FEISHU_APP_ID` → `LINUX_DO_CLIENT_ID`
  - `FEISHU_APP_SECRET` → `LINUX_DO_CLIENT_SECRET`

**前端**:
- `src/stores/authStore.ts` - OAuth回调处理
- 登录页面 - 替换为 linux.do 登录按钮

**数据库**:
- `users` 表字段调整:
  - `open_id` → `linux_do_id` (或保持通用字段名)
  - 移除 `union_id` (飞书特有字段)
  - 可能需要新增 linux.do 特定字段

### 2. 数据库改造 - 支持 SQLite + MySQL

**当前方案**: 仅支持 MySQL (ezmysql)
**目标方案**: 同时支持 SQLite 和 MySQL，默认 SQLite

**改造方案**:

1. **数据库抽象层**
创建 `apps/utils/db_adapter.py`：
```python
class DatabaseAdapter:
    """数据库适配器基类"""
    async def get(self, sql, params=None): pass
    async def query(self, sql, params=None): pass
    async def execute(self, sql, params=None): pass
    async def table_insert(self, table, data): pass
    async def table_update(self, table, data, where): pass
    async def transaction(self): pass

class MySQLAdapter(DatabaseAdapter):
    """MySQL适配器 (使用ezmysql)"""
    # 当前实现

class SQLiteAdapter(DatabaseAdapter):
    """SQLite适配器 (使用aiosqlite)"""
    # 新增实现
```

2. **配置文件调整**
```python
# config/base.py
DB_TYPE = 'sqlite'  # 或 'mysql'

# SQLite配置
SQLITE_DB_PATH = 'data/yprompt.db'

# MySQL配置 (保持现有)
DB_HOST = 'localhost'
DB_USER = 'root'
# ...
```

3. **数据库初始化**
```python
# apps/utils/db_utils.py
def get_db_adapter(app):
    db_type = app.config.get('DB_TYPE', 'sqlite')
    if db_type == 'sqlite':
        return SQLiteAdapter(app.config.SQLITE_DB_PATH)
    elif db_type == 'mysql':
        return MySQLAdapter(...)
```

4. **SQL兼容性**
- 使用参数化查询 (避免字符串拼接)
- SQLite 不支持的语法需要条件处理:
  - `ON UPDATE CURRENT_TIMESTAMP` → 使用触发器
  - 外键约束默认关闭 → `PRAGMA foreign_keys = ON`

5. **迁移脚本**
- `migrations/yprompt_sqlite.sql` - SQLite初始化脚本
- `migrations/yprompt_mysql.sql` - MySQL初始化脚本 (现有)

**需要改造的文件**:
- `apps/utils/db_utils.py` - 核心改造
- `apps/modules/*/services.py` - SQL语句适配
- `requirements.txt` - 添加 `aiosqlite`
- `config/base.py` - 配置项
- `migrations/` - 新增SQLite脚本

**注意事项**:
- ezmysql 使用字符串拼接SQL，需要改为参数化查询防止SQL注入
- SQLite和MySQL的数据类型映射 (TINYINT → INTEGER等)
- 日期时间字段处理差异

## 环境配置

### 后端配置

编辑 `config/dev.py` 或 `config/prd.py`:

```python
# 数据库配置
DB_HOST = 'localhost'
DB_USER = 'root'
DB_PASS = 'your_password'
DB_NAME = 'yprompt'
DB_PORT = 3306

# JWT配置
SECRET_KEY = 'your_secret_key'

# 飞书应用配置
FEISHU_APP_ID = 'your_app_id'
FEISHU_APP_SECRET = 'your_app_secret'
```

### 前端配置

创建 `builtin-providers.json`:

```json
{
  "providers": [
    {
      "id": "openai-builtin",
      "name": "OpenAI (内置)",
      "type": "openai",
      "apiKey": "YOUR_API_KEY",
      "baseURL": "https://api.openai.com/v1"
    }
  ]
}
```

## API文档

启动后端服务后访问:
- **Swagger UI**: http://localhost:8888/docs
- **OpenAPI JSON**: http://localhost:8888/openapi.json

## 常见任务

### 添加新的API端点
1. 在 `apps/modules/*/views.py` 添加路由
2. 在 `services.py` 实现业务逻辑
3. 在 `models.py` 定义OpenAPI模型

### 修改数据库结构
1. 更新 `migrations/yprompt.sql`
2. 创建增量迁移脚本
3. 更新对应的Service层代码

### 添加新的AI提供商
1. 创建 `src/services/ai/providers/NewProvider.ts`
2. 继承 `BaseProvider`
3. 在 `aiService.ts` 注册

## 开发工具

### 后端
- **日志**: `logs/info.log`, `logs/error.log`
- **数据库工具**: MySQL Workbench / Navicat
- **API测试**: Swagger UI / Postman

### 前端
- **开发服务器**: http://localhost:5173
- **Vue DevTools**: 浏览器扩展
- **类型检查**: `npm run type-check`

## 性能优化建议

1. **后端**:
   - 数据库查询优化和索引
   - Redis缓存热点数据
   - 启用多worker模式: `python run.py --workers=4`

2. **前端**:
   - 懒加载路由和组件
   - 图片压缩和CDN
   - 生产构建优化

## 安全注意事项

1. **永远不要提交敏感信息到git**:
   - `config/dev.py`, `config/prd.py`
   - `builtin-providers.json`
   
2. **生产环境必须修改**:
   - `SECRET_KEY` - JWT密钥
   - 飞书应用密钥
   - 数据库密码

3. **SQL注入防护**:
   - 使用参数化查询
   - 避免字符串拼接SQL

4. **CORS配置**:
   - 生产环境限制允许的域名

## 项目特色

1. **模块化架构** - 前后端都采用模块化设计，易于扩展
2. **响应式布局** - 桌面端和移动端自动适配
3. **蓝图自动发现** - 后端自动注册新模块，无需手动配置
4. **完善的版本控制** - 提示词版本管理和回滚
5. **多AI提供商支持** - 抽象设计，易于添加新提供商
6. **性能优化** - 老用户登录不调用外部API，减少延迟

## 项目状态

- ✅ **生成模块**: 完整实现
- ✅ **认证系统**: 飞书OAuth已实现
- 🚧 **优化模块**: 开发中
- 🚧 **操练场**: 开发中
- 🚧 **我的提示词**: 部分实现

## 联系方式

如需帮助或反馈问题，请联系项目维护者。
