const fs = require("fs");
const config = require("./config");

function buildStory(story) {
    // Get the story's categories
    let tags = []
    for (i = 0; i < config.dev.categories.length; i++) {
        if (story.attributes[config.dev.categories[i]]) {
            tags.push(config.dev.categories[i])
        }
    }

    return `
        <div class="${'story show ' + tags.join(" ")}">
            <details>
            <summary>${story.attributes.title}</summary>
            <div class="content">
                <div class="tags">${tags.join(", ")}</div>
                ${story.body}\
            </div>
        </div>`
};

function buildCheckbox(label) {
    return `
                <input type="checkbox" checked="true" id="${label}" name="${label}" class="category" onclick="toggleCategory(this, '${label}')">
                <label for="${label}">${label}</label><br>`
}

function buildHTML(stories) {
    return`\
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="${config.siteDescription}" />
    <title>${config.siteName}</title>
    <link rel="stylesheet" href="index.css">
    <link rel="shortcut icon" type="image/x-icon" href="images/favicon.png">
</head>

<body>
    <header>
        <div class="menu">
            <button id="menu-button" onclick="toggleMenu()"></button>
            <div id="title">
                <h1>${config.siteName}</h1>
                <h2>by ${config.authorName}</h2>
            </div>
        </div>
        <div id="controls">
            <div id="categories">
                <input type="checkbox" checked="true" id="checkAll" name="checkAll" onclick="toggleAll(this)">
                <label for="checkAll">Show All</label><br>\
                ${config.dev.categories.map(category => buildCheckbox(category)).join("")}
            </div>
            <div id="control-buttons">
                <button id="showHideButton" class="control-button" onclick="expandCollapseAll(this)">Expand All</button>
                <button id="reverseOrder" class="control-button" onclick="reverseOrder(this)">Oldest First</button>
            </div>
        </div>
    </header>
    <div id="stories" class="stories">${stories.map(story => buildStory(story)).join("")}
    </div>

    <footer>
        <p>Find the source code for this static site generator on <a href="https://github.com/skedwards88/ShortStories">GitHub</a></p>
        ${`<p>&#169; ${new Date().getFullYear()} ${config.authorName}</p>`}
    </footer>

    <script src="script.js"></script>

</body>

</html>`};

module.exports = buildHTML;
