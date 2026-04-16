#!/usr/bin/env node
const path = require("path");
const fs = require("fs");
const { spawnSync } = require("child_process");

const pkgRoot = path.resolve(__dirname, "..");
const nodeModules = path.join(pkgRoot, "node_modules");

/**
 * 仅在本地确实缺少或未装全 npm 依赖时才需要执行 npm install。
 * - 无 production dependencies 时，运行 matrix.ts 仅需 Node（--experimental-strip-types），不强制安装。
 * - 有依赖时：node_modules 不存在/为空，或 npm ls 校验失败，才执行安装。
 */
function needsNpmInstall(root) {
  let pkg;
  try {
    pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf-8"));
  } catch {
    return false;
  }

  const deps = pkg.dependencies && typeof pkg.dependencies === "object" ? pkg.dependencies : {};
  // console.log("matrix dependencies", deps);
  if (Object.keys(deps).length === 0) {
    return false;
  }

  if (!fs.existsSync(nodeModules)) return true;

  let entries;
  try {
    entries = fs.readdirSync(nodeModules);
  } catch {
    return true;
  }
  if (entries.length === 0) return true;

  const ls = spawnSync("npm", ["ls", "--depth=0"], {
    cwd: root,
    stdio: "pipe",
    encoding: "utf-8",
  });
  if (ls.status !== 0) return true;
  return false;
}

if (needsNpmInstall(pkgRoot)) {
  console.error("matrix: 未安装依赖或依赖不完整，正在执行 npm install …");
  const install = spawnSync("npm", ["install"], { stdio: "inherit", cwd: pkgRoot });
  if (install.status !== 0) process.exit(install.status ?? 1);
}

const script = path.join(pkgRoot, "scripts", "matrix.ts");
const result = spawnSync(
  process.execPath,
  ["--experimental-strip-types", script, ...process.argv.slice(2)],
  { stdio: "inherit", cwd: pkgRoot }
);
process.exit(result.status ?? 1);
