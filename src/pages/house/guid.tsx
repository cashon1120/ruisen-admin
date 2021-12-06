import { useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import Uploader from '@/components/Upload';
import { PlusOutlined } from '@ant-design/icons';
import styles from './guide.less';

interface IProps {
  defaultData?: any[];
  onFormChange: (data: Item[]) => void;
}

export interface Item {
  id: number;
  title: string;
  icon: string;
  description: string;
}

let index = 0;

const Guid = (props: IProps) => {
  const { onFormChange, defaultData } = props;
  const [data, setData] = useState<Item[]>([]);
  const handleAddData = () => {
    data.push({
      id: index++,
      title: '',
      icon: '',
      description: '',
    });
    onFormChange(data);
    setData([...data]);
  };

  const handleTitleChange = (e: any, id: number) => {
    data.forEach((item: Item) => {
      if (item.id === id) {
        item.title = e.target.value;
      }
    });
    onFormChange(data);
    setData([...data]);
  };

  const handleIconChange = (imgs: any[], id: number) => {
    if (imgs.length === 0) return;
    data.forEach((item: Item) => {
      if (item.id === id) {
        item.icon = imgs[0].response?.data;
      }
    });
    onFormChange(data);
    setData([...data]);
  };

  const handleDescChange = (e: any, id: number) => {
    data.forEach((item: Item) => {
      if (item.id === id) {
        item.description = e.target.value;
      }
    });
    onFormChange(data);
    setData([...data]);
  };

  const handleDelete = (id: number) => {
    const res = data.filter((item: Item) => item.id !== id);
    onFormChange(res);
    setData(res);
  };

  useEffect(() => {
    console.log(defaultData);
    if (defaultData) {
      setData(defaultData);
    }
  }, []);
  console.log(data);
  return (
    <>
      <Button onClick={handleAddData}>
        <PlusOutlined />
        添加业主指南
      </Button>
      {data.map((item: Item) => (
        <div key={item.id} className={styles.list}>
          <div>
            <label>标题</label>
            <Input
              defaultValue={item.title}
              placeholder="请输入标题"
              onChange={(e: any) => handleTitleChange(e, item.id)}
            />
          </div>
          <div>
            <label>图标</label>
            <div>
              <Uploader
                action="file/upload"
                data={{ fileType: 'HOUSE_PHOTOS' }}
                defaultFile={item.icon}
                onChange={(imgs: any[]) => handleIconChange(imgs, item.id)}
              />
              <span style={{ opacity: 0.6 }}>图片大小: 60*60</span>
            </div>
          </div>
          <div>
            <label>描述</label>
            <Input.TextArea
              defaultValue={item.description}
              placeholder="请输入描述"
              onChange={(e: any) => handleDescChange(e, item.id)}
            />
          </div>
          <div className={styles.btnWrapper}>
            <a onClick={() => handleDelete(item.id)}>删除</a>
          </div>
        </div>
      ))}
    </>
  );
};

export default Guid;
