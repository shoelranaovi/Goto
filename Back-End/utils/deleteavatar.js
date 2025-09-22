const fs = require("fs");
const path = require("path");

const deleteFile = (filePath) => {
  const resolvedPath = path.resolve(filePath);

  if (fs.existsSync(resolvedPath)) {
    try {
      fs.unlinkSync(resolvedPath);
      console.log(`File deleted successfully: ${resolvedPath}`);
    } catch (err) {
      console.error(`Error deleting file: ${filePath}`, err.message);
    }
  }
};

module.exports = { deleteFile };
