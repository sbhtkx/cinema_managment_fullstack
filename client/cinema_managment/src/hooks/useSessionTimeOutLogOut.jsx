import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../helpers/authHelpers";

export default function useSessionTimeOutLogOut() {
  const history = useHistory();

  const timeEntered = useSelector((state) => state.auth.timeEntered);
  const sessionTimeOut = useSelector((state) => state.auth.sessionTimeOut);
  const [remainedTime, setRemainedTime] = useState("");

  useEffect(() => {
    const fu = () => {
      const now = new Date();
      let diffTime = Math.abs(now - timeEntered);
      if (!diffTime) {
        const newTimeEntered = new Date(timeEntered);
        diffTime = Math.abs(now - newTimeEntered);
      }
      const diffMinutes = diffTime / (1000 * 60);
      if (diffMinutes >= sessionTimeOut) {
        logout(() => history.push("/sessionTimeOut"));
      }

      setRemainedTime(Math.round(sessionTimeOut - diffMinutes));
    };
    fu();
    const loop = setInterval(fu, 1000 * 60);
    return () => {
      clearInterval(loop);
    };
  }, [history, sessionTimeOut, timeEntered]);
  return remainedTime;
}
