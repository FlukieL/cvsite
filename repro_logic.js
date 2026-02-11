
const links = [
    { text: "About Me", url: "index.html" },
    { text: "Skills", url: "skills.html" },
    { text: "CV", url: "cv.html" }
];

function check(linkUrl, currentPath) {
    const isActive = (linkUrl === 'index.html' && (currentPath.endsWith('index.html') || currentPath === '/')) ||
        (linkUrl !== 'index.html' && currentPath.endsWith(linkUrl));
    console.log(`Link: ${linkUrl}, Path: ${currentPath} => Active: ${isActive}`);
}

console.log("--- Testing Standard Paths ---");
check("index.html", "/");
check("index.html", "/index.html");
check("skills.html", "/skills.html");
check("cv.html", "/cv.html");

console.log("--- Testing Subdirectory Paths ---");
check("skills.html", "/cvsite/skills.html");
check("cv.html", "/cvsite/cv.html");

console.log("--- Testing Case Sensitivity ---");
check("skills.html", "/Skills.html");

console.log("--- Testing Prefix issues ---");
check("skills.html", "/myskills.html"); // Should be TRUE with endsWith, but is false positive?
// Because endsWith("skills.html") check against "myskills.html" -> True.
// This is actually a BUG in the logic if we want exact match.
// But specific failure reported is "highlight line doesn't remain".
// So isActive is FALSE when it should be TRUE.

console.log("--- Testing Path Separation ---");
check("skills.html", "/cvsite/skills"); // URL without extension
