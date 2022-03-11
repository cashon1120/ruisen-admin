import React, { createRef } from 'react';
import { Layout, ConfigProvider } from 'antd';
import { history } from 'umi';
import zhCN from 'antd/lib/locale/zh_CN';
import RightContent from '@/components/RightContent';
import routes from '../../config/routes';
import styles from './index.less';
import Nav from './nav';
import { checkRoutes } from './utils';

const { Header, Content, Sider } = Layout;

interface IProps {
  children: React.ReactChild;
}
interface IState {
  collapsed: boolean;
}
class LayoutMain extends React.PureComponent<IProps, IState> {
  routesObj: any = createRef();
  constructor(props: any) {
    super(props);
    this.routesObj.current = {};
    this.routesObj.current.routes = checkRoutes(routes);
    this.state = {
      collapsed: false,
    };
  }
  onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed });
  };

  checkRoute = (path: string) => {
    if (!this.routesObj.current.routes[path]) {
      history.replace('/404');
    }
  };
  render() {
    this.checkRoute(history.location.pathname);

    const { collapsed } = this.state;
    return (
      <ConfigProvider locale={zhCN}>
        <Layout>
          <Header className={styles.header}>
            <div className={styles.logo}>瑞森海外房管家后台管理系统</div>
            <div className={styles.right}>
              <RightContent />
            </div>
          </Header>
          <Sider
            theme="light"
            collapsible
            onCollapse={this.onCollapse}
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              paddingTop: 70,
              left: 0,
            }}
          >
            <Nav routesObj={this.routesObj} />
          </Sider>
          <Layout
            style={{
              transition: 'all .3s',
              marginLeft: collapsed ? 80 : 200,
            }}
          >
            <Content
              style={{
                margin: '0 16px',
                paddingTop: 80,
                paddingBottom: 16,
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    );
  }
}

export default LayoutMain;
