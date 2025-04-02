let menu_btn = document.querySelector(".menu-btn");
let sidebar = document.querySelector(".sidebar");
let main_content = document.querySelector("main");



// Close sidebar if clicking outside of menu button or sidebar
document.onclick = function(e) {
    if (!menu_btn.contains(e.target) && !sidebar.contains(e.target)) {
        menu_btn.classList.add("active");
        sidebar.classList.add("active");
    }
};
document.addEventListener("DOMContentLoaded", () => {
    let pageUrl = "/admin-page/dashboard.html"; // Default to the dashboard URL

    // Fetch and update main content with dashboard
    fetch(pageUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to load ${pageUrl}`);
            }
            return response.text();
        })
        .then((data) => {
            // Extract the <main> content from the fetched HTML
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = data;
            const newContent = tempDiv.querySelector("main");

            // Replace the content of the current <main>
            if (newContent) {
                main_content.innerHTML = newContent.innerHTML;
            } else {
                main_content.innerHTML = `<p>Error: Could not find main content in ${pageUrl}.</p>`;
            }
        })
        .catch((error) => {
            console.error(error);
            main_content.innerHTML = `<p>Error loading content. Please try again later.</p>`;
        });
});

// Handle sidebar menu item clicks
$(".sidebar > .nav > .menu > ul > li").click(function (e) {
    e.stopPropagation(); // Prevent event from bubbling up

    // If the clicked item is already active, close it and its submenu
    if ($(this).hasClass("active")) {
        if($(this).find('ul').length > 0){
            $(this).removeClass("active");
            $(this).find("ul").slideUp();
            return;
        }
    }

    // Remove 'active' class from other items and close their submenus
    $(".sidebar > .nav > .menu > ul > li").removeClass("active");
    $(".sidebar > .nav > .menu > ul > li ul").slideUp();

    // Add 'active' class to the clicked item
    $(this).addClass("active");

    // Open the submenu if it exists
    if ($(this).find("ul").length > 0) {
        $(this).find("ul").slideToggle();
    }

    // Fetch and update main content dynamically
    let pageUrl = $(this).data("url") || "/admin-page/dashboard.html"; // Fallback to default URL
    fetch(pageUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to load ${pageUrl}`);
            }
            return response.text();
        })
        .then((data) => {
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = data;
            const newContent = tempDiv.querySelector("main");

            if (newContent) {
                main_content.innerHTML = newContent.innerHTML;
            } else {
                main_content.innerHTML = `<p>Error: Could not find main content in ${pageUrl}.</p>`;
            }
        })
        .catch((error) => {
            console.error(error);
            main_content.innerHTML = `<p>Error loading content. Please try again later.</p>`;
        });
});

// Toggle sidebar visibility when menu button is clicked
$(".menu-btn").click(function (e) {
    e.stopPropagation(); // Prevent event from bubbling up
    $(this).toggleClass("active");
    $(".sidebar").toggleClass("active");
});
