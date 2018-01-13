const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const writeFile = promisify(fs.writeFile)
const readFile = promisify(fs.readFile)


function SugarPlugin(options) {

}

SugarPlugin.prototype.apply = function(compiler) {
  compiler.plugin('done', async function({compilation}) {
    try {
      const output_config = compilation.compiler.options.output
      const bundlePath = path.resolve(output_config.path, output_config.filename)
      const bundleContent = await readFile(bundlePath, 'utf8')
      const activityFileContent = await readFile('../js/activity.template.js', 'utf8')
      const buildFileComment = '//-- { Build File Content } --//'
      const commentStartIndex = activityFileContent.search(buildFileComment)
      const commentEndIndex = commentStartIndex + buildFileComment.length
      const contentBeforeComment = activityFileContent.substr(0, commentStartIndex)
      const contentAfterComment = activityFileContent.substr(commentEndIndex)
      await writeFile(
        '../js/activity.js',
        contentBeforeComment + '\n' + bundleContent + '\n' + contentAfterComment
      )
    } catch(err) {
      console.error(err)
    }
  })
}

module.exports = SugarPlugin;
