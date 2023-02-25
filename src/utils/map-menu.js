let firstMenu = undefined;
let firstRoute = undefined;

export function menuMapToRoutes(userMenus) {
  // 1.读取本地所有的路由
  const localRoutes = [];
  //更具权限 动态添加路由
  const routes = [];

  const routeFiles = import.meta.glob("../router/main/**/*.js", {
    eager: true,
  });
  console.log(routeFiles, "files");
  for (const key in routeFiles) {
    const module = routeFiles[key];
    localRoutes.push(module.default);
  }

  // firstRoute = localRoutes[0];
  // firstMenu = "/main/order/manage"; //先写死看后端怎么控制权限
  function _recurseGetRoute(menus) {
    for (const menu of menus) {
      if (menu.type == 2 || menu.type == 3) {
        const route = localRoutes.find((route) => route.path === menu.path);
        if (route) routes.push(route);
        if (!firstRoute && !firstMenu) {
          firstMenu = menu;
          firstRoute = route;
        }
      } else {
        _recurseGetRoute(menu.children ?? []);
      }
    }
  }
  _recurseGetRoute(userMenus);

  return routes;
}

export function mapPathToBreadpaths(currentPath, userMenus) {
  const breadPaths = [];

  const _recurseGetPath = (menus) => {
    for (const menu of menus) {
      if (menu.type === 1) {
        const foundMenu = _recurseGetPath(menu.children);
        if (foundMenu) {
          breadPaths.push({ name: menu.name, path: menu.url });
        }
      } else if (menu.type === 2 && menu.url === currentPath) {
        breadPaths.push({ name: menu.name, path: menu.url });
        return menu;
      }
    }
  };

  _recurseGetPath(userMenus);

  return breadPaths.reverse();
}

export function pathMapBreadcrumbs(userMenus, currentPath) {
  const breadcrumbs = [];
  pathMapToMenu(userMenus, currentPath, breadcrumbs);
  if (!breadcrumbs.length) {
    breadcrumbs.push({ name: "首页", path: "/main/welcome" });
  }
  return breadcrumbs;
}

// /main/system/role  -> type === 2 对应menu
export function pathMapToMenu(userMenus, currentPath, breadcrumbs) {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath);
      if (findMenu) {
        breadcrumbs?.push({ name: "首页", path: "/main/welcome" });

        breadcrumbs?.push({ name: menu.name, path: menu.path });
        if (findMenu.type == 3) {
          breadcrumbs?.push({ name: findMenu.pName, path: findMenu.pPath });
          breadcrumbs?.push({ name: findMenu.name, path: findMenu.path });
        }
        return findMenu;
      }
    } else if (
      (menu.type === 2 || menu.type === 3) &&
      menu.path === currentPath
    ) {
      breadcrumbs?.push({ name: "首页", path: "/main/welcome" });
      "/main/welcome" != menu.path &&
        breadcrumbs?.push({ name: menu.name, path: menu.path });
      return menu;
    }
  }
}

export function getMenuChecks(menuList) {
  const checks = [];
  const _recurseGetChecked = (menuList) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetChecked(menu.children);
      } else {
        checks.push(menu.id);
      }
    }
  };
  _recurseGetChecked(menuList);
  return checks;
}
const loopMenu = (menus, permission) => {
  const arry = menus.map((item) => {
    if (permission.includes(item.id)) {
      if (item.children) {
        return { ...item, children: loopMenu(item.children, permission) };
      } else {
        return item;
      }
    }
  });

  return arry.filter(Boolean);
};

export const filterMenus = (menus, permission) => {
  const finaMenus = loopMenu(menus, permission);

  return finaMenus;
};

const getPermisson = (menus) => {
  let arry = [];
  menus.forEach((item) => {
    arry.push(item.id);
    if (item.children) {
      arry = arry.concat(getPermisson(item.children));
    }
  });
  return arry;
};
export { firstMenu, firstRoute, getPermisson };
