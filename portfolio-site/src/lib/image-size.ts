// 빌드할 때 사진의 가로·세로 크기를 읽는다. img 에 크기를 적어 두면 사진이 늦게 떠도 화면이 밀리지 않는다.
import path from 'node:path';

interface Size {
  width: number;
  height: number;
}

const cache = new Map<string, Size | undefined>();

/** src 는 public/images 기준 경로다. 크기를 읽지 못하면 undefined 를 돌려준다. */
export async function imageSize(src: string): Promise<Size | undefined> {
  if (cache.has(src)) return cache.get(src);
  const relative = src.startsWith('/') ? src.slice(1) : `images/${src}`;
  const file = path.join(process.cwd(), 'public', relative);
  let size: Size | undefined;
  try {
    const sharp = (await import('sharp')).default;
    const meta = await sharp(file).metadata();
    if (meta.width && meta.height) size = { width: meta.width, height: meta.height };
  } catch {
    size = undefined;
  }
  cache.set(src, size);
  return size;
}
