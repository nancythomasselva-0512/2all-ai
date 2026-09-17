const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

// Base64 SVGs:
// Tritanopia:
// <svg xmlns="http://www.w3.org/2000/svg"><filter id="t"><feColorMatrix type="matrix" values="0.95 0.05 0 0 0 0 0.433 0.567 0 0 0 0 0.475 0.525 0 0 0 0 0 1 0"/></filter></svg>
const tritanopiaSvg = `<svg xmlns="http://www.w3.org/2000/svg"><filter id="t" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0.95 0.05 0 0 0 0 0.433 0.567 0 0 0 0 0.475 0.525 0 0 0 0 0 1 0"/></filter></svg>`;
const tritanopiaB64 = Buffer.from(tritanopiaSvg).toString('base64');
const tritanopiaFilter = `url('data:image/svg+xml;base64,${tritanopiaB64}#t')`;

// Protanopia:
// <svg xmlns="http://www.w3.org/2000/svg"><filter id="p"><feColorMatrix type="matrix" values="0.567 0.433 0 0 0 0.558 0.442 0 0 0 0 0.242 0.758 0 0 0 0 0 1 0"/></filter></svg>
const protanopiaSvg = `<svg xmlns="http://www.w3.org/2000/svg"><filter id="p" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0.567 0.433 0 0 0 0.558 0.442 0 0 0 0 0.242 0.758 0 0 0 0 0 1 0"/></filter></svg>`;
const protanopiaB64 = Buffer.from(protanopiaSvg).toString('base64');
const protanopiaFilter = `url('data:image/svg+xml;base64,${protanopiaB64}#p')`;

// Deuteranopia:
// <svg xmlns="http://www.w3.org/2000/svg"><filter id="d"><feColorMatrix type="matrix" values="0.625 0.375 0 0 0 0.7 0.3 0 0 0 0 0.3 0.7 0 0 0 0 0 1 0"/></filter></svg>
const deuteranopiaSvg = `<svg xmlns="http://www.w3.org/2000/svg"><filter id="d" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0.625 0.375 0 0 0 0.7 0.3 0 0 0 0 0.3 0.7 0 0 0 0 0 1 0"/></filter></svg>`;
const deuteranopiaB64 = Buffer.from(deuteranopiaSvg).toString('base64');
const deuteranopiaFilter = `url('data:image/svg+xml;base64,${deuteranopiaB64}#d')`;

console.log('Tritanopia Filter string:', tritanopiaFilter);

const tests = [
  {
    name: 'test_html_b64',
    html: `<!DOCTYPE html>
<html><head><style>
  html { filter: ${tritanopiaFilter} !important; -webkit-filter: ${tritanopiaFilter} !important; }
  .box { width: 100px; height: 100px; background: #0000ff; }
</style></head><body>
<div class="box"></div>
</body></html>`
  },
  {
    name: 'test_body_b64',
    html: `<!DOCTYPE html>
<html><head><style>
  body { filter: ${tritanopiaFilter} !important; -webkit-filter: ${tritanopiaFilter} !important; margin: 0; }
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
