import { useState } from 'react';
import { Upload, Modal } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { URL } from '@/utils/request';

interface IProps {
  action: string;
  data: any;
  onChange: (files: any) => void;
  maxLength?: number
}

const Uploader = (props: IProps) => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fileList, setFileList] = useState<any>([])
  const [previewImage, setPreviewImage] = useState('');
  const { onChange, action, data, maxLength } = props;
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>添加图片</div>
    </div>
  );

  // const handleChange = (info: any) => {
  //   if (info.file.status === 'uploading') {
  //     setLoading(true);
  //     return;
  //   }
  //   if (info.file.status === 'done') {
  //     setLoading(false);
  //     setPreviewImage(info.file.response.data);
  //     onChange(info.file.response.data);
  //   }
  // };

  const handleUploadChange = (files: any) => {
    onChange(files.fileList)
    setFileList(files.fileList)
  }

  const handlePreview = (file: any) => {
    setPreviewImage(file.url || file.thumbUrl)
    setShowModal(true);
  };
  console.log(fileList)
  return (
    <>
      <Upload
        listType="picture-card"
        className="avatar-uploader"
        onPreview={handlePreview}
        action={`${URL}${action}`}
        fileList={fileList}
        onChange={handleUploadChange}
        data={data}
        accept=".png, .jpg, .jpeg, .gif"
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
        title={'图片预览'}
        footer={null}
        onCancel={() => setShowModal(false)}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default Uploader;
