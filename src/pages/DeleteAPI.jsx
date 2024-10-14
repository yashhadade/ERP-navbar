// api.js
import axios from 'axios';
import ServerApi from '../ServerApi';

export const deleteProduct = async (url, id, setProduct) => {
    const ApiUrl=ServerApi()
    try {
        const response = await axios.delete(`${ApiUrl}/${url}/${id}`);

        // Check if the response is successful
        if (response.status !== 200) {
            throw new Error('Failed to delete the product');
        }

        setProduct(prevData => prevData.filter(client => client.id !== id));
    } catch (error) {
        alert("Unable to delete the Product: " + (error.response ? error.response.data : error.message));
    }
};
