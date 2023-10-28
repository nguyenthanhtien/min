import { memo } from "react";

import { medalImages } from "@/utils/constants/enum";

const Achievements = ({ achievements }) => {
  if (!achievements?.length && typeof achievements !== "object") return null;

  return (
    <div className="mcmc-achievements">
      {[...achievements].sort().map((medalEnum, index) => (
        <img
          key={medalEnum + index}
          alt="Achievements"
          id={`medal-${medalEnum}`}
          src={medalImages[medalEnum]}
        />
      ))}
    </div>
  );
};

export default memo(Achievements);
