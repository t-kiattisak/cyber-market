import { BrowserRouter } from "react-router-dom"
import App from "./App"
import { createBridgeComponent } from "@module-federation/bridge-react/v19"

// BrowserRouterWrapper accepts the `basename` prop injected by the Bridge host
const BrowserRouterWrapper = ({ basename }: { basename?: string }) => (
  <BrowserRouter useTransitions basename={basename}>
    <App />
  </BrowserRouter>
)

export default createBridgeComponent({ rootComponent: BrowserRouterWrapper })
