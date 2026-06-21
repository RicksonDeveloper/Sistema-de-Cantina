const { execSync } = require('child_process');
const fs = require('fs');
function run(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf8' }).trim();
  } catch (e) {
    return `ERROR: ${e.message}`;
  }
}
const out = [];
out.push('status:' + run('git status --short'));
out.push('diffcached:' + run('git diff --cached --name-only'));
out.push('head:' + run('git rev-parse HEAD'));
out.push('files:' + run('git ls-files .gitignore .dockerignore db/init.sql'));
fs.writeFileSync('commit_verify.txt', out.join('\n'), 'utf8');
console.log('created');
