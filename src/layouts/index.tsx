import React from 'react'
import {Layout, Menu, ConfigProvider} from 'antd';
import {history} from 'umi'
import zhCN from 'antd/lib/locale/zh_CN';
import RightContent from '@/components/RightContent'
import Icon from './icon'
import routes from '../../config/routes'
import styles from './index.less'
const {Header, Content, Sider} = Layout;

const checkRoutes = (routes: any) => {
  const obj = {}
  routes.forEach((item: any) => {
    if(obj[item.path]){
      console.log(`${item.path} 重复`)
      return
    }
    obj[item.path] = item
  })
}
checkRoutes(routes)


class LayoutMain extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed : any) => {
    this.setState({collapsed});
  };
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <Layout>
          <Header
            className="site-layout-background"
            style={{
            position: 'fixed',
            zIndex: 1,
            width: '100%',
            padding: 0,
            color: '#fff'
          }}>
            <div className={styles.logo}>瑞森房管家</div>
            <div className={styles.right}><RightContent/></div>
          </Header>
          <Sider
            collapsible
            style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            paddingTop: 70,
            left: 0
          }}>
            <Menu theme="dark" defaultSelectedKeys={[location.pathname]} mode="inline">
              {routes.map((item : any) => !item.hideInMenu
                ? <Menu.Item key={item.path} icon={<Icon name={item.icon} />} onClick={() => history.push(item.path)}>
                    {item.name}
                  </Menu.Item>
                : null)}
            </Menu>
          </Sider>
          <Layout
            className="site-layout"
            style={{
            marginLeft: 200
          }}>

            <Content
              style={{
              margin: '0 16px',
              paddingTop: 80
            }}>
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    );
  }
}

export default LayoutMain
