import React, { useEffect, useState } from "react";
import InvoiceForm from "./InvoiceForm";
import { useGlobalContext } from "../contexts/GlobalContext";
import moment from "moment";
import { FaEdit, FaTrashAlt, FaFilePdf } from "react-icons/fa";
import CustomPDF from "../custom-pdf/CustomPDF";
import ApiService from "../services/ApiService";
import Pagination from "../common/Pagination";
import SuccessPopup from "../common/SucessPopup";
import Popup from "../common/Popup"; // Assuming you have a Popup component

const Invoices = ({ isSidebarOpen }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const { invoices, setSeller, setBuyers, setProducts, setInvoices } =
        useGlobalContext();
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState();
    const [invoiceToUpdate, setInvoiceToUpdate] = useState();
    const [successMessage, setSuccessMessage] = useState("");
    const [popupType, setPopupType] = useState("popup-success");
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false); // State for confirmation popup
    const [invoiceToDelete, setInvoiceToDelete] = useState(null); // State to store invoice ID to delete

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const toggleConfirmPopup = (invoiceId) => {
        setIsConfirmPopupOpen(!isConfirmPopupOpen);
        setInvoiceToDelete(invoiceId);
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
            setInvoices(invoiceResponseNew);
        } catch (error) {
            console.error("Error fetching invoices data:", error);
        }
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

    useEffect(() => {
        fetchBuyers();
        fetchProducts();
    }, []);

    useEffect(() => {
        fetchInvoices();
    }, [currentPage, successMessage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSubmit = async (buyerData) => {
        // Handle form submission
    };

    const handleEdit = (invoice) => {
        setInvoiceToUpdate(invoice);
        togglePopup();
    };

    const handleDelete = async (invoiceId) => {
        try {
            await ApiService.deleteInvoice(invoiceId);
            fetchInvoices();
            setSuccessMessage("Invoice deleted successfully.");
            setPopupType("popup-delete");
            setTimeout(() => {
                setSuccessMessage("");
            }, 3000); // Clear success message after 3 seconds
        } catch (error) {
            console.error("Error deleting invoice:", error);
        } finally {
            toggleConfirmPopup(); // Close confirmation popup after deletion
        }
    };

    return (
        <div className="flex flex-col p-10">
            {isPopupOpen ? (
                // Invoice Form Popup
                <>
                    <h2 className="text-2xl font-bold mb-4">
                        Create New Invoice
                    </h2>
                    <InvoiceForm
                        onSubmit={handleSubmit}
                        togglePopup={togglePopup}
                        invoiceToUpdate={invoiceToUpdate}
                        setSuccessMessage={setSuccessMessage}
                        setPopupType={setPopupType}
                        successMessage={successMessage}
                        popupType={popupType}
                    />
                </>
            ) : (
                // Main Invoices View
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
                    {successMessage && (
                        <SuccessPopup
                            message={successMessage}
                            onClose={() => setSuccessMessage("")}
                            type={popupType}
                        />
                    )}
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
                                                    {Number(
                                                        invoice.totalAmount
                                                    ).toFixed(2)}
                                                </td>
                                                <td className="sticky right-0 bg-white x-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <div className="flex items-center space-x-4">
                                                        <button
                                                            disabled
                                                            onClick={() =>
                                                                handleEdit(
                                                                    invoice
                                                                )
                                                            }
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                toggleConfirmPopup(
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
            {/* Confirmation Popup */}
            <Popup isOpen={isConfirmPopupOpen} onClose={toggleConfirmPopup}>
                <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
                <p>Are you sure you want to delete this invoice?</p>
                <div className="flex justify-end space-x-4 mt-4">
                    <button
                        onClick={toggleConfirmPopup}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => handleDelete(invoiceToDelete)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Delete
                    </button>
                </div>
            </Popup>
        </div>
    );
};

export default Invoices;
