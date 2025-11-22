const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '../src/components');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.css'));

files.forEach(file => {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if already has metadata
  if (content.includes('/*!\n * @component')) {
    console.log(`Skipping ${file} (Metadata exists)`);
    return;
  }

  const componentName = file.replace('.css', '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  // Extract selectors (simple regex, not perfect but good enough for metadata)
  const selectorMatch = content.match(/\.wf-[a-z0-9-]+/g);
  const mainSelector = selectorMatch ? selectorMatch[0] : '';
  const variants = selectorMatch ? [...new Set(selectorMatch)].filter(s => s !== mainSelector).slice(0, 5).join(', ') : '';

  // Extract variables
  const variableMatch = content.match(/--wf-[a-z0-9-]+/g);
  const variables = variableMatch ? [...new Set(variableMatch)].slice(0, 5).join(', ') : '';

  const metadata = `/*!
 * @component ${componentName}
 * @description ${componentName} component.
 * @selector ${mainSelector}
 * @variants ${variants}
 * @variables ${variables}
 */
`;

  fs.writeFileSync(filePath, metadata + content);
  console.log(`Added metadata to ${file}`);
});
