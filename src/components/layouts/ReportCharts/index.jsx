import { memo, useMemo } from "react";
import moment from "moment";

import IncreaseIcon from "@/assets/icons/arrow-increase.svg";
import DecreaseIcon from "@/assets/icons/arrow-decrease.svg";

import TrendBox from "@/components/core/TrendBox";
import ProgressPie from "@/components/core/ProgressPie";
import ButtonText from "@/components/core/ButtonText";
import DateSelect from "@/components/core/DateSelect";
import LineChart from "../LineChart";

import useReportManagement from "@/services/hooks/useReportManagement";

import "./styles.scss";

const lines = [
  {
    key: "totalPlayer",
    color: "#72D5E1",
  },
  {
    key: "totalSession",
    color: "#1856B1",
  },
];

const legends = [
  {
    value: "Total Player",
    type: "circle",
    color: "#72D5E1",
  },
  {
    value: "Total Session",
    type: "circle",
    color: "#1856B1",
  },
];

const tooltipNames = {
  totalPlayer: "Total Player",
  totalSession: "Total Session",
};

const ReportCharts = () => {
  const { chartReport } = useReportManagement();
  const { status, data } = chartReport;

  const chartData = useMemo(() => {
    if (data.chart?.data?.length) {
      const convertData = data.chart.data.map((o, i) => ({
        ...o,
        name: `${moment().month(o.month).year(o.year).format("MMM")} ’${o.year
          ?.toString()
          ?.slice(2)}`,
        tooltipLabel: `${data.chart.labels[i]} ${o.year}`,
        tooltipNames: tooltipNames,
        highestValue: Math.max(o.totalPlayer, o.totalSession),
      }));

      return { data: [{ name: "0" }, ...convertData], lines, legends };
    }

    return null;
  }, [data.chart]);

  return (
    <div className="mcmc-report__chart-content">
      <div className="mcmc-report__section flex gap-4">
        <TrendBox
          title="Total Player"
          totalCount={data.totalPlayer?.toLocaleString()}
          percent={data.totalPlayerPercent}
        />
        <TrendBox
          title="Total Session"
          totalCount={data.totalSession?.toLocaleString()}
          percent={data.totalSessionPercent}
        />
        <TrendBox
          title="Total Playtime"
          totalCount={data.totalPlaytime?.toLocaleString()}
          percent={data.totalPlaytimePercent}
          totalUnit="min"
        />
        <TrendBox
          title="Total Facilitator"
          totalCount={data.totalFacilitator?.toLocaleString()}
          // percent={data.totalFacilitatorPercent}
          unit="person"
        />
      </div>
      <div className="mcmc-report__section flex gap-6">
        <div className="mcmc-report__gray-box">
          <ProgressPie
            progressColor="#02B3F0"
            progressPercent={data.percentMale}
            countingText={`${data.totalMale} Male`}
          />
        </div>
        <div className="mcmc-report__gray-box">
          <ProgressPie
            progressColor="#F00291"
            progressPercent={data.percentFemale}
            countingText={`${data.totalFemale} Female`}
          />
        </div>
        <div className="mcmc-report__gray-box">
          <div className="mcmc-report__recent">
            <p className="mcmc-report__recent__title">
              Recent Session This Week
            </p>
            <div className="flex items-center gap-2">
              <p className="mcmc-report__recent__total">
                {data.recentSessionThisWeek}
              </p>
              <img
                alt="Trend icon"
                src={
                  data.recentSessionThisWeekPercent < 0
                    ? DecreaseIcon
                    : IncreaseIcon
                }
              />
              <p className="mcmc-report__recent__percentage">
                {data.recentSessionThisWeekPercent}% from last week
              </p>
            </div>
            <div className="mcmc-report__recent__list">
              {data.recentSessionThisWeeks?.length
                ? data.recentSessionThisWeeks.map((item) => (
                    <div
                      className="mcmc-report__recent__item"
                      key={item.sessionName}
                    >
                      <ButtonText btnText={item.sessionName} /> -{" "}
                      <p>{moment(item.sessionDate).format("DD MMM YYYY")}</p>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
      <div className="mcmc-report__section">
        <p className="font-light text-lg/6 mb-[11px]">
          Total Player vs Total Sessions
        </p>
        <div className="mcmc-report__graph">
          <div className="mb-[9px] ml-[34px] relative flex justify-between">
            <p className="text-base/4 text-[#a6a6a6]">Total</p>
            <DateSelect />
          </div>
          {chartData ? (
            <LineChart cWidth={907} cHeight={238} {...chartData} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default memo(ReportCharts);
