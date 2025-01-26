import { Form, Input, Button, Typography, Card, notification } from "antd";
import { customNotification } from "../components/customNotification";
import { login } from "../services";
import { setTokenandRedirect } from "../../common";

const { Title } = Typography;

const Login = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    const { status, cls, msg, payload } = await login(values);
    if (status) setTokenandRedirect(payload);
    customNotification(status, cls, msg);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: "0 20px",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
          padding: "30px",
        }}
      >
        <Title level={2}>Login</Title>
        <Form
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
          requiredMark={false}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
                type: "email",
              },
            ]}
          >
            <Input placeholder="Enter your email" name="email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
                min: 6,
              },
            ]}
          >
            <Input.Password placeholder="Enter your password" name="password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
        <a href="/register">Don't have an account? Register</a>
      </Card>
    </div>
  );
};

export default Login;
