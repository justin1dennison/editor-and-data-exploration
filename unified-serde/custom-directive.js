const vfile = require('to-vfile')
const report = require('vfile-reporter')
const unified = require('unified')
const parse = require('remark-parse')
const directive = require('remark-directive')
const frontmatter = require('remark-frontmatter')
const stringify = require('remark-stringify')
const visit = require('unist-util-visit')

const processor = unified()
  .use(parse)
  .use(directive)
  .use(frontmatter, ['yaml'])
  .use(liquidDirectives)
  .use(stringify)

processor
    .use(() => console.dir)
    .process(vfile.readSync('./template.md'), function (err, file) {
        console.error(report(err || file))
        console.log(String(file))
    })



function liquidDirectives() {
    return transform

    function transform(tree) {
        visit(tree, ['inlineDirective','containerDirective', 'yaml'], ondirective)
    }

    function ondirective(node) {
        if(node.type === 'yaml') {
            node.children = processor.parse(node.value).children
        }
        
    }
}

