import { memo } from "react";

import "./styles.scss";

const strokeDasharray = 2 * 3.14 * 92;
const stokeDashoffset = (percent) => strokeDasharray * ((100 - percent) / 100);

const ProgressPie = ({ progressColor, progressPercent, countingText }) => {
  return (
    <div className="mcmc-progress-pie">
      <svg width="208" height="208" viewBox="0 0 208 208">
        <circle
          r="92"
          cx="104"
          cy="104"
          fill="transparent"
          stroke="#D4D4D4"
          strokeWidth="16px"
        ></circle>
        <circle
          r="92"
          cx="104"
          cy="104"
          fill="transparent"
          stroke={progressPercent ? progressColor : "#D4D4D4z"}
          strokeLinecap="round"
          strokeWidth="16px"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={stokeDashoffset(progressPercent) || 0}
        ></circle>
      </svg>
      <div className="mcmc-progress-pie__showing">
        <p className="mcmc-progress-pie__percentage">{progressPercent}%</p>
        <p className="mcmc-progress-pie__counting">{countingText}</p>
      </div>
    </div>
  );
};

export default memo(ProgressPie);
