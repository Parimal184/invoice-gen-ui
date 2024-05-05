import React, { useEffect, useState } from "react";
import InvoiceForm from "./InvoiceForm";
import Popup from "../common/Popup";
import { useGlobalContext } from "../contexts/GlobalContext";

const Invoices = ({ invoices }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const { fetchBuyers, fetchProducts } = useGlobalContext();

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    useEffect(() => {
        fetchBuyers();
        fetchProducts();
    }, []);

    const handleSubmit = async (buyerData) => {};

    return (
        <div className="flex flex-col p-10">
            {isPopupOpen ? (
                <>
                    <h2 className="text-2xl font-bold mb-4">
                        Create New Buyer
                    </h2>
                    <InvoiceForm
                        onSubmit={handleSubmit}
                        togglePopup={togglePopup}
                    />
                </>
            ) : (
                <>
                    <div className="flex flex-row justify-between">
                        <h2 className="text-2xl font-bold mb-4">Buyers</h2>
                        <div className="flex justify-end mb-4">
                            <button
                                onClick={togglePopup}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                New Invoice
                            </button>
                        </div>
                    </div>
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-x-auto shadow border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Invoice Number
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Invoice Date
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Total Amount
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {invoices?.map((invoice) => (
                                            <tr key={invoice.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {invoice.invoiceNumber}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {invoice.invoiceDate}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {invoice.totalAmount}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Invoices;
