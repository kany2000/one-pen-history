const { execSync } = require('child_process');
const fs = require('fs');

const d = 'E:/projects/hypit-claude-explainer';
const timeline = JSON.parse(fs.readFileSync(d + '/full_timeline.json', 'utf8'));

console.log('开始拼接 19 篇章完整语音母带...');

// 构造 concat 列表或 filter_complex
const concatList = d + '/voice_concat_list.txt';
let listContent = '';
for (let i = 0; i < timeline.length; i++) {
  // 每个音频片段原长 + 0.4s 静音
  const padWav = d + `/full_voices/part_${String(i).padStart(2, '0')}_padded.wav`;
  const rawWav = timeline[i].audio_file;
  const padCmd = `ffmpeg -v error -i "${rawWav}" -af "apad=pad_dur=0.4" -c:a pcm_s16le -y "${padWav}"`;
  execSync(padCmd);
  listContent += `file '${padWav.replace(/\\/g, '/')}'\n`;
}
fs.writeFileSync(concatList, listContent);

const masterVoice = d + '/full_voice_master.wav';
execSync(`ffmpeg -v error -f concat -safe 0 -i "${concatList}" -c:a pcm_s16le -y "${masterVoice}"`);
console.log('完整语音母带生成完成，总大小:', fs.statSync(masterVoice).size, 'bytes');

const totalDuration = parseFloat(execSync(`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${masterVoice}"`).toString().trim());
console.log('母带实测总时长:', totalDuration, '秒');
