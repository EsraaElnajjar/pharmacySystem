import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function AddElement() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [finalPrice, setFinalPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/store/add', {
        name,
        type,
        purchasePrice,
        finalPrice,
        quantity
      });
      console.log('Element added successfully:', response.data);
      navigate('/store');
    } catch (error) {
      console.error('Error adding element:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4" style={{ fontFamily: "ElMessiri-Bold" }}>اضافة صنف جديد للمخزن</h2>
      <hr className="title-line" style={{ border: "2px solid #006d86" }}/>
      <form onSubmit={handleSubmit}>
        <div className="form-group text-right" dir="rtl">
          <label style={{ fontFamily: "ElMessiri-Bold" ,marginBottom:"10px"}}>اسم الصنف:</label>
          <input style={{ fontFamily: "ElMessiri-Regular"}} type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group text-right" dir="rtl">
          <label style={{ fontFamily: "ElMessiri-Bold",marginBottom:"10px",marginTop:"10px" }}>نوع الصنف:</label>
          <select style={{ fontFamily: "ElMessiri-Bold" ,color:"grey"}} className="form-control" value={type} onChange={(e) => setType(e.target.value)}>
            <option style={{ fontFamily: "ElMessiri-Bold" }} value="">اختر النوع</option>
            <option style={{ fontFamily: "ElMessiri-Bold" }} value="شراب">شراب</option>
            <option style={{ fontFamily: "ElMessiri-Bold" }} value="شريط">شريط</option>
          </select>
        </div>
        <div className="form-group text-right" dir="rtl">
          <label style={{ fontFamily: "ElMessiri-Bold" ,marginBottom:"10px",marginTop:"10px"}}>سعر الشراء:</label>
          <input type="text"  style={{ fontFamily: "ElMessiri-Regular"}} className="form-control" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} />
        </div>
        <div className="form-group text-right" dir="rtl">
          <label style={{ fontFamily: "ElMessiri-Bold" ,marginBottom:"10px",marginTop:"10px"}}>سعر البيع:</label>
          <input style={{ fontFamily: "ElMessiri-Regular"}} type="text" className="form-control" value={finalPrice} onChange={(e) => setFinalPrice(e.target.value)} />
        </div>
        <div className="form-group text-right" dir="rtl">
          <label style={{ fontFamily: "ElMessiri-Bold" ,marginBottom:"10px",marginTop:"10px"}}>الكمية:</label>
          <input style={{ fontFamily: "ElMessiri-Regular"}} type="text" className="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </div>
        <button style={{ fontFamily: "ElMessiri-Bold" ,marginTop:"15px",backgroundColor:"#006d86" }} type="submit" className="btn btn-primary">اضافة الصنف</button>
      </form>
    </div>
  );
}

export default AddElement;