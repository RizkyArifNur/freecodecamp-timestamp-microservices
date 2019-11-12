const { writeFileSync, existsSync, readFileSync } = require("fs");
function read() {
  ensureFileExists();
  return JSON.parse(readFileSync("url.json").toString());
}

function write(data) {
  console.log(`Writing file to url.json`, data);
  ensureFileExists();
  writeFileSync("url.json", JSON.stringify(data));
}

function ensureFileExists() {
  /**
   * check if message already exists
   */
  if (!existsSync("url.json")) {
    /**
     * if message not found then create it
     */
    writeFileSync("url.json", "[]");
  }
}

module.exports = {
  findById: id => {
    return read().find(m => m.id == id);
  },
  insert: url => {
    const urls = read();
    const id = read().length + 1;
    urls.push({
      id,
      url
    });
    write(urls);
    return { id, url };
  },
  count: () => {
    return read().length;
  }
};
