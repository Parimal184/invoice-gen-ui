import axios from 'axios';

const apiUrl = "http://localhost:8080/api/";

const ApiService = {

    addBuyer: async (buyerDetails) => {
        try {
            const response = await axios.post(`${apiUrl}contact-details/buyer`, buyerDetails);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    },

    getBuyers: async () => {
        try {
            const response = await axios.get(`${apiUrl}contact-details/buyer`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

};

export default ApiService;
