const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

// Tritanopia (Blue-blind)
const tritanopiaSvg = `<svg xmlns="http://www.w3.org/2000/svg"><filter id="t"><feColorMatrix type="matrix" values="0.95 0.05 0 0 0 0 0.433 0.567 0 0 0 0 0.475 0.525 0 0 0 0 0 1 0"/></filter></svg>`;
const tritanopiaB64 = Buffer.from(tritanopiaSvg).toString('base64');
const tritanopiaFilter = `url('data:image/svg+xml;base64,${tritanopiaB64}#t')`;

// Protanopia (Red-blind)
const protanopiaSvg = `<svg xmlns="http://www.w3.org/2000/svg"><filter id="p"><feColorMatrix type="matrix" values="0.567 0.433 0 0 0 0.558 0.442 0 0 0 0 0.242 0.758 0 0 0 0 0 1 0"/></filter></svg>`;
const protanopiaB64 = Buffer.from(protanopiaSvg).toString('base64');
const protanopiaFilter = `url('data:image/svg+xml;base64,${protanopiaB64}#p')`;

// Deuteranopia (Green-blind)
const deuteranopiaSvg = `<svg xmlns="http://www.w3.org/2000/svg"><filter id="d"><feColorMatrix type="matrix" values="0.625 0.375 0 0 0 0.7 0.3 0 0 0 0 0.3 0.7 0 0 0 0 0 1 0"/></filter></svg>`;
const deuteranopiaB64 = Buffer.from(deuteranopiaSvg).toString('base64');
const deuteranopiaFilter = `url('data:image/svg+xml;base64,${deuteranopiaB64}#d')`;

console.log('Tritanopia Base64 filter:', tritanopiaFilter);
console.log('Protanopia Base64 filter:', protanopiaFilter);
console.log('Deuteranopia Base64 filter:', deuteranopiaFilter);

const testHtml = (filter) => `<!DOCTYPE html>
<html><head><style>
  html { filter: ${filter} !important; -webkit-filter: ${filter} !important; }
  .box-blue { width: 60px; height: 60px; background: #0000ff; display: inline-block; }
  .box-red { width: 60px; height: 60px; background: #ff0000; display: inline-block; }
  .box-green { width: 60px; height: 60px; background: #00ff00; display: inline-block; }
</style></head><body>
<div class="box-blue"></div>
<div class="box-red"></div>
<div class="box-green"></div>
</body></html>`;

['tritanopia', 'protanopia', 'deuteranopia'].forEach(type => {
  const f = type === 'tritanopia' ? tritanopiaFilter : type === 'protanopia' ? protanopiaFilter : deuteranopiaFilter;
  const htmlPath = path.resolve(`scratch/test_${type}.html`);
  const shotPath = path.resolve(`scratch/test_${type}.png`);
  fs.writeFileSync(htmlPath, testHtml(f));
  execSync(`"${chromePath}" --headless=new --screenshot="${shotPath}" --window-size=250,100 "file://${htmlPath}"`, { stdio: 'pipe' });
  console.log(`Shot taken: test_${type}`);
});
