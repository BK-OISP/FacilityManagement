import axiosClient from "../axiosClient";

const addRequestApi = {
  getAllFMType: () => {
    const url = "/oisp/fm/type";
    return axiosClient.get(url);
  },
};

export default addRequestApi;
