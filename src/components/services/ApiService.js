import axios from "axios";

const apiUrl = "http://localhost:8080/api/";

const ApiService = {
    addBuyer: async (buyerDetails) => {
        try {
            const response = await axios.post(
                `${apiUrl}ContactDetails/SaveBuyer`,
                buyerDetails
            );
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    },

    getBuyers: async () => {
        try {
            const response = await axios.get(
                `${apiUrl}ContactDetails/GetBuyers`
            );
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    },

    getProducts: async () => {
        try {
            const response = await axios.get(`${apiUrl}Product/GetProducts`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    },

    saveProduct: async (product) => {
        try {
            const response = await axios.post(
                `${apiUrl}Product/SaveProduct`,
                product
            );
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    },

    saveInvoice: async (invoice) => {
        try {
            const response = await axios.post(
                `${apiUrl}Invoice/SaveInvoice`,
                invoice
            );
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    },

    getInvoices: async () => {
        try {
            const response = await axios.get(`${apiUrl}Invoice/GetInvoices`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    },
};

export default ApiService;
