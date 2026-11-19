import re

for filepath in [
    'frontend/src/components/Screens/DashboardScreen.jsx',
    'frontend/src/components/Screens/OnboardingScreen.jsx',
    'frontend/src/components/Screens/DigestPreviewScreen.jsx',
    'frontend/src/components/Screens/LandingScreen.jsx',
    'frontend/src/App.jsx'
]:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    m = re.search(r'import\s*\{([^}]+)\}\s*from\s*[\'"]lucide-react[\'"]', content)
    if m:
        imported = set([x.strip() for x in m.group(1).split(',') if x.strip()])
        tags = set(re.findall(r'<([A-Z][a-zA-Z0-9]+)', content))
        missing = [t for t in tags if t not in imported and t not in ['React', 'LandingScreen', 'LoginScreen', 'OnboardingScreen', 'DashboardScreen', 'DigestPreviewScreen']]
        if missing:
            print(f"File {filepath} missing icons: {missing}")
        else:
            print(f"File {filepath} OK")
    else:
        print(f"File {filepath}: no lucide-react import")
