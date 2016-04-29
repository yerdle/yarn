# yarn

Generate a JSON representation of Twine flows

```json
{
  "screen1": {
    "name": "Start",
    "intents": {
      "Yes!": "screen2",
      "No": "screen3"
    }
  },
  "screen2": {
    "name": "Introduction",
    "intents": {
      "Maybe": "screen4",
      "No": "screen3"
    }
  },
  "screen3": {
    "name": "Sorry"
  }
}
```

## Usage

### From CLI

```sh
node index.js twine.html > export.json
```

### From code

```javascript
const yarn = require('yarn')

const twineHtml = ... // Load the Twine HTML somehow
const json = yarn.convert(twineHtml)
```

## License

MIT
