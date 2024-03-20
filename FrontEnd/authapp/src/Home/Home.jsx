import React from 'react';
import '../Home/Home.css';
import { useLocation, Link } from 'react-router-dom'; // Import Link from react-router-dom
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxes, faPlus, faMoneyBill, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function Home() {
  const location = useLocation();
  const userName = location.state && location.state.userName;

  return (
    <div style={{ direction: "rtl",}} className="homepage">
      <div className='headingHome'>
        <h1 className='hello'>مرحبا بك , {userName}  في الصيدلية المركزية</h1>
      </div>
      <hr />

      {/* Sidebar */}
      <div className="sidebar">
        <ul>
          <Link to="/Store" className="sidebar-link">
            <li className="side">
              <span>عرض محتوى المخزن</span>
              <FontAwesomeIcon icon={faBoxes} />

            </li>
          </Link>
          <Link to="/newElement" className="sidebar-link">
            <li className="side">
              <span>اضافة صنف جديد</span>
              <FontAwesomeIcon icon={faPlus} />

            </li>
          </Link>
          <Link to="/CheckPage" className="sidebar-link">
            <li className="side">
              <span>فاتورة بيع نقد</span>
              <FontAwesomeIcon icon={faMoneyBill} />

            </li>
          </Link>
          <li className="side">
            <span>نافذة المبيعات</span>
            <FontAwesomeIcon icon={faShoppingCart} />

          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
