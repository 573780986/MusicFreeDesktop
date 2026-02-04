# Changelog
所有显著的变更都会记录在这个文件中。

遵循 [语义化版本 2.0.0](https://semver.org/lang/zh-CN/) 规范。

## [1.0.0] - 2026-02-04
### 核心更新
- 发布 v1.0.0 正式版，完成 fork 后的独立维护初始化
- 更新项目版本至 1.0.0，重构 changelog 格式遵循语义化版本规范

### 构建优化
- 更新构建工作流以支持 Node 20 和 Python 依赖
- 将 Windows 构建的 Node 版本从 18 升级到 20
- 添加 Python 安装以解决 better-sqlite3 的编译依赖问题
- 为 Node 18 的旧版构建降级 better-sqlite3 至兼容版本
- 更新 macOS 构建的运行器版本

### 自动化流程
- 新增自动化脚本 `scripts/generate-version-json.js`，用于根据 changelog.md 生成 release/version.json
- 在 GitHub Actions 构建工作流中新增 release 任务，实现自动打包并发布到 GitHub Releases

### 信息迁移与清理
- 将更新源、作者信息及下载链接迁移至新的 GitHub 仓库（573780986/MusicFreeDesktop）
- 移除旧版飞书文档链接及原作者的个人信息与推广内容

## [未发布]
### 待更新
- 暂无显著变更

---

# 版本号对应说明
[1.0.0]: https://github.com/573780986/MusicFreeDesktop/releases/tag/v1.0.0
[未发布]: https://github.com/573780986/MusicFreeDesktop/compare/v1.0.0...HEAD