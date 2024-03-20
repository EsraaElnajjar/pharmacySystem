import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver'; 
import '../CheckPage/Check.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Check() {
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Fetch types of elements from the backend
    axios.get('http://localhost:3002/store/list')
      .then(response => {
        setTypes(response.data);
        if (response.data.length > 0) {
          setSelectedType(response.data[0]); // Select the first type by default
        }
      })
      .catch(error => console.error('Error fetching types of elements:', error));
  }, []);

  // Calculate total price based on selected type and quantity
  useEffect(() => {
    if (selectedType) {
      const { purchasePrice } = selectedType;
      const totalPrice = purchasePrice * quantity;
      setTotalPrice(totalPrice);
    }
  }, [selectedType, quantity]);

  // Load table data from localStorage when the component mounts
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('tableData'));
    if (storedData) {
      setTableData(storedData);
    }
  }, []);

  // Save table data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('tableData', JSON.stringify(tableData));
  }, [tableData]);

  const handleTypeChange = (e) => {
    const selectedNumber = parseInt(e.target.value);
    const selectedType = types.find(type => type.number === selectedNumber);
    setSelectedType(selectedType);
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToTable = () => {
    if (selectedType && quantity && totalPrice) {
      const newData = {
        type: selectedType.name,
        quantity: quantity,
        totalPrice: totalPrice
      };
      if (Array.isArray(tableData)) {
        setTableData(prevData => [...prevData, newData]);
      } else {
        setTableData([newData]);
      }
    }
  };

  const handleExportToExcel = () => {
    if (tableData.length > 0) {
      // Calculate total invoice amount
      const totalInvoiceAmount = getTotalInvoiceAmount();
  
      // Create a copy of tableData and add total invoice amount as a new row
      const dataWithTotal = [...tableData, { type: 'اجمالى الفاتورة', quantity: '', totalPrice: totalInvoiceAmount }];
  
      // Convert data to Excel sheet
      const worksheet = XLSX.utils.json_to_sheet(dataWithTotal);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      const excelBuffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
  
      // Save Excel file
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'فاتورة.xlsx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
  
      alert('تم تحميل فاتورة الشراء بنجاح , فاتورة اخرى؟');
      window.location.reload();
    } else {
      alert('لا يوجد بيانات ');
    }
  };
  

  const getTotalInvoiceAmount = () => {
    return tableData.reduce((total, item) => total + item.totalPrice, 0);
  };

  return (
    <div className="container mt-4">
      <h2 style={{ fontFamily: "ElMessiri-Bold", direction: "rtl",color:"#006d86",marginBottom:"5%" }}>فاتورة بيع نقدى</h2>
      <div  style={{direction:"rtl"}} className="mb-3">
        <label style={{ fontFamily: "ElMessiri-Bold" }} htmlFor="selectType" className="form-label">اختر اسم الصنف</label>
        <select style={{ fontFamily: "ElMessiri-Bold" }} id="selectType" className="form-select" value={selectedType ? selectedType.number : ''} onChange={handleTypeChange}>
          {types.map(type => (
            <option key={type.number} value={type.number}>{type.name}</option>
          ))}
        </select>
      </div>
      <div style={{direction:"rtl"}} className="mb-3">
        <label style={{ fontFamily: "ElMessiri-Bold" }} htmlFor="quantity" className="form-label">الكمية</label>
        <input style={{ fontFamily: "ElMessiri-Bold" }} type="number" id="quantity" className="form-control" value={quantity} onChange={handleQuantityChange} />
      </div>
      <div style={{direction:"rtl"}} className="mb-3">
        <label style={{ fontFamily: "ElMessiri-Bold" }} htmlFor="totalPrice" className="form-label">السعر الكلى </label>
        <input style={{ fontFamily: "ElMessiri-Bold" }} type="text" id="totalPrice" className="form-control" value={totalPrice} readOnly />
      </div>
      <button style={{ fontFamily: "ElMessiri-Bold",backgroundColor:"#006d86"}} className="btn btn-primary me-2" onClick={handleAddToTable}>اضف الى الفاتورة</button>
      <div className="mt-4">
        <h3 style={{ fontFamily: "ElMessiri-Bold",direction:"rtl"}}>الفاتورة</h3>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">اسم الصنف</th>
              <th scope="col">الكمية</th>
              <th scope="col"> السعر الكلى</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((data, index) => (
              <tr key={index}>
                <td>{data.type}</td>
                <td>{data.quantity}</td>
                <td>{data.totalPrice}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="2" style={{ fontFamily: "ElMessiri-Bold" ,textAlign:"start"}}>اجمالى الفاتورة:</td>
              <td style={{ fontFamily: "ElMessiri-Bold",color:"red" }}>{getTotalInvoiceAmount()}</td>
            </tr>
          </tbody>
        </table>
        <button style={{ fontFamily: "ElMessiri-Bold",backgroundColor:"#006d86"}} className="btn btn-success" onClick={handleExportToExcel}>طباعة الفاتورة كملف اكسيل</button>
      </div>
    </div>
  );
}

export default Check;
