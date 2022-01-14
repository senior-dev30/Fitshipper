import React from "react";
import { Row, Col, Table, Input, Popconfirm, Button } from "antd";
import { ColumnProps, TablePaginationConfig } from "antd/lib/table";
import { FilterValue, SorterResult } from "antd/lib/table/interface";
import Layout from "../../components/common/Layout";
import useModal from "../../hooks/useModal";
import IconEdit from "../../components/icons/Edit";
import { DeleteOutlined, UserAddOutlined } from "@ant-design/icons";
import {
  useUsers,
  useQueryUser,
  useCreateUser,
  useDeleteUser,
  useUpdateUser,
  User,
} from "./queries";
import UserModal from "./UserModal";

export default function Home() {
  const [query, setQuery] = React.useState<{ [key: string]: any }>({
    _page: 1,
    _limit: 5,
  });

  const { data, isFetching, refetch } = useUsers({
    variables: query,
  });

  const editModal = useModal<User>({
    content: data,
    onOpen: (item) => {
      if (item) {
        user.refetch(item);
      }
    },
  });

  const user = useQueryUser();

  const mutationOpts = {
    onSuccess: () => {
      refetch();
      editModal.close();
    },
  };

  const mutationDeleteOpts = {
    onSuccess: () => {
      refetch();
    },
  };

  const [creating, handleAdd] = useCreateUser(mutationOpts);
  const [updating, handleUpdate] = useUpdateUser(mutationOpts);
  const [deleting, handleDelete] = useDeleteUser(mutationDeleteOpts);

  const clickDeleteOk = (values: Partial<User>) => {
    handleDelete(values);
    refetch();
  };

  const handleOk = (values: Partial<User>) => {
    const handler = values.id ? handleUpdate : handleAdd;
    handler(values);
  };

  const handleSearch = (value: string) => {
    setQuery((prev) => ({ ...prev, q: value }));
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _: Record<string, FilterValue | null>,
    sorter: SorterResult<User>
  ) => {
    setQuery((prev) => ({
      ...prev,
      _page: pagination.current,
      _limit: pagination.pageSize,
      _sort: sorter.column ? sorter.field : null,
      _order: sorter.order
        ? { ascend: "asc", descend: "desc" }[sorter.order]
        : null,
    }));
  };

  const columns: ColumnProps<User>[] = [
    {
      title: "name",
      ellipsis: true,
      // sorter: true,
      dataIndex: "name",
    },
    {
      title: "address1",
      ellipsis: true,
      sorter: true,
      dataIndex: "address1",
    },
    {
      title: "address2",
      ellipsis: true,
      // sorter: true,
      dataIndex: "address2",
    },
    {
      title: "city",
      ellipsis: true,
      sorter: true,
      dataIndex: "city",
    },
    // {
    //   title: 'address',
    //   ellipsis: true,
    //   sorter: true,
    //   dataIndex: 'address',
    //   render: (_, { address }) => `${address.city}, ${address.street}`,
    // },
    {
      title: "state",
      sorter: true,
      dataIndex: "state",
    },
    {
      title: "zip",
      // sorter: true,
      dataIndex: "zip",
    },
    {
      title: "action",
      dataIndex: "x",
      width: 100,
      render: (v, r) => (
        <>
          <IconEdit
            data-id={r.id}
            onClick={editModal.toggle}
            className="cursor-pointer text-lg mr-20 text-blue-700"
          />
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => clickDeleteOk(r)}
          >
            <DeleteOutlined className="text-red-700" />
          </Popconfirm>
        </>
      ),
    },
  ];
  return (
    <>
      {editModal.visible && (
        <UserModal
          item={user.data}
          loadingData={user.isFetching}
          onCancel={editModal.close}
          confirmLoading={creating || updating}
          onOk={handleOk}
        />
      )}
      <Layout path={[{ name: "User List" }]}>
        <Row className="mb-16">
          <Col span={24} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="text-gray-500 mr-40">
                Total Numbers {data?.length ?? 0}
              </div>
              <Button
                type="primary"
                icon={<UserAddOutlined />}
                className="flex items-center"
                size="middle"
                onClick={editModal.toggle}
                disabled={deleting}
              >
                Create User
              </Button>
            </div>
            <Input.Search
              placeholder="Please enter"
              className="w-280"
              onSearch={handleSearch}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              rowKey="id"
              columns={columns}
              dataSource={data}
              loading={isFetching}
              onChange={handleTableChange as any}
            />
          </Col>
        </Row>
      </Layout>
    </>
  );
}
