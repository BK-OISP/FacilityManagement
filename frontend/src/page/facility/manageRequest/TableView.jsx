import { Table } from "antd";
import Column from "antd/lib/table/Column";
import React from "react";

const TableView = (props) => {
  const { data } = props;
  const PAGE_SIZE = 5;

  return (
    <Table dataSource={data} bordered pagination={{ pageSize: PAGE_SIZE }}>
      <Column title="#" dataIndex="fmNumber" key="fmNumber" />
      <Column title="Danh mục đề xuất" dataIndex="fmName" key="fmName" />
      <Column title="Nhân viên" dataIndex="fmEmployee" key="fmEmployee" />
      <Column title="Bộ phận" dataIndex="fmDepartment" key="fmDepartment" />
      <Column title="Ngày đề xuất" dataIndex="fmDate" key="fmDate" />
      <Column title="Tình trạng" dataIndex="fmStatus" key="fmStatus" />
      <Column title="Thao tác" key="fmAction" />
    </Table>
  );
};

export default TableView;
