# -*- coding: utf-8 -*-
from config import cf
from config.base import BaseConfig

class Config(BaseConfig):
    # 数据库配置
    DB_TYPE = cf.DB_TYPE if hasattr(cf, 'DB_TYPE') else 'mysql'
    SQLITE_DB_PATH = cf.SQLITE_DB_PATH if hasattr(cf, 'SQLITE_DB_PATH') else '../data/yprompt.db'
    
    # MYSQL
    DB_HOST = cf.DB_HOST
    DB_USER = cf.DB_USER
    DB_PASS = cf.DB_PASS
    DB_NAME = cf.DB_NAME
    DB_PORT = cf.DB_PORT

    # JWT配置
    SECRET_KEY = cf.SECRET_KEY
    
    # Linux.do OAuth配置
    LINUX_DO_CLIENT_ID = cf.LINUX_DO_CLIENT_ID if hasattr(cf, 'LINUX_DO_CLIENT_ID') else ''
    LINUX_DO_CLIENT_SECRET = cf.LINUX_DO_CLIENT_SECRET if hasattr(cf, 'LINUX_DO_CLIENT_SECRET') else ''
    LINUX_DO_REDIRECT_URI = cf.LINUX_DO_REDIRECT_URI if hasattr(cf, 'LINUX_DO_REDIRECT_URI') else ''
    
    # 默认管理员账号配置
    DEFAULT_ADMIN_USERNAME = cf.DEFAULT_ADMIN_USERNAME if hasattr(cf, 'DEFAULT_ADMIN_USERNAME') else 'admin'
    DEFAULT_ADMIN_PASSWORD = cf.DEFAULT_ADMIN_PASSWORD if hasattr(cf, 'DEFAULT_ADMIN_PASSWORD') else 'admin123'
    DEFAULT_ADMIN_NAME = cf.DEFAULT_ADMIN_NAME if hasattr(cf, 'DEFAULT_ADMIN_NAME') else '管理员'


