import React, { useContext } from 'react'
import { FoodContext } from './FoodContext'
import { Link } from 'react-router-dom';
import { ShoppingCartOutlined} from '@ant-design/icons';

const Navbar = () => {
    const {cartItems} = useContext(FoodContext);
    const cartLength = cartItems.length;
  return (
    <div>
        {/*<!--------Navbar----------->*/}
    <nav class="navbar navbar-expand-md navbar-light">
        <div class="container-xxl">
            <a href="#intro" class="navbar-brand">
                <span class="fw-bold text-secondary">
                    <i class="bi bi-book-half"></i>
                    <Link to={'/'} style={{textDecoration:'none', color:'orange'}}><b>DineOut</b></Link> 
                </span>
            </a>

            {/*<!-------Navbar Toggle collapse--------->*/}
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav" aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            {/*<!------Navbar links------>*/}
            <div class="collapse navbar-collapse justify-content-end allign-center" id="main-nav">
                <ul class="navbar-nav">
                    {/*<!--
                    <li class="nav-item">
                        <a href="#topics" class="nav-link">About the store</a>
                    </li>
                    <li class="nav-item">
                        <a href="#reviews" class="nav-link">Reviews</a>
                    </li>
                    >*/}
                    <li class="nav-item ms-2 d-none d-md-inline">
                        
                        <Link to={'/cart'} className='btn btn-secondary' style={{color:'orange'}}> 
                        <ShoppingCartOutlined style={{ fontSize: '25px', color: 'orange' }}/> {cartLength}</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    </div>
  )
}

export default Navbar