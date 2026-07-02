# Study_Hub

Study_Hub is a lightweight, data-driven learning platform for French and Japanese.
It combines structured grammar lessons, vocabulary references, writing systems, and practice tools using JSON-driven page rendering.

## About

This repository is designed to make language content easy to author, extend, and maintain.
Each lesson page is built from JSON content stored in `data/`, and the browser renders the page dynamically using JavaScript.
That means new sections can be added without changing the HTML structure, and lesson data can evolve independently from layout code.

## Contents

- `index.html` — homepage and navigation to the language hubs
- `french.html` — French study hub with grammar, conjugation, vocabulary, and phrases
- `japanese.html` — Japanese study hub with kana charts, verb forms, kanji lessons, and vocabulary
- `js/` — rendering engine, practice quiz logic, and search utilities
- `data/` — lesson content stored as JSON for easy editing and extension
- `style.css` — layout and styling for cards, grids, and interactive blocks

## Features

- JSON-driven lesson rendering for both French and Japanese
- Grammar reference cards, vocabulary tables, charts, and example sentences
- Advanced French topics such as object pronouns, passive voice, conditional, and subjunctive
- Advanced Japanese topics such as potential, passive, causative, conditionals, and keigo
- Quiz / practice modules and dictionary lookup support
- Extensible data format to add content without page markup changes

## How it works

The site loads JSON from `data/french_data.json` and `data/japanese_data.json`.
The renderer in `js/renderer.js` maps section types to specific display components.
For example:

- a `card` renders a titled lesson block
- a `vocab_table` renders a table of words
- a `frequency_scale` renders a horizontal adverb frequency chart
- an `info_grid` renders a set of comparison cards or rules

### Example JSON section

```json
{
  "type": "card",
  "title": "Passive Voice",
  "color": "red",
  "subtitle": "Use être + past participle",
  "info_boxes": [
    {
      "variant": "blue",
      "label": "Form",
      "body": "The past participle agrees with the subject in gender and number.",
      "example": "Le livre est lu par Marie."
    },
    {
      "variant": "gold",
      "label": "Usage",
      "body": "Use for emphasis on the action or the receiver of the action.",
      "example": "La lettre est écrite par Paul."
    }
  ]
}
```

This structure is rendered as a styled card containing a title, description, and example blocks.

## Extending content

To add a new lesson or example, add a new object to the relevant JSON file.
For French, edit `data/french_data.json`.
For Japanese, edit `data/japanese_data.json`.

### Add a new vocabulary card example

```json
{
  "type": "card",
  "title": "Common Food Words",
  "color": "green",
  "items": [
    { "en": "Bread", "fr": "pain" },
    { "en": "Cheese", "fr": "fromage" },
    { "en": "Apple", "fr": "pomme" }
  ]
}
```

The renderer will display this as a list card with English and French vocabulary pairs.

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/osregh0st/Study_Hub.git
   cd Study_Hub
   ```
2. Open `index.html`, `french.html`, or `japanese.html` in a browser.
3. Edit lesson content in `data/french_data.json` or `data/japanese_data.json`.

### Local preview

For a better browser experience, open the files through a local server instead of using `file://`:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Contributing

Contributions are welcome.

- Add new lesson modules in `data/french_data.json` or `data/japanese_data.json`
- Improve the renderer in `js/renderer.js`
- Add exercises, examples, or new content categories
- Report bugs or suggest layout improvements

## Recommended Workflow

1. Create a branch for your changes.
2. Update JSON content and verify the lesson renders correctly.
3. Test the pages in a browser and confirm the new section appears.
4. Submit a pull request with a clear summary of changes.

## License

This project is available under the MIT License.
