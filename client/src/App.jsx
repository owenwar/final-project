import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import Products from "./pages/Products/Products";
import AdminForm from "./pages/AdminForm/AdminForm";
import Signup from "./pages/Signup/Signup";
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

const productData = [
  // Example product data with gender property
  { id: 1, name: 'Product 1', description: 'Description 1', gender: 'male' },
  { id: 2, name: 'Product 2', description: 'Description 2', gender: 'female' },
  // ...other products
];

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
        path: '/products/:gender',
        element: <Products products={productData} />,
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
