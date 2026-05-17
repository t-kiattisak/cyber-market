import { createModuleFederationConfig } from "@module-federation/rsbuild-plugin"

export default createModuleFederationConfig({
  name: "host_app",
  remotes: {
    product_app: "product_app@http://localhost:3001/mf-manifest.json",
    cart_app: "cart_app@http://localhost:3002/mf-manifest.json",
    profile_app: "profile_app@http://localhost:3003/mf-manifest.json",
  },
  shareStrategy: "loaded-first",
  shared: {
    react: { singleton: true },
    "react-dom": { singleton: true },
    "react-router-dom": { singleton: true },
  },
  bridge: {
    enableBridgeRouter: false,
  },
  dts: true,
})
