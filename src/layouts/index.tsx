import React from 'react'
import {Layout, ConfigProvider} from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import RightContent from '@/components/RightContent'
import styles from './index.less'
import Nav from './nav'

const {Header, Content, Sider} = Layout;
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
            <Nav />
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
