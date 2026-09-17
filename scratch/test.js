const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const html1 = `<!DOCTYPE html>
<html>
<head>
<style>
  html { filter: url('#cb-tritanopia') !important; }
  .box { width: 100px; height: 100px; background: #0000ff; }
</style>
</head>
<body>
<div class="box"></div>
<svg style="position:absolute;width:0;height:0;overflow:hidden;">
  <filter id="cb-tritanopia" color-interpolation-filters="sRGB">
    <feColorMatrix type="matrix" values="0.95, 0.05, 0, 0, 0, 0, 0.433, 0.567, 0, 0, 0, 0, 0.475, 0.525, 0, 0, 0, 0, 0, 1, 0" />
  </filter>
</svg>
<script>
  console.log('COMPUTED_1:', getComputedStyle(document.documentElement).filter);
</script>
</body>
</html>`;

const html2 = `<!DOCTYPE html>
<html>
<head>
<style>
  html { filter: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='t' color-interpolation-filters='sRGB'><feColorMatrix type='matrix' values='0.95, 0.05, 0, 0, 0, 0, 0.433, 0.567, 0, 0, 0, 0, 0.475, 0.525, 0, 0, 0, 0, 0, 1, 0'/></filter></svg>#t") !important; }
  .box { width: 100px; height: 100px; background: #0000ff; }
</style>
</head>
<body>
<div class="box"></div>
<script>
  console.log('COMPUTED_2:', getComputedStyle(document.documentElement).filter);
</script>
</body>
</html>`;

if (!fs.existsSync('scratch')) fs.mkdirSync('scratch');
fs.writeFileSync('scratch/test1.html', html1);
fs.writeFileSync('scratch/test2.html', html2);

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const shot1Path = path.resolve('scratch/shot1.png');
const shot2Path = path.resolve('scratch/shot2.png');

try {
  const out1 = execSync(`"${chromePath}" --headless=new --screenshot="${shot1Path}" --window-size=200,200 "file://${path.resolve('scratch/test1.html')}"`, { stdio: 'pipe' });
  console.log('Test 1 shot taken to', shot1Path);
} catch (e) {
  console.error('Test 1 err:', e.message);
}

try {
  const out2 = execSync(`"${chromePath}" --headless=new --screenshot="${shot2Path}" --window-size=200,200 "file://${path.resolve('scratch/test2.html')}"`, { stdio: 'pipe' });
  console.log('Test 2 shot taken to', shot2Path);
} catch (e) {
  console.error('Test 2 err:', e.message);
}

