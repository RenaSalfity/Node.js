const fs = require("fs");

function extractRows(outputFile) {
  const totalFiles = 10; // Number of input files
  let finalContent = "";

  for (let i = 1; i <= totalFiles; i++) {
    const currentFile = `${i}.txt`;

    try {
      // Read content of the current file
      const fileContent = fs.readFileSync(currentFile, "utf-8");
      const lines = fileContent
        .split("\n")
        .filter((line) => line.trim().length > 0); // Ignore empty lines
      const linesToAdd = lines.slice(0, i); // Select first 'i' lines
      finalContent += linesToAdd.join("\n") + "\n";
    } catch (error) {
      // Handle case where file is missing or cant be read
      console.warn(`Could not process ${currentFile}: ${error.message}`);
      continue;
    }
  }

  // Write content to the output file
  fs.writeFileSync(outputFile, finalContent.trim());
  console.log(`Rows extracted successfully to ${outputFile}`);
}

// name the output file name
const resultFile = "updatedFile.txt";

// run function
extractRows(resultFile);
