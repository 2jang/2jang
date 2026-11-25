// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // 배포 주소. 링크 미리보기(og:url, og:image)와 대표 주소(canonical)에 쓴다.
  site: 'https://2jang.dev',
  integrations: [mdx()],
});
