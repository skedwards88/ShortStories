# ShortStories

A simple static site generator to share short stories. To view the stories, visit [Short Stories](https://skedwards88.github.io/ShortStories/).

## The Stories

Each story is saved as a markdown file in the `contents` directory. Front matter contains data about the story, including its genres, title, and publication date (as a unix timestamp).

Some of these stories were originally posted on reddit. `.github/workflows/story_collector.yml` and `story_collector.py` use the reddit API to collect the stories, format each story post into a markdown file with relevant front matter, and save the files as an artifact.

## The Static Site Generator

`src/templates.js` contains template literals that outline the HTML structure.

`build.js` uses the `front-matter` and `marked` libraries to pull out the front matter data and to markup the stories in HTML. It then uses the templates in `src/templates.js` to generate `index.html`, the main page of the site.

A workflow, `.github/workflows/build.yml`, will build and push `index.html` any time changes are made to the `contents` directory (the stories) or the `src` directory (the build code).

## The Site

Styling and scripts for the are in `index.css` and `index.js`. Images are in `images/`.
