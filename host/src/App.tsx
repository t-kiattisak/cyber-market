import { Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { createRemoteAppComponent } from "@module-federation/bridge-react"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import Skeleton from "./components/Skeleton"
import ErrorFallback from "./components/ErrorFallback"

const ProductApp = createRemoteAppComponent({
  loader: () => import("product_app/export-app"),
  loading: <Skeleton />,
  fallback: ErrorFallback,
})

const CartApp = createRemoteAppComponent({
  loader: () => import("cart_app/export-app"),
  loading: <Skeleton />,
  fallback: ErrorFallback,
})

const ProfileApp = createRemoteAppComponent({
  loader: () => import("profile_app/export-app"),
  loading: <Skeleton />,
  fallback: ErrorFallback,
})

const App = () => (
  <BrowserRouter useTransitions>
    <Navbar />
    <Suspense fallback={<Skeleton />}>
      <Routes>
        <Route path='/' element={<HomePage />} />
        {/* Pass basename explicitly so BrowserRouterWrapper strips /products prefix from route matching */}
        <Route
          path='/products/*'
          element={<ProductApp basename='/products' />}
        />
        {/* Pass basename explicitly so BrowserRouterWrapper strips /cart prefix from route matching */}
        <Route path='/cart/*' element={<CartApp basename='/cart' />} />
        {/* Pass basename explicitly so TanStack Router basepath strips /profile prefix from route matching */}
        <Route path='/profile/*' element={<ProfileApp basename='/profile' />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
)

export default App
