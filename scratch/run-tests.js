const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const tests = [
  {
    name: 'test_body_url',
    html: `<!DOCTYPE html>
<html><head><style>
  body { filter: url('#cb-tritanopia') !important; margin: 0; }
  .box { width: 100px; height: 100px; background: #0000ff; }
</style></head><body>
<div class="box"></div>
<svg style="position:absolute;width:0;height:0;overflow:hidden;">
  <filter id="cb-tritanopia" color-interpolation-filters="sRGB">
    <feColorMatrix type="matrix" values="0.95, 0.05, 0, 0, 0, 0, 0.433, 0.567, 0, 0, 0, 0, 0.475, 0.525, 0, 0, 0, 0, 0, 1, 0" />
  </filter>
</svg>
</body></html>`
  },
  {
    name: 'test_box_url',
    html: `<!DOCTYPE html>
<html><head><style>
  .box { width: 100px; height: 100px; background: #0000ff; filter: url('#cb-tritanopia') !important; }
</style></head><body>
<div class="box"></div>
<svg style="position:absolute;width:0;height:0;overflow:hidden;">
  <filter id="cb-tritanopia" color-interpolation-filters="sRGB">
    <feColorMatrix type="matrix" values="0.95, 0.05, 0, 0, 0, 0, 0.433, 0.567, 0, 0, 0, 0, 0.475, 0.525, 0, 0, 0, 0, 0, 1, 0" />
  </filter>
</svg>
</body></html>`
  },
  {
    name: 'test_box_base64',
    html: `<!DOCTYPE html>
<html><head><style>
  .box { width: 100px; height: 100px; background: #0000ff; filter: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxmaWx0ZXIgaWQ9InQiPjxmZUNvbG9yTWF0cml4IHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwLjk1IDAuMDUgMCAwIDAgMCAwLjQzMyAwLjU2NyAwIDAgMCAwIDAuNDc1IDAuNTI1IDAgMCAwIDAgMSAwIi8+PC9maWx0ZXI+PC9zdmc+#t') !important; }
</style></head><body>
<div class="box"></div>
</body></html>`
  },
  {
    name: 'test_html_class_like_main_site',
    html: `<!DOCTYPE html>
<html class="a11y-cb-tritanopia"><head>
<link rel="stylesheet" href="http://localhost:3000/_next/static/css/app/layout.css">
<style>
  .box { width: 100px; height: 100px; background: #0000ff; }
</style></head><body>
<div class="box"></div>
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
