// public/images 아래 파일의 주소를 만든다. 사이트가 하위 경로에 배포돼도 맞게 나온다.
export function imageUrl(src: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const path = src.startsWith('/') ? src : `/images/${src}`;
  return `${base}${path}`;
}
