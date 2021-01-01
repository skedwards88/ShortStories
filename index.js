// front matter linter for genres--must have one genre true, must only have allowed genres, no dup genres
// get asteroid story

function show(genre) {
    // For each element with class "story", 
    // if the element also has the input genre in its class, 
    // add the class "show"
    let storyDivs = document.getElementsByClassName("story");
    Array.from(storyDivs).forEach(storyDiv => {
        if (storyDiv.classList.contains(genre)) storyDiv.classList.add("show")
    });
}

function hide(genre) {
    // Figure out which genres are checked
    let checkboxes = document.getElementsByClassName('genre');
    let checkedGenres = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.name);

    // For each element with class "story", 
    // If the story's genres do not match any of the checked genres, 
    // remove the class "show"
    let storyDivs = document.getElementsByClassName("story");
    Array.from(storyDivs).forEach(storyDiv => {
        if (storyDiv.classList.contains(genre)) {
            let checkedStoryGenres = checkedGenres.filter(checked => storyDiv.classList.contains(checked));
            if (!checkedStoryGenres.length) {
                storyDiv.classList.remove("show");
            }
        }
    })
}

function showAll() {
    // For each element with class "story", 
    // add the class "show"
    let storyDivs = document.getElementsByClassName("story");
    Array.from(storyDivs).forEach(storyDiv => storyDiv.classList.add("show"));
}

function hideAll() {
    // For each element with class "story", 
    // remove the class "show"
    let storyDivs = document.getElementsByClassName("story");
    Array.from(storyDivs).forEach(storyDiv => storyDiv.classList.remove("show"));
}

function toggleGenre(source, genre) {
    if (source.checked) {
        show(genre);
    } else {
        hide(genre);
        // Uncheck the "Show All" box
        let checkAllBox = document.getElementById("checkAll")
        checkAllBox.checked = false;
    }
}

function toggleAll(source) {
    // Show or hide all stories when the "Show All" box is checked
    if (source.checked) {
        showAll();
    } else {
        hideAll();
    }

    // Make the other checkboxes match the state of the "Show All" checkbox
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    Array.from(checkboxes).forEach(checkbox => { if (checkbox != source) checkbox.checked = source.checked })
}

function expandCollapseAll(source) {
    let expandables = document.getElementsByTagName("details");

    if (source.innerHTML == "Expand All") {
        // Change the button text and expand all
        source.innerHTML = "Collapse All";
        Array.from(expandables).forEach(expandable => expandable.setAttribute("open", ""))
    } else {
        // Change the button text and collapse all
        source.innerHTML = "Expand All";
        Array.from(expandables).forEach(expandable => expandable.removeAttribute("open"))
    }
}

function reverseOrder(source) {
    // Change the button text and reverse row order
    let stories = document.getElementById("stories");
    if (source.innerHTML == "Oldest First") {
        source.innerHTML = "Newest first";
        stories.style.flexDirection = "column-reverse"
    } else {
        source.innerHTML = "Oldest First";
        stories.style.flexDirection = "column"
    }
}

function toggleMenu() {
    // Show or hid the menu controls
    let menu = document.getElementById("controls");
    if (menu.style.display === "flex") {
        menu.style.display = "none";
    } else {
        menu.style.display = "flex";
    }
}

function changeFont(increment) {
    // These are the supported font-size key words
    // It would be better to avoid hard-coding this, but also make sure the 
    // font-size is accessibility-friendly (e.g. still don't specify pixel font sizes)
    sizes = [
        "xx-small",
        "x-small",
        "small",
        "medium",
        "large",
        "x-large",
        "xx-large",
        "xxx-large"
    ];
    let stories = document.getElementById("stories");
    // If font-size is not set, use medium
    let currentSize = stories.style["font-size"] ? stories.style["font-size"] : "medium";
    // Set the new font size to the next size up (unless the font size is maxed out)
    let newSize = sizes[sizes.indexOf(currentSize) + increment];
    if (newSize) {
        stories.style["font-size"] = newSize
    }
}