import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import Footer from './components/Footer';
import ProductDetails from './pages/ProductDetails';
import Wishlist from './pages/Wishlist';
import MyBook from './pages/MyBook';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <div className="font-mont text-white">
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/mybook" element={<MyBook />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </div>
    </>
  );
}

export default App;
