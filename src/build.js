const fs = require("fs");
const config = require("./config");
const buildHTML = require("./templates");
const fm = require("front-matter");
const marked = require("marked");

function parseStory(storyPath) {
    // Read the story file
    const data = fs.readFileSync(`${config.dev.contentDir}/${storyPath}`, "utf8");

    // Process the front matter and get the body
    const content = fm(data);

    // Mark up the body (HTML)
    content.body = marked(content.body);
    
    return content;
};

// Read all the stories from the content directory, 
// and generate an object for each story containing 
// the front matter data (attributes) and the HTML-marked up story (body)
const stories = fs
    .readdirSync(config.dev.contentDir)
    .map(story => parseStory(story))
    .sort(function (a, b) { // sort by date so latest story is first
        return b.attributes.date_utc - a.attributes.date_utc;
    });

function writeHTML(stories) {
    fs.writeFile(`./index.html`, buildHTML(stories), e => {
        if (e) throw e;
        console.log(`index.html was created successfully`);
    });
};

writeHTML(stories);
