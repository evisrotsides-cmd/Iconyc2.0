import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { AppContent, pages } from './App';

const SITE = 'https://www.theiconyc.co.za';
const dist = join(process.cwd(), 'dist');
const template = readFileSync(join(dist, 'index.html'), 'utf8');

function esc(value: string) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function pageUrl(path: string) {
  return path === '/' ? `${SITE}/` : `${SITE}${path}`;
}

function setMetaContent(html: string, attr: 'name' | 'property', key: string, content: string) {
  const pattern = new RegExp(`(<meta\\b[^>]*\\b${attr}="${key}"[^>]*\\bcontent=")[\\s\\S]*?(")`, 'i');
  if (!pattern.test(html)) {
    throw new Error(`Missing meta ${attr}="${key}" in the built HTML template`);
  }
  return html.replace(pattern, `$1${esc(content)}$2`);
}

for (const page of Object.values(pages)) {
  const body = renderToString(
    <StaticRouter location={page.path}>
      <AppContent />
    </StaticRouter>,
  );
  let html = template.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(page.title)}</title>`);
  html = setMetaContent(html, 'name', 'description', page.description);
  html = setMetaContent(html, 'property', 'og:title', page.title);
  html = setMetaContent(html, 'property', 'og:description', page.description);
  html = setMetaContent(html, 'property', 'og:url', pageUrl(page.path));
  html = setMetaContent(html, 'name', 'twitter:title', page.title);
  html = setMetaContent(html, 'name', 'twitter:description', page.description);
  const canonical = /(<link\b[^>]*\brel="canonical"[^>]*\bhref=")[^"]*(")/i;
  if (!canonical.test(html)) {
    throw new Error('Missing canonical link in the built HTML template');
  }
  html = html.replace(canonical, `$1${pageUrl(page.path)}$2`);

  const outFile = page.path === '/' ? join(dist, 'index.html') : join(dist, page.path.slice(1), 'index.html');
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, html);
  console.log(`prerendered ${page.path} -> ${outFile}`);
}
