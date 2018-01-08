const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const writeFile = promisify(fs.writeFile)
const readFile = promisify(fs.readFile)


function SugarPlugin(options) {

}

SugarPlugin.prototype.apply = function(compiler) {
  compiler.plugin('done', async function({compilation}) {
    const output_config = compilation.compiler.options.output
    const bundlePath = path.resolve(output_config.path, output_config.filename)
    const bundleContent = await readFile(bundlePath, 'utf8')
    const targetFile = '../js/activity.js'
    const activityFileContent = await readFile(targetFile, 'utf8')
    const buildFileCommentStart = '//-- Build File Starts --//'
    const buildFileCommentEnd = '//-- Build File Ends --//'
    const commentStartIndex = activityFileContent.search(buildFileCommentStart) + buildFileCommentStart.length
    const commentEndIndex = activityFileContent.search(buildFileCommentEnd)
    const fileBeforeComment = activityFileContent.substr(0, commentStartIndex)
    const fileAfterComment = activityFileContent.substr(commentEndIndex)
    const fileToWrite = fileBeforeComment + `\n` + bundleContent + `\n` + fileAfterComment
    await writeFile(targetFile, fileToWrite)
  })
}

module.exports = SugarPlugin;
