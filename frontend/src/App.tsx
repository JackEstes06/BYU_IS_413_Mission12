import './App.css';
import { CartProvider } from './context/CartContext';
import BooksPage from './pages/BooksPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CartPage from './pages/CartPage';
import AdminBooksPage from './pages/AdminBooksPage';

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BooksPage />} />
            <Route path="/projects" element={<BooksPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/admin" element={<AdminBooksPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
