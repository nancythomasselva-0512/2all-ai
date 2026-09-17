const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const tritanopiaSvg = `<svg xmlns="http://www.w3.org/2000/svg"><filter id="t" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0.95 0.05 0 0 0 0 0.433 0.567 0 0 0 0 0.475 0.525 0 0 0 0 0 1 0"/></filter></svg>`;
const tritanopiaB64 = Buffer.from(tritanopiaSvg).toString('base64');
const tritanopiaFilter = `url('data:image/svg+xml;base64,${tritanopiaB64}#t')`;

const tests = [
  {
    name: 'test_body_children',
    html: `<!DOCTYPE html>
<html><head><style>
  body > *:not(#skip) { filter: ${tritanopiaFilter} !important; }
  .box { width: 100px; height: 100px; background: #0000ff; }
</style></head><body>
<div class="box"></div>
<div id="skip">Skip</div>
</body></html>`
  },
  {
    name: 'test_body_fixed_wrapper',
    html: `<!DOCTYPE html>
<html><head><style>
  body { margin: 0; }
  .box { width: 100px; height: 100px; background: #0000ff; }
  .a11y-filter-root { filter: ${tritanopiaFilter} !important; }
</style></head><body>
<div class="a11y-filter-root">
  <div class="box"></div>
</div>
</body></html>`
  },
  {
    name: 'test_html_with_height',
    html: `<!DOCTYPE html>
<html style="filter: ${tritanopiaFilter} !important; min-height: 100%;"><head><style>
  html, body { height: 100%; margin: 0; }
  .box { width: 100px; height: 100px; background: #0000ff; }
</style></head><body>
<div class="box"></div>
</body></html>`
  },
  {
    name: 'test_backdrop_filter',
    html: `<!DOCTYPE html>
<html><head><style>
  body { margin: 0; }
  .box { width: 100px; height: 100px; background: #0000ff; }
  .overlay {
    position: fixed; inset: 0; pointer-events: none; z-index: 999999;
    backdrop-filter: ${tritanopiaFilter};
    -webkit-backdrop-filter: ${tritanopiaFilter};
  }
</style></head><body>
<div class="box"></div>
<div class="overlay"></div>
</body></html>`
  }
];

tests.forEach(t => {
  const htmlPath = path.resolve(`scratch/${t.name}.html`);
  const shotPath = path.resolve(`scratch/${t.name}.png`);
  fs.writeFileSync(htmlPath, t.html);
  try {
    execSync(`"${chromePath}" --headless=new --screenshot="${shotPath}" --window-size=200,200 "file://${htmlPath}"`, { stdio: 'pipe' });
    console.log(`Shot taken: ${t.name}`);
  } catch (e) {
    console.error(`Err on ${t.name}:`, e.message);
  }
});
