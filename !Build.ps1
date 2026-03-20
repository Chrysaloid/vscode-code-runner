tsc --build --verbose
if ($LASTEXITCODE -ne 0) {
	Write-Host "TypeScript compilation failed (exit code $LASTEXITCODE)"
	PressEnterToContinue.ps1
	exit $LASTEXITCODE
}

vsce package --allow-missing-repository --allow-star-activation
if ($LASTEXITCODE -ne 0) {
	Write-Host "Packaging failed (exit code $LASTEXITCODE)"
	PressEnterToContinue.ps1
	exit $LASTEXITCODE
}
Write-Host

$name = Get-ChildItem -Name -File -Filter *.vsix | Select-Object -First 1
Invoke-Expression "code.cmd --force --install-extension $name"
Write-Host

Write-Host "AHK"
RunAhk.ps1 @'
WinActivate "ahk_exe Code.exe"
WinWaitActive "ahk_exe Code.exe"
Send "^!+r"
'@
Write-Host

if ($LASTEXITCODE -ne 0) {
	PressEnterToContinue.ps1
	exit $LASTEXITCODE
}
