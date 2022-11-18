import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = "https://newsapi.org";

class Api {
  async fetchData(data) {
    try {
      const request = await axios.get(
        `/v2/everything?q=${data.nameRefData}&from=${data.fromRefData}&to=${data.ToRefData}&sortBy=popularity&apiKey=25acb2de0e2c4db8afe3d6d7ecfe04ad`
      );
      return request.data;
    } catch ({ response }) {
      toast.error(response.data.message)
    }
  }
}

export const api = new Api();
// old api 6ae46af13604414487172ae3965f0e85
// new api 64f898946c674748b05e5fc4b95377b2
