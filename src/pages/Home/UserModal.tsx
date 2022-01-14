import React from "react";
import { Form, Input } from "antd";
import Modal from "../../components/common/Modal";
import type { ModalProps } from "../../components/common/Modal";
import { rules, createFormItemLayout } from "../../utils/form";
import { User } from "./queries";

interface IProps extends Omit<ModalProps, "onOk"> {
  item?: User;
  onOk?: (data: Partial<User>) => void;
}

const formItemLayout = createFormItemLayout(4, 18);

export default function UserModal({
  onOk,
  onCancel,
  loadingData,
  item,
  ...props
}: IProps) {
  const [form] = Form.useForm();

  React.useEffect(() => {
    form.setFieldsValue(item);
  }, [JSON.stringify(item)]); // eslint-disable-line

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (onOk) {
        onOk({ ...item, ...values });
      }
    });
  };

  return (
    <Modal
      visible
      title="User Information"
      maskClosable={false}
      keyboard={false}
      loadingData={loadingData}
      onCancel={onCancel}
      onOk={handleOk}
      {...props}
    >
      <Form form={form} layout="horizontal">
        <Form.Item
          {...formItemLayout}
          name="name"
          label="name"
          rules={[rules.required]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="address1"
          label="address1"
          rules={[rules.required]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="address2"
          label="address2"
          rules={[rules.required]}
        >
          <Input />
        </Form.Item>
        <Form.Item {...formItemLayout} name="city" label="city">
          <Input />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="state"
          label="state"
          rules={[rules.required]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="zip"
          label="zip"
          rules={[rules.required]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
