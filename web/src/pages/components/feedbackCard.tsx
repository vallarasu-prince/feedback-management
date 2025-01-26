import React, { useState } from "react";
import CustomTag from "./customTag";
import {
  Button,
  Card,
  Col,
  Flex,
  Menu,
  Modal,
  Popover,
  Space,
  Typography,
} from "antd";
import {
  G_FEEDBACK_MODULE_MAP,
  G_FEEDBACK_PLATFORM_MAP,
  G_FEEDBACK_STATUS_MAP,
  G_FEEDBACK_TAG_MAP,
} from "../../common";
import {
  DeleteOutlined,
  EditOutlined,
  EyeFilled,
  MoreOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { voteFeeback } from "../services";
import { customNotification } from "./customNotification";

interface FeedbackCardProps {
  id: string;
  title: string;
  description: string;
  user: string;
  status: string;
  tags: string;
  votes: number;
  platform: string;
  module: string;
  onDeleteFeedback: any;
  onEditFeedback: any;
}

export const FeedbackCard: React.FC<FeedbackCardProps> = (props: any) => {
  const {
    id,
    title,
    description,
    user,
    status,
    tags,
    votes,
    platform,
    module: moduleKey,
    onDeleteFeedback,
    onEditFeedback,
  } = props;

  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
    onDeleteFeedback(id);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const menuPopOverContent = (
    <Menu>
      <Menu.Item
        onClick={() => onEditFeedback(id)}
        icon={
          <EditOutlined
            style={{
              color: "yellow",
            }}
          />
        }
      >
        Edit
      </Menu.Item>
      <Menu.Item
        onClick={showModal}
        icon={
          <DeleteOutlined
            style={{
              color: "red",
            }}
          />
        }
      >
        Delete
      </Menu.Item>
    </Menu>
  );

  const onVoteFeedback = async (id: string) => {
    const { status, cls, msg, payload } = await voteFeeback(id, {});
    customNotification(status, cls, msg);
    if (props?.onRefresh) props?.onRefresh();
  };

  return (
    <>
      <Card style={{ marginBottom: 2 }} hoverable>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Typography style={{ fontWeight: "bold", marginBottom: 1 }}>
              {title}
            </Typography>
            <Typography style={{ marginBottom: 2 }}>{description}</Typography>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              <CustomTag value={user} />
              <CustomTag value={status} label={G_FEEDBACK_STATUS_MAP} />
              {tags &&
                JSON.parse(tags)?.map((tag: string, index: number) => (
                  <CustomTag
                    key={index}
                    label={G_FEEDBACK_TAG_MAP}
                    value={tag}
                  />
                ))}

              <CustomTag label={G_FEEDBACK_PLATFORM_MAP} value={platform} />
              <CustomTag label={G_FEEDBACK_MODULE_MAP} value={moduleKey} />
            </div>
          </div>
          <Space>
            <Col>
              <Button
                type="link"
                href={`/feedback/view/${id}`}
                target="_blank"
                rel="noreferrer"
              >
                <EyeFilled />
              </Button>
            </Col>
            <Col>
              <Button onClick={() => onVoteFeedback(id)}>
                <UpOutlined />
                <Typography
                  style={{
                    color: "black",
                  }}
                >
                  {votes || 0} Votes
                </Typography>
              </Button>
            </Col>

            <>
              {onEditFeedback && (
                <Popover
                  content={menuPopOverContent}
                  title={false}
                  trigger="click"
                >
                  <Button
                    style={{
                      backgroundColor: "transparent",
                      color: "white",
                    }}
                  >
                    <MoreOutlined />
                  </Button>
                </Popover>
              )}
            </>
          </Space>
        </div>
      </Card>
      <Modal
        title="Delete Feedback?"
        style={{
          textAlign: "center",
        }}
        open={visible}
        centered
        destroyOnClose
        footer={false}
      >
        <p>Are you sure you want to delete the feedback?</p>
        <Space>
          <Button
            size="large"
            style={{
              backgroundColor: "transparent",
              color: "white",
              width: "200px",
            }}
            onClick={handleCancel}
          >
            Cancle
          </Button>
          <Button
            size="large"
            style={{
              backgroundColor: "red",
              color: "white",
              width: "200px",
            }}
            onClick={handleOk}
          >
            Delete
          </Button>
        </Space>
      </Modal>
    </>
  );
};
