const { execSync } = require('child_process');
const fs = require('fs');

const d = 'E:/projects/hypit-claude-explainer';
const timeline = JSON.parse(fs.readFileSync(d + '/full_timeline.json', 'utf8'));
const partsDir = d + '/full_video_parts';
if (!fs.existsSync(partsDir)) fs.mkdirSync(partsDir, { recursive: true });

console.log('继续渲染剩余篇章并合并...');

const concatFile = d + '/full_parts_concat.txt';
let concatText = '';

for (let i = 0; i < timeline.length; i++) {
  const item = timeline[i];
  const name = `part_${String(i).padStart(2, '0')}`;
  const pngPath = `${d}/chapters_png/chapter_${String(i).padStart(2, '0')}.png`;
  const voicePath = `${d}/full_voices/part_${String(i).padStart(2, '0')}_padded.wav`;
  const outPartMp4 = `${partsDir}/${name}.mp4`;
  const dur = item.padded_duration;
  const frames = Math.round(dur * 30);

  if (!fs.existsSync(outPartMp4) || fs.statSync(outPartMp4).size < 1000) {
    const filter = [
      `[0:v]scale=2048:1152,zoompan=z='min(zoom+0.00015,1.03)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=${frames}:s=1920x1080:fps=30,format=yuv420p[v]`,
      `aevalsrc=exprs='0.035*sin(2*PI*349*t)*exp(-2*mod(t\\,1.2))+0.025*sin(2*PI*523*t)*exp(-2*mod(t+0.4\\,1.2))+0.02*sin(2*PI*659*t)*exp(-2*mod(t+0.8\\,1.2))':duration=${dur}[bgm]`,
      `[1:a][bgm]amix=inputs=2:weights=1.0 0.35[a]`
    ].join(';');

    const cmd = `ffmpeg -v error -loop 1 -i "${pngPath}" -i "${voicePath}" ` +
      `-filter_complex "${filter}" -map "[v]" -map "[a]" -t ${dur} ` +
      `-c:v libx264 -pix_fmt yuv420p -c:a aac -b:a 192k -y "${outPartMp4}"`;

    execSync(cmd);
    console.log(`  [${i+1}/19] ${item.title} 渲染完成 (${dur}s, ${fs.statSync(outPartMp4).size} bytes)`);
  } else {
    console.log(`  [${i+1}/19] ${item.title} 已就绪 (${dur}s)`);
  }
  concatText += `file '${outPartMp4.replace(/\\/g, '/')}'\n`;
}

fs.writeFileSync(concatFile, concatText);
console.log('19 篇章独立视频全量就绪！开始无损流拼接为整片...');

const finalFullMp4 = `${d}/full_guofeng_caimo_history.mp4`;
execSync(`ffmpeg -v error -f concat -safe 0 -i "${concatFile}" -c copy -y "${finalFullMp4}"`);
console.log('🎉 最终完整版【五千年：一支笔画完中国史】渲染成功！');
console.log('成片路径:', finalFullMp4);
console.log('文件大小:', (fs.statSync(finalFullMp4).size / 1024 / 1024).toFixed(2), 'MB');
