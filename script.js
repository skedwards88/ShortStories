// front matter linter for categories--must have one cat true, must only have allowed tags, no dup tags
// todo look into map or foreach instead of loop. what is better?
// way to control font size on mobile?
// get asteroid story

function show(category) {
    // For each element with class "story", 
    // if the element also has the class [category], 
    // add the class "show"
    var storyDivs = document.getElementsByClassName("story");
    for (i = 0; i < storyDivs.length; i++) {
        if (storyDivs[i].classList.contains(category)) {
            storyDivs[i].classList.add("show");
        }
    }
}

function hide(category) {
    // Figure out which categories are checked
    var checkboxes = document.getElementsByClassName('category');
    var checkedCategories = [];
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkedCategories.push(checkboxes[i].name)
        }
    }

    // For each element with class "story", 
    // If the story's categories do not match any of the checked categories, 
    // remove the class "show"
    var storyDivs = document.getElementsByClassName("story");
    for (i = 0; i < storyDivs.length; i++) {
        if (storyDivs[i].classList.contains(category)) {
            var checkedStoryCategories = checkedCategories.filter(filterCategories);
            function filterCategories(value, index, array) {
                return storyDivs[i].classList.contains(value);
            }
            if (checkedStoryCategories.length === 0) {
                storyDivs[i].classList.remove("show");
            }
        }
    }
}

function showAll() {
    // For each element with class "story", 
    // add the class "show"
    var storyDivs = document.getElementsByClassName("story");
    for (i = 0; i < storyDivs.length; i++) {
        storyDivs[i].classList.add("show");
    }
}

function hideAll() {
    // For each element with class "story", 
    // remove the class "show"
    var storyDivs = document.getElementsByClassName("story");
    for (i = 0; i < storyDivs.length; i++) {
        storyDivs[i].classList.remove("show");
    }
}

function toggleCategory(source, category) {
    if (source.checked) {
        show(category);
    } else {
        hide(category);
        // Uncheck the "Show All" box
        var checkAllBox = document.getElementById("checkAll")
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

    // Make the other checkboxes match the state of the "Show All" check box
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i] != source)
            checkboxes[i].checked = source.checked;
    }
}

function expandCollapseAll(source) {
    var expandables = document.getElementsByTagName("details");

    if (source.innerHTML=="Expand All") {
        // Change the button text and expand all
        source.innerHTML = "Collapse All";
        for (i = 0; i < expandables.length; i++) {
            expandables[i].setAttribute("open", "");
        }
    } else {
        // Change the button text and collapse all
        source.innerHTML= "Expand All";
        for (i = 0; i < expandables.length; i++) {
            expandables[i].removeAttribute("open")
        }
    }
}

function reverseOrder(source) {
    // Change the button text and reverse row order
    var stories = document.getElementById("stories");
    if (source.innerHTML=="Oldest First") {
        source.innerHTML = "Newest first";
        stories.style.flexDirection = "column-reverse"
    } else {
        source.innerHTML = "Oldest First";
        stories.style.flexDirection = "column"
    }
}

function toggleMenu() {
    var menu = document.getElementById("controls");
    if (menu.style.display === "flex") {
        menu.style.display = "none";
    } else {
        menu.style.display = "flex";
    }
  }
  