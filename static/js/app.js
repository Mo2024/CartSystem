// NAV BAR
function displayDropDown(x) {
    var dropdownClass = document.getElementById("menuClassCheck")
    if (dropdownClass.classList.contains("dropdown-toggle")) {
        document.getElementById(x).style.display = "block";
    }
}
function hideDropDown(x) {
    document.getElementById(x).style.display = "none";
}


