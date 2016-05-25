'use strict'

const libxml = require('libxmljs')

const yarn = {

  convert(html, options) {
    options = Object.assign({}, {
      normalize: false,
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
      let text = p.text()

      passages[pid] = {
        name: name,
        rawIntents: []
      }

      const intents = text.match(/\[\[[^\]]+\]\]/g) || []
      intents.forEach((i) => {
        const ix = i.match(/\[\[(.+)\]\]/)[1]
        passages[pid].rawIntents.push(ix)
      })

      const actions = text.match(/{{.+}}/g)
      if (actions) {
        passages[pid].actions = actions.reduce((memo, actionText) => {
          const elements = actionText.match(/^{{([^:]+):([^:]+):([^:]+|[^|]+|[^|]+)}}$/)

          return memo.concat({
            actionSequenceType: elements[1],
            actionType: elements[2],
            values: elements[3].split('|')
          })
        }, [])
        text = text.replace(/{{.+}}/g, '').trim()
      }

      passages[pid].text = text
      passagesMap[name] = pid
    })

    Object.keys(passages).forEach((p) => {
      const passage = passages[p]
      const mappedIntents = passage.rawIntents.reduce((memo, i) => {
        const normalizedIntent = options.normalize ? i.replace(/[0-9]+$/, '') : i
        const loweredIntent = options.lowerIntents ? normalizedIntent.toLowerCase() : normalizedIntent
        const intentScreen = passagesMap[i] ? passagesMap[i] : null
        return Object.assign(memo, { [loweredIntent]: intentScreen })
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
