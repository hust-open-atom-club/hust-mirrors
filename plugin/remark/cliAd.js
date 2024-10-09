/** @type {import("unified").Plugin} */
const plugin = (_) => {
  return (ast, f) => {
    ast.children.unshift({
      type: "mdxJsxFlowElement",
      name: "CliAdvertisement",
    })
  }
}

module.exports = plugin;

