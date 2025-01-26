import React, { useEffect, useState } from "react";
import { FeedbackCard } from "./components/feedbackCard";
import { Button, Card, Col, Layout, Row, Spin, Typography } from "antd";
import FeedbackForm from "./components/feedbackForm";
import { deleteFeeback, getFeebacks } from "./services";
import { customNotification } from "./components/customNotification";
import useCurrentUser from "./hooks/useCurrentUser";
import CustomSpin from "./components/customSpin";
const { Header } = Layout;
const { Text } = Typography;

const FeedbackBoard = () => {
  const user = useCurrentUser();
  const [open, setOpen] = useState(false);
  const [feedbacks, setFeedbacks] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [feedbackId, setFeedbackId] = useState<string>();

  useEffect(() => {
    getItems();
  }, [refresh]);

  const onRefresh = () => {
    setRefresh(refresh + 1);
  };

  const getItems = async () => {
    setIsLoading(true);
    const { status, cls, msg, payload } = await getFeebacks();
    if (payload) {
      setFeedbacks(payload);
    }
    if (!status) {
      customNotification(status, cls, msg);
    }
    setIsLoading(false);
  };

  const onDeleteFeedback = async (id: string) => {
    const { status, cls, msg, payload } = await deleteFeeback(id);
    customNotification(status, cls, msg);
    onRefresh();
  };

  const onEditFeedback = async (id: string) => {
    setFeedbackId(id);
    setOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  if (isLoading) {
    return <CustomSpin />;
  }
  // if (!user) {
  //   window.location.href = "/login";
  // }

  return (
    <div style={{ padding: 10, minHeight: "100vh" }}>
      <Layout>
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#001529",
            padding: "0 20px",
          }}
        >
          {user ? (
            <div style={{ color: "white", fontSize: "20px" }}>
              <Text strong>Welcome, {user?.name}</Text>
            </div>
          ) : (
            <>
              <h2>Feedback Management</h2>
            </>
          )}

          <div>
            {user ? (
              <Button type="primary" danger onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button type="link" href="/login">
                Login
              </Button>
            )}
          </div>
        </Header>

        {isLoading ? (
          <CustomSpin />
        ) : (
          <Row gutter={[12, 12]}>
            {feedbacks.length > 0 ? (
              feedbacks?.map((feedback: any, index: number) => (
                <Col span={24}>
                  <FeedbackCard
                    key={index}
                    {...feedback}
                    onDeleteFeedback={onDeleteFeedback}
                    onEditFeedback={onEditFeedback}
                    onRefresh={onRefresh}
                  />
                </Col>
              ))
            ) : (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography.Title level={4}>
                  No Feedbacks found 😔!
                </Typography.Title>
              </div>
            )}
          </Row>
        )}

        {user && (
          <FeedbackForm
            open={open}
            setOpen={setOpen}
            onRefresh={onRefresh}
            feedbackId={feedbackId}
            setFeedbackId={setFeedbackId}
          />
        )}
      </Layout>
    </div>
  );
};

export default FeedbackBoard;
