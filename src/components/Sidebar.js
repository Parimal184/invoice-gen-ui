import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ChevronFirst, ChevronLast } from "lucide-react";
import logo from "../assets/invoice.png";

const SidebarContext = React.createContext();

export default function Sidebar({ expanded, setExpanded, setActiveLink, sidebarItems, activeLink, handleItemClick }) {
  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 -mt-6 flex justify-between items-center">
          <Link onClick={() => setActiveLink('/invoices')} to={"/"}>
            <img src={logo} className={`overflow-hidden transition-all h-24 ${expanded ? "w-60" : "w-0"}`} alt="Logo" />
          </Link>
          <button onClick={() => setExpanded(prev => !prev)} className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">
            {sidebarItems.map(item => (
              <SidebarItem key={item.link} {...item} active={activeLink === item.link} handleItemClick={handleItemClick} />
            ))}
          </ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, link, handleItemClick }) {
  const { expanded } = useContext(SidebarContext);
  return (
    <Link to={link} onClick={() => handleItemClick(link)}>
      <li className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-indigo-50 text-gray-600"}`}>
        {icon}
        <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>
      </li>
    </Link>
  );
}