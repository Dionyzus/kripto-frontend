import { RouteProps } from "./route";
import About from "../pages/public/about";
import Homepage from "../pages/public/homepage";
import PublicLayout from "../pages/layout/unauthorized/publicLayout";
import SignUp from "../pages/register/register";
import Login from "../pages/login/login";
import AppLayout from "../pages/layout/authorized/appLayout";
import BlockchainInfo from "../pages/bitcoin/blockchainInfo";
import BlockDetails from "../pages/bitcoin/blockDetails";
import TransactionDetails from "../pages/bitcoin/transactionDetails";
import Dashboard from "../pages/dashboard/dashboard";

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
  {
    exact: true,
    path: "/signup",
    Component: SignUp,
    isPrivate: false,
    Layout: PublicLayout,
  },
  {
    exact: true,
    path: "/login",
    Component: Login,
    isPrivate: false,
    Layout: PublicLayout,
  },
  {
    exact: true,
    path: "/dashboard",
    Component: Dashboard,
    isPrivate: true,
    Layout: AppLayout,
  },
  {
    exact: true,
    path: "/bitcoin/latest-blocks",
    Component: BlockchainInfo,
    isPrivate: false,
    Layout: PublicLayout,
  },
  {
    exact: true,
    path: "/bitcoin/block/:blockHash",
    Component: BlockDetails,
    isPrivate: false,
    Layout: PublicLayout,
  },
  {
    exact: true,
    path: "/bitcoin/transaction/:txid",
    Component: TransactionDetails,
    isPrivate: false,
    Layout: PublicLayout,
  },
];
