import { routeConfig } from "../config/routeConfig.jsx";

export const generateRoutes = (nav) => {
  const list = [];

  nav.forEach((item) => {
    if (item.link && routeConfig[item.link]) {
      list.push({ path: item.link, element: routeConfig[item.link] });
    }

    if (item.dropdown) {
      item.dropdown.forEach((d) => {
        if (routeConfig[d.link]) {
          list.push({ path: d.link, element: routeConfig[d.link] });
        }
      });
    }
  });

  return list;
};
