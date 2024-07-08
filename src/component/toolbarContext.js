// MyContext.js
import React, { createContext, useState } from 'react';

const ToolBarContext = createContext();

const ToolbarProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartId, setCartId] = useState([]);

  const incrementCartCount = (c,newId) => {
    console.log("CART ID BEFORE ==>",(newId));
    if (cartId.includes(newId)) 
      {
          return;
      }
      setCartCount(c);
        cartId.push(newId);
        setCartId(newId == 0 ? [] : cartId);
    console.log("CART ID AFTER ==>",cartId);

    
  };

  return (
    <ToolBarContext.Provider value={{ cartCount, incrementCartCount }}>
      {children}
    </ToolBarContext.Provider>
  );
};

export { ToolBarContext, ToolbarProvider };