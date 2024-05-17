import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { Autocomplete, TextField } from "@mui/material";
import ApiService from "../services/ApiService";
import CustomPDF from "../custom-pdf/CustomPDF";

const InvoiceForm = ({ togglePopup }) => {
    const [selectedBuyer, setSelectedBuyer] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null); // Define selectedProduct state
    const [selectedQuantity, setSelectedQuantity] = useState(0); // Define selectedQuantity state
    const [totalAmount, setTotalAmount] = useState(0);
    const [invoiceItems, setInvoiceItems] = useState([]);
    const [buyerDetails, setBuyerDetails] = useState(null);
    const { buyers, products, fetchInvoices, seller } = useGlobalContext();
    const [invoice, setInvoice] = useState();

    useEffect(() => {
        const buyer = buyers.find((buyer) => buyer.name === selectedBuyer);
        setBuyerDetails(buyer);
    }, [selectedBuyer, buyers]);

    const handleSelectProduct = (productId) => {
        const product = products.find((product) => product.id == productId);
        setSelectedProduct(product);
    };

    const handleAddItem = () => {
        if (selectedProduct && selectedQuantity > 0) {
            const existingItemIndex = invoiceItems.findIndex(
                (item) => item.productName === selectedProduct.name
            );

            if (existingItemIndex !== -1) {
                const updatedItems = [...invoiceItems];
                updatedItems[existingItemIndex].quantity += selectedQuantity;
                updatedItems[existingItemIndex].amount +=
                    selectedProduct.rate * selectedQuantity;
                setInvoiceItems(updatedItems);
            } else {
                const newItem = {
                    id: selectedProduct.id,
                    productName: selectedProduct.name,
                    quantity: selectedQuantity,
                    amount: selectedProduct.rate * selectedQuantity,
                    hsnCode: selectedProduct.hsnSac,
                    rate: selectedProduct.rate,
                    per: selectedProduct.unit,
                };
                setInvoiceItems([...invoiceItems, newItem]);
            }

            setTotalAmount(
                totalAmount + selectedProduct.rate * selectedQuantity
            );
            setSelectedProduct(null);
            setSelectedQuantity(0);
        }
    };

    const generateInvoice = () => {
        debugger;
        const taxDetails = generateTaxDetails();
        taxDetails.invoiceItems = invoiceItems;
        const invoice = {
            sellerDetailsId: seller?.id,
            buyerDetailsId: buyerDetails.id,
            taxDetails: JSON.stringify(taxDetails),
            totalAmount: totalAmount,
            sgst: taxDetails.totalStateTaxValue,
            cgst: taxDetails.totalCentralTaxValue,
            productIds: invoiceItems.map((item) => {
                return item.id;
            }),
        };

        return invoice;
    };

    const handleSubmit = async () => {
        const invoice = generateInvoice();
        const invoiceResp = await ApiService.saveInvoice(invoice);
        invoiceResp.taxDetails = JSON.parse(invoiceResp.taxDetails);
        setInvoice(invoiceResp);
    };

    const generateTaxDetails = () => {
        // Initialize tax details object
        let taxDetails = {
            hsnCodeDetails: [],
            totalTaxableValue: 0,
            totalStateTaxValue: 0,
            totalCentralTaxValue: 0,
            totalOfTotalTaxAmount: 0,
        };

        // Temporary object to store tax details for each HSN code
        let tempTaxDetails = {};

        // Iterate through invoice items to calculate tax details
        invoiceItems.forEach((item) => {
            const { productName, quantity, amount } = item;
            const product = products.find(
                (product) => product.name == productName
            );

            // Calculate tax details for the item
            const taxRateState = product.stateTaxRate;
            const taxRateCentral = product.centralTaxRate;
            const taxableValue = amount; // Assuming amount is taxable
            const stateTaxAmount = Number(
                ((taxableValue * taxRateState) / 100).toFixed(2)
            );
            const centralTaxAmount = Number(
                ((taxableValue * taxRateCentral) / 100).toFixed(2)
            );
            const totalTaxAmount = Number(
                (stateTaxAmount + centralTaxAmount).toFixed(2)
            );

            // Update total taxable value
            taxDetails.totalTaxableValue += taxableValue;

            // Group items based on HSN code
            if (tempTaxDetails.hasOwnProperty(product.hsnSac)) {
                // If HSN code already exists, update tax details
                tempTaxDetails[product.hsnSac].taxableValue += taxableValue;
                tempTaxDetails[product.hsnSac].stateTaxAmount += stateTaxAmount;
                tempTaxDetails[product.hsnSac].centralTaxAmount +=
                    centralTaxAmount;
                tempTaxDetails[product.hsnSac].totalTaxAmount += totalTaxAmount;
                tempTaxDetails[product.hsnSac].taxableValue += item?.amount;
            } else {
                // If HSN code is new, add tax details
                tempTaxDetails[product.hsnSac] = {
                    hsnCode: product.hsnSac,
                    stateTaxRate: taxRateState,
                    centralTaxRate: taxRateCentral,
                    stateTaxAmount: stateTaxAmount,
                    centralTaxAmount: centralTaxAmount,
                    totalTaxAmount: totalTaxAmount,
                    taxableValue: item.amount,
                };
            }
        });

        // Convert tempTaxDetails to array and add to taxDetails
        taxDetails.hsnCodeDetails = Object.values(tempTaxDetails);

        // Calculate total tax amounts
        taxDetails.hsnCodeDetails.forEach((product) => {
            taxDetails.totalStateTaxValue = Number(
                (
                    taxDetails.totalStateTaxValue + product.stateTaxAmount
                ).toFixed(2)
            );
            taxDetails.totalCentralTaxValue = Number(
                (
                    taxDetails.totalCentralTaxValue + product.centralTaxAmount
                ).toFixed(2)
            );
            taxDetails.totalOfTotalTaxAmount = Number(
                (
                    taxDetails.totalOfTotalTaxAmount + product.totalTaxAmount
                ).toFixed(2)
            );
        });

        return taxDetails;
    };

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 overflow-y-auto mb-4">
            <label className="block mb-2">Select Buyer:</label>
            <select
                value={selectedBuyer}
                onChange={(e) => setSelectedBuyer(e.target.value)}
                className="border border-gray-400 rounded px-3 py-2 mb-4 w-full"
            >
                <option value="">Select Buyer</option>
                {buyers?.map((buyer) => (
                    <option key={buyer.id} value={buyer.name}>
                        {buyer.name}
                    </option>
                ))}
            </select>
            {/* {buyerDetails && (
                <div>
                    <h3>Buyer Details:</h3>
                    <p>Name: {buyerDetails.name}</p>
                    <p>Address: {buyerDetails.address}</p>
                </div>
            )} */}
            <br></br>
            <label className="block font-bold text-base mb-2">Products:</label>
            <table className="w-full border-collapse border border-gray-300 mb-4">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2 text-left">Product Name</th>
                        <th className="px-4 py-2 text-left">Quantity</th>
                        <th className="px-4 py-2 text-left">Rate</th>
                        <th className="px-4 py-2 text-left">Amount</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {invoiceItems.map((item, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">
                                {item.productName}
                            </td>
                            <td className="border px-4 py-2">
                                {item.quantity}
                            </td>
                            <td className="border px-4 py-2">
                                {
                                    products.find(
                                        (product) =>
                                            product.name === item.productName
                                    )?.rate
                                }
                            </td>
                            <td className="border px-4 py-2">{item.amount}</td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => {
                                        const updatedItems = [...invoiceItems];
                                        const removedItem = updatedItems.splice(
                                            index,
                                            1
                                        )[0];
                                        setInvoiceItems(updatedItems);
                                        setTotalAmount(
                                            totalAmount - removedItem.amount
                                        );
                                    }}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                    {invoiceItems.length < 11 && (
                        <tr>
                            <td className="border w-auto px-4 py-2">
                                <Autocomplete
                                    value={selectedProduct}
                                    onChange={(event, newValue) =>
                                        handleSelectProduct(newValue.id)
                                    }
                                    options={products}
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Select Product"
                                            variant="outlined"
                                            sx={{
                                                height: "100%",
                                                width: "400px",
                                                "& .MuiOutlinedInput-root": {
                                                    height: "100%",
                                                },
                                            }}
                                        />
                                    )}
                                />
                            </td>
                            <td className="border px-4 py-2">
                                <input
                                    type="number"
                                    min="0"
                                    value={selectedQuantity}
                                    onChange={(e) =>
                                        setSelectedQuantity(
                                            parseInt(e.target.value)
                                        )
                                    }
                                    className="border border-gray-400 rounded px-3 py-2 w-full"
                                />
                            </td>
                            <td className="border px-4 py-2">
                                {selectedProduct ? selectedProduct.rate : ""}
                            </td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={handleAddItem}
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Add
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <label className="block mb-2">Total Amount:</label>
            <input
                type="text"
                value={totalAmount}
                readOnly
                className="border border-gray-400 rounded px-3 py-2 mb-4 w-full"
            />
            <div className="flex items-center justify-between">
                <button
                    onClick={() => handleSubmit()}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Generate Invoice
                </button>
                {invoice && <CustomPDF invoice={invoice} />}
                <button
                    onClick={togglePopup}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default InvoiceForm;
