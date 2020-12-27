const fs = require("fs");
const config = require("./config");

function buildStory(story) {
    // Append the story's categories to the class name; these will be used for filtering by category
    let storyClass = "story"
    for (i = 0; i < config.dev.categories.length; i++) {
        (story.attributes[config.dev.categories[i]]) ? (storyClass+=` ${config.dev.categories[i]}`) : ''
    }

    return `
        <div class="${storyClass}">
            <button class="collapsible">${story.attributes.title}</button>
            <div class="content">
                ${story.body}\
            </div>
        </div>`
};

function buildCheckbox(label) {
    return `
        <input type="checkbox" checked="true" id="${label}" name="${label}" class="category" onclick="toggleCheck(this, '${label}')">
        <label for="${label}">${label}</label><br>`
}

const buildHTML = function(stories) {
    return`\
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="${config.siteDescription}" />
    <title>${config.siteName}</title>
    <link rel="stylesheet" href="index.css">
</head>

<body>
    <header>
        <h1>${config.siteName}</h1>
    </header>

    <div id="categories">
        <input type="checkbox" checked="true" id="checkAll" name="checkAll" onclick="toggleAll(this)">
        <label for="checkAll">Show all</label><br>\
        ${config.dev.categories.map(category => buildCheckbox(category)).join("")}
    </div>

    <div class="stories">${stories.map(story => buildStory(story)).join("")}
    </div>

    <footer>
        ${`<p>&#169; ${new Date().getFullYear()} ${config.authorName}</p>`}
    </footer>

    <script src="script.js"></script>

</body>

</html>`};

const writeHTML = stories => {
    fs.writeFile(`./index.html`, buildHTML(stories), e => {
        if (e) throw e;
        console.log(`index.html was created successfully`);
    });
};

module.exports = writeHTML;
