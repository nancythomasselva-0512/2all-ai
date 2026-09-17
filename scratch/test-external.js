const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const shotPath = path.resolve('scratch/external_demo_tritanopia.png');

// Test page that sets localStorage for external demo and then redirects to it or renders
const runnerHtml = `<!DOCTYPE html>
<html>
<body>
<script>
  localStorage.setItem('2all_universal_suite_v83', JSON.stringify({ colorBlindMode: 'tritanopia' }));
  window.location.href = 'http://localhost:3000/external-demo.html';
</script>
</body>
</html>`;

const runnerPath = path.resolve('scratch/runner.html');
fs.writeFileSync(runnerPath, runnerHtml);

try {
  // Give it a couple seconds to load and apply widget
  execSync(`"${chromePath}" --headless=new --screenshot="${shotPath}" --window-size=1280,800 "http://localhost:3000/external-demo.html"`, { stdio: 'pipe' });
  console.log('Took initial screenshot');
} catch (e) {
  console.error('Error taking screenshot:', e.message);
}
