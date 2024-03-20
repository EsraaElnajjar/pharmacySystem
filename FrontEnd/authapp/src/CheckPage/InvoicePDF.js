import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, Font, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import arabicFont from '../fonts/ElMessiri-Regular.ttf';

Font.register({
  family: 'ArabicFont',
  src: arabicFont,
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontFamily: 'ArabicFont',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'ArabicFont',
  },
});

const InvoicePDF = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  // Function to handle PDF download
  const handleDownloadPDF = () => {
    // Logic to trigger PDF download
    // You can use selectedType, quantity, and totalPrice to generate the PDF
    // For now, let's log the selected options
    console.log("Selected Type:", selectedType);
    console.log("Quantity:", quantity);
    console.log("Total Price:", totalPrice);
  };

  return (
    <div>
      <PDFViewer width="80%" height={400}>
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text style={styles.title}>فاتورة الشراء</Text>
              <Text style={styles.text}>النوع: {selectedType ? selectedType.name : 'غير معروف'}</Text>
              <Text style={styles.text}>الكمية: {quantity}</Text>
              <Text style={styles.text}>السعر الإجمالي: {totalPrice}</Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
      <button onClick={handleDownloadPDF}>تنزيل الفاتورة</button>
    </div>
  );
};

export default InvoicePDF;
