const fs = require("fs");
const config = require("./config");
const writeHTML = require("./build");
const fm = require("front-matter");
const marked = require("marked");


const parseStory = storyPath => {
    const data = fs.readFileSync(`${config.dev.contentDir}/${storyPath}.md`, "utf8");
    const content = fm(data);
    content.body = marked(content.body);
    content.path = storyPath;
    return content;
};

const stories = fs
    .readdirSync(config.dev.contentDir)
    .map(story => story.slice(0, -3)) // drops the .md
    .map(story => parseStory(story))
    .sort(function (a, b) { // sort by date so latest story is first
        return b.attributes.date - a.attributes.date;
    });

writeHTML(stories);
