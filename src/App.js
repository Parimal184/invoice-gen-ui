import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
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
    const [activeLink, setActiveLink] = useState(
        localStorage.getItem("activeLink") || "/invoices"
    );
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

    useEffect(() => {
        localStorage.setItem("activeLink", activeLink);
    }, [activeLink]);

    const handleItemClick = (link) => {
        setActiveLink(link);
    };

    return (
        <Router>
            <div className="flex">
                <Sidebar
                    expanded={expanded}
                    setExpanded={setExpanded}
                    setActiveLink={setActiveLink}
                    sidebarItems={sidebarItems}
                    activeLink={activeLink}
                    handleItemClick={handleItemClick}
                />
                <div className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Navigate to="/invoices" />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/invoices" element={<Invoices />} />
                        <Route
                            path="/buyers"
                            element={<Buyers isSidebarOpen={expanded} />}
                        />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
