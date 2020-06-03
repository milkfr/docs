module.exports = {
  base: "https://milkfr.github.io/docs/",
  title: "milkfr's blog",
  description: "milkfr",
  head: [
    ["link", { rel: "icon", href: "/images/favicon.ico" }],
    ["meta", { name: "author", content: "milkfr" }],
    ["meta", { name: "description", content: "milkfr" }]
  ],
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    nav: require("./nav.js"),
    sidebar: require("./sidebar.js"),
    sidebarDepth: 2,
  }
}
