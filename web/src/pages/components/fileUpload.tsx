import React, { useEffect, useState } from "react";
import { Upload, message, Spin, Image, Tooltip, Button } from "antd";
import { includes } from "lodash";
import { DeleteOutlined } from "@ant-design/icons";

const FileUpload = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [fileInfo, setFileInfo] = useState<any>(null);
  const [publicUrl, setPublicUrl] = useState<string | null>(null);
  const { buttonLabel = "Image" } = props;

  useEffect(() => {
    const { value } = props;
    if (value) {
      setPublicUrl(value);
    }
  }, [props?.value]);

  // Handle the file change (upload, success, or failure)
  const handleChange = (info: any) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }

    if (info.file.status === "done") {
      setLoading(false);
      if (info.file.response && info.file.response?.payload?.publicUrl) {
        setPublicUrl(info.file.response?.payload?.publicUrl);
        setFileInfo(info.file);
        if (props.onChange)
          props.onChange(info.file.response?.payload?.publicUrl);
      }
    }
  };

  const onRemove = () => {
    setPublicUrl(null);
    if (props.onChange) props.onChange(undefined);
  };

  return (
    <>
      {!publicUrl ? (
        <Upload
          name="file"
          action={`${process.env.REACT_APP_G_API_URL}/server/api/file/upload`}
          onChange={handleChange}
          listType="picture-card"
          showUploadList={false} // Don't display the list of uploaded files
          disabled={loading}
          style={{ width: "100%" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            {loading ? <Spin size="small" /> : <span>{buttonLabel}</span>}
          </div>
        </Upload>
      ) : (
        <>
          {publicUrl && !loading && (
            <Tooltip title={fileInfo?.label}>
              <Image src={publicUrl} width={150} />

              <Button
                size="small"
                danger
                type="link"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                }}
              >
                <DeleteOutlined style={{ color: "red" }} />
              </Button>
            </Tooltip>
          )}
        </>
      )}
    </>
  );
};

export default FileUpload;
