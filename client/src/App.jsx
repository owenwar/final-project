import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import MaleProducts from "./pages/Products/MaleProducts";
import FemaleProducts from "./pages/Products/FemaleProducts";
import AdminForm from "./pages/AdminForm/AdminForm";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import "./app.scss"
import Checkout from "./pages/Checkout/Checkout";
const Layout = () => {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path:"/",
        element: <Home/>
      },
      {
        path:"/maleproducts",
        element: <MaleProducts/>
      },
      {
        path:"/femaleproducts",
        element: <FemaleProducts/>
      },
      {
        path:"/product/:id",
        element: <Product/>
      },
      {
        path: "/admin",
        element: <AdminForm/>
      },
      {
        path: "/signUp",
        element: <Signup/>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/checkout",
        element: <Checkout/>
      }
    ]
  },
])

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
