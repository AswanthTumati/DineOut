import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { FoodContext } from './FoodContext';
import Products from './Products';

const FoodItems = () => {
  const { searchItem } = useContext(FoodContext);
  const [result, setResult] = useState({ hits: [] });

  const YOUR_APP_ID = '91fb9daf';
  const YOUR_APP_KEY = 'a5b7a2c8d898a13532699c795bffbe41';

  useEffect(() => {
    const fetchData = async () => {
      console.log("checking")
      const response = await axios.get(
        `https://api.edamam.com/search?q=${searchItem}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=30&calories=591-722&health=alcohol-free`
      );

      // Generate random prices for each item
      const itemsWithRandomPrices = response.data.hits.map(item => ({
        ...item,
        price: Math.floor(Math.random() * (160 - 50 + 1)) + 50 // Random price between 200 and 500
      }));

      setResult({ hits: itemsWithRandomPrices });
    };

    fetchData();

  }, [searchItem]);

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

      
      {result.hits.length > 0 ? <Products data={result.hits} /> : <p>... fetching Data</p>}
      </div>
    </div>
  );
};

export default FoodItems;
