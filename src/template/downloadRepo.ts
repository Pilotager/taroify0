import { downloadTemplate } from "giget";

downloadTemplate("gh:mallfoundry/taroify/packages#main", {
  dir: "taroify/.repo",
  force: true,
  forceClean: true,
});
