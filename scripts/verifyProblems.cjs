const fs = require('fs');

const content = fs.readFileSync('src/data/problems.ts', 'utf8');
const idMatches = [...content.matchAll(/id:\s*(\d+)/g)].map(m => Number(m[1]));
console.log('Total IDs found:', idMatches.length);
console.log('Min ID:', Math.min(...idMatches));
console.log('Max ID:', Math.max(...idMatches));

const set = new Set();
const dups = [];
for (const id of idMatches) {
  if (set.has(id)) dups.push(id);
  set.add(id);
}
console.log('Duplicate IDs:', dups.length > 0 ? dups : 'None');

const topicBlockMatches = [...content.matchAll(/topics:\s*\[([\s\S]*?)\]/g)];
const topicCounts = {};
for (const match of topicBlockMatches) {
  const items = [...match[1].matchAll(/['"]([^'"]+)['"]/g)].map(m => m[1]);
  for (const t of items) {
    topicCounts[t] = (topicCounts[t] || 0) + 1;
  }
}
console.log('Topic distribution:\n', JSON.stringify(topicCounts, null, 2));

const diffMatches = [...content.matchAll(/difficulty:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
const diffCounts = {};
for (const d of diffMatches) {
  diffCounts[d] = (diffCounts[d] || 0) + 1;
}
console.log('Difficulty distribution:\n', JSON.stringify(diffCounts, null, 2));
