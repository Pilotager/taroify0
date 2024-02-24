import * as fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const componentMds: string[] = [];
const exampleTsxPath: string[] = [];

const walkSync = (currentDirPath: string) => {
  fs.readdirSync(currentDirPath, { withFileTypes: true }).forEach((dirent) => {
    var filePath = path.join(currentDirPath, dirent.name);
    if (dirent.isFile()) {
      if (dirent.name.endsWith(".md")) {
        componentMds.push(filePath);
      }
    } else if (dirent.isDirectory()) {
      walkSync(filePath);
    }
  });
};

walkSync("template/taroify/.repo/core/src");

const getFiles = (dir: string) => {
  const stat = fs.statSync(dir);
  if (stat.isDirectory()) {
    const dirs = fs.readdirSync(dir);
    dirs.forEach((value) => {
      getFiles(path.join(dir, value));
    });
  } else if (stat.isFile() && dir.endsWith(".tsx")) {
    exampleTsxPath.push(dir);
  }
};

getFiles("template/taroify/.repo/demo/src/pages");

// console.log(exampleTsxPath);

const components = componentMds.map((file) => {
  const pathName = file.split(".")[1].split("/");
  const componentName = pathName[pathName.length - 2];
  const { content } = matter(fs.readFileSync(file, "utf-8"));
  const description = content
    .split(`### `)[1]
    .split("介绍")[1]
    .replace("## 代码演示", "")
    .trim();

  const usage = exampleTsxPath
    .filter((fileName) => fileName.includes(`/${componentName}/index.tsx`))
    .map((file) => {
      return fs.readFileSync(file, "utf-8").trim();
    });

  const examples = exampleTsxPath
    .filter((fileName) => fileName.includes(`/${componentName}/index.tsx`))
    .map((file) => {
      return {
        source: componentName,
        code: fs.readFileSync(file, "utf-8").trim(),
      };
    });

  return {
    name: componentName,
    description,
    usage,
    examples,
  };
});

fs.writeFileSync("template/taroify/metadata.json", JSON.stringify(components));
