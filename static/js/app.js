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

function closeAlert() {
    document.getElementById("registerAlert").style.setProperty('display', 'none', 'important');
    document.getElementsByTagName('body')[0].style.overflow = 'visible';
}
