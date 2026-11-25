// 파비콘(public/favicon.ico)과 링크 미리보기 그림(public/og-image.png)을 만든다.
//
//   npm run build
//   node scripts/make-site-images.mjs
//
// - 파비콘은 public/favicon.svg(머리글 왼쪽 위 아이콘)로 만든다.
// - 미리보기 그림은 빌드된 메인 페이지의 첫 화면을 브라우저로 찍어서 만든다.
//   컴퓨터에 설치된 Edge 나 Chrome 을 화면 없이 실행한다. 다른 브라우저를 쓰려면
//   BROWSER_PATH 환경 변수에 실행 파일 경로를 적는다.
// - 첫 화면 문구나 그림을 바꿨으면 다시 실행하고, 만들어진 그림을 다시 빌드에 넣는다.
import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');
const distDir = path.join(root, 'dist');

// ---- 파비콘 ---------------------------------------------------------------

/** PNG 여러 장을 ICO 파일 하나로 묶는다. */
function buildIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);

  let offset = header.length + 16 * images.length;
  const entries = images.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });

  return Buffer.concat([header, ...entries, ...images.map((image) => image.data)]);
}

async function makeFavicon() {
  const svg = fs.readFileSync(path.join(publicDir, 'favicon.svg'));
  const images = [];
  for (const size of [16, 32, 48]) {
    const data = await sharp(svg, { density: 600 }).resize(size, size).png().toBuffer();
    images.push({ size, data });
  }
  const file = path.join(publicDir, 'favicon.ico');
  fs.writeFileSync(file, buildIco(images));
  console.log(`favicon.ico  ${images.map((image) => image.size).join(', ')}px  ${fs.statSync(file).size}B`);
}

// ---- 링크 미리보기 그림 ----------------------------------------------------

const WIDTH = 1200;
const HEIGHT = 630;
// 화면을 1000x525 로 놓고 두 배로 찍은 뒤 1200x630 으로 줄인다. 글자가 사이트보다 조금 크게 나온다.
const VIEW_WIDTH = 1000;
const VIEW_HEIGHT = 525;

// 첫 화면만 남기고 나머지는 숨긴다.
const captureStyle = `<style>
  .topbar, .skip-link, .hero-actions, main > section:not(.hero), .footer { display: none !important; }
  html, body, main, .hero { height: 100%; }
  html, body { overflow: hidden; }
  .hero-inner { height: 100%; min-height: 0; grid-template-columns: 1.08fr 0.92fr; }
  .hero-copy { padding: 0; }
</style>`;

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

function findBrowser() {
  const candidates = [
    process.env.BROWSER_PATH,
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ];
  return candidates.find((file) => file && fs.existsSync(file));
}

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'ignore' });
    const timer = setTimeout(() => child.kill(), 60_000);
    child.on('error', reject);
    child.on('exit', (code) => {
      clearTimeout(timer);
      resolve(code);
    });
  });
}

async function makeShareImage() {
  const indexFile = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexFile)) {
    console.log('og-image.png  건너뜀: dist/index.html 이 없습니다. 먼저 npm run build 를 실행하세요.');
    return;
  }
  const browser = findBrowser();
  if (!browser) {
    console.log('og-image.png  건너뜀: Edge 나 Chrome 을 찾지 못했습니다. BROWSER_PATH 로 경로를 알려 주세요.');
    return;
  }

  const page = fs.readFileSync(indexFile, 'utf8').replace('</head>', `${captureStyle}</head>`);

  // 빌드 결과를 잠깐 서버로 띄운다. /__share 는 첫 화면만 남긴 메인 페이지다.
  const server = http.createServer((request, response) => {
    const { pathname } = new URL(request.url, 'http://localhost');
    if (pathname === '/__share') {
      response.writeHead(200, { 'content-type': types['.html'] }).end(page);
      return;
    }
    let file = path.join(distDir, decodeURIComponent(pathname));
    if (!file.startsWith(distDir)) {
      response.writeHead(403).end();
      return;
    }
    if (pathname.endsWith('/')) file = path.join(file, 'index.html');
    fs.readFile(file, (error, data) => {
      if (error) {
        response.writeHead(404).end();
        return;
      }
      response.writeHead(200, { 'content-type': types[path.extname(file)] ?? 'application/octet-stream' }).end(data);
    });
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();

  // 평소 쓰는 브라우저 설정을 건드리지 않게 임시 폴더를 프로필로 쓴다.
  const work = fs.mkdtempSync(path.join(os.tmpdir(), 'site-images-'));
  const shot = path.join(work, 'shot.png');
  try {
    await run(browser, [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--no-first-run',
      '--no-default-browser-check',
      '--force-device-scale-factor=2',
      `--window-size=${VIEW_WIDTH},${VIEW_HEIGHT}`,
      `--user-data-dir=${path.join(work, 'profile')}`,
      '--virtual-time-budget=6000',
      `--screenshot=${shot}`,
      `http://127.0.0.1:${port}/__share`,
    ]);
    if (!fs.existsSync(shot)) throw new Error('브라우저가 화면을 찍지 못했습니다.');

    const file = path.join(publicDir, 'og-image.png');
    const meta = await sharp(shot).metadata();
    await sharp(shot)
      .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'left top' })
      .png({ compressionLevel: 9, palette: false })
      .toFile(file);
    console.log(
      `og-image.png  ${WIDTH}x${HEIGHT}  ${Math.round(fs.statSync(file).size / 1024)}KB  (찍은 크기 ${meta.width}x${meta.height})`,
    );
  } finally {
    server.close();
    fs.rmSync(work, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
  }
}

await makeFavicon();
await makeShareImage();
