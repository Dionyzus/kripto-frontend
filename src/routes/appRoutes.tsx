import { RouteProps } from "./route";
import About from "../pages/public/about";
import Homepage from "../pages/public/homepage";
import PublicLayout from "../pages/layout/unauthorized/publicLayout";

export const routes: Array<RouteProps> = [
  {
    exact: true,
    path: "/",
    Component: Homepage,
    isPrivate: false,
    Layout: PublicLayout,
  },
  {
    exact: true,
    path: "/about",
    Component: About,
    isPrivate: false,
    Layout: PublicLayout,
  },
];
