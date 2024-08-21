const { getDefaultConfig } = require("expo/metro-config")

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

config.transformer.getTransformOptions = async () => ({
  transform: {
    inlineRequires: true,
  },
})

config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer/expo"),
}

config.resolver = {
  ...config.resolver,
  assetExts: config.resolver.assetExts.filter((ext) => ext !== "svg"),
  sourceExts: [...config.resolver.sourceExts, "svg", "cjs"],
}

module.exports = config
