import { memo } from "react";

import { ReactComponent as IncreaseIcon } from "@/assets/icons/arrow-increase.svg";
import { ReactComponent as DecreaseIcon } from "@/assets/icons/arrow-decrease.svg";

import "./styles.scss";

const TrendBox = ({ title, totalCount, percent, totalUnit, unit }) => {
  return (
    <div className="mcmc-trend-box">
      <p className="mcmc-trend-box__title">{title}</p>
      <p className="mcmc-trend-box__total">
        <span className="mcmc-trend-box__total__count">{totalCount}</span>
        <span className="mcmc-trend-box__total__unit">{totalUnit}</span>
      </p>
      {percent != null ? (
        <div className="mcmc-trend-box__percent">
          {percent < 0 ? <DecreaseIcon /> : <IncreaseIcon />}
          <p className="mcmc-trend-box__percent__visualize">
            {percent}% from last month
          </p>
        </div>
      ) : unit ? (
        <p className="mcmc-trend-box__unit">{unit}</p>
      ) : null}
    </div>
  );
};

export default memo(TrendBox);
