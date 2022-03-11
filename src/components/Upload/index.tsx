import { useState, useEffect } from 'react';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { URL } from '@/utils/request';
import styles from './index.less';
interface IProps {
  data: any;
  onChange: (files: any) => void;
  action?: string;
  colorbg?: boolean;
  defaultFile?: string | string[];
  maxLength?: number;
  disablePreview?: boolean;
  accept?: string;
}

let index = 0;

const Uploader = (props: IProps) => {
  const [showModal, setShowModal] = useState(false);
  const [fileList, setFileList] = useState<any>([]);
  const [previewImage, setPreviewImage] = useState('');
  const { onChange, action, data, maxLength, defaultFile, colorbg, disablePreview, accept } = props;
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  );

  const handleUploadChange = (files: any) => {
    onChange(files.fileList);
    setFileList(files.fileList);
  };

  const handlePreview = (file: any) => {
    setPreviewImage(file.url || file.thumbUrl);
    setShowModal(true);
  };

  useEffect(() => {
    const fileList = [];
    if (defaultFile) {
      if (typeof defaultFile === 'string') {
        fileList.push({
          udi: index++,
          name: defaultFile,
          status: 'done',
          url: defaultFile,
        });
      } else {
        defaultFile.forEach((item: string) => {
          fileList.push({
            udi: index++,
            name: item,
            status: 'done',
            url: item,
          });
        });
      }
      setFileList(fileList);
    }
  }, []);

  return (
    <>
      <Upload
        listType="picture-card"
        className={colorbg ? styles.colorbg : null}
        onPreview={disablePreview ? () => {} : handlePreview}
        action={`${URL}${action || 'file/upload'}`}
        fileList={fileList}
        onChange={handleUploadChange}
        data={data}
        accept={accept ? accept : '.png, .jpg, .jpeg, .gif'}
        headers={{
          token: localStorage.getItem('token') || '',
        }}
      >
        {/* {imgSrc ? (
          <img src={imgSrc} alt="avatar" style={{ maxWidth: '100%', maxHeight: '100%' }} />
        ) : (
          uploadButton
        )} */}
        {fileList.length >= (maxLength ? maxLength : 1) ? null : uploadButton}
      </Upload>
      <Modal
        visible={showModal}
        title={'预览'}
        width={750}
        footer={null}
        onCancel={() => setShowModal(false)}
      >
        <div style={{ textAlign: 'center' }}>
          {previewImage.indexOf('.mp4') > -1 ? (
            <video controls autoPlay style={{ height: 400 }} src={previewImage} />
          ) : (
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          )}
        </div>
      </Modal>
    </>
  );
};

export default Uploader;
