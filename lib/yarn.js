const libxml = require('libxmljs')

const yarn = {

  convert(html, options) {
    options = Object.assign({}, {
      normalizedIntent: false,
      dropText: false,
      lowerIntents: false
    }, options)

    const passages = {}
    const passagesMap = {}

    const doc = libxml.parseXmlString(html, { recover: true })
    const passageEls = doc.find('//tw-passagedata')

    passageEls.forEach((p) => {
      const pid = `screen${p.attr('pid').value()}`
      const name = p.attr('name').value()
      const text = p.text()

      passages[pid] = {
        name: name,
        text: text,
        rawIntents: []
      }

      const intents = text.match(/\[\[[^\]]+\]\]/g) || []
      intents.forEach((i) => {
        const ix = i.match(/\[\[(.+)\]\]/)[1]
        passages[pid].rawIntents.push(ix)
      })

      passagesMap[name] = pid
    })

    Object.keys(passages).forEach((p) => {
      const passage = passages[p]
      const mappedIntents = passage.rawIntents.reduce((memo, i) => {
        const normalizedIntent = options.normalize ? i.replace(/[0-9]+$/, '') : i
        const loweredIntent = options.lowerIntents ? normalizedIntent.toLowerCase() : normalizedIntent
        return Object.assign(memo, { [loweredIntent]: passagesMap[i] })
      }, {})

      passages[p].intents = mappedIntents

      delete passages[p].rawIntents

      if (options.dropText) {
        delete passages[p].text
      }
    })

    return JSON.stringify(passages)
  }

}

module.exports = yarn
