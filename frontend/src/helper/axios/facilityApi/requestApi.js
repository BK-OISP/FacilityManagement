import axiosClient from "../axiosClient";

import localStorageService from "../../localStorage/localStorageService";

const requestApi = {
  getAllFMType: () => {
    const url = "/oisp/fm/type";
    return axiosClient.get(url);
  },
  getAllRequestEmpId: () => {
    const url = `/oisp/fm/getallrequest/${localStorageService.getUserId()}`;
    return axiosClient.get(url);
  },
  postRequest: (formData) => {
    const url = "/oisp/fm/request/add";
    return axiosClient.post(url, formData);
  },
  deleteRequest: (requestId) => {
    const url = `/oisp/fm/request/${requestId}`;
    return axiosClient.delete(url);
  },
};

export default requestApi;
