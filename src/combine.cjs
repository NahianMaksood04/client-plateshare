const fs = require("fs");
const path = require("path");

// Folder to combine
const folder = path.join(__dirname, ""); // current folder

// Output file
const outputFile = path.join(__dirname, "all-code.txt");
let allCode = "";

// Allowed code extensions
const allowedExts = [".js", ".jsx", ".ts", ".tsx", ".css", ".json"];

// Function to read recursively
function readFiles(dir) {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            readFiles(fullPath);
        } else if (allowedExts.includes(path.extname(file))) {
            const content = fs.readFileSync(fullPath, "utf8");
            allCode += `\n\n// ===== File: ${fullPath} =====\n\n`;
            allCode += content;
        }
    });
}

// Start reading
readFiles(folder);

// Write all content into one file
fs.writeFileSync(outputFile, allCode, "utf8");
console.log(`✅ All code files combined into ${outputFile}`);

