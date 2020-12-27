const fs = require("fs");
const config = require("./config");
const writeHTML = require("./build");
const fm = require("front-matter");
const marked = require("marked");


const createPost = postPath => {
    const data = fs.readFileSync(`${config.dev.postsdir}/${postPath}.md`, "utf8");
    const content = fm(data);
    content.body = marked(content.body);
    content.path = postPath;
    return content;
};

const posts = fs
    .readdirSync(config.dev.postsdir)
    .map(post => post.slice(0, -3)) // drops the .md
    .map(post => createPost(post))
    .sort(function (a, b) { // sort by date so latest post is first
        return b.attributes.date - a.attributes.date;
    });

writeHTML(posts);
