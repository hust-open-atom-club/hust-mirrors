
const modifyChildren = require("unist-util-modify-children");

/** @type {import("unified").Plugin} */
const plugin = (_) => {
  return (ast) => {
    ast.children.unshift({
      type: "jsx",
      value: `<CliAdvertisement/>`,
    })
  }
}

module.exports = plugin;

