import React, { useCallback, useState, useMemo } from "react";
import { Button, Table, Space, Tooltip, Popconfirm, message } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

import requestApi from "../../../helper/axios/facilityApi/requestApi";
import EditModal from "./EditModal";
import showTime from "../../../helper/other/ConvertDate";

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
            <CheckCircleOutlined className="icon-success ant-icon" />
          </Tooltip>
        );
      } else
        return (
          <Tooltip title="Pending">
            <ExclamationCircleOutlined className="icon-warning ant-icon" />
          </Tooltip>
        );
    }
    //reject rồi
    return <CloseCircleOutlined className="icon-danger ant-icon" />;
  }, []);

  const handleDeleteRequest = useCallback(
    async (record) => {
      try {
        await requestApi.deleteRequest(record._id);
        message.success("The information was deleted successfully.");
        setIsRerender((pre) => !pre);
      } catch (error) {
        message.error("Something went wrong.");
      }
    },
    [setIsRerender]
  );

  const handleEditModal = useCallback((record) => {
    console.log(!!record.isDeputyHeadApproval);
    console.log(record);
    if (
      record.overallStatus &&
      !!record.isDeputyHeadApproval === false &&
      !!record.isFMTeamLeadApproval === false &&
      !!record.isAdminLeadApproval === false &&
      !!record.isAccountLeadApproval === false &&
      !!record.isDirectorApproval === false
    ) {
      setRecordItem(record);
      setShowEditModal(true);
    }
  }, []);

  return useMemo(
    () => (
      <>
        {recordItem && (
          <EditModal
            showEditModal={showEditModal}
            setShowEditModal={setShowEditModal}
            record={recordItem}
            setIsRerender={setIsRerender}
          />
        )}
        <Table
          dataSource={data}
          bordered
          pagination={{ pageSize: PAGE_SIZE }}
          scroll={{ x: 600, y: 600 }}
        >
          <Column title="#" dataIndex="number" key="number" width="4%" />
          <Column
            title="Danh mục đề xuất"
            dataIndex="fmName"
            key="fmName"
            width="25%"
            render={(text, record) => (
              <>
                {text}
                <span
                  style={{
                    fontStyle: "italic",
                    color: "gray",
                    fontSize: "12px",
                  }}
                >
                  {" "}
                  -- Cập nhật {showTime(record.updatedAt)}
                </span>
              </>
            )}
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
                    icon={<EditOutlined className="ant-icon icon-primary" />}
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
                    icon={<DeleteOutlined className="ant-icon icon-danger" />}
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
      setIsRerender,
    ]
  );
};

export default TableCompoment;
