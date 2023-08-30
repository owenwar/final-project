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
<<<<<<< HEAD
import Search from "./components/Search/search";
=======
import Login from "./pages/Login/Login";
>>>>>>> main
import "./app.scss"
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
<<<<<<< HEAD
        path: "/search",
        element: <Search/>
=======
        path: "/login",
        element: <Login/>
>>>>>>> main
      },
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
