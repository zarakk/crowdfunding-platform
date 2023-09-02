import {
  createCampaign,
  dashboard,
  logout,
  payment,
  profile,
  withdraw,
} from "../assets/assets";

export const navlinks = [
  {
    name: "dashboard",
    imageUrl: dashboard,
    link: "/",
  },
  {
    name: "campaign",
    imageUrl: createCampaign,
    link: "/create-campaign",
  },
  {
    name: "payment",
    imageUrl: payment,
    link: "/",
    disabled: true,
  },
  {
    name: "withdraw",
    imageUrl: withdraw,
    link: "/",
    disabled: true,
  },
  {
    name: "profile",
    imageUrl: profile,
    link: "/profile",
  },
  {
    name: "logout",
    imageUrl: logout,
    link: "/",
  },
];
