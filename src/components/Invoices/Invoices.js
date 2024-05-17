import React, { useEffect, useState } from "react";
import InvoiceForm from "./InvoiceForm";
import { useGlobalContext } from "../contexts/GlobalContext";
import moment from "moment";
import { FaEdit, FaTrashAlt, FaFilePdf } from "react-icons/fa";
import CustomPDF from "../custom-pdf/CustomPDF";
import ApiService from "../services/ApiService";
import Pagination from "../common/Pagination";

const Invoices = ({ isSidebarOpen }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const { invoices, setSeller, setBuyers, setProducts, setInvoices } =
        useGlobalContext();
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState();

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const fetchBuyers = async () => {
        try {
            const buyersResponse = await ApiService.getBuyers();
            const buyerData = buyersResponse?.content?.map((obj) => ({
                ...obj,
                name: obj.name.toUpperCase(),
            }));
            setSeller(buyerData.filter((item) => item.type === "SELLER")[0]);
            setBuyers(buyerData.filter((item) => item.type !== "SELLER"));
        } catch (error) {
            console.error("Error fetching buyers data:", error);
        }
    };

    const fetchProducts = async () => {
        try {
            const productResponse = await ApiService.getProducts(0, 1000);
            setProducts(
                productResponse?.content?.map((obj) => ({
                    ...obj,
                    name: obj.name.toUpperCase(),
                }))
            );
        } catch (error) {
            console.error("Error fetching buyers data:", error);
        }
    };

    const fetchInvoices = async () => {
        try {
            const invoiceResponse = await ApiService.getInvoices(
                currentPage,
                10
            );
            setTotalPages(invoiceResponse?.totalPages);
            const invoiceResponseNew = invoiceResponse?.content?.map((obj) => {
                // Parse the taxDetails JSON string into an object
                const taxDetails = JSON.parse(obj?.taxDetails);

                // Convert name properties to uppercase
                obj.sellerDetails.name = obj.sellerDetails.name.toUpperCase();
                obj.buyerDetails.name = obj.buyerDetails.name.toUpperCase();
                obj.sellerDetails.address =
                    obj.sellerDetails.address.toUpperCase();
                obj.buyerDetails.address =
                    obj.buyerDetails.address.toUpperCase();
                obj.products.forEach((product) => {
                    product.name = product.name.toUpperCase();
                });

                // Return the modified object
                return {
                    ...obj,
                    taxDetails: taxDetails,
                };
            });
            console.log("invoiceResponse :", invoiceResponseNew);
            setInvoices(invoiceResponseNew);
        } catch (error) {
            console.error("Error fetching buyers data:", error);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        fetchBuyers();
        fetchProducts();
    }, []);

    useEffect(() => {
        fetchInvoices();
    }, [currentPage]);

    const handleSubmit = async (buyerData) => {};

    const handleEdit = (invoiceId) => {
        // Logic for editing invoice
    };

    const handleDelete = async (invoiceId) => {
        await ApiService.deleteInvoice(invoiceId);
        fetchInvoices();
    };

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
                        <h2 className="text-2xl font-bold mb-4">Invoices</h2>
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
                            <div
                                className={`overflow-x-auto ${
                                    isSidebarOpen ? "max-w-6xl" : ""
                                } shadow border-b border-gray-200 sm:rounded-lg`}
                            >
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Buyer
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Invoice Number
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Invoice Date
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Total Amount
                                            </th>
                                            <th className="sticky right-0 bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {invoices?.map((invoice) => (
                                            <tr key={invoice.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {invoice.buyerDetails.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {invoice.invoiceNumber}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {moment(
                                                        invoice.invoiceDate
                                                    ).format("DD-MM-YYYY")}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {invoice.totalAmount}
                                                </td>
                                                <td className="sticky right-0 bg-white x-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <div className="flex items-center space-x-4">
                                                        <button
                                                            onClick={() =>
                                                                handleEdit(
                                                                    invoice.id
                                                                )
                                                            }
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    invoice.id
                                                                )
                                                            }
                                                        >
                                                            <FaTrashAlt />
                                                        </button>
                                                        <CustomPDF
                                                            icon={<FaFilePdf />}
                                                            invoice={invoice}
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Invoices;
