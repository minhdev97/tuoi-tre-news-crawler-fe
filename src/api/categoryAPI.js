import {CATEGORY_API} from "../constants/api";
import axios from "axios";

export const findCategories = async () => {
    let result = null;
    try {
        result = await axios.get(`${CATEGORY_API}`);
        console.log('result: ' + result);
    } catch (e) {
        console.log("Find categories API error: " + e);
    }
    return result;
};