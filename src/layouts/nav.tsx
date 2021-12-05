import {useState, useEffect, memo, useCallback} from 'react'
import Icon from './icon'
import {history} from 'umi'
import Loading from '@/components/Loading';
import {Menu} from 'antd';

import HttpRequest from '@/utils/request';
import {arrayMenusToObj} from './utils'
const {SubMenu} = Menu



const getCurrentPath = () => {
  const path = location.pathname.split('/')
  return `/${path[1]}`
}

interface IProps{
  routesObj: any
}

const Nav = (props: IProps) => {
  const {routesObj} = props
  const [loading, setLoading] = useState(true)
  const [menu, setMenu] = useState([])

  useEffect(() => {
    HttpRequest({url: 'admin/user/menus', method: 'get'}).then((res : any) => {
      routesObj.current.menus = arrayMenusToObj(res)
      setMenu(res)
    }). finally(() => {
      setLoading(false)
    });
  }, [])

  const handleMenuClick = (path: string) => {
    if(path === '') return
    history.push(path)
  }

  const renderMenuItem = (menu: any) => <Menu.Item icon={<Icon name={menu.icon} />}
    key={menu.path} onClick={() => handleMenuClick(menu.path)}>{menu.name}</Menu.Item>

  const renderMenu = (menu: any) => {
    if(menu.children && menu.children.length > 0){
      return <SubMenu key={menu.name} icon={<Icon name={menu.icon} />} title={menu.name || '----'}>
        {menu.children.map((subMenu: any) => renderMenuItem(subMenu))}
    </SubMenu>
    }
    return renderMenuItem(menu)
  }

  const renderMenus = (menus: any) => {
    return <>
      {menus.map((item: any) => renderMenu(item))}
    </>
  }

  return <>
    { loading ? <Loading/> : null }
    <Menu theme = "dark" defaultSelectedKeys = {[getCurrentPath()]}mode = "inline" >
      {renderMenus(menu)}

    {/* {routes.map((item : any) => !item.hideInMenu
        ? <Menu.Item key={item.path} icon={<Icon name={item.icon} />} onClick={() => history.push(item.path)}>
            {item.name}
          </Menu.Item>
        : null)
    } */}
  </Menu>
  </>
}

export default memo(Nav)
