const fs = require('fs');
const { execSync } = require('child_process');

const d = 'E:/projects/hypit-claude-explainer';
const svgDir = d + '/chapters_svg';
const pngDir = d + '/chapters_png';
if (!fs.existsSync(pngDir)) fs.mkdirSync(pngDir, { recursive: true });

const chrome = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

console.log('开始批量渲染 19 篇章 1080P 高清 PNG...');
for (let i = 0; i < 19; i++) {
  const name = `chapter_${String(i).padStart(2, '0')}`;
  const svgPath = `${svgDir}/${name}.svg`;
  const pngPath = `${pngDir}/${name}.png`;
  
  if (!fs.existsSync(pngPath)) {
    const cmd = `"${chrome}" --headless --disable-gpu --no-sandbox --screenshot="${pngPath}" --window-size=1920,1080 "${svgPath}"`;
    execSync(cmd);
    console.log(`  [${i+1}/19] ${name}.png 渲染完成 (${fs.statSync(pngPath).size} bytes)`);
  } else {
    console.log(`  [${i+1}/19] ${name}.png 已存在`);
  }
}
console.log('19 篇章 1080P PNG 全量就绪！');
