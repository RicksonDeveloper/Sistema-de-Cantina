const { execSync } = require('child_process');
const fs = require('fs');
const output = [];
function run(cmd) {
  try {
    const res = execSync(cmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
    output.push(`> ${cmd}`);
    output.push(res.trim());
  } catch (err) {
    output.push(`> ${cmd}`);
    output.push(err.stdout ? err.stdout.toString().trim() : '');
    output.push(err.stderr ? err.stderr.toString().trim() : '');
    if (err.status !== 0) {
      output.push(`ERROR ${err.status}`);
    }
  }
}
run('git status --short');
run('git add .gitignore .dockerignore db/init.sql');
run('git diff --cached --name-only');
run('git commit -m "chore: restaurar .gitignore, .dockerignore e db/init.sql"');
run('git status --short');
run('git log --oneline -1');
run('git ls-files .gitignore .dockerignore db/init.sql');
fs.writeFileSync('commit_restore_output.txt', output.join('\n'), 'utf8');
console.log('done');
