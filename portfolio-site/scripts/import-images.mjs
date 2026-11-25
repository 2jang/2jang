// 원본 화면 캡처를 사이트용 WebP 로 바꿔 public/images 에 넣는다.
// 사용법: node scripts/import-images.mjs "<원본 사진 폴더>"
// 가져올 사진은 src/data/shots.ts 에 적힌 것만이다. public/images 는 매번 비우고 다시 만든다.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { shotSets, shotPath, extraPath } from '../src/data/shots.ts';

const source = process.argv[2];
if (!source || !fs.existsSync(source)) {
  console.error('원본 사진 폴더를 찾을 수 없습니다. 사용법: node scripts/import-images.mjs "<원본 사진 폴더>"');
  process.exit(1);
}

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outRoot = path.join(siteRoot, 'public', 'images');

// 화면에 보이는 크기의 두 배 정도로 맞춘다.
const LIMIT = {
  pc: { width: 1600, height: 2400 },
  mobile: { width: 780, height: 2400 },
};

const jobs = [];
for (const [key, set] of Object.entries(shotSets)) {
  for (const tab of set.tabs) {
    for (const shot of tab.shots) {
      jobs.push({ from: shot.file, to: shotPath(key, tab.device, shot), device: tab.device });
    }
  }
  for (const extra of set.extras ?? []) {
    jobs.push({ from: extra.file, to: extraPath(key, extra), device: extra.device });
  }
}

const targets = new Set();
const missing = [];
for (const job of jobs) {
  if (targets.has(job.to)) {
    console.error(`저장할 이름이 겹칩니다: ${job.to}`);
    process.exit(1);
  }
  targets.add(job.to);
  if (!fs.existsSync(path.join(source, `${job.from}.png`))) missing.push(job.from);
}
if (missing.length > 0) {
  console.error(`원본이 없는 사진 ${missing.length}장:\n  ${missing.join('\n  ')}`);
  process.exit(1);
}

fs.rmSync(outRoot, { recursive: true, force: true });

let total = 0;
for (const job of jobs) {
  const file = path.join(outRoot, job.to);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const limit = LIMIT[job.device];
  const info = await sharp(path.join(source, `${job.from}.png`))
    .resize({ width: limit.width, height: limit.height, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(file);
  total += info.size;
}

console.log(`사진 ${jobs.length}장을 가져왔습니다. 합계 ${(total / 1024 / 1024).toFixed(1)}MB`);
