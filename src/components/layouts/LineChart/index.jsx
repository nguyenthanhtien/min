import { memo, useRef, useCallback, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import XAxisLabel from "@/components/core/XAxisLabel";

import "./styles.scss";

const triangleTooltipHeight = 7;
const dotRadius = 4;

const renderLegend = ({ payload }) => (
  <ul className="mcmc-linechart__legend">
    {payload.map((entry, index) => (
      <li className="mcmc-linechart__legend__item" key={`item-${index}`}>
        <span
          className="mcmc-linechart__legend__icon"
          style={{ backgroundColor: entry.color }}
        />
        <span className="mcmc-linechart__legend__value">{entry.value}</span>
      </li>
    ))}
  </ul>
);

const LineGraph = ({ lines, legends, data }) => {
  const tooltipRef = useRef();

  const handleMouseLeave = useCallback(() => {
    tooltipRef.current.style.opacity = "0";
  }, []);

  const handleDotActive = useCallback(
    (e) => {
      if (
        data &&
        data[e.index] &&
        e.payload.tooltipNames &&
        data[e.index].highestValue === e.value
      ) {
        const tooltipChild = tooltipRef.current.querySelectorAll("p");
        const { cy, payload } = e;

        tooltipChild[0].innerText = payload.tooltipLabel;
        Object.values(payload.tooltipNames).forEach((name, i) => {
          tooltipChild[i + 1].children[0].innerText = name;
          tooltipChild[i + 1].children[1].innerText =
            payload[Object.keys(payload.tooltipNames)[i]];
        });

        const tooltipViewBox = tooltipRef.current.getBoundingClientRect();

        tooltipRef.current.style.transform = `translate(${Math.round(
          e.cx - tooltipViewBox.width / 2
        )}px, ${Math.round(
          cy - tooltipViewBox.height - triangleTooltipHeight - dotRadius - 1
        )}px)`;
        tooltipRef.current.style.opacity = 1;
      }

      if (!e.payload.tooltipNames) {
        tooltipRef.current.style.opacity = 0;
      }

      return false;
    },
    [data]
  );

  return (
    <div className="mcmc-linechart">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 0,
            bottom: 0,
          }}
          onMouseLeave={handleMouseLeave}
        >
          <XAxis dataKey="name" interval={0} tick={<XAxisLabel />} />
          <YAxis />
          <Tooltip
            cursor={{ stroke: "#747474", strokeDasharray: 5 }}
            wrapperStyle={{ display: "none" }}
          />
          <Legend iconType="circle" payload={legends} content={renderLegend} />
          {lines?.length
            ? lines.map((line) => (
                <Line
                  type="monotone"
                  key={line.key}
                  dataKey={line.key}
                  stroke={line.color}
                  dot={{ r: dotRadius }}
                  activeDot={handleDotActive}
                />
              ))
            : null}
        </LineChart>
      </ResponsiveContainer>
      <div className="mcmc-linechart__tooltip" ref={tooltipRef}>
        <p className="mcmc-linechart__tooltip__label" />
        <p className="mcmc-linechart__tooltip__item">
          <span className="mcmc-linechart__tooltip__name" />
          <span className="mcmc-linechart__tooltip__value" />
        </p>
        <p className="mcmc-linechart__tooltip__item">
          <span className="mcmc-linechart__tooltip__name" />
          <span className="mcmc-linechart__tooltip__value" />
        </p>
      </div>
    </div>
  );
};

export default memo(LineGraph);
