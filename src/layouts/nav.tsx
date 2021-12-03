import {useState, useEffect, memo} from 'react'
import Icon from './icon'
import {history} from 'umi'
import Loading from '@/components/Loading';
import {Menu} from 'antd';
import routes from '../../config/routes'
import HttpRequest from '@/utils/request';
const {SubMenu} = Menu

const checkRoutes = (routes : any) => {
  const obj = {}
  routes.forEach((item : any) => {
    if (obj[item.path]) {
      console.log(`${item.path} 重复`)
      return
    }
    obj[item.path] = item
  })
}
checkRoutes(routes)

const getCurrentPath = () => {
  const path = location.pathname.split('/')
  return `/${path[1]}`
}


const Nav = () => {
  const [loading, setLoading] = useState(true)
  const [menu, setMenu] = useState([])

  useEffect(() => {
    HttpRequest({url: 'admin/user/menus', method: 'get'}).then((res : any) => {
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
      {/* {renderMenus(menu)} */}

    {routes.map((item : any) => !item.hideInMenu
        ? <Menu.Item key={item.path} icon={<Icon name={item.icon} />} onClick={() => history.push(item.path)}>
            {item.name}
          </Menu.Item>
        : null)
    }
  </Menu>
  </>
}

export default memo(Nav)
