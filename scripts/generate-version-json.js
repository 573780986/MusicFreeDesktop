const fs = require('fs');
const path = require('path');

// 读取changelog.md文件
const changelogPath = path.resolve(__dirname, '../changelog.md');
const versionJsonPath = path.resolve(__dirname, '../release/version.json');
const changelogContent = fs.readFileSync(changelogPath, 'utf-8');

// 正则匹配changelog.md中最新的版本信息（匹配## [x.y.z] - 日期 及其后续内容）
const latestVersionReg = /## \[([\d.]+)\] - (\d{4}-\d{2}-\d{2})([\s\S]*?)(?=## \[|$)/;
const matchResult = changelogContent.match(latestVersionReg);

if (!matchResult) {
  console.error('❌ 未在changelog.md中找到有效版本信息，请检查格式！');
  process.exit(1);
}

const [, version, date, content] = matchResult;

// 支持多分类提取，生成「分类+子项」的结构化日志
const changeLog = [];

// 匹配所有 ### 开头的分类（如「核心更新」「构建优化」）
const categoryAllReg = /### ([\s\S]+?)\n([\s\S]*?)(?=### |$)/g;
let categoryMatch;
while ((categoryMatch = categoryAllReg.exec(content)) !== null) {
  const [, categoryName, categoryContent] = categoryMatch;
  const cleanCategoryName = categoryName.trim();

  // 提取当前分类下所有 - 开头的更新项
  const items = categoryContent
    .split('\n')
    .filter(line => line.trim().startsWith('- '))
    .map(line => line.trim().replace(/^- /, '')); // 去掉行首的 "- "

  // 构造当前分类的日志结构
  if (items.length > 0) {
    // 添加分类标题（醒目区分不同模块）
    changeLog.push(`【${cleanCategoryName}】`);
    // 添加分类下的子项（缩进 + - 格式，更整洁）
    items.forEach(item => {
      changeLog.push(`   - ${item}`);
    });
    // 添加空行（分隔不同分类，提升可读性）
    changeLog.push('');
  }
}

// 兜底处理（无任何更新项时）
if (changeLog.length === 0) {
  changeLog.push('【更新】暂无详细更新日志');
} else {
  // 移除最后一个多余的空行
  if (changeLog[changeLog.length - 1] === '') {
    changeLog.pop();
  }
}

// 构造version.json内容（适配原项目格式）
const versionJson = {
  version,
  changeLog: changeLog,
  download: [`https://github.com/573780986/MusicFreeDesktop/releases/tag/v${version}`] // 自动拼接你的Releases地址
};

// 确保release文件夹存在
if (!fs.existsSync(path.dirname(versionJsonPath))) {
  fs.mkdirSync(path.dirname(versionJsonPath), { recursive: true });
}

// 写入release/version.json
fs.writeFileSync(versionJsonPath, JSON.stringify(versionJson, null, 2), 'utf-8');
console.log(`✅ version.json生成成功！版本：${version}`);
console.log(`📌 生成路径：${versionJsonPath}`);