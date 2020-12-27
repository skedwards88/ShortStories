const fs = require("fs");
const config = require("./config");

function buildStory(post) {
    let storyClass = `story${post.attributes.fantasy ? ' fantasy' : ''}${post.attributes.scifi ? ' scifi' : ''}${post.attributes.humor ? ' humor' : ''}`
    return `
        <div class="${storyClass}">
            <button class="collapsible filterDiv">${post.attributes.title}</button>
            <div class="content">
                ${post.body}\
            </div>
        </div>`
};

// A template literal:
const buildHTML = function(posts) {
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

    <input type="checkbox" checked="true" id="checkAll" name="checkAll" onclick="toggleAll(this)">
    <label for="checkAll">Show all</label><br>
    <input type="checkbox" checked="true" id="fantasy" name="fantasy" class="category" onclick="toggleCheck(this, 'fantasy')">
    <label for="fantasy">Fantasy</label><br>
    <input type="checkbox" checked="true" id="humor" name="humor" class="category" onclick="toggleCheck(this, 'humor')">
    <label for="humor">Humor</label><br>
    <input type="checkbox" checked="true" id="scifi" name="scifi" class="category" onclick="toggleCheck(this, 'scifi')">
    <label for="scifi">SciFi</label><br>

    <div class="stories">${posts.map(post => buildStory(post)).join("")}
    </div>

    <footer>
        ${`<p>&#169; ${new Date().getFullYear()} ${config.authorName}</p>`}
    </footer>

    <script src="script.js"></script>

</body>

</html>`};

const writeHTML = posts => {
    fs.writeFile(`./index.html`, buildHTML(posts), e => {
        if (e) throw e;
        console.log(`index.html was created successfully`);
    });
};


module.exports = writeHTML;
