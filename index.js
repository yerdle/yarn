const fs = require('fs')
const yarn = require('./lib/yarn.js')

if (process.argv.length <= 2) {
  console.log('Usage: node index.js twine-file.html')
  process.exit(-1)
}

const filename = process.argv[2]
fs.readFile(filename, 'utf-8', (err, data) => {
  const json = yarn.convert(data)
  console.log(json)
})
