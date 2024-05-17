import React, { useEffect, useState } from "react";
import {
    PDFViewer,
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFDownloadLink,
} from "@react-pdf/renderer";
import Popup from "../common/Popup";
import moment from "moment";
import numWords from "num-words";
import { useNavigate } from "react-router-dom";

// Define CustomPDF component for generating the PDF
const CustomPDF = ({ invoice, icon }) => {
    const navigate = useNavigate();
    const [pdfGenerated, setPdfGenerated] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [taxDetails, setTaxDetails] = useState();
    const [buyer, setBuyer] = useState();
    const [seller, setSeller] = useState();
    // Function to generate the PDF
    const generatePDF = () => {
        setPdfGenerated(true);
        togglePopup();
    };

    useEffect(() => {
        setTaxDetails(invoice?.taxDetails);
        setBuyer(invoice?.buyerDetails);
        setSeller(invoice?.sellerDetails);
    }, [invoice]);

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const onPdfDownload = () => {
        navigate("/");
    };

    function camelCase(str) {
        // Using replace method with regEx
        return str
            .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
                return index == 1 ? word.toLowerCase() : word.toUpperCase();
            })
            .replace(/\s+/g, " ");
    }

    const styles = StyleSheet.create({
        page: {
            flexDirection: "column",
            padding: 10,
        },
        header: {
            width: "100%",
            textAlign: "center",
        },
        section: {
            width: "100%",
            gap: -1,
        },
        text: {
            fontSize: 12,
            fontWeight: "bold",
        },
        text1: {
            fontSize: 10,
        },
        box: {
            width: "100%",
            height: "auto",
            borderWidth: 1, // Border width
            borderColor: "black", // Border color
            padding: 5,
        },
        container: {
            flexDirection: "row",
            width: "100%",
            gap: -1,
        },
        innerBox: {
            width: "100%",
            height: "auto",
            borderWidth: 1, // Border width
            borderColor: "black", // Border color
            flexDirection: "row",
        },
        invoiceNo: {
            width: "50%",
            height: "20%",
            borderBottomWidth: 1, // Border width
            borderColor: "black", // Border color
            padding: 5,
        },
        separator: {
            width: 1, // Separator width
            height: "20%", // Separator height to cover the height of the inner boxes
            backgroundColor: "black", // Separator color
        },
        table: {
            width: "100%",
            marginTop: -1,
            borderWidth: 1,
            borderColor: "black",
            // gap:-1
        },
        tableRow: {
            flexDirection: "row",
        },
        tableCell: {
            textAlign: "center",
            borderRightWidth: 1,
            borderBottomWidth: 0,
            borderColor: "black",
            padding: 5,
            paddingBottom: 1,
        },
        tableHeadText: {
            fontSize: "9px",
        },
        tableValueText: {
            fontSize: "9px",
            textAlign: "right",
        },
    });

    // Define function to generate PDF content as a string
    const GeneratePDFContent = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text fontWeight="bold" style={styles.text}>
                        Tax Invoice
                    </Text>
                </View>
                <View style={styles.container}>
                    <View style={styles.section}>
                        <View style={styles.box}>
                            <Text style={styles.text}>{seller?.name}</Text>
                            <Text style={{ ...styles.text, marginTop: -13 }}>
                                {seller?.name}
                            </Text>
                            <Text style={styles.text1}>{seller?.address}</Text>
                            <Text style={styles.text1}>
                                GSTIN/UIN : {seller?.gstin}
                            </Text>
                            <Text style={styles.text1}>
                                Email : {seller?.email}
                            </Text>
                            <Text style={styles.text1}>
                                Mobile : {seller?.mobileNo}
                            </Text>
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.text1}>Buyer</Text>
                            <Text style={styles.text}>{buyer?.name}</Text>
                            <Text style={{ ...styles.text, marginTop: -13 }}>
                                {buyer?.name}
                            </Text>
                            <Text style={styles.text1}>{buyer?.address}</Text>
                            <Text style={styles.text1}>
                                GSTIN/UIN : {buyer?.gstin}
                            </Text>
                            <Text style={styles.text1}>
                                Email : {buyer?.email}
                            </Text>
                            <Text style={styles.text1}>
                                Mobile : {buyer?.mobileNo}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.innerBox}>
                        <View style={styles.invoiceNo}>
                            <Text style={{ fontSize: "9px", marginBottom: 1 }}>
                                Invoice No:
                            </Text>
                            <Text style={styles.text}>
                                {invoice?.invoiceNumber}
                            </Text>
                            <Text style={{ ...styles.text, marginTop: -13 }}>
                                {invoice?.invoiceNumber}
                            </Text>
                        </View>
                        <View style={styles.separator}></View>
                        <View style={styles.invoiceNo}>
                            <Text
                                style={{
                                    fontSize: "9px",
                                    fontStyle: "bold",
                                }}
                            >
                                Dated
                            </Text>
                            <Text style={styles.text}>
                                {moment(invoice?.invoiceDate).format(
                                    "DD-MM-YYYY"
                                )}
                            </Text>
                            <Text style={{ ...styles.text, marginTop: -13 }}>
                                {moment(invoice?.invoiceDate).format(
                                    "DD-MM-YYYY"
                                )}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.table}>
                    <View style={{ ...styles.tableRow, borderBottomWidth: 1 }}>
                        <View
                            style={{
                                ...styles.tableCell,
                                width: "4%",
                                paddingBottom: 5,
                            }}
                        >
                            <Text style={styles.tableHeadText}>Sr.</Text>
                        </View>
                        <View
                            style={{
                                ...styles.tableCell,
                                width: "45%",
                                paddingBottom: 5,
                            }}
                        >
                            <Text style={styles.tableHeadText}>
                                Description of Goods
                            </Text>
                        </View>
                        <View
                            style={{
                                ...styles.tableCell,
                                width: "13%",
                                paddingBottom: 5,
                            }}
                        >
                            <Text style={styles.tableHeadText}>HSN/SAC</Text>
                        </View>
                        <View
                            style={{
                                ...styles.tableCell,
                                width: "10%",
                                paddingBottom: 5,
                            }}
                        >
                            <Text style={styles.tableHeadText}>Qty</Text>
                        </View>
                        <View
                            style={{
                                ...styles.tableCell,
                                width: "12%",
                                paddingBottom: 5,
                            }}
                        >
                            <Text style={styles.tableHeadText}>Rate</Text>
                        </View>
                        <View
                            style={{
                                ...styles.tableCell,
                                width: "10%",
                                paddingBottom: 5,
                            }}
                        >
                            <Text style={styles.tableHeadText}>Per</Text>
                        </View>
                        <View
                            style={{
                                ...styles.tableCell,
                                width: "10%",
                                paddingBottom: 5,
                                borderRightWidth: 0,
                            }}
                        >
                            <Text style={styles.tableHeadText}>Amount</Text>
                        </View>
                    </View>
                    {/* Product listing rows */}
                    {/* Example row */}
                    {taxDetails?.invoiceItems?.map((product, index) => (
                        <View
                            style={{
                                ...styles.tableRow,
                                borderBottomWidth: 0,
                                marginTop: -0.5,
                            }}
                        >
                            <View style={{ ...styles.tableCell, width: "4%" }}>
                                <Text
                                    style={{
                                        ...styles.tableValueText,
                                        textAlign: "center",
                                    }}
                                >
                                    {index + 1}
                                </Text>
                            </View>
                            <View
                                style={{
                                    ...styles.tableCell,
                                    width: "45%",
                                }}
                            >
                                <Text
                                    style={{
                                        ...styles.tableValueText,
                                        textAlign: "left",
                                    }}
                                >
                                    {product?.productName}
                                </Text>
                            </View>
                            <View
                                style={{
                                    ...styles.tableCell,
                                    width: "13%",
                                }}
                            >
                                <Text style={styles.tableValueText}>
                                    {product?.hsnCode}
                                </Text>
                            </View>
                            <View
                                style={{
                                    ...styles.tableCell,
                                    width: "10%",
                                }}
                            >
                                <Text style={styles.tableValueText}>
                                    {product?.quantity}
                                </Text>
                            </View>
                            <View
                                style={{
                                    ...styles.tableCell,
                                    width: "12%",
                                }}
                            >
                                <Text style={styles.tableValueText}>
                                    {Number(product?.rate).toFixed(2)}
                                </Text>
                            </View>
                            <View
                                style={{
                                    ...styles.tableCell,
                                    width: "10%",
                                }}
                            >
                                <Text style={styles.tableValueText}>
                                    {product?.per}
                                </Text>
                            </View>
                            <View
                                style={{
                                    ...styles.tableCell,
                                    width: "10%",
                                    borderRightWidth: 0,
                                }}
                            >
                                <Text style={styles.tableValueText}>
                                    {Number(product?.amount).toFixed(2)}
                                </Text>
                            </View>
                        </View>
                    ))}
                    <View style={{ ...styles.tableRow, marginTop: -0.5 }}>
                        <View style={{ ...styles.tableCell, width: "4%" }}>
                            <Text style={styles.tableValueText}></Text>
                        </View>
                        <View style={{ ...styles.tableCell, width: "45%" }}>
                            <Text style={styles.tableValueText}></Text>
                        </View>
                        <View style={{ ...styles.tableCell, width: "13%" }}>
                            <Text style={styles.tableValueText}></Text>
                        </View>
                        <View style={{ ...styles.tableCell, width: "10%" }}>
                            <Text style={styles.tableValueText}></Text>
                        </View>
                        <View style={{ ...styles.tableCell, width: "12%" }}>
                            <Text style={styles.tableValueText}></Text>
                        </View>
                        <View style={{ ...styles.tableCell, width: "10%" }}>
                            <Text style={styles.tableValueText}></Text>
                        </View>
                        <View
                            style={{
                                ...styles.tableCell,
                                width: "10%",
                                borderRightWidth: 0,
                                borderTopWidth: 1,
                            }}
                        >
                            <Text style={styles.tableValueText}>
                                {Number(invoice?.totalAmount).toFixed(2)}
                            </Text>
                        </View>
                    </View>
                    <View style={{ ...styles.tableRow, marginTop: -0.5 }}>
                        <View style={{ ...styles.tableCell, width: "4%" }}>
                            <Text style={styles.tableValueText}></Text>
                        </View>
                        <View
                            style={{
                                ...styles.tableCell,
                                width: "45%",
                                textAlign: "right",
                            }}
                        >
                            <Text style={styles.tableValueText}>CGST</Text>
                        </View>
                        <View style={{ ...styles.tableCell, width: "13%" }}>
                            <Text style={styles.tableValueText}></Text>
                        </View>
                        <View style={{ ...styles.tableCell, width: "10%" }}>
                            <Text style={styles.tableValueText}></Text>
                        </View>
                        <View style={{ ...styles.tableCell, width: "12%" }}>
                            <Text style={styles.tableValueText}></Text>
                        </View>
                        <View style={{ ...styles.tableCell, width: "10%" }}>
                            <Text style={styles.tableValueText}></Text>
                        </View>
                        <View
                            style={{
                                ...styles.tableCell,
                                width: "10%",
                                borderRightWidth: 0,
                            }}
                        >
                            <Text style={styles.tableValueText}>
                                {Number(invoice?.cgst).toFixed(2)}
                            </Text>
                        </View>
                    </View>
                    <View style={{ ...styles.tableRow, marginTop: -0.5 }}>
                        <View style={{ ...styles.tableCell, width: "4%" }}>
                            <Text style={styles.tableValueText}></Text>
                        </View>
                        <View
                            style={{
                                ...styles.tableCell,
                                width: "45%",
                                textAlign: "right",
                            }}
                        >
                            <Text style={styles.tableValueText}>SGST</Text>
                        </View>
                        <View style={{ ...styles.tableCell, width: "13%" }}>
                            <Text style={styles.tableValueText}></Text>
                        </View>
                        <View style={{ ...styles.tableCell, width: "10%" }}>
                            <Text style={styles.tableValueText}></Text>
                        </View>
                        <View style={{ ...styles.tableCell, width: "12%" }}>
                            <Text style={styles.tableValueText}></Text>
                        </View>
                        <View style={{ ...styles.tableCell, width: "10%" }}>
                            <Text style={styles.tableValueText}></Text>
                        </View>
                        <View
                            style={{
                                ...styles.tableCell,
                                width: "10%",
                                borderRightWidth: 0,
                            }}
                        >
                            <Text style={styles.tableValueText}>
                                {Number(invoice?.sgst).toFixed(2)}
                            </Text>
                        </View>
                    </View>
                    <View style={{ ...styles.tableRow, marginTop: -0.5 }}>
                        <View style={{ ...styles.tableCell, width: "4%" }}>
                            <Text style={styles.tableValueText}></Text>
                        </View>
                        <View
                            style={{
                                ...styles.tableCell,
                                width: "45%",
                                textAlign: "right",
                            }}
                        >
                            <Text style={styles.tableValueText}>Round Off</Text>
                        </View>
                        <View style={{ ...styles.tableCell, width: "13%" }}>
                            <Text style={styles.tableValueText}></Text>
                        </View>
                        <View style={{ ...styles.tableCell, width: "10%" }}>
                            <Text style={styles.tableValueText}></Text>
                        </View>
                        <View style={{ ...styles.tableCell, width: "12%" }}>
                            <Text style={styles.tableValueText}></Text>
                        </View>
                        <View style={{ ...styles.tableCell, width: "10%" }}>
                            <Text style={styles.tableValueText}></Text>
                        </View>
                        <View
                            style={{
                                ...styles.tableCell,
                                width: "10%",
                                borderRightWidth: 0,
                            }}
                        >
                            <Text style={styles.tableValueText}>
                                {Number(invoice?.roundOff)}
                            </Text>
                        </View>
                    </View>
                    <View style={{ ...styles.tableRow, borderTopWidth: 1 }}>
                        <View style={{ ...styles.tableCell, width: "4%" }}>
                            <Text style={styles.tableValueText}></Text>
                        </View>
                        <View
                            style={{
                                ...styles.tableCell,
                                width: "45%",
                                textAlign: "right",
                                fontWeight: "bold",
                            }}
                        >
                            <Text style={styles.tableValueText}>Total</Text>
                        </View>
                        <View style={{ ...styles.tableCell, width: "13%" }}>
                            <Text style={styles.tableValueText}></Text>
                        </View>
                        <View style={{ ...styles.tableCell, width: "10%" }}>
                            <Text style={styles.tableValueText}></Text>
                        </View>
                        <View style={{ ...styles.tableCell, width: "12%" }}>
                            <Text style={styles.tableValueText}></Text>
                        </View>
                        <View style={{ ...styles.tableCell, width: "10%" }}>
                            <Text style={styles.tableValueText}></Text>
                        </View>
                        <View
                            style={{
                                ...styles.tableCell,
                                width: "10%",
                                borderRightWidth: 0,
                            }}
                        >
                            <Text style={styles.tableValueText}>
                                {Number(
                                    taxDetails?.totalTaxableValue +
                                        taxDetails?.totalOfTotalTaxAmount +
                                        invoice?.roundOff
                                ).toFixed(2)}
                            </Text>
                        </View>
                    </View>
                    {/* More product rows */}
                </View>
                <View
                    style={{
                        ...styles.box,
                        paddingTop: 2,
                        paddingBottom: 2,
                        borderTopWidth: 0,
                    }}
                >
                    <Text style={{ fontSize: "6px" }}>
                        Amount Chargeable (In words)
                    </Text>
                    <Text style={{ fontSize: "10px", marginTop: 4 }}>
                        Indian Rupees{" "}
                        {camelCase(
                            numWords(
                                Number(
                                    taxDetails?.totalTaxableValue +
                                        taxDetails?.totalOfTotalTaxAmount +
                                        invoice?.roundOff
                                ).toFixed(2)
                            )
                        )}{" "}
                        Only
                    </Text>
                    <Text style={{ fontSize: "10px", marginTop: -11 }}>
                        Indian Rupees{" "}
                        {camelCase(
                            numWords(
                                Number(
                                    taxDetails?.totalTaxableValue +
                                        taxDetails?.totalOfTotalTaxAmount +
                                        invoice?.roundOff
                                ).toFixed(2)
                            )
                        )}{" "}
                        Only
                    </Text>
                </View>
                <View style={styles.table}>
                    <View style={{ ...styles.tableRow, borderBottomWidth: 0 }}>
                        <View
                            style={{
                                ...styles.tableCell,
                                width: "30%",
                                paddingBottom: 1,
                            }}
                        >
                            <Text style={styles.tableHeadText}>HSN/SAC</Text>
                        </View>
                        <View
                            style={{
                                ...styles.tableCell,
                                width: "15%",
                                paddingBottom: 1,
                            }}
                        >
                            <Text style={styles.tableHeadText}>
                                Taxable Value
                            </Text>
                        </View>
                        <View
                            style={{
                                ...styles.tableCell,
                                width: "20%",
                                paddingBottom: 1,
                            }}
                        >
                            <Text style={styles.tableHeadText}>State Tax</Text>
                        </View>
                        <View
                            style={{
                                ...styles.tableCell,
                                width: "20%",
                                paddingBottom: 1,
                            }}
                        >
                            <Text style={styles.tableHeadText}>
                                Central Tax
                            </Text>
                        </View>
                        <View
                            style={{
                                ...styles.tableCell,
                                width: "20%",
                                paddingBottom: 1,
                                borderRightWidth: 0,
                            }}
                        >
                            <Text style={styles.tableHeadText}>
                                Total Tax Amount
                            </Text>
                        </View>
                    </View>
                    <View style={{ ...styles.tableRow, borderBottomWidth: 0 }}>
                        <View
                            style={{ ...styles.tableCell, width: "30%" }}
                        ></View>
                        <View
                            style={{
                                ...styles.tableCell,
                                width: "15%",
                                padding: 2,
                            }}
                        ></View>
                        <View
                            style={{
                                ...styles.tableCell,
                                width: "10%",
                                padding: 2,
                                borderTopWidth: 1,
                            }}
                        >
                            <Text style={styles.tableHeadText}>Rate</Text>
                        </View>
                        <View
                            style={{
                                ...styles.tableCell,
                                width: "10%",
                                padding: 2,
                                borderTopWidth: 1,
                            }}
                        >
                            <Text style={styles.tableHeadText}>Amount</Text>
                        </View>
                        <View
                            style={{
                                ...styles.tableCell,
                                width: "10%",
                                padding: 2,
                                borderTopWidth: 1,
                            }}
                        >
                            <Text style={styles.tableHeadText}>Rate</Text>
                        </View>
                        <View
                            style={{
                                ...styles.tableCell,
                                width: "10%",
                                padding: 2,
                                borderTopWidth: 1,
                            }}
                        >
                            <Text style={styles.tableHeadText}>Amount</Text>
                        </View>
                        <View
                            style={{
                                ...styles.tableCell,
                                width: "20%",
                                padding: 2,
                                borderRightWidth: 0,
                            }}
                        ></View>
                    </View>
                    {taxDetails?.hsnCodeDetails?.map((taxDeatil, index) => (
                        <View
                            style={{
                                ...styles.tableRow,
                                borderBottomWidth: 0,
                                borderTopWidth: 1,
                            }}
                        >
                            <View
                                style={{
                                    ...styles.tableCell,
                                    width: "30%",
                                    padding: 2,
                                    textAlign: "right",
                                }}
                            >
                                <Text style={{ ...styles.tableHeadText }}>
                                    {taxDeatil?.hsnCode}
                                </Text>
                            </View>
                            <View
                                style={{
                                    ...styles.tableCell,
                                    width: "15%",
                                    padding: 2,
                                    textAlign: "right",
                                }}
                            >
                                <Text style={styles.tableHeadText}>
                                    {Number(taxDeatil?.taxableValue).toFixed(2)}
                                </Text>
                            </View>
                            <View
                                style={{
                                    ...styles.tableCell,
                                    width: "10%",
                                    padding: 2,
                                    textAlign: "right",
                                }}
                            >
                                <Text style={styles.tableHeadText}>
                                    {Number(taxDeatil?.stateTaxRate).toFixed(2)}
                                    %
                                </Text>
                            </View>
                            <View
                                style={{
                                    ...styles.tableCell,
                                    width: "10%",
                                    padding: 2,
                                    textAlign: "right",
                                }}
                            >
                                <Text style={styles.tableHeadText}>
                                    {Number(taxDeatil?.stateTaxAmount).toFixed(
                                        2
                                    )}
                                </Text>
                            </View>
                            <View
                                style={{
                                    ...styles.tableCell,
                                    width: "10%",
                                    padding: 2,
                                    textAlign: "right",
                                }}
                            >
                                <Text style={styles.tableHeadText}>
                                    {Number(taxDeatil?.centralTaxRate).toFixed(
                                        2
                                    )}
                                    %
                                </Text>
                            </View>
                            <View
                                style={{
                                    ...styles.tableCell,
                                    width: "10%",
                                    padding: 2,
                                    textAlign: "right",
                                }}
                            >
                                <Text style={styles.tableHeadText}>
                                    {Number(
                                        taxDeatil?.centralTaxAmount
                                    ).toFixed(2)}
                                </Text>
                            </View>
                            <View
                                style={{
                                    ...styles.tableCell,
                                    width: "20%",
                                    padding: 2,
                                    borderRightWidth: 0,
                                    textAlign: "right",
                                }}
                            >
                                <Text style={styles.tableHeadText}>
                                    {Number(taxDeatil?.totalTaxAmount).toFixed(
                                        2
                                    )}
                                </Text>
                            </View>
                        </View>
                    ))}
                    <View
                        style={{
                            ...styles.tableRow,
                            borderBottomWidth: 0,
                            borderTopWidth: 1,
                        }}
                    >
                        <View
                            style={{
                                ...styles.tableCell,
                                width: "30%",
                                padding: 2,
                                textAlign: "right",
                            }}
                        >
                            <Text style={styles.tableHeadText}>Total</Text>
                        </View>
                        <View
                            style={{
                                ...styles.tableCell,
                                width: "15%",
                                padding: 2,
                                textAlign: "right",
                            }}
                        >
                            <Text style={styles.tableHeadText}>
                                {Number(taxDetails?.totalTaxableValue).toFixed(
                                    2
                                )}
                            </Text>
                        </View>
                        <View
                            style={{
                                ...styles.tableCell,
                                width: "10%",
                                padding: 2,
                                textAlign: "right",
                            }}
                        >
                            <Text style={styles.tableHeadText}></Text>
                        </View>
                        <View
                            style={{
                                ...styles.tableCell,
                                width: "10%",
                                padding: 2,
                                textAlign: "right",
                            }}
                        >
                            <Text style={styles.tableHeadText}>
                                {Number(taxDetails?.totalStateTaxValue).toFixed(
                                    2
                                )}
                            </Text>
                        </View>
                        <View
                            style={{
                                ...styles.tableCell,
                                width: "10%",
                                padding: 2,
                                textAlign: "right",
                            }}
                        >
                            <Text style={styles.tableHeadText}></Text>
                        </View>
                        <View
                            style={{
                                ...styles.tableCell,
                                width: "10%",
                                padding: 2,
                                textAlign: "right",
                            }}
                        >
                            <Text style={styles.tableHeadText}>
                                {Number(
                                    taxDetails?.totalCentralTaxValue
                                ).toFixed(2)}
                            </Text>
                        </View>
                        <View
                            style={{
                                ...styles.tableCell,
                                width: "20%",
                                padding: 2,
                                textAlign: "right",
                                borderRightWidth: 0,
                            }}
                        >
                            <Text style={styles.tableHeadText}>
                                {Number(
                                    taxDetails?.totalOfTotalTaxAmount
                                ).toFixed(2)}
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            ...styles.tableRow,
                            borderBottomWidth: 0,
                            marginTop: -13,
                        }}
                    >
                        <View
                            style={{
                                ...styles.tableCell,
                                width: "30%",
                                padding: 2,
                                textAlign: "right",
                            }}
                        >
                            <Text style={styles.tableHeadText}>Total</Text>
                        </View>
                        <View
                            style={{
                                ...styles.tableCell,
                                width: "15%",
                                padding: 2,
                                textAlign: "right",
                            }}
                        >
                            <Text style={styles.tableHeadText}>
                                {Number(taxDetails?.totalTaxableValue).toFixed(
                                    2
                                )}
                            </Text>
                        </View>
                        <View
                            style={{
                                ...styles.tableCell,
                                width: "10%",
                                padding: 2,
                                textAlign: "right",
                            }}
                        >
                            <Text style={styles.tableHeadText}></Text>
                        </View>
                        <View
                            style={{
                                ...styles.tableCell,
                                width: "10%",
                                padding: 2,
                                textAlign: "right",
                            }}
                        >
                            <Text style={styles.tableHeadText}>
                                {Number(taxDetails?.totalStateTaxValue).toFixed(
                                    2
                                )}
                            </Text>
                        </View>
                        <View
                            style={{
                                ...styles.tableCell,
                                width: "10%",
                                padding: 2,
                                textAlign: "right",
                            }}
                        >
                            <Text style={styles.tableHeadText}></Text>
                        </View>
                        <View
                            style={{
                                ...styles.tableCell,
                                width: "10%",
                                padding: 2,
                                textAlign: "right",
                            }}
                        >
                            <Text style={styles.tableHeadText}>
                                {Number(
                                    taxDetails?.totalCentralTaxValue
                                ).toFixed(2)}
                            </Text>
                        </View>
                        <View
                            style={{
                                ...styles.tableCell,
                                width: "20%",
                                padding: 2,
                                textAlign: "right",
                                borderRightWidth: 0,
                            }}
                        >
                            <Text style={styles.tableHeadText}>
                                {Number(
                                    taxDetails?.totalOfTotalTaxAmount
                                ).toFixed(2)}
                            </Text>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        height: "18%",
                        borderWidth: 1,
                        borderTopWidth: 0,
                    }}
                >
                    <View
                        style={{
                            fontSize: "9px",
                            marginTop: "35px",
                            padding: 5,
                            lineHeight: 1.3,
                        }}
                    >
                        <Text>
                            Our Bank : UCO BANK, SURAT, HAZIRA BRANCH, ICHHAPOOR
                        </Text>
                        <Text>Account Number : 38587748584</Text>
                        <Text>IFSC CODE : UCB152656</Text>
                    </View>
                    <View
                        style={{
                            fontSize: "9px",
                            marginTop: "25px",
                            padding: 5,
                            lineHeight: 1.3,
                        }}
                    >
                        <Text>Description:</Text>
                        <Text>
                            We declare that this invoice shows the actual price
                            of the goods{" "}
                        </Text>
                        <Text>
                            described and that all particulars are true and
                            correct.
                        </Text>
                    </View>
                    <View
                        style={{
                            padding: 2.5,
                            textAlign: "right",
                            fontSize: "11px",
                            height: "50%",
                            width: "50%",
                            borderWidth: 1,
                            borderBottomWidth: 0,
                            borderRightWidth: 0,
                            alignSelf: "flex-end",
                            marginTop: -75,
                        }}
                    >
                        <Text>For RK ELECTRICAL & TRADERS</Text>
                        <Text style={{ marginTop: -10.5 }}>
                            For RK ELECTRICAL & TRADERS
                        </Text>
                        <Text style={{ marginTop: 45 }}>
                            Authorised Signatory
                        </Text>
                    </View>
                </View>
                <Text style={{ ...styles.header, fontSize: "9px" }}>
                    This is computer generated invoice
                </Text>
            </Page>
        </Document>
    );

    return (
        <div className="">
            <button
                className={
                    icon
                        ? ""
                        : "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                }
                onClick={generatePDF}
            >
                {icon ? icon : "Generate PDF"}
            </button>
            {pdfGenerated && (
                <Popup
                    isOpen={isPopupOpen}
                    onClose={togglePopup}
                    customStyles={{ height: "90%" }}
                >
                    <div className="w-full h-full mt-4 flex flex-col">
                        <PDFViewer className="flex-grow">
                            <GeneratePDFContent />
                        </PDFViewer>
                        <PDFDownloadLink
                            document={<GeneratePDFContent />}
                            fileName="somename.pdf"
                        >
                            {({ blob, url, loading, error }) =>
                                loading ? (
                                    "Loading document..."
                                ) : (
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                                        onClick={() => onPdfDownload()}
                                    >
                                        Download PDF
                                    </button>
                                )
                            }
                        </PDFDownloadLink>
                    </div>
                </Popup>
            )}
        </div>
    );
};

export default CustomPDF;
