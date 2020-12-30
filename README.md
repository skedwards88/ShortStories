# ShortStories

A simple static site generator to share short stories. To view the stories, visit https://skedwards88.github.io/ShortStories/.

Each story is saved as a markdown file in the `contents` directory. Front matter contains metadata about the story, including its genres and publication date (as a unix timestamp).

Some of these stories were originally posted on reddit. `.github/workflows/story_collector.yml` and `story_collector.py` use the reddit API to collect the stories, format each story post into a markdown file with relevant front matter, and save the files to an artifact.


`build.js` generates the HTML for the short story site, using `templates.js`

Styling and scripts for the output HTML file are in `index.css` and `scripts.js`. 

To build the html file, run `npm run build`.