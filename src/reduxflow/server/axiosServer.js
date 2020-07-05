import axios from "axios";
const productionURL = "/LayoutCompare/server"; 
const devURL =  "http://localhost:8080/"; 
const baseURL = process.env.NODE_ENV ? process.env.NODE_ENV === "development" ? devURL:devURL:productionURL; 
const axiosBase = axios.create({ 
    baseURL, 
    responseType: "json",
})

export const getServer = async(url) =>{
    return await axiosBase.get(url)
};

export const postFileServer = async(url,data) =>{
    return await axiosBase.post(url,data)
}
