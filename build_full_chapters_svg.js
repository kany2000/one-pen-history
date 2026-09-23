const fs = require('fs');
const path = require('path');

const outDir = 'E:/projects/hypit-claude-explainer/chapters_svg';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function getChapterSvg(idx, ch) {
  // 通用顶层外框、米黄宣纸背景、朱砂印章、标题与墨水团子
  const era = ch.era;
  const title = ch.title;
  const desc = ch.desc;
  
  // 基础宣纸与印章
  const header = `
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
  
  <!-- 标题与印章 -->
  <g transform="translate(100, 80)">
    <rect x="0" y="0" width="${era.length > 4 ? 130 : 100}" height="42" rx="4" fill="#a63426"/>
    <text x="${era.length > 4 ? 65 : 50}" y="28" font-family="SimSun, serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">${era}</text>
    <text x="${era.length > 4 ? 160 : 130}" y="38" font-family="SimSun, serif" font-size="52" font-weight="bold" fill="#2b261f">${title.split('·')[0].trim()}</text>
    <text x="${era.length > 4 ? 240 : 210}" y="38" font-family="SimSun, serif" font-size="26" fill="#7a6e5d">${title.includes('·') ? '· ' + title.split('·').slice(1).join('·').trim() : ''}</text>
  </g>

  <!-- 地面墨线 -->
  <path d="M 120 860 Q 600 855, 1100 862 T 1820 858" fill="none" stroke="#3a342a" stroke-width="5" stroke-linecap="round" filter="url(#ink-bleed)"/>

  <!-- 左下角墨水团子 -->
  <g transform="translate(260, 800)">
    <ellipse cx="0" cy="0" rx="40" ry="36" fill="#2b261f" filter="url(#ink-bleed)"/>
    <ellipse cx="-12" cy="-4" rx="5" ry="6" fill="#ffffff"/>
    <ellipse cx="12" cy="-4" rx="5" ry="6" fill="#ffffff"/>
    <circle cx="-11" cy="-4" r="2.5" fill="#000000"/>
    <circle cx="13" cy="-4" r="2.5" fill="#000000"/>
    <circle cx="-20" cy="8" r="6" fill="#e88574" opacity="0.6"/>
    <circle cx="20" cy="8" r="6" fill="#e88574" opacity="0.6"/>
    <line x1="28" y1="5" x2="60" y2="-48" stroke="#5c4a35" stroke-width="5" stroke-linecap="round"/>
    <polygon points="58,-48 108,-32 55,-14" fill="#a63426"/>
    <text x="72" y="-28" font-family="SimSun" font-size="16" fill="#ffffff" font-weight="bold">华</text>
  </g>
  `;

  // 底部字幕条
  const footer = `
  <g transform="translate(960, 950)">
    <rect x="-650" y="-45" width="1300" height="72" rx="36" fill="#24211d" opacity="0.90"/>
    <text x="0" y="5" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="28" font-weight="bold" fill="#ffffff" text-anchor="middle">
      ${desc}
    </text>
  </g>
  </svg>`;

  // 中间场景定制内容
  let sceneContent = '';

  switch(idx) {
    case 0: // 片头
      sceneContent = `
        <g transform="translate(960, 480)">
          <text x="0" y="-60" font-family="SimSun, serif" font-size="88" font-weight="bold" fill="#2b261f" text-anchor="middle">五千年</text>
          <text x="0" y="40" font-family="SimSun, serif" font-size="38" fill="#a63426" text-anchor="middle">一支笔 · 画完中国史</text>
          <circle cx="0" cy="140" r="16" fill="#588b76"/>
        </g>
      `;
      break;
    case 1: // 上古 炎黄
      sceneContent = `
        <g transform="translate(960, 520)">
          <!-- 太阳 -->
          <circle cx="280" cy="-220" r="65" fill="#e26d5c" opacity="0.85"/>
          <!-- 炎帝 -->
          <g transform="translate(-160, 50)">
            <ellipse cx="0" cy="120" rx="60" ry="75" fill="#a63426"/>
            <ellipse cx="0" cy="20" rx="45" ry="42" fill="#fcecd4" stroke="#3a342a" stroke-width="4"/>
            <!-- 兔耳/牛角草本头饰 -->
            <path d="M -25 -20 Q -40 -70, -10 -50 Z" fill="#7ba385"/>
            <path d="M 25 -20 Q 40 -70, 10 -50 Z" fill="#7ba385"/>
            <circle cx="-16" cy="18" r="5" fill="#24211d"/><circle cx="16" cy="18" r="5" fill="#24211d"/>
            <path d="M -15 35 Q 0 45, 15 35" fill="none" stroke="#24211d" stroke-width="3"/>
            <text x="0" y="240" font-family="SimHei" font-size="24" fill="#a63426" font-weight="bold" text-anchor="middle">炎帝神农</text>
          </g>
          <!-- 黄帝 -->
          <g transform="translate(160, 50)">
            <ellipse cx="0" cy="120" rx="60" ry="75" fill="#d4a34b"/>
            <ellipse cx="0" cy="20" rx="45" ry="42" fill="#fcecd4" stroke="#3a342a" stroke-width="4"/>
            <!-- 帝王冠 -->
            <rect x="-35" y="-30" width="70" height="14" fill="#2b261f"/>
            <circle cx="-16" cy="18" r="5" fill="#24211d"/><circle cx="16" cy="18" r="5" fill="#24211d"/>
            <path d="M -15 35 Q 0 45, 15 35" fill="none" stroke="#24211d" stroke-width="3"/>
            <text x="0" y="240" font-family="SimHei" font-size="24" fill="#b0812e" font-weight="bold" text-anchor="middle">黄帝轩辕</text>
          </g>
          <!-- 手牵手与大爱心 -->
          <path d="M 0 -20 Q -30 -60, -60 -20 Q 0 40, 0 60 Q 0 40, 60 -20 Q 30 -60, 0 -20 Z" fill="#e26d5c"/>
          <line x1="-100" y1="170" x2="100" y2="170" stroke="#d4a34b" stroke-width="12" stroke-linecap="round"/>
          <text x="0" y="140" font-family="SimHei" font-size="22" font-weight="bold" fill="#ffffff" text-anchor="middle">一家人</text>
        </g>
      `;
      break;
    case 2: // 夏 大禹
      sceneContent = `
        <g transform="translate(960, 520)">
          <!-- 家门茅草屋 -->
          <g transform="translate(-320, 60)">
            <polygon points="0,-80 -120,40 120,40" fill="#d9ad67"/>
            <rect x="-80" y="40" width="160" height="150" fill="#c49a56"/>
            <rect x="-30" y="70" width="60" height="120" fill="#4a371c"/>
            <!-- 愤怒叉腰妻子 -->
            <circle cx="0" cy="30" r="28" fill="#fcecd4"/>
            <text x="60" y="-30" font-family="SimHei" font-size="22" fill="#a63426" font-weight="bold">又不回家吃饭？！</text>
          </g>
          <!-- 大禹扛石铲大步走 -->
          <g transform="translate(180, 50)">
            <ellipse cx="0" cy="130" rx="55" ry="70" fill="#698572"/>
            <ellipse cx="0" cy="30" rx="42" ry="40" fill="#fcecd4" stroke="#3a342a" stroke-width="4"/>
            <!-- 斗笠 -->
            <polygon points="0,-40 -70,5 70,5" fill="#bfa16b"/>
            <!-- 石铲 -->
            <line x1="-90" y1="180" x2="80" y2="-30" stroke="#705b41" stroke-width="12" stroke-linecap="round"/>
            <rect x="60" y="-55" width="45" height="50" rx="6" fill="#807a73" transform="rotate(-30, 80, -30)"/>
            <text x="0" y="240" font-family="SimHei" font-size="24" fill="#32543e" font-weight="bold" text-anchor="middle">治水加班狂 · 大禹</text>
          </g>
        </g>
      `;
      break;
    case 3: // 商 烤龟壳
      sceneContent = `
        <g transform="translate(960, 520)">
          <!-- 大青铜鼎与火 -->
          <g transform="translate(0, 150)">
            <!-- 烈火 -->
            <polygon points="-50,0 0,-70 50,0" fill="#e86a58"/>
            <polygon points="-25,0 0,-45 25,0" fill="#fac170"/>
            <rect x="-140" y="-30" width="280" height="24" fill="#3c594c"/>
          </g>
          <!-- 巨大龟甲 (裂纹与甲骨文) -->
          <g transform="translate(0, -20)">
            <ellipse cx="0" cy="0" rx="180" ry="140" fill="#d1b88e" stroke="#6e5737" stroke-width="8"/>
            <!-- 龟甲裂缝 -->
            <path d="M 0 -110 L 0 110 M -120 0 L 120 0 M -60 -60 L -10 -20 L -80 40 M 60 -60 L 20 -20 L 70 50" stroke="#423420" stroke-width="5" fill="none"/>
            <!-- 甲骨文字符 -->
            <text x="-90" y="-30" font-family="SimSun" font-size="42" font-weight="bold" fill="#a63426">日</text>
            <text x="70" y="-30" font-family="SimSun" font-size="42" font-weight="bold" fill="#a63426">月</text>
            <text x="-60" y="60" font-family="SimSun" font-size="42" font-weight="bold" fill="#a63426">雨</text>
            <text x="50" y="60" font-family="SimSun" font-size="42" font-weight="bold" fill="#a63426">王</text>
          </g>
          <!-- 委屈哭泣的乌龟 -->
          <g transform="translate(320, 90)">
            <ellipse cx="0" cy="0" rx="35" ry="30" fill="#7ba385"/>
            <text x="0" y="5" font-family="SimHei" font-size="22" fill="#ffffff" text-anchor="middle">呜呜</text>
          </g>
        </g>
      `;
      break;
    case 4: // 周 烽火戏诸侯
      sceneContent = `
        <g transform="translate(960, 520)">
          <!-- 烽火台浓烟滚滚 -->
          <g transform="translate(-240, 20)">
            <rect x="-80" y="20" width="160" height="200" fill="#8c8270"/>
            <polygon points="-90,20 0,-30 90,20" fill="#6e6555"/>
            <!-- 滚滚黑烟 -->
            <circle cx="0" cy="-70" r="45" fill="#524d45" opacity="0.8"/>
            <circle cx="30" cy="-130" r="60" fill="#3a3731" opacity="0.85"/>
            <circle cx="-20" cy="-210" r="75" fill="#24221e" opacity="0.9"/>
          </g>
          <!-- 幽王与褒姒在城楼大笑 -->
          <g transform="translate(180, 50)">
            <ellipse cx="-40" cy="120" rx="55" ry="70" fill="#a63426"/>
            <circle cx="-40" cy="30" r="40" fill="#fcecd4"/>
            <ellipse cx="50" cy="120" rx="50" ry="65" fill="#d9758f"/>
            <circle cx="50" cy="35" r="36" fill="#fcecd4"/>
            <!-- 气泡 -->
            <rect x="-60" y="-80" width="180" height="60" rx="15" fill="#ffffff" stroke="#2b261f" stroke-width="3"/>
            <text x="30" y="-42" font-family="SimHei" font-size="22" fill="#2b261f" font-weight="bold" text-anchor="middle">哈哈！聊死了吧！</text>
          </g>
        </g>
      `;
      break;
    case 5: // 春秋战国 百家争鸣
      sceneContent = `
        <g transform="translate(960, 520)">
          <!-- 四大思想家排排站吵架 -->
          <!-- 孔子 -->
          <g transform="translate(-360, 80)">
            <ellipse cx="0" cy="80" rx="45" ry="60" fill="#588b76"/>
            <circle cx="0" cy="15" r="35" fill="#fcecd4"/>
            <text x="0" y="-40" font-family="SimSun" font-size="36" font-weight="bold" fill="#a63426">仁！</text>
            <text x="0" y="170" font-family="SimHei" font-size="22" fill="#244b3c" font-weight="bold" text-anchor="middle">孔子</text>
          </g>
          <!-- 老子 -->
          <g transform="translate(-120, 80)">
            <ellipse cx="0" cy="80" rx="45" ry="60" fill="#829ab1"/>
            <circle cx="0" cy="15" r="35" fill="#fcecd4"/>
            <text x="0" y="-40" font-family="SimSun" font-size="32" font-weight="bold" fill="#2d527c">无为~</text>
            <text x="0" y="170" font-family="SimHei" font-size="22" fill="#2d527c" font-weight="bold" text-anchor="middle">老子</text>
          </g>
          <!-- 墨子 -->
          <g transform="translate(120, 80)">
            <ellipse cx="0" cy="80" rx="45" ry="60" fill="#a67c52"/>
            <circle cx="0" cy="15" r="35" fill="#fcecd4"/>
            <text x="0" y="-40" font-family="SimSun" font-size="32" font-weight="bold" fill="#73491f">兼爱！</text>
            <text x="0" y="170" font-family="SimHei" font-size="22" fill="#73491f" font-weight="bold" text-anchor="middle">墨子</text>
          </g>
          <!-- 韩非 -->
          <g transform="translate(360, 80)">
            <ellipse cx="0" cy="80" rx="45" ry="60" fill="#2b261f"/>
            <circle cx="0" cy="15" r="35" fill="#fcecd4"/>
            <text x="0" y="-40" font-family="SimSun" font-size="36" font-weight="bold" fill="#a63426">法！</text>
            <text x="0" y="170" font-family="SimHei" font-size="22" fill="#24211d" font-weight="bold" text-anchor="middle">韩非子</text>
          </g>
        </g>
      `;
      break;
    case 6: // 秦 六一统
      sceneContent = `
        <g transform="translate(960, 520)">
          <!-- 秦始皇 -->
          <g transform="translate(0, 50)">
            <ellipse cx="0" cy="120" rx="65" ry="80" fill="#24211d"/>
            <ellipse cx="0" cy="30" rx="50" ry="46" fill="#fcecd4" stroke="#3a342a" stroke-width="4"/>
            <rect x="-65" y="-30" width="130" height="15" fill="#24211d"/>
            <path d="M -50 100 Q -100 80, -130 60" stroke="#24211d" stroke-width="20" stroke-linecap="round"/>
            <path d="M 50 100 Q 100 80, 130 60" stroke="#24211d" stroke-width="20" stroke-linecap="round"/>
          </g>
          <!-- 半两钱 -->
          <g transform="translate(-280, 50)">
            <circle cx="0" cy="0" r="60" fill="#588b76" stroke="#244b3c" stroke-width="6"/>
            <rect x="-20" y="-20" width="40" height="40" fill="#ece4d2" stroke="#244b3c" stroke-width="5"/>
            <text x="0" y="90" font-family="SimHei" font-size="22" font-weight="bold" fill="#244b3c" text-anchor="middle">统一货币 · 半两</text>
          </g>
          <!-- 书同文竹简 -->
          <g transform="translate(280, 50)">
            <rect x="-60" y="-80" width="120" height="150" rx="8" fill="#d9ad67" stroke="#704e1b" stroke-width="5"/>
            <text x="0" y="-10" font-family="SimSun" font-size="26" font-weight="bold" fill="#24211d" text-anchor="middle">書同文</text>
            <text x="0" y="30" font-family="SimSun" font-size="26" font-weight="bold" fill="#24211d" text-anchor="middle">車同軌</text>
            <text x="0" y="105" font-family="SimHei" font-size="22" font-weight="bold" fill="#704e1b" text-anchor="middle">长城兵马俑</text>
          </g>
        </g>
      `;
      break;
    case 7: // 汉 丝绸之路
      sceneContent = `
        <g transform="translate(960, 520)">
          <!-- 沙漠沙丘 -->
          <path d="M -500 200 Q -200 80, 100 160 T 500 120" fill="none" stroke="#d4a34b" stroke-width="8"/>
          <!-- 张骞骑双峰骆驼 -->
          <g transform="translate(-80, 80)">
            <!-- 骆驼 -->
            <ellipse cx="0" cy="40" rx="90" ry="60" fill="#c49552"/>
            <circle cx="-50" cy="-20" r="30" fill="#a87a38"/>
            <circle cx="30" cy="-20" r="30" fill="#a87a38"/>
            <path d="M -90 40 L -120 -30 Q -100 -50, -80 -40" stroke="#c49552" stroke-width="24" stroke-linecap="round"/>
            <!-- 张骞持汉节 -->
            <circle cx="-10" cy="-60" r="28" fill="#fcecd4"/>
            <line x1="15" y1="-80" x2="15" y2="40" stroke="#a63426" stroke-width="8"/>
            <text x="-10" y="140" font-family="SimHei" font-size="24" font-weight="bold" fill="#6e4f20" text-anchor="middle">张骞出使西域十三年</text>
          </g>
          <!-- 葡萄吃货狂喜 -->
          <g transform="translate(320, 30)">
            <circle cx="0" cy="-10" r="16" fill="#8559a5"/><circle cx="25" cy="-10" r="16" fill="#8559a5"/>
            <circle cx="12" cy="15" r="16" fill="#8559a5"/><circle cx="37" cy="15" r="16" fill="#8559a5"/>
            <circle cx="25" cy="40" r="16" fill="#8559a5"/>
            <text x="25" y="85" font-family="SimHei" font-size="22" font-weight="bold" fill="#8559a5" text-anchor="middle">吃货狂喜！</text>
          </g>
        </g>
      `;
      break;
    case 8: // 三国 魏蜀吴
      sceneContent = `
        <g transform="translate(960, 520)">
          <!-- 草船借箭 -->
          <g transform="translate(0, 60)">
            <!-- 船身 -->
            <path d="M -220 50 Q 0 110, 220 50 L 160 120 L -160 120 Z" fill="#7a552e"/>
            <!-- 密密麻麻的箭矢 -->
            <line x1="-150" y1="-40" x2="-120" y2="50" stroke="#3a342a" stroke-width="4"/>
            <line x1="-100" y1="-60" x2="-80" y2="40" stroke="#3a342a" stroke-width="4"/>
            <line x1="-50" y1="-50" x2="-40" y2="45" stroke="#3a342a" stroke-width="4"/>
            <line x1="50" y1="-50" x2="40" y2="45" stroke="#3a342a" stroke-width="4"/>
            <line x1="100" y1="-60" x2="80" y2="40" stroke="#3a342a" stroke-width="4"/>
            <line x1="150" y1="-40" x2="120" y2="50" stroke="#3a342a" stroke-width="4"/>
            <!-- 诸葛亮摇鹅毛扇 -->
            <g transform="translate(0, -30)">
              <ellipse cx="0" cy="50" rx="45" ry="60" fill="#3c594c"/>
              <circle cx="0" cy="-10" r="32" fill="#fcecd4"/>
              <!-- 羽扇 -->
              <path d="M 40 -10 Q 70 -40, 80 0 Z" fill="#ffffff" stroke="#3a342a" stroke-width="2"/>
            </g>
            <text x="0" y="170" font-family="SimHei" font-size="26" font-weight="bold" fill="#a63426" text-anchor="middle">借了十万支 · 一支没还！</text>
          </g>
        </g>
      `;
      break;
    case 9: // 魏晋 兰亭王羲之
      sceneContent = `
        <g transform="translate(960, 520)">
          <!-- 兰亭挂轴 -->
          <g transform="translate(-180, 20)">
            <rect x="-100" y="-120" width="200" height="260" fill="#f7f2e7" stroke="#705b41" stroke-width="5"/>
            <text x="0" y="30" font-family="SimSun, serif" font-size="120" font-weight="bold" fill="#181816" text-anchor="middle">之</text>
            <text x="0" y="110" font-family="SimSun" font-size="22" fill="#a63426" text-anchor="middle">天下第一行书</text>
          </g>
          <!-- 王羲之与大白鹅 -->
          <g transform="translate(200, 60)">
            <circle cx="0" cy="0" r="38" fill="#fcecd4"/>
            <ellipse cx="0" cy="80" rx="45" ry="65" fill="#829ab1"/>
            <!-- 大白鹅 -->
            <g transform="translate(90, 80)">
              <ellipse cx="0" cy="15" rx="35" ry="25" fill="#ffffff" stroke="#3a342a" stroke-width="3"/>
              <path d="M -15 15 Q -10 -30, 10 -25" stroke="#ffffff" stroke-width="14" stroke-linecap="round"/>
              <polygon points="12,-32 25,-26 12,-20" fill="#e88574"/>
            </g>
            <text x="20" y="170" font-family="SimHei" font-size="22" font-weight="bold" fill="#2d527c" text-anchor="middle">爱写字 · 爱养鹅</text>
          </g>
        </g>
      `;
      break;
    case 10: // 隋 大运河
      sceneContent = `
        <g transform="translate(960, 520)">
          <!-- 大运河斜向水道 -->
          <path d="M -400 180 Q 0 80, 400 -20" stroke="#78a397" stroke-width="90" stroke-linecap="round" fill="none"/>
          <!-- 帆船 -->
          <g transform="translate(-80, 80)">
            <path d="M -40 20 L 40 20 L 25 40 L -25 40 Z" fill="#8c6843"/>
            <polygon points="0,15 0,-40 30,10" fill="#ffffff" stroke="#3a342a" stroke-width="2"/>
          </g>
          <!-- 贡院考棚与毛笔 -->
          <g transform="translate(240, 60)">
            <rect x="-70" y="-60" width="140" height="120" fill="#d9ad67" stroke="#704e1b" stroke-width="4"/>
            <text x="0" y="0" font-family="SimSun" font-size="32" font-weight="bold" fill="#24211d" text-anchor="middle">科举</text>
            <text x="0" y="100" font-family="SimHei" font-size="22" font-weight="bold" fill="#a63426" text-anchor="middle">读书改命第一届！</text>
          </g>
        </g>
      `;
      break;
    case 11: // 唐 盛世大唐李白
      sceneContent = `
        <g transform="translate(960, 520)">
          <!-- 长安大雁塔 -->
          <g transform="translate(-260, 20)">
            <polygon points="0,-160 -40,-120 40,-120" fill="#a89a80"/>
            <rect x="-50" y="-120" width="100" height="40" fill="#bfae93"/>
            <rect x="-65" y="-80" width="130" height="50" fill="#a89a80"/>
            <rect x="-80" y="-30" width="160" height="180" fill="#8c7e68"/>
          </g>
          <!-- 李白举杯邀明月 -->
          <g transform="translate(180, 40)">
            <!-- 明月 -->
            <circle cx="120" cy="-140" r="55" fill="#f5ecd7" stroke="#d4a34b" stroke-width="4"/>
            <circle cx="0" cy="0" r="42" fill="#fcecd4"/>
            <ellipse cx="0" cy="90" rx="55" ry="75" fill="#ffffff" stroke="#24211d" stroke-width="4"/>
            <!-- 金樽美酒 -->
            <path d="M 45 40 L 75 -20" stroke="#24211d" stroke-width="12" stroke-linecap="round"/>
            <circle cx="75" cy="-25" r="14" fill="#d4a34b"/>
            <text x="0" y="190" font-family="SimSun" font-size="28" font-weight="bold" fill="#a63426" text-anchor="middle">举杯邀明月 · 盛世大唐</text>
          </g>
        </g>
      `;
      break;
    case 12: // 宋 活字与东坡肉
      sceneContent = `
        <g transform="translate(960, 520)">
          <!-- 活字印刷字模 -->
          <g transform="translate(-240, 50)">
            <rect x="-70" y="-70" width="140" height="140" fill="#a88556" stroke="#4a371c" stroke-width="6"/>
            <text x="0" y="18" font-family="SimSun" font-size="52" font-weight="bold" fill="#24211d" text-anchor="middle">宋</text>
            <text x="0" y="115" font-family="SimHei" font-size="22" font-weight="bold" fill="#4a371c" text-anchor="middle">活字印刷 · 三大发明</text>
          </g>
          <!-- 苏东坡与东坡肉大铁锅 -->
          <g transform="translate(200, 50)">
            <ellipse cx="0" cy="30" rx="90" ry="35" fill="#3a3731"/>
            <!-- 红烧肉块 -->
            <rect x="-40" y="-10" width="35" height="30" rx="4" fill="#a63426"/>
            <rect x="10" y="-10" width="35" height="30" rx="4" fill="#a63426"/>
            <!-- 香气升腾 -->
            <path d="M -20 -20 Q -40 -60, -20 -90" stroke="#bfae93" stroke-width="4" fill="none"/>
            <path d="M 20 -20 Q 40 -60, 20 -90" stroke="#bfae93" stroke-width="4" fill="none"/>
            <text x="0" y="115" font-family="SimHei" font-size="24" font-weight="bold" fill="#a63426" text-anchor="middle">东坡肉真香！</text>
          </g>
        </g>
      `;
      break;
    case 13: // 元 蒙古铁骑
      sceneContent = `
        <g transform="translate(960, 520)">
          <!-- 巨幅大元疆域 -->
          <g transform="translate(-180, 20)">
            <path d="M -180 80 Q 0 -120, 200 -60 Q 300 80, 100 140 Z" fill="#d9ad67" opacity="0.75"/>
            <text x="20" y="20" font-family="SimSun" font-size="64" font-weight="bold" fill="#704e1b">大元</text>
            <text x="20" y="70" font-family="SimHei" font-size="20" fill="#a63426" text-anchor="middle">地图都快装不下了！</text>
          </g>
          <!-- 马可波罗写日记 -->
          <g transform="translate(240, 70)">
            <circle cx="0" cy="0" r="36" fill="#fcecd4"/>
            <ellipse cx="0" cy="70" rx="42" ry="60" fill="#75508a"/>
            <rect x="25" y="30" width="50" height="60" rx="4" fill="#ffffff" stroke="#2b261f" stroke-width="2"/>
            <text x="0" y="160" font-family="SimHei" font-size="22" font-weight="bold" fill="#75508a" text-anchor="middle">马可·波罗畅销游记</text>
          </g>
        </g>
      `;
      break;
    case 14: // 明 郑和下西洋
      sceneContent = `
        <g transform="translate(960, 520)">
          <!-- 滔滔江海 -->
          <path d="M -500 180 Q -250 140, 0 180 T 500 160" stroke="#588b76" stroke-width="12" fill="none"/>
          <!-- 巨大郑和宝船 -->
          <g transform="translate(-60, 20)">
            <path d="M -180 60 L 180 60 L 130 140 L -140 140 Z" fill="#8c6843"/>
            <!-- 多面大帆 -->
            <polygon points="-120,40 -120,-80 -60,-20" fill="#f5ecd7" stroke="#3a342a" stroke-width="3"/>
            <polygon points="-40,40 -40,-130 40,-50" fill="#f5ecd7" stroke="#3a342a" stroke-width="3"/>
            <polygon points="60,40 60,-100 130,-30" fill="#f5ecd7" stroke="#3a342a" stroke-width="3"/>
            <text x="0" y="180" font-family="SimSun" font-size="28" font-weight="bold" fill="#a63426" text-anchor="middle">大明郑和宝船 · 七下西洋</text>
          </g>
        </g>
      `;
      break;
    case 15: // 清 康乾盛世到近代
      sceneContent = `
        <g transform="translate(960, 520)">
          <!-- 人口破3亿 -->
          <g transform="translate(-200, 60)">
            <circle cx="0" cy="0" r="38" fill="#fcecd4"/>
            <!-- 顶戴花翎 -->
            <ellipse cx="0" cy="-28" rx="42" ry="12" fill="#a63426"/>
            <line x1="0" y1="-28" x2="30" y2="-45" stroke="#24211d" stroke-width="4"/>
            <ellipse cx="0" cy="80" rx="55" ry="70" fill="#2d527c"/>
            <text x="0" y="180" font-family="SimHei" font-size="24" font-weight="bold" fill="#2d527c" text-anchor="middle">人口破三亿！</text>
          </g>
          <!-- 1840战舰黑烟 -->
          <g transform="translate(220, 60)">
            <rect x="-90" y="30" width="180" height="70" fill="#423e38"/>
            <rect x="-20" y="-30" width="40" height="60" fill="#2b261f"/>
            <!-- 滚滚黑烟 -->
            <circle cx="0" cy="-70" r="30" fill="#24211d" opacity="0.8"/>
            <circle cx="20" cy="-110" r="45" fill="#24211d" opacity="0.85"/>
            <text x="0" y="180" font-family="SimHei" font-size="24" font-weight="bold" fill="#a63426" text-anchor="middle">1840 坚船利炮开到家门</text>
          </g>
        </g>
      `;
      break;
    case 16: // 辛亥 剪辫子
      sceneContent = `
        <g transform="translate(960, 520)">
          <!-- 剪掉长辫 -->
          <g transform="translate(0, 50)">
            <circle cx="0" cy="0" r="42" fill="#fcecd4"/>
            <ellipse cx="0" cy="90" rx="50" ry="75" fill="#5c6f84"/>
            <!-- 巨大剪刀咔嚓 -->
            <g transform="translate(70, -10)">
              <line x1="-30" y1="-30" x2="40" y2="40" stroke="#a63426" stroke-width="8"/>
              <line x1="-30" y1="30" x2="40" y2="-40" stroke="#a63426" stroke-width="8"/>
              <text x="30" y="-50" font-family="SimHei" font-size="26" fill="#a63426" font-weight="bold">咔嚓！</text>
            </g>
            <text x="0" y="190" font-family="SimSun" font-size="28" font-weight="bold" fill="#2b261f" text-anchor="middle">剪掉长辫 · 两千年帝制画上句号！</text>
          </g>
        </g>
      `;
      break;
    case 17: // 1949 新中国
      sceneContent = `
        <g transform="translate(960, 520)">
          <!-- 盛大礼花与大红灯笼 -->
          <g transform="translate(0, 40)">
            <!-- 大红灯笼 -->
            <ellipse cx="-200" cy="-80" rx="55" ry="45" fill="#d93829"/>
            <ellipse cx="200" cy="-80" rx="55" ry="45" fill="#d93829"/>
            <!-- 1949金光大字 -->
            <text x="0" y="20" font-family="SimSun, serif" font-size="96" font-weight="bold" fill="#d4a34b" text-anchor="middle">1949</text>
            <text x="0" y="90" font-family="SimSun, serif" font-size="36" font-weight="bold" fill="#a63426" text-anchor="middle">中华人民共和国成立</text>
            <text x="0" y="160" font-family="SimHei" font-size="24" fill="#6e5737" text-anchor="middle">日子越过越红火！</text>
          </g>
        </g>
      `;
      break;
    case 18: // 今天 高铁与航天
      sceneContent = `
        <g transform="translate(960, 520)">
          <!-- 高铁飞驰 -->
          <g transform="translate(-180, 80)">
            <rect x="-140" y="-25" width="280" height="50" rx="15" fill="#ffffff" stroke="#244b3c" stroke-width="5"/>
            <rect x="-110" y="-12" width="40" height="24" rx="4" fill="#3c594c"/>
            <rect x="-50" y="-12" width="40" height="24" rx="4" fill="#3c594c"/>
            <rect x="10" y="-12" width="40" height="24" rx="4" fill="#3c594c"/>
            <text x="0" y="70" font-family="SimHei" font-size="24" font-weight="bold" fill="#244b3c" text-anchor="middle">中国高铁 · 飞速驰骋</text>
          </g>
          <!-- 运载火箭升空 -->
          <g transform="translate(240, 20)">
            <!-- 火箭本体 -->
            <rect x="-25" y="-80" width="50" height="120" rx="10" fill="#ffffff" stroke="#a63426" stroke-width="4"/>
            <polygon points="-25,-80 0,-130 25,-80" fill="#a63426"/>
            <!-- 烈焰尾焰 -->
            <polygon points="-20,40 0,110 20,40" fill="#e86a58"/>
            <polygon points="-10,40 0,80 10,40" fill="#fac170"/>
            <text x="0" y="150" font-family="SimHei" font-size="24" font-weight="bold" fill="#a63426" text-anchor="middle">九天揽月 · 梦想成真！</text>
          </g>
        </g>
      `;
      break;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">
  ${header}
  ${sceneContent}
  ${footer}
  `;
}

// 批量生成 19 篇章的 SVG
const timeline = JSON.parse(fs.readFileSync('E:/projects/hypit-claude-explainer/full_timeline.json', 'utf8'));
console.log('正在批量生成 19 篇章国风彩墨 SVG 源码...');
for (let i = 0; i < timeline.length; i++) {
  const svgStr = getChapterSvg(i, timeline[i]);
  const svgPath = outDir + `/chapter_${String(i).padStart(2, '0')}.svg`;
  fs.writeFileSync(svgPath, svgStr);
}
console.log('19 篇章 SVG 源码全部生成完毕！');
