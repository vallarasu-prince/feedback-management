import { Form, Input, Button, Typography, Card } from "antd";
import { register } from "../services";
import { customNotification } from "../components/customNotification";
import { setTokenandRedirect } from "../../common";

const { Title } = Typography;

const Register = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    const { status, cls, msg, payload } = await register(values);
    customNotification(status, cls, msg);
    if (payload) {
      setTokenandRedirect(payload);
    }
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
        <Title level={2}>Register</Title>
        <Form
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
          requiredMark={false}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input placeholder="Enter your name" name="name" />
          </Form.Item>

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
              Register
            </Button>
          </Form.Item>
        </Form>
        <a href="/login">Already have an account? Login</a>
      </Card>
    </div>
  );
};

export default Register;
