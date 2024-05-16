import React, { useState } from "react";
import {
    PDFViewer,
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver"; // Import saveAs function from file-saver library

// Define CustomPDF component for generating the PDF
const CustomPDF = ({ invoice }) => {
    const [pdfGenerated, setPdfGenerated] = useState(false);

    // Function to generate the PDF
    const generatePDF = () => {
        setPdfGenerated(true);
    };

    // Function to trigger PDF download
    const downloadPDF = () => {
        const pdfContent = generatePDFContent();
        const blob = new Blob([pdfContent], { type: "application/pdf" });
        saveAs(blob, "custom.pdf"); // Use saveAs function to download the blob as PDF
    };

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
        },
    });

    // Define function to generate PDF content as a string
    const generatePDFContent = () => {
        return (
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
                                <Text style={styles.text}>
                                    RK ELECTRICAL & TRADERS
                                </Text>
                                <Text
                                    style={{ ...styles.text, marginTop: -13 }}
                                >
                                    RK ELECTRICAL & TRADERS
                                </Text>
                                <Text style={styles.text1}>
                                    201, ASHTVINAYAK RESIDENCY, ICHHAPOOR,
                                    HAZIRA ROAD, SURAT, GUJARAT - 394510
                                </Text>
                                <Text style={styles.text1}>
                                    GSTIN/UIN : 24BLHPT9865RZT
                                </Text>
                                <Text style={styles.text1}>
                                    Email : blhpt@gmail.com
                                </Text>
                                <Text style={styles.text1}>
                                    Mobile : 9624877184
                                </Text>
                            </View>
                            <View style={styles.box}>
                                <Text style={styles.text1}>Buyer</Text>
                                <Text style={styles.text}>
                                    KP SANGHVI JEWELS PVT LTD
                                </Text>
                                <Text
                                    style={{ ...styles.text, marginTop: -13 }}
                                >
                                    KP SANGHVI JEWELS PVT LTD
                                </Text>
                                <Text style={styles.text1}>
                                    201, ASHTVINAYAK RESIDENCY, ICHHAPOOR,
                                    HAZIRA ROAD, SURAT, GUJARAT - 394510
                                </Text>
                                <Text style={styles.text1}>
                                    GSTIN/UIN : 24BLHPT9865RZT
                                </Text>
                                <Text style={styles.text1}>
                                    Email : blhpt@gmail.com
                                </Text>
                                <Text style={styles.text1}>
                                    Mobile : 9624877184
                                </Text>
                            </View>
                        </View>
                        <View style={styles.innerBox}>
                            <View style={styles.invoiceNo}>
                                <Text
                                    style={{ fontSize: "9px", marginBottom: 1 }}
                                >
                                    Invoice No:
                                </Text>
                                <Text style={styles.text}>RK/23-24/98</Text>
                                <Text
                                    style={{ ...styles.text, marginTop: -13 }}
                                >
                                    RK/23-24/98
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
                                <Text style={styles.text}>22/03/2024</Text>
                                <Text
                                    style={{ ...styles.text, marginTop: -13 }}
                                >
                                    22/03/2024
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.table}>
                        <View
                            style={{ ...styles.tableRow, borderBottomWidth: 1 }}
                        >
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
                                <Text style={styles.tableHeadText}>
                                    HSN/SAC
                                </Text>
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
                        {[...Array(10)].map((_, index) => (
                            <View
                                style={{
                                    ...styles.tableRow,
                                    borderBottomWidth: 0,
                                    marginTop: -0.5,
                                }}
                            >
                                <View
                                    style={{ ...styles.tableCell, width: "4%" }}
                                >
                                    <Text style={styles.tableValueText}>1</Text>
                                </View>
                                <View
                                    style={{
                                        ...styles.tableCell,
                                        width: "45%",
                                    }}
                                >
                                    <Text style={styles.tableValueText}>
                                        Product name
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        ...styles.tableCell,
                                        width: "13%",
                                    }}
                                >
                                    <Text style={styles.tableValueText}>
                                        $10
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        ...styles.tableCell,
                                        width: "10%",
                                    }}
                                >
                                    <Text style={styles.tableValueText}>
                                        $10
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        ...styles.tableCell,
                                        width: "12%",
                                    }}
                                >
                                    <Text style={styles.tableValueText}>1</Text>
                                </View>
                                <View
                                    style={{
                                        ...styles.tableCell,
                                        width: "10%",
                                    }}
                                >
                                    <Text style={styles.tableValueText}>
                                        $10
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
                                        $10
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
                                <Text style={styles.tableValueText}>$10</Text>
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
                                <Text style={styles.tableValueText}>$10</Text>
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
                                <Text style={styles.tableValueText}>$10</Text>
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
                                <Text style={styles.tableValueText}>
                                    Round Off
                                </Text>
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
                                <Text style={styles.tableValueText}>$10</Text>
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
                                <Text style={styles.tableValueText}>$10</Text>
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
                            Indian Rupees Thirty Six Thousands Nine Hundres
                            Thyirty nine only
                        </Text>
                        <Text style={{ fontSize: "10px", marginTop: -11 }}>
                            Indian Rupees Thirty Six Thousands Nine Hundres
                            Thyirty nine only
                        </Text>
                    </View>
                    <View style={styles.table}>
                        <View
                            style={{ ...styles.tableRow, borderBottomWidth: 0 }}
                        >
                            <View
                                style={{
                                    ...styles.tableCell,
                                    width: "30%",
                                    paddingBottom: 1,
                                }}
                            >
                                <Text style={styles.tableHeadText}>
                                    HSN/SAC
                                </Text>
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
                                <Text style={styles.tableHeadText}>
                                    State Tax
                                </Text>
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
                        <View
                            style={{ ...styles.tableRow, borderBottomWidth: 0 }}
                        >
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
                        {[...Array(10)].map((_, index) => (
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
                                        65466
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
                                        1200
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
                                    <Text style={styles.tableHeadText}>12</Text>
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
                                        128
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
                                    <Text style={styles.tableHeadText}>25</Text>
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
                                        1254
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
                                        123456
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
                                <Text style={styles.tableHeadText}>31334</Text>
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
                                <Text style={styles.tableHeadText}>2817</Text>
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
                                <Text style={styles.tableHeadText}>2817</Text>
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
                                <Text style={styles.tableHeadText}>5678</Text>
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
                                <Text style={styles.tableHeadText}>31334</Text>
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
                                <Text style={styles.tableHeadText}>2817</Text>
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
                                <Text style={styles.tableHeadText}>2817</Text>
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
                                <Text style={styles.tableHeadText}>5678</Text>
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
                                Our Bank : UCO BANK, SURAT, HAZIRA BRANCH,
                                ICHHAPOOR
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
                                We declare that this invoice shows the actual
                                price of the goods{" "}
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
    };

    return (
        <div className="p-4">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={generatePDF}
            >
                Generate PDF
            </button>
            {pdfGenerated && (
                <div>
                    <PDFViewer className="w-full h-screen mt-4">
                        {generatePDFContent()}
                    </PDFViewer>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                        onClick={downloadPDF}
                    >
                        Download PDF
                    </button>
                </div>
            )}
        </div>
    );
};

export default CustomPDF;
