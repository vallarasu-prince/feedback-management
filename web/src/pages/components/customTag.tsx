import { Tag } from "antd";

const CustomTag = (props: any) => {
  const { label, value } = props;
  const tag = label?.[value] || {};
  return (
    <Tag
      {...props}
      style={{
        border: `1px solid ${tag?.color ? tag?.color : undefined}`,
        cursor: "pointer",
        borderRadius: "5px",
        padding: "5px 10px",
        marginRight: "8px",
        color: tag.color,
        ...props?.style,
      }}
    >
      {tag?.icon} {tag?.label || value}
    </Tag>
  );
};

export default CustomTag;
