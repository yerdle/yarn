# yarn

Generate a JSON representation of Twine flows

```json
{
  "screen1": {
    "name": "Start",
    "text": "Blah blah blah",
    "intents": {
      "Yes!": "screen2",
      "No": "screen3"
    }
  },
  "screen2": {
    "name": "Introduction",
    "text": "Bloh bloh bloh",
    "intents": {
      "Maybe": "screen4",
      "No": "screen3"
    }
  },
  "screen3": {
    "text": "Bluh bluh bluh",
    "name": "Sorry"
  }
}
```

## Usage

### From CLI

```sh
node index.js twine.html [--drop-text] [--normalize] [--lower-intents] > export.json
```

### From code

```javascript
const yarn = require('yarn')

const twineHtml = ... // Load the Twine HTML somehow
const json = yarn.convert(twineHtml)
```

## License

MIT
