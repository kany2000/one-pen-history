const fs = require('fs');
const { execSync } = require('child_process');

const outDir = 'E:/projects/hypit-claude-explainer/style_A_variant';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// 我们生成 360 帧（12 秒，30fps）的国风水墨小品彩绘序列帧
console.log('开始生成【国风彩墨漫笔风格】序列帧...');

function getSvg(frame) {
  const t = frame / 30; // 时间秒
  
  // 呼吸与动作浮动
  const floatY = Math.sin(t * 3) * 6;
  const armAngle = Math.sin(t * 4) * 8;
  
  // 墨水滴小人弹性跳动
  const mascotBounce = Math.abs(Math.sin(t * 5)) * 12;
  const blink = (frame % 70 < 4) ? 0.1 : 1.0;
  
  // 物品飞入动效
  // 0~3s 始皇亮相; 3~7s 统一文字货币弹跳; 7~12s 长城与兵马俑
  const coinScale = Math.min(1.0, Math.max(0, (t - 2.5) * 2));
  const bookScale = Math.min(1.0, Math.max(0, (t - 4.0) * 2));
  const wallScale = Math.min(1.0, Math.max(0, (t - 6.5) * 1.5));
  
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">
  <defs>
    <radialGradient id="paper" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#faf6ee"/>
      <stop offset="100%" stop-color="#ece4d2"/>
    </radialGradient>
    <filter id="ink-bleed">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
  </defs>

  <!-- 米黄熟宣底色 -->
  <rect width="1920" height="1080" fill="url(#paper)"/>
  
  <!-- 宣纸边缘暗角 -->
  <rect width="1920" height="1080" fill="none" stroke="#d5c8ad" stroke-width="24" opacity="0.4"/>

  <!-- 左上角时代印章与标题 -->
  <g transform="translate(100, 80)">
    <!-- 朱砂印章 -->
    <rect x="0" y="0" width="110" height="42" rx="4" fill="#a63426"/>
    <text x="55" y="28" font-family="SimSun, serif" font-size="22" font-weight="bold" fill="#ffffff" text-anchor="middle">前221</text>
    
    <!-- 朝代大字 -->
    <text x="140" y="38" font-family="SimSun, serif" font-size="56" font-weight="bold" fill="#2b261f">秦</text>
    <text x="215" y="38" font-family="SimSun, serif" font-size="26" fill="#7a6e5d">· 六一统</text>
  </g>

  <!-- 地面水墨横线 -->
  <path d="M 120 860 Q 600 855, 1100 862 T 1820 858" fill="none" stroke="#3a342a" stroke-width="5" stroke-linecap="round" filter="url(#ink-bleed)"/>

  <!-- 远处长城剪影 (6.5s 后显现) -->
  <g opacity="${wallScale}" transform="translate(1100, 520) scale(${0.8 + 0.2 * wallScale})">
    <path d="M 0 160 Q 150 120, 300 140 T 600 80 L 600 240 L 0 240 Z" fill="#cfc2a7" opacity="0.6"/>
    <rect x="180" y="90" width="40" height="50" fill="#a89a80"/>
    <rect x="360" y="110" width="40" height="50" fill="#a89a80"/>
    <text x="200" y="70" font-family="SimSun" font-size="24" fill="#6e624c" text-anchor="middle">万里长城</text>
  </g>

  <!-- 中间主角：萌系国风秦始皇 -->
  <g transform="translate(860, ${580 + floatY})">
    <!-- 黑色龙袍披风 -->
    <path d="M -90 120 Q -120 220, -110 260 L 110 260 Q 120 220, 90 120 Z" fill="#24211d"/>
    <!-- 红色内衬与交领 -->
    <path d="M -50 100 L 0 160 L 50 100 L 30 250 L -30 250 Z" fill="#a63426"/>
    <!-- 身体躯干 (黑色圆袍) -->
    <ellipse cx="0" cy="180" rx="75" ry="85" fill="#2b261f"/>
    <!-- 金色玉佩腰带 -->
    <rect x="-65" y="180" width="130" height="14" rx="3" fill="#d4a34b"/>
    <circle cx="0" cy="187" r="10" fill="#7ba385"/>

    <!-- 脑袋 (圆润萌系肤色) -->
    <ellipse cx="0" cy="40" rx="55" ry="50" fill="#fcecd4" stroke="#3a342a" stroke-width="4"/>
    
    <!-- 威武又呆萌的八字胡 -->
    <path d="M -25 60 Q 0 52, 25 60 Q 15 75, 0 65 Q -15 75, -25 60 Z" fill="#24211d"/>
    <!-- 黑色胡茬短须 -->
    <path d="M -6 68 Q 0 82, 6 68 Z" fill="#24211d"/>

    <!-- 萌萌大眼与眉毛 -->
    <!-- 剑眉 -->
    <path d="M -40 20 L -12 25" stroke="#24211d" stroke-width="6" stroke-linecap="round"/>
    <path d="M 40 20 L 12 25" stroke="#24211d" stroke-width="6" stroke-linecap="round"/>
    <!-- 眼睛 (带眨眼) -->
    <ellipse cx="-24" cy="36" rx="8" ry="${8 * blink}" fill="#24211d"/>
    <circle cx="-21" cy="33" r="3" fill="#ffffff" opacity="${blink}"/>
    <ellipse cx="24" cy="36" rx="8" ry="${8 * blink}" fill="#24211d"/>
    <circle cx="27" cy="33" r="3" fill="#ffffff" opacity="${blink}"/>

    <!-- 帝王平天冠冕旒 -->
    <rect x="-80" y="-30" width="160" height="16" rx="3" fill="#24211d"/>
    <rect x="-30" y="-14" width="60" height="20" fill="#a63426"/>
    <!-- 前后玉串流苏 (随微风摆动) -->
    <g transform="rotate(${armAngle * 0.4}, 0, -20)">
      <line x1="-65" y1="-14" x2="-65" y2="10" stroke="#d4a34b" stroke-width="3" stroke-dasharray="3,3"/>
      <line x1="-40" y1="-14" x2="-40" y2="12" stroke="#d4a34b" stroke-width="3" stroke-dasharray="3,3"/>
      <line x1="0" y1="-14" x2="0" y2="14" stroke="#d4a34b" stroke-width="3" stroke-dasharray="3,3"/>
      <line x1="40" y1="-14" x2="40" y2="12" stroke="#d4a34b" stroke-width="3" stroke-dasharray="3,3"/>
      <line x1="65" y1="-14" x2="65" y2="10" stroke="#d4a34b" stroke-width="3" stroke-dasharray="3,3"/>
    </g>

    <!-- 伸展的双臂 (强迫症统一天下的自信手势) -->
    <g transform="rotate(${-armAngle}, -70, 130)">
      <path d="M -50 120 Q -110 110, -140 90" fill="none" stroke="#2b261f" stroke-width="26" stroke-linecap="round"/>
      <circle cx="-145" cy="88" r="14" fill="#fcecd4" stroke="#3a342a" stroke-width="3"/>
    </g>
    <g transform="rotate(${armAngle}, 70, 130)">
      <path d="M 50 120 Q 110 110, 140 90" fill="none" stroke="#2b261f" stroke-width="26" stroke-linecap="round"/>
      <circle cx="145" cy="88" r="14" fill="#fcecd4" stroke="#3a342a" stroke-width="3"/>
    </g>
  </g>

  <!-- 动态飞出的元素1：秦半两铜钱 (2.5s后弹跳出) -->
  <g transform="translate(560, 520) scale(${coinScale})">
    <circle cx="0" cy="0" r="48" fill="#588b76" stroke="#244b3c" stroke-width="5"/>
    <rect x="-18" y="-18" width="36" height="36" fill="#ece4d2" stroke="#244b3c" stroke-width="4"/>
    <text x="0" y="70" font-family="SimHei" font-size="22" font-weight="bold" fill="#244b3c" text-anchor="middle">统一货币 · 半两</text>
  </g>

  <!-- 动态飞出的元素2：小篆书同文竹简 (4.0s后弹跳出) -->
  <g transform="translate(1220, 500) scale(${bookScale})">
    <rect x="-60" y="-70" width="120" height="140" rx="8" fill="#d9ad67" stroke="#704e1b" stroke-width="4"/>
    <line x1="-20" y1="-70" x2="-20" y2="70" stroke="#704e1b" stroke-width="2"/>
    <line x1="20" y1="-70" x2="20" y2="70" stroke="#704e1b" stroke-width="2"/>
    <text x="0" y="5" font-family="SimSun" font-size="26" font-weight="bold" fill="#24211d" text-anchor="middle">書同文</text>
    <text x="0" y="38" font-family="SimSun" font-size="26" font-weight="bold" fill="#24211d" text-anchor="middle">車同軌</text>
    <text x="0" y="100" font-family="SimHei" font-size="22" font-weight="bold" fill="#704e1b" text-anchor="middle">规矩定天下</text>
  </g>

  <!-- 左下角常驻视线锚点：水墨小团子吉祥物 (挥小旗欢呼) -->
  <g transform="translate(320, ${820 - mascotBounce})">
    <!-- 水墨光晕 -->
    <ellipse cx="0" cy="0" rx="38" ry="34" fill="#2b261f" filter="url(#ink-bleed)"/>
    <!-- 腮红与大眼睛 -->
    <ellipse cx="-12" cy="-4" rx="5" ry="${5 * blink}" fill="#ffffff"/>
    <ellipse cx="12" cy="-4" rx="5" ry="${5 * blink}" fill="#ffffff"/>
    <circle cx="-11" cy="-5" r="2" fill="#000000"/>
    <circle cx="13" cy="-5" r="2" fill="#000000"/>
    <circle cx="-22" cy="6" r="6" fill="#e88574" opacity="0.6"/>
    <circle cx="22" cy="6" r="6" fill="#e88574" opacity="0.6"/>
    <!-- 挥舞的秦国黑色小三角龙旗 -->
    <line x1="28" y1="5" x2="55" y2="-45" stroke="#5c4a35" stroke-width="4" stroke-linecap="round"/>
    <polygon points="53,-45 95,-32 50,-15" fill="#24211d"/>
    <text x="66" y="-27" font-family="SimSun" font-size="14" fill="#d4a34b" font-weight="bold">秦</text>
  </g>

  <!-- 底部现代感书法字幕卡 -->
  <g transform="translate(960, 960)">
    <rect x="-560" y="-45" width="1120" height="70" rx="35" fill="#24211d" opacity="0.88"/>
    <text x="0" y="4" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="28" font-weight="bold" fill="#ffffff" text-anchor="middle">
      ${t < 7.0 ? '秦始皇统一六国：统一文字、统一货币，连车轮间距都要统一' : '——强迫症的胜利。长城和兵马俑也安排上了。'}
    </text>
  </g>
</svg>`;
}

// 抽取 6 个代表性关键时间点的 SVG
const previewTimes = [1.0, 3.5, 5.5, 8.0, 10.5];
for (const pt of previewTimes) {
  const f = Math.round(pt * 30);
  fs.writeFileSync(outDir + '/frame_' + pt + 's.svg', getSvg(f));
}
console.log('关键帧 SVG 生成完成！');
