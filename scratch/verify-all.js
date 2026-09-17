const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const protSvg = '<svg xmlns="http://www.w3.org/2000/svg"><filter id="p"><feColorMatrix type="matrix" values="0.567 0.433 0 0 0 0.558 0.442 0 0 0 0 0.242 0.758 0 0 0 0 0 1 0"/></filter></svg>';
const deutSvg = '<svg xmlns="http://www.w3.org/2000/svg"><filter id="d"><feColorMatrix type="matrix" values="0.625 0.375 0 0 0 0.7 0.3 0 0 0 0 0.3 0.7 0 0 0 0 0 1 0"/></filter></svg>';
const tritSvg = '<svg xmlns="http://www.w3.org/2000/svg"><filter id="t"><feColorMatrix type="matrix" values="0.95 0.05 0 0 0 0 0.433 0.567 0 0 0 0 0.475 0.525 0 0 0 0 1 0"/></filter></svg>';

const protB64 = Buffer.from(protSvg).toString('base64');
const deutB64 = Buffer.from(deutSvg).toString('base64');
const tritB64 = Buffer.from(tritSvg).toString('base64');

const protFilter = `url('data:image/svg+xml;base64,${protB64}#p')`;
const deutFilter = `url('data:image/svg+xml;base64,${deutB64}#d')`;
const tritFilter = `url('data:image/svg+xml;base64,${tritB64}#t')`;

console.log('protFilter:', protFilter);
console.log('deutFilter:', deutFilter);
console.log('tritFilter:', tritFilter);

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

const map = {
  protanopia: protFilter,
  deuteranopia: deutFilter,
  tritanopia: tritFilter
};

for (const k in map) {
  const hPath = path.resolve(`scratch/verify_${k}.html`);
  const sPath = path.resolve(`scratch/verify_${k}.png`);
  fs.writeFileSync(hPath, testHtml(map[k]));
  execSync(`"${chromePath}" --headless=new --screenshot="${sPath}" --window-size=250,100 "file://${hPath}"`, { stdio: 'pipe' });
  console.log(`Verified ${k}`);
}
