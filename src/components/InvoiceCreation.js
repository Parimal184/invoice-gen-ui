import React, { useState } from 'react';
import CustomPDF from './CustomPDF';

const InvoiceCreation = ({ buyers, products }) => {
  const [selectedBuyer, setSelectedBuyer] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [invoiceItems, setInvoiceItems] = useState([]);

  const handleAddItem = () => {
    const product = products?.find((p) => p.productName === selectedProduct);
    const amount = product.rate * quantity;
    const newItem = {
      productName: selectedProduct,
      quantity,
      amount,
    };
    setInvoiceItems([...invoiceItems, newItem]);
    setTotalAmount(totalAmount + amount);
  };

  return (
    // <div className="h-screen w-3/4 overflow-x-auto p-4 bg-gray-100">
    //   <label className="block mb-2">Select Buyer:</label>
    //   <select
    //     value={selectedBuyer}
    //     onChange={(e) => setSelectedBuyer(e.target.value)}
    //     className="border border-gray-400 rounded px-3 py-2 mb-4 w-full"
    //   >
    //     <option value="">Select Buyer</option>
    //     {buyers?.map((buyer) => (
    //       <option key={buyer.id} value={buyer.buyerName}>
    //         {buyer.buyerName}
    //       </option>
    //     ))}
    //   </select>
    //   <label className="block mb-2">Select Product:</label>
    //   <select
    //     value={selectedProduct}
    //     onChange={(e) => setSelectedProduct(e.target.value)}
    //     className="border border-gray-400 rounded px-3 py-2 mb-4 w-full"
    //   >
    //     <option value="">Select Product</option>
    //     {/* {products?.map((product) => (
    //       <option key={product.id} value={product.productName}>
    //         {product.productName}
    //       </option>
    //     ))} */}
    //   </select>
    //   <label className="block mb-2">Quantity:</label>
    //   <input
    //     type="number"
    //     value={quantity}
    //     onChange={(e) => setQuantity(e.target.value)}
    //     className="border border-gray-400 rounded px-3 py-2 mb-4 w-full"
    //   />
    //   <button onClick={handleAddItem} className="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4">
    //     Add Item
    //   </button>
    //   <label className="block mb-2">Total Amount:</label>
    //   <input type="text" value={totalAmount} readOnly className="border border-gray-400 rounded px-3 py-2 mb-4 w-full" />
    //   <div>
    //     <h3 className="mb-2">Invoice Items:</h3>
    //     <ul>
    //       {/* {invoiceItems.map((item, index) => (
    //         <li key={index}>
    //           {item.productName} - Quantity: {item.quantity} - Amount: {item.amount}
    //         </li>
    //       ))} */}
    //     </ul>
    //   </div>
    // </div>
      <CustomPDF/>
  );
};

export default InvoiceCreation;
