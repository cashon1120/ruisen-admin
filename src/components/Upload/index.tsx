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
const videoSrc = '/images/previewVideo.png';
const isVideo = (url: string) => /\.mp4$/.test(url);

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
    files.fileList.forEach((item: any) => {
      if (item.url) {
        if (isVideo(item.url)) {
          item.thumbUrl = videoSrc;
        }
      }
      if (item.response && isVideo(item.response.data)) {
        item.thumbUrl = videoSrc;
      }
    });
    onChange(files.fileList);
    setFileList(files.fileList);
  };

  const handlePreview = (file: any) => {
    let url = file.url || file.thumbUrl;
    if (file.thumbUrl === videoSrc && file.response) {
      url = file.response.data;
    }
    setPreviewImage(url);
    setShowModal(true);
  };

  useEffect(() => {
    const fileList = [];
    const setThumbUrl = (url: string) => {
      if (isVideo(url)) {
        return videoSrc;
      }
      return url;
    };
    if (defaultFile) {
      if (typeof defaultFile === 'string') {
        fileList.push({
          udi: index++,
          name: defaultFile,
          status: 'done',
          url: defaultFile,
          thumbUrl: setThumbUrl(defaultFile),
        });
      } else {
        defaultFile.forEach((item: string) => {
          fileList.push({
            udi: index++,
            name: item,
            status: 'done',
            url: item,
            thumbUrl: setThumbUrl(item),
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
        title={isVideo(previewImage) ? '视频预览' : '图片预览'}
        width={750}
        footer={null}
        onCancel={() => setShowModal(false)}
      >
        <div className={styles.preview}>
          {previewImage.indexOf('.mp4') > -1 ? (
            <video controls autoPlay src={previewImage} />
          ) : (
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          )}
        </div>
      </Modal>
    </>
  );
};

export default Uploader;
