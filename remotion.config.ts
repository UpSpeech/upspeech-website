import { Config } from "@remotion/cli/config";
import { enableTailwind } from "@remotion/tailwind";

Config.setEntryPoint("remotion/index.ts");
Config.setVideoImageFormat("jpeg");
Config.overrideWebpackConfig((currentConfiguration) =>
  enableTailwind(currentConfiguration),
);
