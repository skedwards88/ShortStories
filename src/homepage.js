const fs = require("fs");
const config = require("./config");

// A template literal:
const homepage = posts => `
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

            <input type="checkbox" checked="true" id="checkall" onclick="toggleall(this);" />Show all<br />
            <input type="checkbox" checked="true" onclick="togglecheck(this, 'fantasy')" ; />Fantasy<br />
            <input type="checkbox" checked="true" onclick="togglecheck(this, 'humor')" ; />Humor<br />
            <input type="checkbox" checked="true" onclick="togglecheck(this, 'scifi')" ; />SciFi<br />
                    
            <div id="stories"></div>

            <div class="stories">
            ${posts
              .map(
                post => `<div class="story">
                <button data-fantasy="true" class="collapsible filterDiv ${post.attributes.categories}">${post.attributes.title}</button>
                <div class="content">
                  <p>${post.body}</p>
                </div></div>`
              )
              .join("")}
        </div>

            <footer>
                ${`<p>© ${new Date().getFullYear()} ${config.authorName}</p>`}
            </footer>

        <script src="script.js"></script>

    </body>
</html>
`;

const addHomePage = posts => {
    fs.writeFile(`${config.dev.outdir}/index.html`, homepage(posts), e => {
      if (e) throw e;
      console.log(`index.html was created successfully`);
    });
  };
  

  module.exports = addHomePage;
