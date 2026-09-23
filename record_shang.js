const puppeteer = require('E:/projects/hypit/node_modules/puppeteer-core');
const fs = require('fs');

const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const htmlFile = 'E:/projects/hypit-claude-explainer/recorder.html';
const outWebm = 'E:/projects/hypit-claude-explainer/shang_motion.webm';

(async () => {
  console.log('正在启动无头 Chrome 进行 60fps 动态 Canvas 录制...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-gpu',
      '--window-size=1920,1080',
      '--autoplay-policy=no-user-gesture-required'
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  console.log('加载动画页面...');
  await page.goto(`file:///${htmlFile.replace(/\\/g, '/')}`, { waitUntil: 'load' });

  console.log('开始 60fps 硬件加速录制 (时长 10.5 秒)...');
  const base64Data = await page.evaluate(async () => {
    return await window.startRecording(10.5);
  });

  console.log('录制完成，正在保存视频...');
  const buffer = Buffer.from(base64Data.split(',')[1], 'base64');
  fs.writeFileSync(outWebm, buffer);
  console.log('视频保存成功:', outWebm, '大小:', fs.statSync(outWebm).size, 'bytes');

  await browser.close();
  console.log('浏览器已退出');
})();
