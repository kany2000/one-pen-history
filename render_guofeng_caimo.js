const { execSync } = require('child_process');
const fs = require('fs');

const d = 'E:/projects/hypit-claude-explainer';
const a = d + '/assets_caimo';
const voice = d + '/voice_qin.wav';
const outMp4 = d + '/guofeng_caimo_demo.mp4';

console.log('开始合成全动态【方案A·国风彩墨手绘升级版】1080P 60fps 成片...');

const filter = [
  '[0:v]format=rgba[bg]',
  '[5:v]format=rgba,fade=t=in:st=6.2:d=0.8:alpha=1[wall]',
  `[bg][wall]overlay=x=1120:y=520:enable='gte(t,6.2)':format=auto[bg_wall]`,
  '[1:v]format=rgba[emperor]',
  `[bg_wall][emperor]overlay=x=710:y='440+sin(3*t)*5':format=auto[v_emp]`,
  '[2:v]format=rgba[mascot]',
  `[v_emp][mascot]overlay=x=250:y='710-abs(sin(5*t))*16':format=auto[v_mas]`,
  '[3:v]format=rgba[coin]',
  `[v_mas][coin]overlay=x=440:y='480+cos(4*t)*4':enable='gte(t,2.2)':format=auto[v_coin]`,
  '[4:v]format=rgba[scroll]',
  `[v_coin][scroll]overlay=x=1240:y='450+sin(4*t)*4':enable='gte(t,3.9)':format=auto[v_elem]`,
  '[v_elem]drawbox=x=380:y=930:w=1160:h=70:color=#24211d@0.88:t=fill[sub_box]',
  `[sub_box]drawtext=text='秦始皇统一六国：统一文字、统一货币，连车轮间距都要统一':x=(w-text_w)/2:y=950:fontsize=32:fontcolor=white:font='SimHei':enable='between(t,0,7)'[sub1]`,
  `[sub1]drawtext=text='——强迫症的胜利。长城和兵马俑也安排上了。':x=(w-text_w)/2:y=950:fontsize=32:fontcolor=#e5b85a:font='SimHei':enable='between(t,7,12.7)'[v_final]`,
  `aevalsrc=exprs='0.04*sin(2*PI*349*t)*exp(-2*mod(t\\,1.2))+0.03*sin(2*PI*523*t)*exp(-2*mod(t+0.4\\,1.2))+0.02*sin(2*PI*659*t)*exp(-2*mod(t+0.8\\,1.2))':duration=12.68[bgm]`,
  '[6:a][bgm]amix=inputs=2:weights=1.0 0.4[a_final]'
].join(';');

const cmd = 'ffmpeg -v error ' +
  '-loop 1 -i "' + a + '/bg_base.png" ' +
  '-loop 1 -i "' + a + '/emperor_qin.png" ' +
  '-loop 1 -i "' + a + '/mascot_flag.png" ' +
  '-loop 1 -i "' + a + '/coin_banliang.png" ' +
  '-loop 1 -i "' + a + '/scroll_writing.png" ' +
  '-loop 1 -i "' + a + '/wall_great.png" ' +
  '-i "' + voice + '" ' +
  '-filter_complex "' + filter + '" ' +
  '-map "[v_final]" -map "[a_final]" -t 12.68 -c:v libx264 -pix_fmt yuv420p -r 60 -c:a aac -b:a 192k -y "' + outMp4 + '"';

try {
  execSync(cmd);
  console.log('成片渲染成功:', outMp4);
  console.log('文件大小:', (fs.statSync(outMp4).size / 1024 / 1024).toFixed(2), 'MB');
} catch(e) {
  console.error('渲染错误:', e.message);
}
