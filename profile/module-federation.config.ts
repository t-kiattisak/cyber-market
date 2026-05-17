import { createModuleFederationConfig } from "@module-federation/rsbuild-plugin"

export default createModuleFederationConfig({
  name: "profile_app",
  exposes: {
    "./export-app": "./src/export-app.tsx",
  },
  remotes: {
    cart_app: "cart_app@http://localhost:3002/mf-manifest.json",
  },
  shared: {
    react: { singleton: true },
    "react-dom": { singleton: true },
  },
  bridge: {
    enableBridgeRouter: false,
  },
  dts: true,
})
