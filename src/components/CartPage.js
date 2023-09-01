import React, { useContext } from 'react'
import { FoodContext } from './FoodContext'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import { DeleteFilled} from '@ant-design/icons';


const CartPage = () => {
    const {cartItems, setCartItems} = useContext(FoodContext);
    const subTotalPrice = cartItems.reduce((total, item) => total + (item.price*item.count), 0);
    const gst = (subTotalPrice*18)/100;
    const deliveryCharge = (subTotalPrice*5)/100;
    const grandTotal = subTotalPrice+gst+deliveryCharge;

    const navigate = useNavigate();

    const removeCartItem = (itemToRemove) => {
        const updatedCartItems = cartItems.filter((item) => item.recipe.label !== itemToRemove.recipe.label);
        setCartItems(updatedCartItems);
      };
    
      const changeItemQuantity = (itemToUpdate, newQuantity) => {
        if (newQuantity <= 0) {
          removeCartItem(itemToUpdate);
        } else {
          const updatedCartItems = cartItems.map((item) =>
            item.recipe.label === itemToUpdate.recipe.label ? { ...item, count: newQuantity } : item
          );
          setCartItems(updatedCartItems);
        }
      };

    const handlePlaceOrderClick = () => {
        navigate('/payment', { state: { grandTotal } }); 
      };

  return (
    <div>
        <div style={{
          maxHeight: 'calc(100vh - 250px)', // Adjust the value based on your layout
          overflowY: 'auto',
          overflowX: 'hidden',
          // Add the webkit-scrollbar styles
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0.1)',
        }}>
            
        
        <center>
        <h3>ITEM(S) ADDED</h3>
        </center>
        
        <div className='row'>
            <div className='col-md-2'></div>
            <div className='col-md-8'>
            <div className='card mb-3'>
                <div className='card-body'>
                    {cartItems.map((item, index) => (
                        <div className='row mb-4' key={index}>
                        <div className='row mb-2'>
                            <div className='col-md-5'>
                            <p className='card-text'>
                                {item.recipe.label} 
                                ({item.count}X)
                            </p>
                            </div>
                            <div className='col-md-2'>
                            <p className='card-text'>₹{(item.price * item.count).toFixed(2)}</p>
                            </div>
                            
                            <div className='col-md-4 d-flex align-items-center'>
                                <button className='btn btn-sm btn-outline-warning mx-1' style={{color:'orange'}} onClick={() => changeItemQuantity(item, item.count - 1)}>
                                    -
                                </button>
                                <span className='mx-1'>{item.count}</span>
                                <button className='btn btn-sm btn-outline-warning mx-1' style={{color:'orange'}} onClick={() => changeItemQuantity(item, item.count + 1)}>
                                    +
                                </button>
                                
                            </div>

                            <div className='col-md-1'>
                            <button className='btn btn-sm btn-danger mx-1 ' onClick={() => removeCartItem(item)}>
                                <DeleteFilled />
                                </button>
                            </div>

                        </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        
        </div>
        
        <div className='row'>
            <div className='col-md-2'></div>
            <div className='col-md-8'>
            <div className='card mb-3'>
            <div className='card-body'>
               <Link to={'/'} style={{ textDecoration: 'none', color:'orange' }}><p>Add more items</p></Link>
            </div>
            </div>
            </div>
            <div className='col-md-2'></div>
        </div>
        

        <div className='row'>
            <div className='col-md-2'></div>
            <div className='col-md-8'>
            <div className='card mb-3'>
            <div className='card-body'>
                <div className='row'>
                    <div className='col-md-4 mb-2'>
                        <div className='card-text'>Subtotal</div>
                    </div>
                    <div className='col-md-4 mb-2'>
                        <div className='card-text'>₹{subTotalPrice.toFixed(2)}</div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-4 mb-2'>
                        <div className='card-text'>GST</div>
                    </div>
                    <div className='col-md-4 mb-2'>
                        <div className='card-text'>₹{gst}</div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-4 mb-5'>
                        <div className='card-text'>Delivery Fee</div>
                    </div>
                    <div className='col-md-4 mb-5'>
                        <div className='card-text'>₹{deliveryCharge}</div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-4'>
                        <div className='card-text'>Grand Total</div>
                    </div>
                    <div className='col-md-4'>
                        <div className='card-text'>₹{grandTotal}</div>
                    </div>
                </div>
                
            </div>
        </div>
            </div>
            <div className='col-md-2'></div>
        </div>


        <div>
            <div className='row'>
            <center>
                {/*<button
                className='btn btn-primary'
                onClick={() => navigate('/payment')} 
                >
                Place Order
                </button>
                */}
                <button className='btn btn-primary' onClick={handlePlaceOrderClick}>
              Place Order
            </button>
            </center>
            </div>
        </div>
    </div>
    </div>
  )
}

export default CartPage