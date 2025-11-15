# YPrompt - AI提示词生成与管理系统

一个完整的提示词管理系统，包含前端（Vue 3）和后端（Sanic），提供基于 AI 对话的提示词生成、优化、版本管理和个人提示词库功能。

## 主要功能

- 🤖 **AI 引导式需求收集与提示词生成** - GPrompt 四步法生成高质量提示词
- 📝 **提示词优化与质量分析** - 自动分析并提供优化建议
- 📚 **个人提示词库管理** - 收藏、标签、版本控制
- 🔐 **双认证支持** - Linux.do OAuth 2.0 + 本地用户名密码
- 💾 **双数据库支持** - SQLite（默认）+ MySQL（可选）
- 📱 **响应式设计** - 桌面端侧边栏 + 移动端底部导航

## 快速开始

### 使用 Docker Compose（推荐）

```bash
# 1. 克隆仓库
git clone <repository-url>
cd YPrompt

# 2. 配置环境变量（可选）
cp .env.example .env
# 编辑 .env 文件修改配置

# 3. 启动服务
docker-compose up -d

# 4. 访问应用
# http://localhost
# 默认账号: admin / admin123
```

### 手动部署

#### 前端开发

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
```

#### 后端开发

```bash
cd backend

# 创建虚拟环境
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
# venv\Scripts\activate   # Windows

# 安装依赖
pip install -r requirements.txt

# 配置数据库和认证
# 编辑 config/dev.py 或 config/prd.py

# SQLite会自动初始化，无需手动操作

# 启动开发服务器
python run.py

# 访问API文档
# http://localhost:8888/docs
```

## Docker 部署

### 环境变量配置

创建 `.env` 文件或在 `docker-compose.yml` 中配置：

```bash
# 数据库配置
DB_TYPE=sqlite                    # 或 mysql
SQLITE_DB_PATH=../data/yprompt.db

# JWT配置
SECRET_KEY=your-secret-key-change-in-production

# Linux.do OAuth配置（可选）
LINUX_DO_CLIENT_ID=your-client-id
LINUX_DO_CLIENT_SECRET=your-client-secret
LINUX_DO_REDIRECT_URI=https://yourdomain.com/auth/callback

# 默认管理员账号
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

### 数据持久化

Docker 使用统一的 `data` 目录挂载：

```yaml
volumes:
  - ./data:/app/data
```

数据目录结构：
```
data/
├── yprompt.db          # SQLite数据库
├── cache/              # 缓存文件
└── logs/               # 日志文件
    ├── backend/        # 后端日志
    │   ├── info.log
    │   ├── error.log
    │   └── yprompt.log
    └── nginx/          # Nginx日志
        ├── access.log
        └── error.log
```

### SSL/HTTPS 配置

将 SSL 证书放在 `data/ssl/` 目录：

```bash
data/ssl/
├── fullchain.pem       # 完整证书链
└── privkey.pem         # 私钥
```

启动脚本会自动检测证书并启用 HTTPS。

### Docker 命令

```bash
# 启动服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 查看后端日志
docker-compose exec yprompt tail -f /app/data/logs/backend/yprompt.log

# 重启服务
docker-compose restart

# 停止服务
docker-compose down

# 重新构建并启动
docker-compose up -d --build
```

## 数据库配置

### SQLite（默认，推荐）

SQLite 会自动初始化：
- 数据库文件：`data/yprompt.db`
- 自动创建表结构
- 自动创建默认管理员账号

重新初始化：
```bash
rm data/yprompt.db
docker-compose restart
```

### MySQL（可选）

编辑 `backend/config/dev.py` 或环境变量：

```python
DB_TYPE = 'mysql'
DB_HOST = 'localhost'
DB_USER = 'root'
DB_PASS = 'password'
DB_NAME = 'yprompt'
DB_PORT = 3306
```

## 认证配置

### Linux.do OAuth

1. 访问 https://connect.linux.do 创建应用
2. 获取 `Client ID` 和 `Client Secret`
3. 配置回调地址：
   - 开发环境：`http://localhost:5173/auth/callback`
   - 生产环境：`https://yourdomain.com/auth/callback`
4. 填写到 `config/dev.py` 或环境变量

### 本地用户名密码

默认管理员账号在首次启动时自动创建：
- 用户名：`admin`（可通过环境变量 `ADMIN_USERNAME` 修改）
- 密码：`admin123`（可通过环境变量 `ADMIN_PASSWORD` 修改）

