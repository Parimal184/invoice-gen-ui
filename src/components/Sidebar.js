import React, { useContext } from "react";
import { ChevronFirst, ChevronLast } from "lucide-react";
import logo from "../assets/invoice.png";

const SidebarContext = React.createContext();

export default function Sidebar({
    expanded,
    setExpanded,
    sidebarItems,
    activeItem,
    setActiveItem,
}) {
    const handleItemClick = (itemText) => {
        setActiveItem(itemText);
    };

    return (
        <aside className="h-screen">
            <nav className="h-full flex flex-col bg-white border-r shadow-sm">
                <div className="p-4 pb-2 -mt-6 flex justify-between items-center cursor-pointer">
                    <div onClick={() => handleItemClick("Invoices")}>
                        <img
                            src={logo}
                            className={`overflow-hidden transition-all h-24 ${
                                expanded ? "w-60" : "w-0"
                            }`}
                            alt="Logo"
                        />
                    </div>
                    <button
                        onClick={() => setExpanded((prev) => !prev)}
                        className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
                    >
                        {expanded ? <ChevronFirst /> : <ChevronLast />}
                    </button>
                </div>
                <SidebarContext.Provider value={{ expanded }}>
                    <ul className="flex-1 px-3">
                        {sidebarItems.map((item) => (
                            <li
                                key={item.link}
                                className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
                                    activeItem === item.text
                                        ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                                        : "hover:bg-gray-200 text-gray-700"
                                }`}
                                onClick={() => handleItemClick(item.text)}
                            >
                                <div className="flex items-center">
                                    {item.icon}
                                    {expanded && (
                                        <span
                                            className={`transition-all duration-300 ${
                                                expanded
                                                    ? "ml-3 opacity-100"
                                                    : "ml-0 opacity-0"
                                            }`}
                                            style={{
                                                transitionProperty:
                                                    "margin-left, opacity",
                                            }}
                                        >
                                            {item.text}
                                        </span>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </SidebarContext.Provider>
            </nav>
        </aside>
    );
}
