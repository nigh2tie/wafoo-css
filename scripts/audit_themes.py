
import re

def parse_css_vars(content):
    vars = {}
    # Simple regex to capture --var: value;
    # Handling multi-line is tricky, assuming single line for now based on file view
    matches = re.findall(r'(--wf-[\w-]+):\s*([^;]+);', content)
    for key, val in matches:
        vars[key] = val.strip()
    return vars

def resolve_var(key, vars, root_vars=None):
    val = vars.get(key)
    if not val and root_vars:
        val = root_vars.get(key)
    
    if not val:
        return "MISSING"
    
    # Resolve var(...) references
    if val.startswith('var('):
        ref_key = val[4:-1]
        # prevent infinite loop
        if ref_key == key: return val
        return resolve_var(ref_key, vars, root_vars)
    
    return val

def main():
    with open('src/tokens.css', 'r') as f:
        tokens_content = f.read()
    
    with open('src/themes.css', 'r') as f:
        themes_content = f.read()

    # Extract Root vars
    root_match = re.search(r':root\s*{([^}]+)}', tokens_content, re.DOTALL)
    root_vars = parse_css_vars(root_match.group(1)) if root_match else {}

    # Extract Themes
    themes = {}
    theme_blocks = re.findall(r'(\.theme-[\w-]+)\s*{([^}]+)}', themes_content, re.DOTALL)
    for name, block in theme_blocks:
        themes[name] = parse_css_vars(block)

    # Keys to check
    keys = {
        'Primary': '--wf-primary-bg',
        'Secondary': '--wf-secondary',
        'Accent': '--wf-color-accent',
        'Success': '--wf-success',
        'Info': '--wf-info',
        'Warning': '--wf-warning',
        'Danger': '--wf-danger',
        'Surface Base': '--wf-surface-base',
        'Surface Muted': '--wf-surface-muted',
        'Sumi': '--wf-sumi' # Sumi is usually text color, check tokens
    }

    print(f"{'Theme':<15} | {'Primary':<10} | {'Secondary':<10} | {'Accent':<10} | {'Info':<10}")
    print("-" * 65)

    # Check Root
    row = ["Root"]
    for label, var in keys.items():
        if label in ['Primary', 'Secondary', 'Accent', 'Info']:
            val = resolve_var(var, root_vars, root_vars)
            # Simplify hex/rgb
            row.append(val[:10])
    print(f"{row[0]:<15} | {row[1]:<10} | {row[2]:<10} | {row[3]:<10} | {row[4]:<10}")

    # Check Themes
    for name, theme_vars in themes.items():
        row = [name.replace('.theme-', '')]
        for label, var in keys.items():
             if label in ['Primary', 'Secondary', 'Accent', 'Info']:
                val = resolve_var(var, theme_vars, root_vars)
                row.append(val[:10])
        print(f"{row[0]:<15} | {row[1]:<10} | {row[2]:<10} | {row[3]:<10} | {row[4]:<10}")

if __name__ == "__main__":
    main()
