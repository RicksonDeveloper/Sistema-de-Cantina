Set-Location 'C:\Estudos\SistemaDeCantina'
$logFile = 'git_restore_output.txt'
"START" | Out-File $logFile -Encoding utf8
"PWD: $(Get-Location)" | Out-File $logFile -Append
"--- GIT STATUS BEFORE ---" | Out-File $logFile -Append
git status --short 2>&1 | Out-File $logFile -Append
"--- GIT ADD ---" | Out-File $logFile -Append
git add .gitignore .dockerignore db/init.sql 2>&1 | Out-File $logFile -Append
"--- GIT COMMIT ---" | Out-File $logFile -Append
$commitResult = git commit -m 'chore: restaurar .gitignore, .dockerignore e db/init.sql' 2>&1
$commitResult | Out-File $logFile -Append
"--- GIT STATUS AFTER ---" | Out-File $logFile -Append
git status --short 2>&1 | Out-File $logFile -Append
"--- GIT LOG HEAD ---" | Out-File $logFile -Append
git log --oneline -1 2>&1 | Out-File $logFile -Append
"--- GIT TRACKED FILES ---" | Out-File $logFile -Append
git ls-files .gitignore .dockerignore db/init.sql 2>&1 | Out-File $logFile -Append
"DONE" | Out-File $logFile -Append
