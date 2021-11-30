import { useState } from 'react';
import { Upload, Modal } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { URL } from '@/utils/request';

interface IProps {
  imgSrc: string;
  action: string;
  data: any;
  name: string;
  onChange: (src: string) => void;
}

const Uploader = (props: IProps) => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const { imgSrc, onChange, action, data, name } = props;
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>添加图片</div>
    </div>
  );

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setLoading(false);
      setPreviewImage(info.file.response.data);
      onChange(info.file.response.data);
    }
  };
  const handlePreview = () => {
    setShowModal(true);
  };
  return (
    <>
      <Upload
        name={name}
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        onPreview={handlePreview}
        action={`${URL}${action}`}
        onChange={handleChange}
        accept=".png, .jpg, .jpeg, .gif"
        data={data}
        headers={{
          token: localStorage.getItem('token') || '',
        }}
      >
        {imgSrc ? (
          <img src={imgSrc} alt="avatar" style={{ maxWidth: '100%', maxHeight: '100%' }} />
        ) : (
          uploadButton
        )}
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
