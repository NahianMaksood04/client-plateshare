const fs = require("fs");
const path = require("path");

// 1. Folder you want to combine
const folders = ["src"]; // change if needed

// 2. Output file
const outputFile = "all-code.txt";
let allCode = "";

// 3. Function to read recursively
function readFiles(dir) {
	const files = fs.readdirSync(dir);
	files.forEach((file) => {
		const fullPath = path.join(dir, file);
		const stat = fs.statSync(fullPath);
		if (stat.isDirectory()) {
			readFiles(fullPath);
		} else {
			const content = fs.readFileSync(fullPath, "utf8");
			allCode += `\n\n// ===== File: ${fullPath} =====\n\n`;
			allCode += content;
		}
	});
}

// 4. Start reading
folders.forEach((f) => readFiles(f));

// 5. Write all content into one file
fs.writeFileSync(outputFile, allCode);
console.log(`✅ All files combined into ${outputFile}`);
