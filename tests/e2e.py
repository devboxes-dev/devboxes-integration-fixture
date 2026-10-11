import subprocess
from pathlib import Path
root=Path(__file__).resolve().parents[1]
commands=['run','compare','cohort','seek','breakeven','sensitivity','check']
files=sorted((root/'examples').glob('*.ini'))
assert len(files)==5
for scenario in files:
    for command in commands:
        p=subprocess.run([str(root/'scenario-calculator'),command,str(scenario)],capture_output=True,text=True)
        assert p.returncode==0,(scenario,command,p.stderr)
        assert 'HYPOTHETICAL / NOT A FORECAST' in p.stdout,(scenario,command)
print('end-to-end subcommand checks passed')
