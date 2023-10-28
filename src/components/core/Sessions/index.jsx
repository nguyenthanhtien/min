import { Fragment, memo } from "react";

import ButtonText from "@/components/core/ButtonText";

const Sessions = ({ sessions, onClick }) => {
  if (!sessions.length && typeof sessions !== "object") return null;

  return (
    <div className="mcmc-sessions">
      {sessions.map((session, index) => (
        <Fragment key={session}>
          <ButtonText btnText={session} onClick={() => onClick(session)} />
          {index < sessions.length - 1 ? ", " : null}
        </Fragment>
      ))}
    </div>
  );
};

export default memo(Sessions);
