export const arrayMenusToObj = (menus: any) => {
  const obj = {};
  const toBoj = (menus: any) => {
    menus.forEach((item: any) => {
      if (item.path) {
        obj[item.path] = item;
        if (item.children && item.children.length > 0) {
          toBoj(item.children);
        }
      }
    });
  };
  toBoj(menus)
  return obj;
};

export const checkRoutes = (routes : any) => {
    const obj = {}
    routes.forEach((item : any) => {
      if (obj[item.path]) {
        console.log(`${item.path} 重复`)
        return
      }
      obj[item.path] = item
    })
    return obj
  }
