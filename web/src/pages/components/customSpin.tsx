import { Spin } from "antd";

const CustomSpin = () => {
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
      <Spin />
    </div>
  );
};

export default CustomSpin;
