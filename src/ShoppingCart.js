import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ShoppingCart = ({ cartItems, onRemoveFromCart, onUpdateQuantity }) => {
  const [showModal, setShowModal] = useState(false);
  const SHIPPING_COST = 100;

  // ฟังก์ชันคำนวณราคารวม
  const calculateTotal = () => {
    const itemsTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    return itemsTotal + SHIPPING_COST;
  };

  const handleInputChange = (e, product) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity)) {
      onUpdateQuantity(product, newQuantity);
    }
  };

  const handleConfirm = () => {
    if (cartItems.length === 0) {
      alert("You don't have any products yet. Please select a product.");
    } else {
      setShowModal(false);
      alert('Order confirmed successfully');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul className="list-group mb-4">
            {cartItems.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5>{item.name}</h5>
                  <p>Price: ฿{item.price}</p>
                  <input
                    type="number"
                    className="form-control w-25 mr-2"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => handleInputChange(e, item)}
                  />
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => onRemoveFromCart(item)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <p><strong>Shipping Cost:</strong> ฿{SHIPPING_COST}</p>
            <p><strong>Total Price:</strong> ฿{calculateTotal()}</p>
          </div>
        </>
      )}
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Confirm Order
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to confirm your order?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ShoppingCart;
