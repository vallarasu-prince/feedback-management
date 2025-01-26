import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Typography,
  Input,
  Select,
  Upload,
  Form,
  Tag,
} from "antd";
import {
  G_FEEDBACK_MODULE_MAP,
  G_FEEDBACK_MODULES_ORDER,
  G_FEEDBACK_PLATFORM_MAP,
  G_FEEDBACK_PLATFORMS_ORDER,
  G_FEEDBACK_STATUS_MAP,
  G_FEEDBACK_STATUS_ORDER,
  G_FEEDBACK_TAG_MAP,
  G_FEEDBACK_TAGS_ORDER,
} from "../../common";
import { editFeeback, getFeebackById, saveFeeback } from "../services";
import CustomTag from "./customTag";
import { customNotification } from "./customNotification";
import FileUpload from "./fileUpload";

const { TextArea } = Input;

const FeedbackForm = (props: any) => {
  const { open, setOpen, feedbackId, setFeedbackId } = props;
  const [form] = Form.useForm();
  const [feedback, setFeedback] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [, setTriggerRender] = useState(false);

  useEffect(() => {
    if (feedbackId) {
      getItem();
    }
  }, [feedbackId]);

  const getItem = async () => {
    setIsLoading(true);
    const { status, cls, msg, payload } = await getFeebackById(feedbackId);
    if (!status) {
      customNotification(status, cls, msg);
    }
    if (payload) {
      setFeedback(payload);
      if (payload) {
        form.setFieldsValue({
          ...payload,
          tags: JSON.parse(payload?.tags || "[]"),
        });
      }
    }
    setIsLoading(false);
  };

  const toggleTag = (tagKey: string) => {
    const currentTags = form.getFieldValue("tags") || [];
    const updatedTags = currentTags.includes(tagKey)
      ? currentTags.filter((tag: string) => tag !== tagKey)
      : [...currentTags, tagKey];
    form.setFieldsValue({ tags: updatedTags });
    setTriggerRender((prev) => !prev);
  };

  const handleSubmit = async (values: any) => {
    const saveFunction = feedbackId ? editFeeback : saveFeeback;
    const { status, cls, msg } = await saveFunction(feedbackId, values);
    customNotification(status, cls, msg);
    resetForm();
  };

  const resetForm = () => {
    form.resetFields();
    setFeedbackId(null);
    setOpen(false);
    props?.onRefresh();
  };

  return (
    <>
      <Button
        style={{
          position: "fixed",
          bottom: 16,
          right: 16,
          padding: 20,
        }}
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
      >
        + Feedback
      </Button>

      <Modal
        loading={isLoading}
        open={open}
        onCancel={resetForm}
        footer={null}
        centered
        width={600}
        style={{
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <div>
          <Typography.Title
            level={3}
            style={{
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "16px",
            }}
          >
            Bug Report
          </Typography.Title>
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please enter a title!" }]}
            >
              <Input placeholder="Enter a concise title for the issue" />
            </Form.Item>

            <Form.Item
              label="Platform"
              name="platform"
              rules={[
                { required: true, message: "Please specify the platform!" },
              ]}
            >
              <Select placeholder="Select the platform">
                {G_FEEDBACK_PLATFORMS_ORDER?.map((platformKey: string) => {
                  const platform = G_FEEDBACK_PLATFORM_MAP[platformKey];
                  return (
                    <Select.Option key={platformKey} value={platformKey}>
                      {platform.icon} {platform.label}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item
              label="Module"
              name="module"
              rules={[{ required: true, message: "Please select a module!" }]}
            >
              <Select placeholder="Select the module" allowClear>
                {G_FEEDBACK_MODULES_ORDER?.map((moduleKey: string) => {
                  const module = G_FEEDBACK_MODULE_MAP[moduleKey];
                  return (
                    <Select.Option key={moduleKey} value={moduleKey}>
                      {module.icon} {module.label}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please describe the issue in detail!",
                },
              ]}
            >
              <TextArea placeholder="Add additional details here..." rows={4} />
            </Form.Item>

            <Form.Item
              label="Status"
              name="status"
              rules={[
                {
                  required: true,
                  message: "Please select the status!",
                },
              ]}
            >
              <Select placeholder="Select the Status" allowClear>
                {G_FEEDBACK_STATUS_ORDER?.map((statusKey: string) => {
                  const module = G_FEEDBACK_STATUS_MAP[statusKey];
                  return (
                    <Select.Option key={statusKey} value={statusKey}>
                      {module.label}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item label="Attachments" name="attachments">
              <FileUpload />
            </Form.Item>

            <Form.Item label="Tags" name="tags">
              <div>
                {G_FEEDBACK_TAGS_ORDER?.map((tagKey) => {
                  const tag = G_FEEDBACK_TAG_MAP[tagKey];
                  const currentTags = form.getFieldValue("tags") || [];
                  return (
                    <CustomTag
                      key={tagKey}
                      onClick={() => toggleTag(tagKey)}
                      style={{
                        color: currentTags.includes(tagKey)
                          ? "white"
                          : tag.color,
                        backgroundColor: currentTags.includes(tagKey)
                          ? tag.color
                          : undefined,
                      }}
                      label={G_FEEDBACK_TAG_MAP}
                      value={tagKey}
                    />
                  );
                })}
              </div>
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              style={{
                color: "#000",
                fontWeight: "bold",
                padding: "10px 20px",
                width: "100%",
              }}
            >
              Submit
            </Button>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default FeedbackForm;
