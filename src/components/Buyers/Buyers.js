import React, { useEffect, useState } from "react";
import BuyersForm from "./BuyersForm";
import Popup from "../common/Popup";
import ApiService from "../services/ApiService";
import { useGlobalContext } from "../contexts/GlobalContext";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Pagination from "../common/Pagination";
import SuccessPopup from "../common/SucessPopup";

const Buyers = ({ isSidebarOpen }) => {
    const { buyers, setBuyers, setSeller } = useGlobalContext();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [currentBuyer, setCurrentBuyer] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState();
    const [buyerToDelete, setBuyerToDelete] = useState(null);
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
    const [popupType, setPopupType] = useState("popup-success");

    const fetchBuyers = async () => {
        try {
            const buyersResponse = await ApiService.getBuyers(currentPage, 10);
            console.log("buyersResponse :", buyersResponse);
            setTotalPages(buyersResponse?.totalPages);
            const buyersData = buyersResponse?.content?.map((obj) => ({
                ...obj,
                name: obj.name.toUpperCase(),
            }));
            setSeller(buyersData.filter((item) => item.type === "SELLER")[0]);
            setBuyers(buyersData.filter((item) => item.type !== "SELLER"));
        } catch (error) {
            console.error("Error fetching buyers data:", error);
        }
    };

    useEffect(() => {
        fetchBuyers();
    }, [currentPage]);

    const handleSubmit = async (buyer) => {
        if (buyer.id) {
            await ApiService.updateBuyer(buyer);
            setPopupType("popup-update");
            setSuccessMessage("Buyer updated successfully.");
        } else {
            await ApiService.saveBuyer(buyer);
            setPopupType("popup-success");
            setSuccessMessage("Buyer added successfully.");
        }
        setTimeout(() => {
            setSuccessMessage("");
        }, 3000);
        togglePopup();
        fetchBuyers();
    };

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
        if (isPopupOpen) setCurrentBuyer(null); // Clear current buyer when closing popup
    };

    const toggleConfirmPopup = () => {
        setIsConfirmPopupOpen(!isConfirmPopupOpen);
    };

    const handleEdit = (buyer) => {
        setCurrentBuyer(buyer);
        togglePopup();
    };

    const handleDelete = async (buyerId) => {
        await ApiService.deleteBuyer(buyerId);
        setPopupType("popup-delete");
        setSuccessMessage("Buyer deleted successfully.");
        fetchBuyers();
    };

    const confirmDelete = (buyerId) => {
        setBuyerToDelete(buyerId);
        toggleConfirmPopup();
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="flex flex-col p-10">
            <div className="flex flex-row justify-between">
                <h2 className="text-2xl font-bold mb-4">Buyers</h2>
                <div className="flex justify-end mb-4">
                    <button
                        onClick={togglePopup}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Add Buyer
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
            <Popup isOpen={isPopupOpen} onClose={togglePopup}>
                <h2 className="text-2xl font-bold mb-4">
                    {currentBuyer ? "Edit Buyer" : "Add New Buyer"}
                </h2>
                <BuyersForm
                    onSubmit={handleSubmit}
                    togglePopup={togglePopup}
                    initialBuyer={currentBuyer}
                />
            </Popup>
            <Popup isOpen={isConfirmPopupOpen} onClose={toggleConfirmPopup}>
                <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
                <p>Are you sure you want to delete this buyer?</p>
                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        onClick={toggleConfirmPopup}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            handleDelete(buyerToDelete);
                            toggleConfirmPopup();
                        }}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Delete
                    </button>
                </div>
            </Popup>
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
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Buyer Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Address
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        GSTIN/UIN
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Email
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Mobile No
                                    </th>
                                    <th
                                        scope="col"
                                        className="right-0 bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider actions-column"
                                        style={{ width: "100px" }} // Fixed width for action buttons
                                    ></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {buyers?.map((buyer) => (
                                    <tr key={buyer.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 overflow-hidden overflow-ellipsis">
                                            {buyer.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 overflow-hidden overflow-ellipsis">
                                            {buyer.address}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 overflow-hidden overflow-ellipsis">
                                            {buyer.gstin}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 overflow-hidden overflow-ellipsis">
                                            {buyer.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 overflow-hidden overflow-ellipsis">
                                            {buyer.mobileNo}
                                        </td>
                                        <td className="px-6 py-4 sticky whitespace-nowrap bg-white right-0 text-sm text-gray-500">
                                            <div className="flex items-center space-x-4">
                                                <button
                                                    onClick={() =>
                                                        handleEdit(buyer)
                                                    }
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        confirmDelete(buyer.id)
                                                    }
                                                >
                                                    <FaTrashAlt />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default Buyers;
