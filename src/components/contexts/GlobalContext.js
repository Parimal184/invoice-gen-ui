import React, { createContext, useContext, useEffect, useState } from "react";
import ApiService from "../services/ApiService";

// Create a context object
const GlobalContext = createContext();

// Create a provider component
export const GlobalContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [buyers, setBuyers] = useState([]);
    const [seller, setSeller] = useState([]);
    const [invoices, setInvoices] = useState([]);

    return (
        <GlobalContext.Provider
            value={{
                products,
                setProducts,
                buyers,
                setBuyers,
                invoices,
                setInvoices,
                seller,
                setSeller,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

// Create a custom hook to use the product context
export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
