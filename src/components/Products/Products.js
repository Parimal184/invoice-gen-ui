import React, { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import Popup from "../common/Popup";
import ApiService from "../services/ApiService";
import { useGlobalContext } from "../contexts/GlobalContext";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Pagination from "../common/Pagination";

const Products = ({ isSidebarOpen }) => {
    const { products, setProducts } = useGlobalContext();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(10);

    const fetchProducts = async () => {
        try {
            const productResponse = await ApiService.getProducts(
                currentPage,
                10
            );
            console.log("productResponse :", productResponse);
            setTotalPages(productResponse?.totalPages);
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
        fetchProducts();
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSubmit = async (product) => {
        if (product.id) {
            // Update existing product
            await ApiService.updateProduct(product);
        } else {
            // Create new product
            await ApiService.saveProduct(product);
        }
        togglePopup();
        fetchProducts();
    };

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
        if (isPopupOpen) setCurrentProduct(null); // Clear current product when closing popup
    };

    const handleEdit = (product) => {
        setCurrentProduct(product);
        togglePopup();
    };

    const handleDelete = async (productId) => {
        await ApiService.deleteProduct(productId);
        fetchProducts();
    };

    return (
        <div className="flex flex-col p-10">
            <div className="flex flex-row justify-between">
                <h2 className="text-2xl font-bold mb-4">Products</h2>
                <div className="flex justify-end mb-4">
                    <button
                        onClick={togglePopup}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Create Product
                    </button>
                </div>
            </div>
            <Popup isOpen={isPopupOpen} onClose={togglePopup}>
                <h2 className="text-2xl font-bold mb-4">
                    {currentProduct ? "Edit Product" : "Create New Product"}
                </h2>
                <ProductForm
                    onSubmit={handleSubmit}
                    togglePopup={togglePopup}
                    initialProduct={currentProduct}
                />
            </Popup>
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div
                        className={`overflow-x-auto ${
                            isSidebarOpen ? "max-w-6xl" : ""
                        } shadow border-b border-gray-200 sm:rounded-lg`}
                    >
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50 text-nowrap">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Product Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        HSN/SAC Code
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Rate
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        State Tax Rate
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Central Tax Rate
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Unit
                                    </th>
                                    <th className="sticky bg-gray-50 right-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {products?.map((product) => (
                                    <tr key={product.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {product.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {product.hsnSac}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {product.rate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {product.stateTaxRate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {product.centralTaxRate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {product.unit}
                                        </td>
                                        <td className="sticky right-0 bg-white px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="flex items-center space-x-4">
                                                <button
                                                    onClick={() =>
                                                        handleEdit(product)
                                                    }
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(product.id)
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
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default Products;
