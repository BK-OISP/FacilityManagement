import React, { useCallback, useState } from "react";
import { Button, Table, Space, Tooltip, Popconfirm } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useMemo } from "react";
import requestApi from "../../../helper/axios/facilityApi/requestApi";
import EditModal from "./EditModal";

const TableCompoment = (props) => {
  const { data, setIsRerender } = props;
  const { Column, ColumnGroup } = Table;
  const [showEditModal, setShowEditModal] = useState(false);
  const [recordItem, setRecordItem] = useState(null);

  const PAGE_SIZE = 5;

  const renderStatus = useCallback((checkingStatus, record, index) => {
    if (record.overallStatus) {
      //true = dang chờ duyệt
      if (checkingStatus) {
        return (
          <Tooltip title="Accepted!">
            <CheckCircleOutlined className="btn-success ant-icon" />
          </Tooltip>
        );
      } else
        return (
          <Tooltip title="Pending">
            <ExclamationCircleOutlined className="btn-warning ant-icon" />
          </Tooltip>
        );
    }
    //reject rồi
    return <CloseCircleOutlined className="btn-danger ant-icon" />;
  }, []);

  const handleDeleteRequest = useCallback(
    async (record) => {
      try {
        await requestApi.deleteRequest(record._id);
        setIsRerender((pre) => !pre);
      } catch (error) {}
    },
    [setIsRerender]
  );

  const handleEditModal = useCallback((record) => {
    console.log(record);
    if (
      record.overallStatus &&
      !record.isDeputyHeadApproval &&
      !record.isFMTeamLeadApproval &&
      !record.isAdminLeadApproval &&
      !record.isAccountLeadApproval &&
      !record.isDirectorApproval
    ) {
      setRecordItem(record);
      setShowEditModal(true);
    }
  }, []);

  return useMemo(
    () => (
      <>
        {recordItem ? (
          <EditModal
            showEditModal={showEditModal}
            setShowEditModal={setShowEditModal}
            record={recordItem}
          />
        ) : null}
        <Table dataSource={data} bordered pagination={{ pageSize: PAGE_SIZE }}>
          <Column title="#" dataIndex="number" key="number" width="4%" />
          <Column
            title="Danh mục đề xuất"
            dataIndex="fmName"
            key="fmName"
            width="25%"
          />
          <ColumnGroup title="Tiến độ phê duyệt" width="58%">
            <Column
              title="Trưởng bộ phận"
              dataIndex="deputyHead"
              key="deputyHead"
              render={renderStatus}
            />
            <Column
              title="Cơ sở vật chất"
              dataIndex="facility"
              key="facility"
              render={renderStatus}
              c
            />
            <Column
              title="Hành chính tổng hợp"
              dataIndex="admin"
              key="admin"
              render={renderStatus}
            />
            <Column
              title="Kế toán"
              dataIndex="accountant"
              key="accountant"
              render={renderStatus}
            />
            <Column
              title="Ban Giám đốc"
              dataIndex="director"
              key="director"
              render={renderStatus}
            />
          </ColumnGroup>
          <Column
            title="Thao tác"
            width="15%"
            render={(record) => (
              <Space size="middle">
                <Tooltip title="View/Edit">
                  <Button
                    type="text"
                    icon={<EditOutlined className="ant-icon btn-primary" />}
                    onClick={() => handleEditModal(record)}
                  />
                </Tooltip>
                <Popconfirm
                  placement="topLeft"
                  title="Bạn có muốn xoá đề xuất?"
                  onConfirm={() => handleDeleteRequest(record)}
                >
                  <Button
                    type="text"
                    icon={<DeleteOutlined className="ant-icon btn-danger" />}
                  />
                </Popconfirm>
              </Space>
            )}
          />
        </Table>
      </>
    ),
    [
      data,
      renderStatus,
      handleDeleteRequest,
      handleEditModal,
      showEditModal,
      recordItem,
    ]
  );
};

export default TableCompoment;
