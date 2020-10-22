import React, { useCallback } from "react";
import { Button, Table, Space, Tooltip } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useMemo } from "react";

const ViewAllTable = (props) => {
  const { data } = props;
  const { Column, ColumnGroup } = Table;
  const PAGE_SIZE = 6;

  const renderStatus = useCallback((checkingStatus, record, index) => {
    if (record.overallStatus) {
      //true = dang chờ duyệt
      if (checkingStatus) {
        return <CheckCircleOutlined className="btn-success ant-icon" />;
      } else
        return <ExclamationCircleOutlined className="btn-warning ant-icon" />;
    }
    //reject rồi
    return <CloseCircleOutlined className="btn-danger ant-icon" />;
  }, []);

  return useMemo(
    () => (
      <Table dataSource={data} bordered pagination={{ pageSize: PAGE_SIZE }}>
        <Column
          title="#"
          dataIndex="number"
          key="number"
          width="4%"
          shouldCellUpdate={false}
        />
        <Column
          title="Danh mục đề xuất"
          dataIndex="fmName"
          key="fmName"
          width="25%"
          shouldCellUpdate={false}
        />
        <ColumnGroup
          title="Tiến độ phê duyệt"
          width="58%"
          shouldCellUpdate={false}
        >
          <Column
            title="Trưởng bộ phận"
            dataIndex="deputyHead"
            key="deputyHead"
            render={renderStatus}
            shouldCellUpdate={false}
          />
          <Column
            title="Cơ sở vật chất"
            dataIndex="facility"
            key="facility"
            render={renderStatus}
            shouldCellUpdate={false}
            c
          />
          <Column
            title="Hành chính tổng hợp"
            dataIndex="admin"
            key="admin"
            render={renderStatus}
            shouldCellUpdate={false}
          />
          <Column
            title="Kế toán"
            dataIndex="accountant"
            key="accountant"
            render={renderStatus}
            shouldCellUpdate={false}
          />
          <Column
            title="Ban Giám đốc"
            dataIndex="director"
            key="director"
            render={renderStatus}
            shouldCellUpdate={false}
          />
        </ColumnGroup>
        <Column
          title="Thao tác"
          width="15%"
          shouldCellUpdate={false}
          render={(record) => (
            <Space size="middle">
              <Tooltip title="View/Edit">
                <Button
                  type="text"
                  icon={<EditOutlined className="ant-icon btn-primary" />}
                />
              </Tooltip>
              <Tooltip title="Delete">
                <Button
                  type="text"
                  icon={<DeleteOutlined className="ant-icon btn-danger" />}
                />
              </Tooltip>
            </Space>
          )}
        />
      </Table>
    ),
    [data, renderStatus]
  );
};

export default ViewAllTable;
