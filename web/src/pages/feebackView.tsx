import { Card, Image, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { customNotification } from "./components/customNotification";
import { getFeebackById } from "./services";
import { FeedbackCard } from "./components/feedbackCard";

const FeebackView = (props: any) => {
  const { id = "" } = useParams();
  const [feedback, setFeedback] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    getItem();
  }, [id, refresh]);

  const getItem = async () => {
    setIsLoading(true);
    const { status, cls, msg, payload } = await getFeebackById(id);
    if (!status) {
      customNotification(status, cls, msg);
    }
    if (payload) {
      setFeedback(payload);
    }
    setIsLoading(false);
  };

  const onRefresh = () => {
    setRefresh(refresh + 1);
  };

  return (
    <Card loading={isLoading} bordered={false}>
      <FeedbackCard {...feedback} onRefresh={onRefresh} />
      <Card title={"Attachment"} bordered={false}>
        {feedback?.attachments && (
          <Image width={"20%"} src={feedback?.attachments} />
        )}
      </Card>
    </Card>
  );
};

export default FeebackView;
