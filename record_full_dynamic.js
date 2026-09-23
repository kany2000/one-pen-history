const puppeteer = require('E:/projects/hypit/node_modules/puppeteer-core');
const fs = require('fs');
const { execSync } = require('child_process');

const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const htmlFile = 'E:/projects/hypit-claude-explainer/full_motion_engine.html';
const workDir = 'E:/projects/hypit-claude-explainer';

const segments = [
  { id: 'seg_01', start: 0.0, end: 51.89, name: '上古至先秦百家争鸣' },
  { id: 'seg_02', start: 51.89, end: 98.84, name: '秦汉大一统至三国魏晋' },
  { id: 'seg_03', start: 98.84, end: 155.78, name: '隋唐宋元明盛世远洋' },
  { id: 'seg_04', start: 155.78, end: 198.0, name: '近代辛亥至现代航天' }
];

(async () => {
  console.log('正在启动无头 Chrome 引擎进行全片 19 篇章 60fps 分段高清录制...');
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
  await page.goto(`file:///${htmlFile.replace(/\\/g, '/')}`, { waitUntil: 'load' });

  const webmFiles = [];

  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    const outWebm = `${workDir}/${seg.id}.webm`;
    webmFiles.push(outWebm);
    const dur = (seg.end - seg.start).toFixed(2);
    console.log(`[${i+1}/4] 开始录制第 ${i+1} 段: ${seg.name} (${seg.start}s -> ${seg.end}s, 耗时 ${dur}s)...`);
    
    const base64Data = await page.evaluate(async (s, e) => {
      return await window.recordRange(s, e);
    }, seg.start, seg.end);

    const buffer = Buffer.from(base64Data.split(',')[1], 'base64');
    fs.writeFileSync(outWebm, buffer);
    console.log(`  第 ${i+1} 段录制完成！大小: ${(fs.statSync(outWebm).size / 1024 / 1024).toFixed(2)} MB`);
  }

  await browser.close();
  console.log('所有 4 大段 60fps 动态视频全部录制完成！');

  // 生成 concat 清单
  const concatTxt = `${workDir}/dynamic_concat.txt`;
  let concatLines = webmFiles.map(f => `file '${f.replace(/\\/g, '/')}'`).join('\n');
  fs.writeFileSync(concatTxt, concatLines);

  console.log('正在拼接无损视频轨并与完整语音、丝竹BGM合成 1080P 60fps 最终成片...');
  const finalMp4 = `${workDir}/full_dynamic_cartoon_history.mp4`;
  const voice = `${workDir}/full_voice_master.wav`;

  // 音频处理: 旁白 + 轻快五声 BGM
  const filter = [
    `aevalsrc=exprs='0.035*sin(2*PI*349*t)*exp(-2*mod(t\\,1.2))+0.025*sin(2*PI*523*t)*exp(-2*mod(t+0.4\\,1.2))+0.02*sin(2*PI*659*t)*exp(-2*mod(t+0.8\\,1.2))':duration=198.0[bgm]`,
    `[1:a][bgm]amix=inputs=2:weights=1.0 0.35[a_final]`
  ].join(';');

  const ffmpegCmd = `ffmpeg -v error -f concat -safe 0 -i "${concatTxt}" -i "${voice}" ` +
    `-filter_complex "${filter}" -map 0:v -map "[a_final]" -t 198.0 ` +
    `-c:v libx264 -pix_fmt yuv420p -r 60 -c:a aac -b:a 192k -y "${finalMp4}"`;

  execSync(ffmpegCmd);
  console.log('🎉 最终全长完整版【生动全动态手绘科普片】震撼生成！');
  console.log('成片路径:', finalMp4);
  console.log('成片大小:', (fs.statSync(finalMp4).size / 1024 / 1024).toFixed(2), 'MB');
})();
