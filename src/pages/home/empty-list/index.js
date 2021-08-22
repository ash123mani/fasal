import React from "react";
import { Empty, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const EmptyList = () => {
  return (
    <Empty
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{
        height: 60,
      }}
      description={
        <span>
          Customize <a href="#API">Description</a>
        </span>
      }
    >
              <Link to="/add-fasal" style={{ color: "white" }}>

      <Button type="primary" icon={<PlusOutlined />}>
          {" "}
          Create New
     </Button>
</Link>
    </Empty>
  );
};

export default EmptyList;
