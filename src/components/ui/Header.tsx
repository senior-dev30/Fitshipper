import { Layout } from "antd";
import cx from "classnames";

type Props = {
  prefix?: string | React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export default function Header({ prefix, className, ...props }: Props) {
  return (
    <Layout.Header
      className={cx(
        "flex items-center justify-between px-24 bg-white",
        className
      )}
      {...props}
    >
      {prefix ? prefix : <div />}
    </Layout.Header>
  );
}
