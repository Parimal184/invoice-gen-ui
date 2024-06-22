import React, { useState } from "react";
import Buyers from "./components/Buyers/Buyers";
import Sidebar from "./components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faShoppingBag,
    faUsers,
    faFileInvoice,
} from "@fortawesome/free-solid-svg-icons";
import Products from "./components/Products/Products";
import Invoices from "./components/Invoices/Invoices";

function App() {
    const [activeItem, setActiveItem] = useState("Invoices");
    const [expanded, setExpanded] = useState(true);

    const sidebarItems = [
        {
            link: "/invoices",
            icon: <FontAwesomeIcon icon={faFileInvoice} />,
            text: "Invoices",
        },
        {
            link: "/products",
            icon: <FontAwesomeIcon icon={faShoppingBag} />,
            text: "Products",
        },
        {
            link: "/buyers",
            icon: <FontAwesomeIcon icon={faUsers} />,
            text: "Buyers",
        },
    ];

    const handleItemClick = (link) => {
        setActiveItem(link);
    };

    console.log("active :", activeItem);

    // Render the component based on activeItem state
    let componentToRender;
    if (activeItem === "Products") {
        componentToRender = <Products isSidebarOpen={expanded} />;
    } else if (activeItem === "Buyers") {
        componentToRender = <Buyers isSidebarOpen={expanded} />;
    } else {
        componentToRender = <Invoices isSidebarOpen={expanded} />;
    }

    return (
        <div className="flex">
            <Sidebar
                expanded={expanded}
                setExpanded={setExpanded}
                sidebarItems={sidebarItems}
                handleItemClick={handleItemClick}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
            />
            <div className="flex-grow">{componentToRender}</div>
        </div>
    );
}

export default App;
