import axiosClient from "../axiosClient";

import localStorageService from "../../localStorage/localStorageService";

const manageRequest = {
  getAllRequest: () => {
    const employeeId = localStorageService.getUserId();
    const url = `/oisp/fm/manage/all/${employeeId}`;
    return axiosClient.get(url);
  },
  seenRequest: (requestId) => {
    const url = `/oisp/fm/manage/view/${requestId}`;
    return axiosClient.put(url);
  },
};

export default manageRequest;
