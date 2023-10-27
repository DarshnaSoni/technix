import HomeIcon from "@/src/svg/home-icon";

const menu_data = [
  {
    id: 1,
    mega_menu: false,
    has_dropdown: false,
    home_icon: <HomeIcon />,
    title: "Home",
    link: "/",
    active: "",
  },
  {
    id: 2,
    mega_menu: false,
    has_dropdown: false,
    title: "Company",
    link: "/about",
    active: "",
  },
  {
    id: 3,
    mega_menu: false,
    has_dropdown: false,
    title: "Services",
    link: "/service",
    active: "",

  },
  // {
  //   id: 4,
  //   mega_menu: false,
  //   has_dropdown: true,
  //   title: "Pages",
  //   link: "/about",
  //   active: "",
  //   sub_menus: [
  //     { link: "/team-details", title: "Team Details" },
  //     { link: "/404", title: "404" },
  //   ],
  // },

  {
    id: 4,
    mega_menu: false,
    has_dropdown: true,
    title: "Blog",
    link: "/blog",
    active: "",
    sub_menus: [
      { link: "/blog", title: "Blog" },
      { link: "/blog-details", title: "Blog Details" },
    ],
  },
  {
    id: 5,
    mega_menu: false,
    has_dropdown: false,
    title: "Contact",
    link: "/contact",
    active: "",
  },


];
export default menu_data;
