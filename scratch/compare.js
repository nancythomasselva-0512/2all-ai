const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const b64_working = 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxmaWx0ZXIgaWQ9InQiPjxmZUNvbG9yTWF0cml4IHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwLjk1IDAuMDUgMCAwIDAgMCAwLjQzMyAwLjU2NyAwIDAgMCAwIDAuNDc1IDAuNTI1IDAgMCAwIDAgMSAwIi8+PC9maWx0ZXI+PC9zdmc+';
const filter_working = `url('data:image/svg+xml;base64,${b64_working}#t')`;

const html1 = `<!DOCTYPE html>
<html><head><style>
  body > * { filter: ${filter_working} !important; }
  .box { width: 100px; height: 100px; background: #0000ff; }
</style></head><body>
<div class="box"></div>
</body></html>`;

const html2 = `<!DOCTYPE html>
<html><head><style>
  html { filter: ${filter_working} !important; }
  .box { width: 100px; height: 100px; background: #0000ff; }
</style></head><body>
<div class="box"></div>
</body></html>`;

const html3 = `<!DOCTYPE html>
<html class="a11y-cb-tritanopia"><head><style>
  html.a11y-cb-tritanopia {
    filter: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='t' color-interpolation-filters='sRGB'><feColorMatrix type='matrix' values='0.95, 0.05, 0, 0, 0, 0, 0.433, 0.567, 0, 0, 0, 0, 0.475, 0.525, 0, 0, 0, 0, 0, 1, 0'/></filter></svg>#t") !important;
  }
  .box { width: 100px; height: 100px; background: #0000ff; }
</style></head><body>
<div class="box"></div>
</body></html>`;

fs.writeFileSync('scratch/c1.html', html1);
fs.writeFileSync('scratch/c2.html', html2);
fs.writeFileSync('scratch/c3.html', html3);

['c1', 'c2', 'c3'].forEach(name => {
  const shot = path.resolve(`scratch/${name}.png`);
  execSync(`"${chromePath}" --headless=new --screenshot="${shot}" --window-size=200,200 "file://${path.resolve('scratch/' + name + '.html')}"`, { stdio: 'pipe' });
  console.log('Shot taken', shot);
});
