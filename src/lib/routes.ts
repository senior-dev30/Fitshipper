import { uuid } from "../utils/webHelper";
import { UserOutlined } from "@ant-design/icons";
import Home from "../pages/Home";

export type RouteProps = {
  key: string;
  title: string;
  children?: RouteProps[];
  url: string;
  Icon?: any;
  Component?: any;
  disabled?: boolean;
  exact?: boolean;
};

export let routes = [
  {
    key: uuid(),
    title: "Home",
    Icon: UserOutlined,
    url: "/",
    exact: true,
    Component: Home,
    children: [],
  },
];

export default routes;
