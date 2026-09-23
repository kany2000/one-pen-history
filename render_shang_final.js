const { execSync } = require('child_process');
const fs = require('fs');

const d = 'E:/projects/hypit-claude-explainer';
const webm = d + '/shang_motion.webm';
const voice = d + '/voice_shang.wav';
const outMp4 = d + '/shang_dynamic_cartoon.mp4';

console.log('开始合成全动态【商朝·生动幽默科普版】MP4...');

// 音频滤镜: 旁白 + 轻快五声 BGM (F调 349Hz, 523Hz)
const filter = [
  `aevalsrc=exprs='0.035*sin(2*PI*349*t)*exp(-2*mod(t\\,1.1))+0.025*sin(2*PI*523*t)*exp(-2*mod(t+0.4\\,1.1))':duration=10.5[bgm]`,
  `[1:a][bgm]amix=inputs=2:weights=1.0 0.35[a_final]`
].join(';');

const cmd = `ffmpeg -v error -i "${webm}" -i "${voice}" ` +
  `-filter_complex "${filter}" -map 0:v -map "[a_final]" -t 10.5 ` +
  `-c:v libx264 -pix_fmt yuv420p -r 60 -c:a aac -b:a 192k -y "${outMp4}"`;

try {
  execSync(cmd);
  console.log('生动动态成片渲染完成:', outMp4);
  console.log('文件大小:', (fs.statSync(outMp4).size / 1024 / 1024).toFixed(2), 'MB');
} catch(e) {
  console.error('渲染错误:', e.message);
}
