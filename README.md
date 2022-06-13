## 简介
项目环境使用[pnpm](https://www.pnpm.cn/installation)包管理工具，node版本>12
#### pnpm安装
**使用 npm**
`npm install -g pnpm`
**如果你已经安装了 Homebrew 软件包管理器，则可以使用如下命令赖安装 pnpm：**
`brew install pnpm`
### 安装依赖
项目根目录下，控制台执行以下命令
`pnpm install`
### 项目运行
依赖安装完毕后项目根目录下，控制台执行以下命令
`pnpm start`

#### 项目基本目录结构
```bash
tree -C -L 1 .

# .
# ├── README.md
# ├── web         			  # 前端代码
# ├── server                  # 服务端代码
# ├── docs                    # 文档目录,包含测试文档，项目文档
# ├── csv           		  #	csv文件
# ├── json 					  #	临时json数据文件
# ├── modal 				  #	csv文件预读取代码
```