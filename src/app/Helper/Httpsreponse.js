import axios from "axios";

export const HttpasAxios=axios.create({
    baseURL:process.env.baseURL
})