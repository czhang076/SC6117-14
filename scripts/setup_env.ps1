# PowerShell helper to set up backend virtual environment and install deps
$ErrorActionPreference = 'Stop'

# Create venv
python -m venv .venv
.\.venv\Scripts\Activate.ps1

# Install backend deps
pip install --upgrade pip
pip install -r backend\requirements.txt

# Frontend: remind to run npm install
Write-Host "Frontend: run 'npm install' in the 'frontend' folder (if using Node)"
