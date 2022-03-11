import { useState, useEffect, memo } from 'react';
import { Menu } from 'antd';
import { history } from 'umi';
import Loading from '@/components/Loading';
import HttpRequest from '@/utils/request';
import { arrayMenusToObj } from './utils';
import Icon from './icon';

interface IMenu {
  name: string;
  path: string;
  icon: string;
  children?: IMenu[];
}

const { SubMenu } = Menu;
const getCurrentPath = () => {
  const path = location.pathname.split('/');
  return `/${path[1]}`;
};

interface IProps {
  routesObj: any;
}

const Nav = (props: IProps) => {
  const { routesObj } = props;
  const [selectedKeys, setSelectedKeys] = useState(getCurrentPath());
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState<IMenu[]>([]);

  useEffect(() => {
    HttpRequest({ url: 'admin/user/menus', method: 'get' })
      .then((res) => {
        routesObj.current.menus = arrayMenusToObj(res);
        setMenu(res as any);
      })
      .finally(() => {
        setLoading(false);
      });

    window.addEventListener('popstate', handlePopstateChange);
    return () => {
      window.removeEventListener('popstate', handlePopstateChange);
    };
  }, []);

  const handlePopstateChange = () => {
    setSelectedKeys(getCurrentPath());
  };

  const handleMenuClick = (path: string) => {
    if (path === '') return;
    setSelectedKeys(path);
    history.push(path);
  };

  const renderMenuItem = (menu: IMenu) => (
    <Menu.Item
      icon={<Icon name={menu.icon} />}
      key={menu.path}
      onClick={() => handleMenuClick(menu.path)}
    >
      {menu.name}
    </Menu.Item>
  );

  const renderMenu = (menu: IMenu) => {
    if (menu.children && menu.children.length > 0) {
      return (
        <SubMenu key={menu.name} icon={<Icon name={menu.icon} />} title={menu.name || '----'}>
          {menu.children.map((subMenu: IMenu) => renderMenuItem(subMenu))}
        </SubMenu>
      );
    }
    return renderMenuItem(menu);
  };

  const renderMenus = (menus: IMenu[]) => {
    return <>{menus.map((item: IMenu) => renderMenu(item))}</>;
  };
  return (
    <>
      {loading ? <Loading /> : null}
      <Menu theme="light" selectedKeys={[selectedKeys]} mode="inline">
        {renderMenus(menu)}

        {/* {routes.map((item : any) => !item.hideInMenu
        ? <Menu.Item key={item.path} icon={<Icon name={item.icon} />} onClick={() => history.push(item.path)}>
            {item.name}
          </Menu.Item>
        : null)
    } */}
      </Menu>
    </>
  );
};

export default memo(Nav);
