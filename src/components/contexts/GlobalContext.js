import React, { createContext, useContext, useEffect, useState } from "react";
import ApiService from "../services/ApiService";

// Create a context object
const GlobalContext = createContext();

// Create a provider component
export const GlobalContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [buyers, setBuyers] = useState([]);

    const fetchBuyers = async () => {
        try {
            const buyersResponse = await ApiService.getBuyers();
            setBuyers(buyersResponse);
        } catch (error) {
            console.error("Error fetching buyers data:", error);
        }
    };

    const fetchProducts = async () => {
        try {
            const productResponse = await ApiService.getProducts();
            setProducts(productResponse);
        } catch (error) {
            console.error("Error fetching buyers data:", error);
        }
    };

    return (
        <GlobalContext.Provider
            value={{
                products,
                setProducts,
                buyers,
                setBuyers,
                fetchBuyers,
                fetchProducts,
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
