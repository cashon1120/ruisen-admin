import {useEffect, useState} from 'react'
import {debouncing} from '@/utils/commonUtils'

import styles from './style.less'

const setDomHeight = () => {
  return document.body.offsetHeight - 80
}

const getUserInfo = () => {
  const userInfo = localStorage.getItem('useInfo');
  if (userInfo) {
    return JSON.parse(userInfo);
  }
  return {};
};

const userInfo = getUserInfo();

const Home = () => {
  const [height, setHeight] = useState(setDomHeight())
  const handleSetHeight = debouncing(() => {
    setHeight(setDomHeight)
  }, 200)
  useEffect(() => {
    window.addEventListener('resize', handleSetHeight)
    return () => {
      window.removeEventListener('resize', handleSetHeight)
    }
  }, [])
  return <div className={styles.wrapper} style={{height}}>
    <div>
      <div><img className={styles.avatar} src={userInfo.avatar} /></div>
      您好, {userInfo.nickname}
      <h4>欢迎来到瑞森房管家后台管理系统</h4>
    </div>
  </div>;
};

export default Home;
