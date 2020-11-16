import { Table } from "antd";
import Column from "antd/lib/table/Column";
import React from "react";

import localStorageService from "../../../helper/localStorage/localStorageService";
import Roles from "../../../helper/config/Roles";

const TableView = (props) => {
  const { data } = props;
  const PAGE_SIZE = 5;

  const getCurrentRole = () => {
    const userRole = localStorageService.getRole();
    const designRole = [
      Roles.ACCOUNTANT_LEAD,
      Roles.DIRECTOR,
      Roles.FM_ADMIN_LEAD,
      Roles.FM_DEPUTY_HEAD,
      Roles.FM_FACILITY_TEAM_LEAD,
    ];
    for (const role of userRole) {
      if (designRole.includes(role)) {
        return role;
      }
    }
  };

  const getCurrentRoleKey = (role) => {
    switch (role) {
      case Roles.FM_DEPUTY_HEAD:
        return "isDeputyHeadApproval";
      case Roles.FM_FACILITY_TEAM_LEAD:
        return "isFMTeamLeadApproval";
      case Roles.FM_ADMIN_LEAD:
        return "isAccountLeadApproval";
      case Roles.ACCOUNTANT_LEAD:
        return "isAdminLeadApproval";
      case Roles.DIRECTOR:
        return "isDirectorApproval";
      default:
        break;
    }
  };

  const renderStatus = (text, record, index) => {
    const roleKey = getCurrentRoleKey(getCurrentRole());
    if (record.status.overallStatus === false) {
      record.status.check = "Đã huỷ";
      return "Đã huỷ";
    }
    if (
      record.status.overallStatus === true &&
      record.status[roleKey] === false
    ) {
      record.status.check = "Chưa duyệt";
      return "Chưa duyệt";
    }
    if (
      record.status.overallStatus === true &&
      record.status[roleKey] === true
    ) {
      record.status.check = "Đã duyệt";
      return "Đã duyệt";
    }
  };

  const sortHandler = (a, b) => {
    if (
      typeof a.status.check === "string" &&
      typeof b.status.check === "string"
    ) {
      return a.status.check.localeCompare(b.status.check);
    }
  };

  return (
    <Table
      dataSource={data}
      bordered
      pagination={{ pageSize: PAGE_SIZE }}
      scroll={{ x: 600, y: 600 }}
    >
      <Column title="#" dataIndex="fmNumber" key="fmNumber" width="4%" />
      <Column
        title="Danh mục đề xuất"
        dataIndex="fmName"
        key="fmName"
        width="20"
        sorter={(a, b) => {
          if (typeof a.fmName === "string" && typeof b.fmName === "string") {
            return a.fmName.localeCompare(b.fmName);
          }
        }}
      />
      <Column
        title="Nhân viên"
        dataIndex="fmEmployee"
        key="fmEmployee"
        width="20"
      />
      <Column
        title="Bộ phận"
        dataIndex="fmDepartment"
        key="fmDepartment"
        width="20"
      />
      <Column
        title="Ngày đề xuất"
        dataIndex="fmDate"
        key="fmDate"
        width="20"
        sorter={(a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)}
      />
      <Column
        title="Tình trạng"
        dataIndex="fmStatus"
        key="fmStatus"
        width="20"
        render={renderStatus}
        sorter={sortHandler}
      />
      <Column title="Thao tác" key="fmAction" />
    </Table>
  );
};

export default TableView;
