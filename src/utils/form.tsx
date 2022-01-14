import React from "react";
import { Form } from "antd";

export const createFormItemLayout = (
  label: number = 3,
  wrapper: number = 21
) => ({
  labelCol: {
    xs: { span: label },
    sm: { span: label },
  },
  wrapperCol: {
    xs: { span: wrapper },
    sm: { span: wrapper },
  },
});

export const thosandSeprartor = {
  formatter: (value: number | string | undefined) => {
    if (!value) {
      return value as string;
    }
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
  parser: (value: string | undefined) =>
    (value ? value.replace(/\$\s?|(,*)/g, "") : value) as React.ReactText,
};

export const currency = {
  formatter: (value: number | string | undefined) => {
    if (!value) {
      return value as string;
    }
    return `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
  parser: (value: string | undefined) =>
    (value ? value.replace(/\$\s?|(,*)/g, "") : value) as React.ReactText,
};

export const percent = {
  min: 0,
  max: 100,
  formatter: (value: number | string | undefined) => {
    if (!value) {
      return value as string;
    }
    return `${value}%`;
  },
  parser: (value: string | undefined) =>
    (value ? value.replace("%", "") : value) as React.ReactText,
};

export const watt = {
  // min: 0,
  max: 100,
  formatter: (value: number | string | undefined) => {
    if (!value) {
      return value as string;
    }
    return `${value}W`;
  },
  parser: (value: string | undefined) =>
    (value ? value.replace("W", "") : value) as React.ReactText,
};

export let rules = {
  required: { required: true, message: "This field is required!" },
  number: {
    type: "number",
    message: "Please fill in numbers!",
    transform(value: any) {
      if (!value) {
        return value;
      }
      return Number(value);
    },
  },
  email: {
    required: true,
    message: "Required fields, please enter the correct email format",
    pattern: new RegExp(/^.{8,128}$/),
  },
  account: {
    required: true,
    message: "The field length is 8~128 characters, special symbols -, _",
    pattern: new RegExp(/^.{8,128}$/),
  },
  password: {
    required: true,
    message: "Password length is 6~128 characters",
    pattern: new RegExp(/^.{6,128}$/),
  },
  min: (limit: number) => ({
    validator: (_: any, value: any, callback: any) => {
      if (value < limit) {
        callback(`not less than ${limit}`);
      } else {
        callback();
      }
    },
  }),
  max: (limit: number) => ({
    validator: (_: any, value: any, callback: any) => {
      if (limit === 0) {
        return callback("The maximum number is 0");
      }

      if (value > limit) {
        callback(`not greater than ${limit}`);
      } else {
        callback();
      }
    },
  }),
};

type UseFormProps = {
  field?: string;
  initialValue?: any;
};

export function useForm({ field, initialValue }: UseFormProps = {}) {
  let wrapper = field
    ? (node: React.ReactNode) => (
        <Form.Item noStyle name={field} initialValue={initialValue}>
          {node}
        </Form.Item>
      )
    : (node: React.ReactNode) => node;

  return wrapper;
}
