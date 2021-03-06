const config = require("./config");

function buildStory(story) {
    // Get the story's genres. 
    // These will be used in the class list to 
    // determine whether the story should be displayed.
    // White spaces in genre names are removed since 
    // spaces delineate a new class name.
    let genres = config.dev.genres.filter(genre => story.attributes.genres[genre])

    return `
        <div class="${'story show ' + genres.map(genre => genre.replace(/\s+/g, '')).join(" ")}">
            <details>
            <summary>${story.attributes.title}</summary>
            <div class="content">
                <div class="genres">${genres.join(", ")}</div>
                ${story.body}\
            </div>
        </div>`
};

function buildCheckbox(label) {
    return `
                <input type="checkbox" checked="true" id="${label.replace(/\s+/g, '')}" name="${label.replace(/\s+/g, '')}" class="genre" onclick="toggleGenre(this, '${label.replace(/\s+/g, '')}')">
                <label for="${label.replace(/\s+/g, '')}">${label}</label><br>`
}

function buildHTML(stories) {
    return `\
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
            <div id="genres">
                <input type="checkbox" checked="true" id="checkAll" name="checkAll" onclick="toggleAll(this)">
                <label for="checkAll">Show All</label><br>\
                ${config.dev.genres.map(genre => buildCheckbox(genre)).join("")}
            </div>
            <div id="control-buttons">
                <button id="showHideButton" class="control-button" onclick="expandCollapseAll(this)">Expand All</button>
                <button id="reverseOrder" class="control-button" onclick="reverseOrder(this)">Oldest First</button>
                <button id="font-up" class="control-button" onClick="changeFont(1)">Increase Font</button>
                <button id="font-down" class="control-button" onClick="changeFont(-1)">Decrease Font</button>
            </div>
        </div>
    </header>
    <div id="stories" class="stories">${stories.map(story => buildStory(story)).join("")}
    </div>

    <footer>
        <p>Find the source code for the static site generator used to build this site on <a href="https://github.com/skedwards88/ShortStories">GitHub</a>.</p>
        <p>Last updated at ${new Date()}</p>
        ${`<p>&#169; ${new Date().getFullYear()} ${config.authorName}</p>`}
    </footer>

    <script src="index.js"></script>

</body>

</html>`};

module.exports = buildHTML;
