const { execSync } = require("child_process");
const { series, dest, src } = require("gulp");

async function ts() {
  return execSync("node node_modules/typescript/bin/tsc", { stdio: 'inherit' });
}

async function clean() {
  return execSync('rm -rf dist', { stdio: 'inherit' });
}

function copyOthersFiles() {
  return src(["src/**/*.*", "!src/**/*.ts"]).pipe(dest("dist"));
}

exports.ts = ts;
exports.build = series(clean, ts, copyOthersFiles);
