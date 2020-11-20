import axios from "axios";
const productionURL = "/server/"; 
const devURL =  "http://localhost:8080/"; 
const baseURL = process.env.NODE_ENV ? process.env.NODE_ENV === "development" ? devURL:productionURL:productionURL; 
const axiosBase = axios.create({ 
    baseURL, 
    responseType: "json",
})

const handleRequest =(request) => {
    if(localStorage.getItem('token'))
        request.headers['Authorization'] = "Bearer "+localStorage.getItem('token')
    return request    
}

axiosBase.interceptors.request.use((request)=>handleRequest(request))

export const getServer = async(url) =>{
    return await axiosBase.get(url)
};

export const postServer = async(url,data) =>{
    return await axiosBase.post(url,data);
}

export const postFileServer = async(url,data) =>{
    console.log(url,data);
    return await axiosBase.post(url,data)
}
