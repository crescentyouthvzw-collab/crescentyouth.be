function acceptCookies() {
    localStorage.setItem("cookiesAccepted", "true");
    document.getElementById("cookie-banner").style.display = "none";
}

window.onload = function () {
    if (!localStorage.getItem("cookiesAccepted")) {
        const banner = document.getElementById("cookie-banner");
        if (banner) {
            banner.style.display = "block";
        }
    }
};
