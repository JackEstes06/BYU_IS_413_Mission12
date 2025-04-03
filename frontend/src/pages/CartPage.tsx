import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import { useState } from 'react';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();
  const [toastMessage, setToastMessage] = useState('');

  return (
    <>
      <h2 className="my-4">Your Cart</h2>
      {toastMessage && (
        <div
          className="toast show position-fixed bottom-0 end-0 p-3"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-body">{toastMessage}</div>
        </div>
      )}
      <div className="container">
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="row">
            <div className="col-md-8">
              <ul className="list-group">
                {cart.map((item: CartItem) => (
                  <li
                    key={item.bookId}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    {item.title}: ${item.price}
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        removeFromCart(item.bookId);
                        setToastMessage('Item removed from cart!');
                      }}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-md-4">
              <h3>
                Total: $
                {cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
              </h3>
              <div className="btn-group-vertical w-100">
                <button
                  className="btn btn-primary mb-2"
                  onClick={() => navigate('/checkout')}
                >
                  Checkout
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate('/projects')}
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bootstrap Carousel as a cool feature */}
      <div
        id="cart-carousel"
        className="carousel slide mt-4"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {cart.map((item, index) => (
            <div
              key={item.bookId}
              className={`carousel-item ${index === 0 ? 'active' : ''}`}
            >
              <div className="d-block w-100">
                <img
                  src={'https://via.placeholder.com/150'}
                  alt={item.title}
                  className="d-block w-100"
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>{item.title}</h5>
                  <p>${item.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#cart-carousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#cart-carousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}

export default CartPage;
