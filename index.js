const fs = require('fs')
const yarn = require('./lib/yarn.js')

if (process.argv.length <= 2) {
  console.log('Usage: node index.js twine-file.html [--drop-text] [--normalize]')
  process.exit(-1)
}

const filename = process.argv[2]
fs.readFile(filename, 'utf-8', (err, data) => {
  const options = {}

  if (process.argv.indexOf('--drop-text') !== -1) {
    options['dropText'] = true
  }

  if (process.argv.indexOf('--normalize') !== -1) {
    options['normalize'] = true
  }

  const json = yarn.convert(data, options)
  console.log(json)
})
