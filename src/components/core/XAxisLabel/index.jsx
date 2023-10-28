import { memo } from "react";

const XAxisLabel = ({ x, y, payload }) => {
  return (
    <text
      x={x}
      y={y}
      dy={16}
      textAnchor="middle"
      fill="#747474"
    >
      <tspan x={x}>{payload.value.split(" ")[0]}</tspan>
      <tspan x={x} dy={10}>{payload.value.split(" ")[1]}</tspan>
    </text>
  );
};

export default memo(XAxisLabel);