## GitHub Actions 自动构建

项目已配置 GitHub Actions 自动构建 Docker 镜像。

### 配置步骤

1. 在 GitHub 仓库设置中添加 Secrets：
   - `DOCKERHUB_USERNAME` - Docker Hub 用户名
   - `DOCKERHUB_TOKEN` - Docker Hub 访问令牌

2. 推送代码到 `main` 或 `master` 分支自动触发构建

3. 镜像标签：
   - `latest` - 最新的 main/master 分支
   - `v1.0.0` - 版本号标签（git tag）
   - `main` - main 分支
   - `pr-123` - Pull Request

### 使用构建的镜像

```bash
# 拉取最新镜像
docker pull <your-dockerhub-username>/yprompt:latest

# 运行容器
docker run -d \
  -p 80:80 \
  -v $(pwd)/data:/app/data \
  -e SECRET_KEY=your-secret-key \
  <your-dockerhub-username>/yprompt:latest
```

## 项目结构

```
YPrompt/
├── frontend/                  # 前端项目（Vue 3）
├── backend/                   # 后端项目（Sanic）
├── data/                      # 数据目录（统一存储）
│   ├── yprompt.db            # SQLite数据库
│   ├── cache/                 # 缓存
│   └── logs/                  # 日志
├── Dockerfile                 # Docker镜像构建文件
├── docker-compose.yml         # Docker Compose配置
├── start.sh                   # 容器启动脚本
└── .github/workflows/         # GitHub Actions
```

## 技术栈

### 前端
- Vue 3.4 + TypeScript 5.3
- Vite 5.0 + Vue Router 4.2 + Pinia 2.1
- Tailwind CSS 3.3 + Lucide Icons

### 后端
- Sanic 23.12.1（异步高性能Web框架）
- SQLite 3（默认）/ MySQL 8.0+（可选）
- Linux.do OAuth 2.0 + JWT
- bcrypt 密码加密

### 部署
- Docker + Nginx
- GitHub Actions 自动构建
- 多架构支持（amd64/arm64）

## 开发文档

详细文档请查看：
- **项目概览**：[CLAUDE.md](./CLAUDE.md)
- **前端文档**：[frontend/CLAUDE.md](./frontend/CLAUDE.md)
- **后端文档**：[backend/CLAUDE.md](./backend/CLAUDE.md)

## API 文档

启动后端服务后访问：
- **Swagger UI**：http://localhost:8888/docs
- **OpenAPI JSON**：http://localhost:8888/openapi.json

## 常见问题

### 1. 如何重置管理员密码？

删除数据库重新初始化：
```bash
rm data/yprompt.db
docker-compose restart
```

或直接在数据库中修改（bcrypt加密）。

### 2. 如何切换数据库类型？

修改环境变量 `DB_TYPE=mysql` 并配置 MySQL 连接信息，然后重启服务。

### 3. 健康检查失败怎么办？

查看日志：
```bash
docker-compose logs -f
# 或
tail -f data/logs/backend/yprompt.log
```

常见原因：
- 后端启动时间较长，等待一会
- 数据库连接失败
- 配置错误

### 4. 如何启用 HTTPS？

将 SSL 证书放在 `data/ssl/` 目录：
- `fullchain.pem` - 完整证书链
- `privkey.pem` - 私钥

容器会自动检测并启用 HTTPS。

## 性能优化

1. **数据库优化**
   - SQLite：适合中小型部署（< 1000 用户）
   - MySQL：适合大规模部署

2. **后端优化**
   - 调整 worker 数量：`WORKERS=4`
   - 启用日志轮转
   - Redis 缓存（计划中）

3. **前端优化**
   - 生产构建已启用压缩
   - 静态资源 CDN（可选）
   - 图片懒加载

## 安全建议

1. **生产环境必须修改**：
   - `SECRET_KEY` - JWT 密钥
   - `ADMIN_PASSWORD` - 管理员密码
   - Linux.do OAuth 密钥

2. **不要提交敏感信息到 Git**：
   - `.env` 文件
   - `builtin-providers.json`
   - 数据库文件

3. **使用 HTTPS**：
   - 生产环境务必配置 SSL 证书
   - 设置安全头部（已配置）

## 许可证

MIT License

## 联系方式

如需帮助或反馈问题，请提交 Issue。
