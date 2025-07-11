# SiYuan 自定义侧边栏插件

一个强大的插件，允许您在 SiYuan 中创建个性化的停靠栏，包含您最喜欢的文档。通过简单的文档管理、拖拽重新排序和可展开的章节来构建您自己的自定义侧边栏。

![自定义侧边栏插件](preview.png)

## 功能特性

- 📁 **自定义文档章节**：通过复制文档 ID 将任何文档添加到您的侧边栏
- 🔄 **拖拽重新排序**：通过直观的拖拽操作轻松重新组织您的章节
- 📂 **可展开章节**：单击即可显示/隐藏子文档
- 🎯 **智能图标**：自动显示文档图标以便于识别
- 🌐 **多语言支持**：支持英文和中文
- 💾 **持久化存储**：您的侧边栏配置会自动保存
- 🎨 **主题集成**：与 SiYuan 的主题系统无缝集成

## 安装

1. 从 [发布页面](https://github.com/DD3Boh/custom-sidebar-siyuan/releases) 下载最新版本
2. 将插件文件解压到您的 SiYuan 插件目录
3. 重启 SiYuan 或在 设置 > 集市 > 已下载 中启用插件

您也可以通过 SiYuan 集市的常规方式安装插件。

## 使用方法

### 将文档添加到侧边栏

1. 在 SiYuan 中导航到任何文档
2. 复制文档 ID（您可以在文档的 URL 中找到，或者右键点击并选择"复制块 ID"）
3. 点击自定义侧边栏中的"+"按钮
4. 文档将自动添加，包括其标题、图标和子文档

您也可以使用文档树中文档旁边的"更多"菜单将文档添加到侧边栏。

### 管理您的侧边栏

- **重新排序章节**：点击并拖拽任何章节标题来重新排序
- **展开/折叠**：点击展开/折叠图标来显示/隐藏子文档
- **删除章节**：点击垃圾桶按钮来删除章节
- **导航**：点击任何文档在 SiYuan 中打开它

### 键盘快捷键

- `Ctrl+W`：最小化侧边栏停靠栏

## 配置

插件自动保存您的侧边栏配置，包括：
- 文档章节及其顺序
- 每个章节的展开状态

## 技术细节

### 构建工具

- **Vue 3**：现代响应式 UI 框架
- **TypeScript**：类型安全的 JavaScript 开发
- **Vite**：快速构建工具和开发服务器
- **vue-draggable-plus**：拖拽功能

## 许可证

本项目采用 MIT 许可证 - 详情请参阅 [LICENSE](LICENSE) 文件。

## 支持

如果您觉得这个插件有用，请考虑支持开发：

[![PayPal](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/DD3Boh)

## 更新日志

查看 [CHANGELOG_zh_CN.md](CHANGELOG_zh_CN.md) 了解变更和更新列表。

## 致谢

- 感谢 SiYuan 团队创造了优秀的笔记应用程序，以及提供的 vite-vue 插件模板
- 感谢 Vue.js 社区提供的优秀框架和生态系统