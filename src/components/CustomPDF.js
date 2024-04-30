import React, { useState } from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { saveAs } from 'file-saver'; // Import saveAs function from file-saver library


// Define CustomPDF component for generating the PDF
const CustomPDF = () => {
    const [pdfGenerated, setPdfGenerated] = useState(false);

    // Function to generate the PDF
    const generatePDF = () => {
        setPdfGenerated(true);
    };

    // Function to trigger PDF download
    const downloadPDF = () => {
        const pdfContent = generatePDFContent();
        const blob = new Blob([pdfContent], { type: 'application/pdf' });
        saveAs(blob, 'custom.pdf'); // Use saveAs function to download the blob as PDF
    };

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            padding: 10,
        },
        header: {
            width: "100%",
            textAlign: "center"
        },
        section: {
            width: "100%",
            gap: -1
        },
        text: {
            fontSize: 12,
            fontWeight: 'bold',
        },
        text1: {
            fontSize: 10,
        },
        box: {
            width: "100%",
            height: "auto",
            borderWidth: 1, // Border width
            borderColor: 'black', // Border color
            padding: 5
        },
        container: {
            flexDirection: "row",
            width: "100%",
            gap: -1
        },
        innerBox: {
            width: "100%",
            height: "auto",
            borderWidth: 1, // Border width
            borderColor: 'black', // Border color
            flexDirection: "row"
        },
        invoiceNo: {
            width: "50%",
            height: "20%",
            borderBottomWidth: 1, // Border width
            borderColor: 'black', // Border color
            padding: 5
        },
        separator: {
            width: 1, // Separator width
            height: "20%", // Separator height to cover the height of the inner boxes
            backgroundColor: 'black', // Separator color
        },
        table: {
            width: "100%",
            // marginTop: 10,
            borderWidth: .1,
            borderColor: 'black',
            gap:-1
        },
        tableRow: {
            flexDirection: 'row',
        },
        tableCell: {
            width: '25%',
            borderWidth: 1,
            borderColor: 'black',
            padding: 5,
            gap:-1
            
        },
        tableHeadText: {
            fontSize: "9px"
        }
    });

    // Define function to generate PDF content as a string
    const generatePDFContent = () => {
        return (
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.header}>
                        <Text fontWeight="bold" style={styles.text}>Tax Invoice</Text>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.section}>
                            <View style={styles.box}>
                                <Text style={styles.text}>RK ELECTRICAL & TRADERS</Text>
                                <Text style={{ ...styles.text, marginTop: -13 }}>RK ELECTRICAL & TRADERS</Text>
                                <Text style={styles.text1}>201, ASHTVINAYAK RESIDENCY, ICHHAPOOR, HAZIRA ROAD, SURAT, GUJARAT - 394510</Text>
                                <Text style={styles.text1}>GSTIN/UIN : 24BLHPT9865RZT</Text>
                                <Text style={styles.text1}>Email : blhpt@gmail.com</Text>
                                <Text style={styles.text1}>Mobile : 9624877184</Text>
                            </View>
                            <View style={styles.box}>
                                <Text style={styles.text1}>Buyer</Text>
                                <Text style={styles.text}>KP SANGHVI JEWELS PVT LTD</Text>
                                <Text style={{ ...styles.text, marginTop: -13 }}>KP SANGHVI JEWELS PVT LTD</Text>
                                <Text style={styles.text1}>201, ASHTVINAYAK RESIDENCY, ICHHAPOOR, HAZIRA ROAD, SURAT, GUJARAT - 394510</Text>
                                <Text style={styles.text1}>GSTIN/UIN : 24BLHPT9865RZT</Text>
                                <Text style={styles.text1}>Email : blhpt@gmail.com</Text>
                                <Text style={styles.text1}>Mobile : 9624877184</Text>
                            </View>
                        </View>
                        <View style={styles.innerBox}>
                            <View style={styles.invoiceNo}>
                                <Text style={{ fontSize: "9px", marginBottom: 1 }}>Invoice No:</Text>
                                <Text style={styles.text}>RK/23-24/98</Text>
                                <Text style={{ ...styles.text, marginTop: -13 }}>RK/23-24/98</Text>
                            </View>
                            <View style={styles.separator}></View>
                            <View style={styles.invoiceNo}>
                                <Text style={{ fontSize: "9px", fontStyle: "bold" }}>Dated</Text>
                                <Text style={styles.text}>22/03/2024</Text>
                                <Text style={{ ...styles.text, marginTop: -13 }}>22/03/2024</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCell}>
                                <Text style={styles.tableHeadText}>Sr.</Text>
                            </View>
                            <View style={styles.tableCell}>
                                <Text style={styles.tableHeadText}>Description of Goods</Text>
                            </View>
                            <View style={styles.tableCell}>
                                <Text style={styles.tableHeadText}>HSN/SAC</Text>
                            </View>
                            <View style={styles.tableCell}>
                                <Text style={styles.tableHeadText}>Qty</Text>
                            </View>
                            <View style={styles.tableCell}>
                                <Text style={styles.tableHeadText}>Rate</Text>
                            </View>
                            <View style={styles.tableCell}>
                                <Text style={styles.tableHeadText}>Per</Text>
                            </View>
                            <View style={styles.tableCell}>
                                <Text style={styles.tableHeadText}>Amount</Text>
                            </View>
                        </View>
                        {/* Product listing rows */}
                        {/* Example row */}
                        <View style={styles.tableRow}>
                            <View style={styles.tableCell}>
                                <Text style={styles.text1}>Product Name</Text>
                            </View>
                            <View style={styles.tableCell}>
                                <Text style={styles.text1}>1</Text>
                            </View>
                            <View style={styles.tableCell}>
                                <Text style={styles.text1}>$10</Text>
                            </View>
                            <View style={styles.tableCell}>
                                <Text style={styles.text1}>$10</Text>
                            </View>
                            <View style={styles.tableCell}>
                                <Text style={styles.text1}>1</Text>
                            </View>
                            <View style={styles.tableCell}>
                                <Text style={styles.text1}>$10</Text>
                            </View>
                            <View style={styles.tableCell}>
                                <Text style={styles.text1}>$10</Text>
                            </View>
                        </View>
                        {/* More product rows */}
                    </View>
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
