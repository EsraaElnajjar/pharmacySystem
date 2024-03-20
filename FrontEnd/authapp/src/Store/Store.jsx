// StoreList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Store/Store.css';
function Store() {
  const [storeData, setStoreData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3002/store/list');
      setStoreData(response.data);
    } catch (error) {
      console.error('Error fetching store data:', error);
    }
  };

  return (
    <div>
      <h2 className='h2sty'>قائمة محتوى المخزن</h2>
      <hr className="title-line" style={{border: "2px solid #006d86"}}/>
      <table>
        <thead>
          <tr>
            <th>الرقم</th>
            <th>الاسم</th>
            <th>النوع</th>
            <th>سعر الشراء</th>
            <th>السعر النهائي</th>
            <th>الكمية</th>
          </tr>
        </thead>
        <tbody>
          {storeData.map(item => (
            <tr key={item.number}>
              <td>{item.number}</td>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>{item.purchasePrice}</td>
              <td>{item.finalPrice}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Store;
