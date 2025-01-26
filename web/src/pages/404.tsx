import { Typography } from "antd";

const ErrorPage = () => {

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Typography.Title level={4}>404 - Page Not Found 😔!</Typography.Title>
    </div>
  );
};

export default ErrorPage;
