const fs = require('fs')
const fromMarkdown = require('mdast-util-from-markdown')

const doc = fs.readFileSync('./template.md')

const tree = fromMarkdown(doc)

console.log(tree.children.map(c => c.children))
