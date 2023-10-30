import React, { useContext } from 'react'
import { FoodContext } from './FoodContext'


const Products = ({data}) => {
    const {cartItems,setCartItems} = useContext(FoodContext);

    

    const addCart = (item) => {
        const existingItem = cartItems.find((cartItem) => cartItem.recipe.label === item.recipe.label);
    
        if (existingItem) {
          const updatedCartItems = cartItems.map((cartItem) =>
            cartItem.recipe.label === item.recipe.label
              ? { ...cartItem, count: cartItem.count + 1 }
              : cartItem
          );
          setCartItems(updatedCartItems);
        } else {
          setCartItems((prevCartItems) => [...prevCartItems, { ...item, count: 1 }]);
        }
      };
      

  return (
    <div>
        
        <div className='row'>
            {data.map((item,index)=>(
                <div className='col-md-3 mb-4' key={index}>
                    <div className='card'>
                        <img className='card-image-top' src={item.recipe.image} alt={item.recipe.label}></img>
                        <div className='card-body' >
                            <center>
                                <h5 className='card-title'>{item.recipe.label}</h5>
                                <p className='card-text'>Calaries gain : {Math.round(item.recipe.calories)}</p>
                                <p className='card-text'>Price: ₹{item.price}</p>
                                {/*<a href='#' className='btn btn-warning' onClick={()=>addCart(item)}>Add</a>*/}
                                <button className='btn btn-warning' onClick={() => addCart(item)}>Add</button>

                            </center>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Products