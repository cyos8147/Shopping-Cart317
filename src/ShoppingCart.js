import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ShoppingCart = ({ cartItems, onRemoveFromCart, onUpdateQuantity }) => {
  const [showModal, setShowModal] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const SHIPPING_COST = 100;
  const COUPON_CODE = 'DISCOUNT50'; // รหัสคูปองตัวอย่าง
  const COUPON_DISCOUNT = 50; // จำนวนส่วนลด

  // ฟังก์ชันคำนวณราคารวม
  const calculateTotal = () => {
    const itemsTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    let total = itemsTotal + SHIPPING_COST;
    if (discountApplied) {
      total -= COUPON_DISCOUNT;
    }
    return total;
  };

  const handleInputChange = (e, product) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity)) {
      onUpdateQuantity(product, newQuantity);
    }
  };

  const handleConfirm = () => {
    if (cartItems.length === 0) {
      alert("คุณยังไม่มีสินค้าในตะกร้า กรุณาเลือกสินค้าก่อน");
    } else {
      setShowModal(false);
      alert('ยืนยันการสั่งซื้อสำเร็จ');
    }
  };

  const handleApplyCoupon = () => {
    if (coupon === COUPON_CODE) {
      setDiscountApplied(true);
      alert('ใช้คูปองสำเร็จ! คุณได้รับส่วนลด 50 บาท');
    } else {
      alert('รหัสคูปองไม่ถูกต้อง');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-2xl font-bold mb-4">ShoppingCart</h2>
      {cartItems.length === 0 ? (
        <p>ตะกร้าของคุณว่างเปล่า</p>
      ) : (
        <>
          <ul className="list-group mb-4">
            {cartItems.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5>{item.name}</h5>
                  <p>ราคา: ฿{item.price}</p>
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
                  ลบ
                </button>
              </li>
            ))}
          </ul>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <p><strong>ค่าขนส่ง:</strong> ฿{SHIPPING_COST}</p>
            <p><strong>ราคารวม:</strong> ฿{calculateTotal()}</p>
            {discountApplied && <p className="text-success"><strong>ส่วนลด 50 บาทจากคูปอง DISCOUNT50</strong></p>}
          </div>

          <div className="mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="กรอกรหัสคูปอง"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
            <Button variant="success" onClick={handleApplyCoupon}>
              ใช้คูปอง
            </Button>
            <p className="text-muted">รหัสคูปองที่ใช้ได้: <strong>DISCOUNT50</strong> (ลดราคาที่ราคารวม 50 บาท)</p>
          </div>
        </>
      )}
      <Button variant="primary" onClick={() => setShowModal(true)}>
        ยืนยันการสั่งซื้อ
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>ยืนยันการสั่งซื้อ</Modal.Title>
        </Modal.Header>
        <Modal.Body>คุณต้องการยืนยันการสั่งซื้อใช่ไหม?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            ปิด
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ShoppingCart;
