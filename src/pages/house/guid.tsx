import { useState, useEffect } from 'react';
import { Input, Button, Popconfirm } from 'antd';
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
  imageList: string[];
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
      imageList: [],
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
    data.forEach((item: Item) => {
      if (item.id === id) {
        if (imgs.length === 0) {
          item.icon = '';
        } else {
          item.icon = imgs[0].response?.data;
        }
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

  const handleImageChange = (imgs: any[], id: number) => {
    const result: string[] = [];
    imgs.forEach((item: any) => {
      if (item.response) {
        result.push(item.response.data);
      } else {
        result.push(item.url);
      }
    });
    data.forEach((item: Item) => {
      if (item.id === id) {
        item.imageList = result;
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
    defaultData && setData(defaultData);
  }, []);
  return (
    <>
      {data.map((item: Item) => (
        <div key={item.id} className={styles.list}>
          <div>
            <label>??????</label>
            <Input
              defaultValue={item.title}
              maxLength={10}
              placeholder="???????????????"
              onChange={(e: any) => handleTitleChange(e, item.id)}
            />
          </div>
          <div>
            <label>??????</label>
            <div className={styles.iconWrapper}>
              <Uploader
                action="file/upload"
                data={{ fileType: 'HOUSE_PHOTOS' }}
                defaultFile={item.icon}
                onChange={(imgs: any[]) => handleIconChange(imgs, item.id)}
              />
              <span style={{ opacity: 0.6 }}>????????????: 60*60</span>
            </div>
          </div>
          <div>
            <label>??????</label>
            <div style={{ width: 450 }}>
              <Uploader
                action="file/upload"
                data={{ fileType: 'OWNER_GUIDE_IMAGE' }}
                defaultFile={item?.imageList}
                maxLength={8}
                onChange={(imgs: any[]) => handleImageChange(imgs, item.id)}
              />
              <span style={{ opacity: 0.6 }}>???????????????8?????????</span>
            </div>
          </div>
          <div>
            <label>??????</label>
            <Input.TextArea
              defaultValue={item.description}
              placeholder="???????????????"
              onChange={(e: any) => handleDescChange(e, item.id)}
            />
          </div>
          <div className={styles.btnWrapper}>
            <Popconfirm
              title="??????????????????????????????"
              placement="topRight"
              onConfirm={() => handleDelete(item.id)}
            >
              <Button size="small" type="default" className="tab-btn" danger>
                ??????
              </Button>
            </Popconfirm>
          </div>
        </div>
      ))}
      <Button onClick={handleAddData}>
        <PlusOutlined />
        ??????????????????
      </Button>
    </>
  );
};

export default Guid;
