import type { RunTimeLayoutConfig } from 'umi';
// import { history,  } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';

export const layout: RunTimeLayoutConfig = () => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    onPageChange: () => {
      // const { location } = history;
      // 如果没有登录，重定向到 login
      // if (!initialState?.currentUser && location.pathname !== loginPath) {
      // history.push(loginPath);
      // }
    },
  };
};
