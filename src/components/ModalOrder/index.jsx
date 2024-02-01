import React from 'react';

const ModalOrder = ({ closeModal }) => {
  const handleOrder = () => {
    
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-96 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Order</h2>
          <button onClick={closeModal}>X</button> 
        </div>
        <div className="mb-4">
          <input type="text" placeholder="Name" className="w-full mb-2 border p-2 rounded-lg" />
          <input type="email" placeholder="Email" className="w-full mb-2 border p-2 rounded-lg" />
          <input type="text" placeholder="Address" className="w-full mb-2 border p-2 rounded-lg" />
          <input type="tel" placeholder="Phone Number" className="w-full mb-2 border p-2 rounded-lg" />
        </div>
        <button onClick={handleOrder} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Order</button>
      </div>
    </div>
  );
};

export default ModalOrder;
