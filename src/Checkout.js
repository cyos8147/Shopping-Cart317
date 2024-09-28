import React, { useState } from 'react';

const Checkout = ({ total }) => {
  const [discountCode, setDiscountCode] = useState('');
  const [finalTotal, setFinalTotal] = useState(total);

  const handleApplyDiscount = () => {
    if (discountCode === 'SAVE50') {
      const discountAmount = total * 0.50; // 10% discount
      setFinalTotal(total - discountAmount);
    } else {
      alert('Invalid coupon code');
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold">Checkout</h2>
      <p>Total Price: ฿{total.toFixed(2)}</p>
      <p>Price after Discount: ฿{finalTotal.toFixed(2)}</p>

      <div className="mt-2">
        <input
          type="text"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          placeholder="Enter discount code"
          className="form-control w-50"
        />
        <button className="btn btn-primary mt-2" onClick={handleApplyDiscount}>
          Apply Coupon
        </button>
      </div>

      <p>Shipping Cost: ฿100</p>
      <p>Grand Total: ฿{(finalTotal + 100).toFixed(2)}</p>
    </div>
  );
};

export default Checkout;
