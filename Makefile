# 德州扑克项目 Makefile

.PHONY: help install dev build lint clean

# 显示帮助信息
help:
	@echo "德州扑克项目 - 可用命令："
	@echo ""
	@echo "   make help      - 显示此帮助信息"
	@echo "   make install   - 安装前端依赖"
	@echo "   make dev       - 启动前端开发服务器"
	@echo "   make build     - 构建前端生产版本"
	@echo "   make lint      - 运行代码检查"
	@echo "   make clean     - 清理构建文件和依赖"
	@echo "   make serve     - 启动前端生产预览服务器"
	@echo ""

# 安装前端依赖
install:
	@echo "正在安装前端依赖..."
	cd client && npm install

# 启动前端开发服务器
dev:
	@echo "正在启动前端开发服务器..."
	cd client && npm run dev

# 构建前端生产版本
build:
	@echo "正在构建前端生产版本..."
	cd client && npm run build

# 运行代码检查
lint:
	@echo "正在运行代码检查..."
	cd client && npm run lint

# 清理构建文件和依赖
clean:
	@echo "正在清理..."
	cd client && rm -rf node_modules dist
	@echo "清理完成！"

# 启动前端生产预览服务器
serve:
	@echo "正在启动生产预览服务器..."
	cd client && npm run preview

# 清理开发服务器占用的端口（可选）
clean-port:
	@echo "正在清理端口 5173..."
	@lsof -ti:5173 | xargs kill -9 2>/dev/null || echo "端口 5173 未被占用"

