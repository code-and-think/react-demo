import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload, UploadFile } from 'antd';
import { useState } from 'react';

export default ({ value, onChange, disabled }: any) => {
  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState([] as UploadFile[]);
  return (
    <Upload
      disabled={disabled}
      listType="picture-card"
      showUploadList={false}
      action="https://localhost:3366/test"
      fileList={fileList}
      onChange={info => {
        console.log({ info });
        if (info.file.status === 'uploading') {
          setUploading(true);
          setFileList(info.fileList);
          return;
        }
        if (info.file.status === 'done') {
          const path = info.file.response.url;
          setUploading(false);
          onChange(path);
        }
      }}
    >
      {value ? (
        <img src={value} alt="avatar" style={{ width: '100%' }} />
      ) : (
        <div>
          {uploading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>点击上传</div>
        </div>
      )}
    </Upload>
  );
};
