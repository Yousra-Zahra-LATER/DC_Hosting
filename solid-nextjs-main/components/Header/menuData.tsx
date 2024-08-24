import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    newTab: false,
    path: "/",
  },
  {
    id: 2,
    title: "Features",
    newTab: false,
    path: "/#features",
  },
  {
    id: 2.1,
    title: "Blog",
    newTab: false,
    path: "/blog",   
  },
  {
    id: 2.3,
    title: "Docs",
    newTab: false,
    path: "",
    //path: "/docs",
  },
  

  {
    id: 4,
    title: "Contact Us",
    newTab: false,
    path: "/support",
  },
  {
    id: 5,
    title: "Pricing",
    newTab: false,
    path: "/#pricing",
  },
];

export default menuData;
