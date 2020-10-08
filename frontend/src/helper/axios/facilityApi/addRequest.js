import axiosClient from "../axiosClient";

const addRequestApi = {
  getAllFMType: () => {
    const url = "/oisp/fm/type";
    return axiosClient.get(url);
  },
  postRequest: (formData) => {
    const url = "/oisp/fm/addrequest";
    return axiosClient.post(url, formData);
  },
};

export default addRequestApi;
