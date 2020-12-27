// Add tags
// add option to expand/collapse all -->
// add way to filter by tag
// add way to sort by most recent/oldest
//  https://stackoverflow.com/questions/2033711/how-can-i-attach-meta-data-to-a-dom-node
// make reddit fetching script into gh action


var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
    }
    });
}

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
    var storyDivs = document.getElementsByClassName("story");
    
    // Figure out which categories are checked
    var checkboxes = document.getElementsByClassName('category');
    var checkedCategories = [];
    for (var i = 0; i < checkboxes.length; i++) { // todo look into map or foreach instead of loop. what is better?
        if (checkboxes[i].checked) {
            checkedCategories.push(checkboxes[i].name)
        }
    }

    // If the story's categories do not match any of the checked categories, remove the class "show"
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

function toggleCheck(source, category) {
    if (source.checked) {
        // Show all stories of that category
        show(category);
    } else {
        hide(category); // TODO should not hide it if another category causes it to be shown

        // Uncheck the "Show all" box
        var checkAllBox = document.getElementById("checkAll")
            checkAllBox.checked = false;
    }
}

function toggleAll(source) {
    // Show or hide all stories when the "Show all" box is checked
    if (source.checked) {
        showAll();
    } else {
        hideAll();
    }

    // Make the other checkboxes match the state of the "Show all" check box
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (var i = 0; i < checkboxes.length; i++) { // todo look into map or foreach instead of loop. what is better?
    if (checkboxes[i] != source)
        checkboxes[i].checked = source.checked;
    }
}

showAll()
