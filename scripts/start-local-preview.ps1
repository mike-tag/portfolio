param(
  [int]$Port = 5173,
  [string]$Route = "#/"
)

$ErrorActionPreference = "Stop"
$baseUrl = "http://127.0.0.1:$Port/"
$previewUrl = "$baseUrl$Route"
$expectedTitle = "Mike Tagariello | AI transformation portfolio"

function Test-PortfolioPreview {
  try {
    $response = Invoke-WebRequest -Uri $baseUrl -UseBasicParsing -TimeoutSec 2
    return $response.StatusCode -eq 200 -and $response.Content.Contains($expectedTitle)
  } catch {
    return $false
  }
}

if (Test-PortfolioPreview) {
  Write-Output $previewUrl
  exit 0
}

$nodePath = $env:npm_node_execpath
if (-not $nodePath) {
  $nodeCommand = Get-Command node -ErrorAction SilentlyContinue
  if ($nodeCommand) {
    $nodePath = $nodeCommand.Source
  }
}

if (-not $nodePath) {
  throw "Node.js was not found. Run this helper through pnpm or add Node.js to PATH."
}

$projectRoot = Split-Path -Parent $PSScriptRoot
$vitePath = Join-Path $projectRoot "node_modules\vite\bin\vite.js"
$stdoutPath = Join-Path $env:TEMP "non-partisan-primaries-vite.stdout.log"
$stderrPath = Join-Path $env:TEMP "non-partisan-primaries-vite.stderr.log"
$command = 'cmd.exe /d /c ""{0}" "{1}" --host 127.0.0.1 --port {2} --strictPort 1>"{3}" 2>"{4}""' -f $nodePath, $vitePath, $Port, $stdoutPath, $stderrPath

$launcher = New-Object -ComObject WScript.Shell
$launcher.CurrentDirectory = $projectRoot
$null = $launcher.Run($command, 0, $false)

$deadline = (Get-Date).AddSeconds(8)
do {
  Start-Sleep -Milliseconds 200
  if (Test-PortfolioPreview) {
    Write-Output $previewUrl
    exit 0
  }
} while ((Get-Date) -lt $deadline)

throw "The local preview did not become ready within 8 seconds. Review $stderrPath and $stdoutPath."
