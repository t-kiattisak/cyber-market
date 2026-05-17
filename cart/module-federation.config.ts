import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';

export default createModuleFederationConfig({
  name: 'cart_app',
  exposes: {
    './export-app': './src/export-app.tsx',
    './cartStore': './src/store/cartStore.ts',
    './CartBadge': './src/components/CartBadge.tsx',
    './ViewCartButton': './src/components/ViewCartButton.tsx',
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
    'react-router-dom': { singleton: true },
  },
  bridge: {
    enableBridgeRouter: false,
  },
  dts: true,
});
