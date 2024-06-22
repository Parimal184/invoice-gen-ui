import axios from "axios";

const apiUrl = "http://localhost:8080/api/";

const ApiService = {
    saveBuyer: async (buyerDetails) => {
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

    getBuyers: async (page, size) => {
        try {
            const response = await axios.get(
                `${apiUrl}ContactDetails/GetBuyers?page=${
                    !page ? 0 : page
                }&size=${!size ? 10 : size}`
            );
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    },

    updateBuyer: async (buyerDetails) => {
        try {
            const response = await axios.put(
                `${apiUrl}ContactDetails/UpdateBuyer`,
                buyerDetails
            );
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    },

    deleteBuyer: async (id) => {
        try {
            const response = await axios.delete(
                `${apiUrl}ContactDetails/DeleteBuyer/${id}`
            );
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    },

    getProducts: async (page, size) => {
        try {
            const response = await axios.get(
                `${apiUrl}Product/GetProducts?page=${page}&size=${size}`
            );
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

    updateProduct: async (product) => {
        try {
            const response = await axios.put(
                `${apiUrl}Product/UpdateProduct`,
                product
            );
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    },

    deleteProduct: async (id) => {
        try {
            const response = await axios.delete(
                `${apiUrl}Product/DeleteProduct/${id}`
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

    updateInvoice: async (invoice) => {
        try {
            const response = await axios.put(
                `${apiUrl}Invoice/UpdateInvoice`,
                invoice
            );
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    },

    getInvoices: async (page, size) => {
        try {
            const response = await axios.get(
                `${apiUrl}Invoice/GetInvoices?page=${page}&size=${size}`
            );
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    },

    deleteInvoice: async (id) => {
        try {
            const response = await axios.delete(
                `${apiUrl}Invoice/DeleteInvoice/${id}`
            );
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    },
};

export default ApiService;
