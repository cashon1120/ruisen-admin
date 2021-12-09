import {useEffect, useState} from 'react'
import { Button, Result } from 'antd';
import React from 'react';
import { history } from 'umi';
import {debouncing} from '@/utils/commonUtils'

const setDomHeight = () => {
  return document.body.offsetHeight - 80
}
const NoFoundPage: React.FC = () => {
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
  return <div style={{height}}>
  <Result
    status="404"
    title="404"
    subTitle="抱歉, 页面不存在"
    extra={
      <Button type="primary" onClick={() => history.push('/home')}>
        返回首页
      </Button>
    }
  />
  </div>
}

export default NoFoundPage;
