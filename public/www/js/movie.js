function togglePlatforms() {
    // Platforms available to watch the film
    const platforms = ["Netflix", "Amazon Prime", "Hulu", "Disney+", "HBO Max"];

    // Create a string with the platforms information
    const platformInfo = "Available platforms: " + platforms.join(", ");

    // Get the platformWindow div and platformInfo paragraph
    const platformWindow = document.getElementById("platformWindow");
    const platformInfoElement = document.getElementById("platformInfo");

    // Set the platform information
    platformInfoElement.innerHTML = platformInfo;

    // Toggle the display of the platformWindow div
    if (platformWindow.style.display === "none") {
        platformWindow.style.display = "block";
    } else {
        platformWindow.style.display = "none";
    }
}


