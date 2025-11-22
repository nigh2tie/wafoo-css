const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '../src/components');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.css'));

const graph = {
  nodes: [],
  links: []
};

files.forEach(file => {
  const id = file.replace('.css', '');
  graph.nodes.push({ id, type: 'component' });

  const content = fs.readFileSync(path.join(componentsDir, file), 'utf8');
  
  // Detect variable usage (dependency on tokens or other components)
  const varMatches = content.match(/var\(--wf-([a-z0-9-]+)\)/g);
  if (varMatches) {
    varMatches.forEach(v => {
      const varName = v.replace('var(--wf-', '').replace(')', '');
      // Simplified: linking to a generic 'token' node or other component if identifiable
      // For now, we just track that it uses variables.
    });
  }
});

const outputPath = path.join(__dirname, '../docs/dependency-graph.json');
fs.writeFileSync(outputPath, JSON.stringify(graph, null, 2));
console.log(`Dependency graph generated at ${outputPath}`);
