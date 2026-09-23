const fs = require('fs');
const { execSync } = require('child_process');

const outDir = 'E:/projects/hypit-claude-explainer/assets_caimo';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const chrome = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const assets = [
  {
    name: 'bg_base',
    w: 1920, h: 1080,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">
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
      <rect width="1920" height="1080" fill="url(#paper)"/>
      <rect width="1920" height="1080" fill="none" stroke="#d5c8ad" stroke-width="24" opacity="0.4"/>
      <g transform="translate(100, 80)">
        <rect x="0" y="0" width="110" height="42" rx="4" fill="#a63426"/>
        <text x="55" y="28" font-family="SimSun, serif" font-size="22" font-weight="bold" fill="#ffffff" text-anchor="middle">前221</text>
        <text x="140" y="38" font-family="SimSun, serif" font-size="56" font-weight="bold" fill="#2b261f">秦</text>
        <text x="215" y="38" font-family="SimSun, serif" font-size="26" fill="#7a6e5d">· 六一统</text>
      </g>
      <path d="M 120 860 Q 600 855, 1100 862 T 1820 858" fill="none" stroke="#3a342a" stroke-width="5" stroke-linecap="round" filter="url(#ink-bleed)"/>
    </svg>`
  },
  {
    name: 'emperor_qin',
    w: 500, h: 500,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
      <g transform="translate(250, 180)">
        <path d="M -90 120 Q -120 220, -110 260 L 110 260 Q 120 220, 90 120 Z" fill="#24211d"/>
        <path d="M -50 100 L 0 160 L 50 100 L 30 250 L -30 250 Z" fill="#a63426"/>
        <ellipse cx="0" cy="180" rx="75" ry="85" fill="#2b261f"/>
        <rect x="-65" y="180" width="130" height="14" rx="3" fill="#d4a34b"/>
        <circle cx="0" cy="187" r="10" fill="#7ba385"/>
        <ellipse cx="0" cy="40" rx="55" ry="50" fill="#fcecd4" stroke="#3a342a" stroke-width="4"/>
        <path d="M -25 60 Q 0 52, 25 60 Q 15 75, 0 65 Q -15 75, -25 60 Z" fill="#24211d"/>
        <path d="M -6 68 Q 0 82, 6 68 Z" fill="#24211d"/>
        <path d="M -40 20 L -12 25" stroke="#24211d" stroke-width="6" stroke-linecap="round"/>
        <path d="M 40 20 L 12 25" stroke="#24211d" stroke-width="6" stroke-linecap="round"/>
        <ellipse cx="-24" cy="36" rx="8" ry="8" fill="#24211d"/>
        <circle cx="-21" cy="33" r="3" fill="#ffffff"/>
        <ellipse cx="24" cy="36" rx="8" ry="8" fill="#24211d"/>
        <circle cx="27" cy="33" r="3" fill="#ffffff"/>
        <rect x="-80" y="-30" width="160" height="16" rx="3" fill="#24211d"/>
        <rect x="-30" y="-14" width="60" height="20" fill="#a63426"/>
        <line x1="-65" y1="-14" x2="-65" y2="10" stroke="#d4a34b" stroke-width="3" stroke-dasharray="3,3"/>
        <line x1="-40" y1="-14" x2="-40" y2="12" stroke="#d4a34b" stroke-width="3" stroke-dasharray="3,3"/>
        <line x1="0" y1="-14" x2="0" y2="14" stroke="#d4a34b" stroke-width="3" stroke-dasharray="3,3"/>
        <line x1="40" y1="-14" x2="40" y2="12" stroke="#d4a34b" stroke-width="3" stroke-dasharray="3,3"/>
        <line x1="65" y1="-14" x2="65" y2="10" stroke="#d4a34b" stroke-width="3" stroke-dasharray="3,3"/>
        <path d="M -50 120 Q -110 110, -140 90" fill="none" stroke="#2b261f" stroke-width="26" stroke-linecap="round"/>
        <circle cx="-145" cy="88" r="14" fill="#fcecd4" stroke="#3a342a" stroke-width="3"/>
        <path d="M 50 120 Q 110 110, 140 90" fill="none" stroke="#2b261f" stroke-width="26" stroke-linecap="round"/>
        <circle cx="145" cy="88" r="14" fill="#fcecd4" stroke="#3a342a" stroke-width="3"/>
      </g>
    </svg>`
  },
  {
    name: 'coin_banliang',
    w: 300, h: 300,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="300" height="300">
      <g transform="translate(150, 130)">
        <circle cx="0" cy="0" r="80" fill="#588b76" stroke="#244b3c" stroke-width="7"/>
        <rect x="-30" y="-30" width="60" height="60" fill="#ece4d2" stroke="#244b3c" stroke-width="6"/>
        <text x="0" y="115" font-family="SimHei" font-size="26" font-weight="bold" fill="#244b3c" text-anchor="middle">统一货币 · 半两</text>
      </g>
    </svg>`
  },
  {
    name: 'scroll_writing',
    w: 300, h: 350,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 350" width="300" height="350">
      <g transform="translate(150, 150)">
        <rect x="-90" y="-110" width="180" height="220" rx="10" fill="#d9ad67" stroke="#704e1b" stroke-width="6"/>
        <line x1="-30" y1="-110" x2="-30" y2="110" stroke="#704e1b" stroke-width="3"/>
        <line x1="30" y1="-110" x2="30" y2="110" stroke="#704e1b" stroke-width="3"/>
        <text x="0" y="5" font-family="SimSun" font-size="36" font-weight="bold" fill="#24211d" text-anchor="middle">書同文</text>
        <text x="0" y="50" font-family="SimSun" font-size="36" font-weight="bold" fill="#24211d" text-anchor="middle">車同軌</text>
        <text x="0" y="145" font-family="SimHei" font-size="26" font-weight="bold" fill="#704e1b" text-anchor="middle">规矩定天下</text>
      </g>
    </svg>`
  },
  {
    name: 'wall_great',
    w: 700, h: 350,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 350" width="700" height="350">
      <g transform="translate(50, 40)">
        <path d="M 0 160 Q 150 110, 300 135 T 600 70 L 600 250 L 0 250 Z" fill="#cfc2a7" opacity="0.85"/>
        <rect x="180" y="80" width="55" height="65" fill="#a89a80"/>
        <rect x="380" y="100" width="55" height="65" fill="#a89a80"/>
        <text x="210" y="55" font-family="SimSun" font-size="28" fill="#5c4f39" font-weight="bold" text-anchor="middle">万里长城</text>
      </g>
    </svg>`
  },
  {
    name: 'mascot_flag',
    w: 250, h: 250,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250" width="250" height="250">
      <g transform="translate(100, 150)">
        <ellipse cx="0" cy="0" rx="42" ry="38" fill="#2b261f"/>
        <ellipse cx="-14" cy="-5" rx="6" ry="6" fill="#ffffff"/>
        <ellipse cx="14" cy="-5" rx="6" ry="6" fill="#ffffff"/>
        <circle cx="-13" cy="-5" r="2.5" fill="#000000"/>
        <circle cx="15" cy="-5" r="2.5" fill="#000000"/>
        <circle cx="-24" cy="8" r="7" fill="#e88574" opacity="0.6"/>
        <circle cx="24" cy="8" r="7" fill="#e88574" opacity="0.6"/>
        <line x1="30" y1="5" x2="65" y2="-55" stroke="#5c4a35" stroke-width="5" stroke-linecap="round"/>
        <polygon points="63,-55 115,-38 60,-18" fill="#24211d"/>
        <text x="80" y="-32" font-family="SimSun" font-size="18" fill="#d4a34b" font-weight="bold">秦</text>
      </g>
    </svg>`
  }
];

console.log('正在批量渲染国风彩墨高清图元...');
for (const a of assets) {
  const svgPath = outDir + '/' + a.name + '.svg';
  const pngPath = outDir + '/' + a.name + '.png';
  fs.writeFileSync(svgPath, a.svg);
  const cmd = `"${chrome}" --headless --disable-gpu --no-sandbox --default-background-color=00000000 --screenshot="${pngPath}" --window-size=${a.w},${a.h} "${svgPath}"`;
  execSync(cmd);
  console.log('已生成图元:', a.name, fs.statSync(pngPath).size, 'bytes');
}
console.log('全部图元生成就绪！');
