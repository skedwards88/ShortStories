

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
    var x = document.getElementsByClassName("filterDiv");

    for (i = 0; i < x.length; i++) {
    if (x[i].classList.contains(category)) {
        x[i].classList.add("show");
    }
    }
}

function hide(category) {
    var allcats = ["scifi", "fantasy", "humor"];
    var x = document.getElementsByClassName("filterDiv");

    for (i = 0; i < x.length; i++) {
    if (x[i].classList.contains(category)) {

        var mycats = allcats.filter(thesecats);
        function thesecats(value, index, array) {
        return x[i].classList.contains(value);
        }
        console.log(mycats);
        if (mycats.length === 1) {
        x[i].classList.remove("show");
        }
    }
    }
}

function showall() {
    var x = document.getElementsByClassName("filterDiv");

    for (i = 0; i < x.length; i++) {
    x[i].classList.add("show");
    }
}

function hideall() {
    var x = document.getElementsByClassName("filterDiv");

    for (i = 0; i < x.length; i++) {
    x[i].classList.remove("show");
    }
}

function togglecheck(source, category) {
    if (source.checked) {
    console.log('showing ' + category);
    show(category);
    } else {
    console.log('hiding ' + category)
    hide(category);
    // uncheck the show all box
    var checkall = document.getElementById("checkall")
    console.log(checkall.checked);
    checkall.checked = false;
    console.log(checkall.checked);
    }
}

function toggleall(source) {
    console.log(source.checked);

    if (source.checked) {
    console.log('showing all');
    showall();
    } else {
    console.log('showing none');
    hideall();
    }

    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (var ii = 0; ii < checkboxes.length; ii++) {
    if (checkboxes[ii] != source)
        checkboxes[ii].checked = source.checked;
    }
}

showall()
