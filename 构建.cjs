const fs = require("node:fs");
const path = require("node:path");
const root = __dirname;
const pages = ["index", "community", "studio", "publish", "work", "market", "demand", "new-demand", "bids", "order", "academy", "course", "lesson", "homework", "live", "room", "broadcast", "profile", "wallet", "messages", "settings", "activity", "creator", "admin"];
const template = fs.readFileSync(path.join(root, "页面模板.html"), "utf8");
for (const page of pages) fs.writeFileSync(path.join(root, `${page}.html`), template.replaceAll("{{PAGE}}", page));
fs.copyFileSync(path.join(root, "node_modules/lucide/dist/umd/lucide.js"), path.join(root, "vendor/lucide.js"));
console.log(`Built ${pages.length} pages`);
