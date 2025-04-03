import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  return (
    <>
      <h2>Your Cart</h2>
      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {cart.map((item: CartItem) => (
              <li key={item.bookId}>
                {item.title}: ${item.price}
                <button onClick={() => removeFromCart(item.bookId)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <h3>Total: </h3>
      <button>Checkout</button>
      <button onClick={() => navigate('/projects')}>Continue Browsing</button>
    </>
  );
}

export default CartPage;
