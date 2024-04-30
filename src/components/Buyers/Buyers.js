import React, { useEffect, useState } from 'react';
import ApiService from '../services/ApiService';
import BuyersForm from './BuyersForm';

const Buyers = ({ isSidebarOpen }) => {

    const [buyers, setBuyers] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const fetchBuyers = async () => {
        const buyersResponse = await ApiService.getBuyers();
        console.log("buyersResponse :", buyersResponse);
        setBuyers(buyersResponse);
    }
    useEffect(() => {
        fetchBuyers();
    }, [])

    const handleSubmit = async (buyerData) => {
        const newBuyer = await ApiService.addBuyer(buyerData);
        console.log("buyers data", newBuyer);
        togglePopup();
        fetchBuyers();
    }

    return (
        <div className="flex flex-col p-10">
            <div className='flex flex-row justify-between'>
                <h2 className="text-2xl font-bold mb-4">Buyers</h2>
                <div className="flex justify-end mb-4">
                    <button
                        onClick={togglePopup}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Create Buyer
                    </button>
                </div>
            </div>
            {isPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                    <div className="bg-white rounded-lg p-8 w-1/2">
                        <h2 className="text-2xl font-bold mb-4">Create New Buyer</h2>
                        {/* Form for creating new buyer */}
                        {/* Add your form fields and submit button here */}
                        <BuyersForm onSubmit={handleSubmit} togglePopup={togglePopup}/>
                        {/* <div className="flex justify-end">
                            <button
                                onClick={togglePopup}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                            >
                                Cancel
                            </button>
                        </div> */}
                    </div>
                </div>
            )}
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className={`overflow-x-auto ${isSidebarOpen ? "max-w-6xl" : ""} shadow border-b border-gray-200 sm:rounded-lg`}>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Address
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        GSTIN
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Mobile No
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Type
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {buyers?.map((buyer) => (
                                    <tr key={buyer.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{buyer.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{buyer.address}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{buyer.gstin}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{buyer.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{buyer.mobileNo}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{buyer.type}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Buyers;
