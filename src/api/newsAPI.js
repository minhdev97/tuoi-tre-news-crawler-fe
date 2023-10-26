import {NEWS_API} from "../constants/api";
import axios from "axios";

export const findNews = async (page, pageSize) => {
    let result = null;
    try {
        result = await axios.get(`${NEWS_API}?page=${page}&size=${pageSize}`);
        console.log('result: ' + result);
    } catch (e) {
        console.log("Find news API error: " + e);
    }
    return result;
};

export const findNewsDetail = async (id) => {
    let result = null;
    try {
        result = await axios.get(`${NEWS_API}/newsdetail/${id}`);
        console.log('result: ' + result);
    } catch (e) {
        console.log("Find news detail API error: " + e);
    }
    return result;
};

export const findNewsByCategory = async (id, page, size) => {
    let result = null;
    try {
        result = await axios.get(`${NEWS_API}/${id}?page=${page}&size=${size}`);
        console.log('result: ' + result);
    } catch (error) {
        console.log("Find news by category API error: " + error);
        throw error;
    }
    return result;
};
