import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

// Define the type for the onClose prop
interface AddToCartPopupProps {
  onClose: () => void;
  title: string;
  bookId: string;
  price: string;
}

function AddToCartPopup({
  onClose,
  title,
  bookId,
  price,
}: AddToCartPopupProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookId: Number(bookId),
      title: title || 'No project found',
      price: Number(price),
    };
    addToCart(newItem);
    onClose(); // Close modal after adding to cart
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Add {title}</h2>
        <div>
          ${price}
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
        <button className="btn btn-secondary" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(211,211,211,0.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
  },
};

export default AddToCartPopup;
