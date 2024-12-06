import { lazy, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import { login,logout } from "./app/features/cart/authSlice";
import { useSelector,useDispatch } from "react-redux";
import AddProduct from "./pages/AddProduct";
import RegisterUser from "./pages/RegisterUser";
const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Product = lazy(() => import("./pages/Product"));

function App() {

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Get isLoggedIn state from Redux
  // const dispatch = useDispatch(); // Get dispatch function from Redux


  // const handleLogin = () => {
  //   // Your login logic here...
  //   // Assuming login is successful
  //   dispatch(login()); // Dispatch login action
  // };


  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* <NavBar /> */}
        <Routes>
         
          <Route index element={<Login 
          // onLogin={handleLogin}
           />} />
          {/* {isLoggedIn && ( */}
            <>

              <Route path="/home" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/:id" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/addProduct" element={<AddProduct />} />
              <Route path="/registerUser" element={<RegisterUser />} />
            </>
          {/* )} */}
        </Routes>
        {/* <Footer /> */}
      </Router>
    </Suspense>
  );
}

export default App;
