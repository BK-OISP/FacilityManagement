import localStorageService from "../../localStorage/localStorageService";
import axiosClient from "../axiosClient";

const viewRequest = {
  viewRequestByEmpId: () => {
    const url = `/oisp/fm/getallrequest/${localStorageService.getUserId()}`;
    return axiosClient.get(url);
  },
};

export default viewRequest;
