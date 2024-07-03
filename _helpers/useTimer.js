import { useEffect, useState } from "react";
import { set } from "react-hook-form";

export default useTimer = ({ nextCall }) => {
  const [time, setTime] = useState(undefined);
  const [warning, setWarning] = useState(false);

  const updateTimer = (warning) => {
    setTime((oldTime) => {
      if (oldTime == undefined) return;
      if (oldTime <= 0) {
        if (warning) {
          // If warning is true, set time to next call
          setWarning(false);
          nextCall();
          return undefined;
        } else {
          // If warning is false, set time to next call - 1 hour
          setWarning(true);
          return process.env.EXPO_PUBLIC_AFTER_WAIT_FOR_NEXT_CYCLE * 60 * 1000;
        }
      }

      return oldTime - 1000;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => updateTimer(warning), 1000);

    return () => clearInterval(interval);
  }, [warning]);

  const setTimeExternal = (time) => {
    const untilWarning =
      time -
      Date.now() -
      process.env.EXPO_PUBLIC_BEFORE_WAIT_FOR_NEXT_CYCLE * 1000;

    if (untilWarning > 0) {
      // If warning is not needed, set time normally
      setWarning(false);
      setTime(untilWarning);
    } else {
      // If warning has triggered, set time needed for next call
      setWarning(false); // -- change
      setTime(
        untilWarning +
          process.env.EXPO_PUBLIC_AFTER_WAIT_FOR_NEXT_CYCLE * 1000
      );
    }
  };

  return [constructTimerText(time), warning, setTimeExternal];
};

const constructTimerText = (time) => {
  const nextUpdateTime = [
    Math.floor((time / (1000 * 60 * 60)) % 24),
    Math.floor((time / 1000 / 60) % 60),
    Math.floor((time / 1000) % 60),
  ];

  return `${`${nextUpdateTime[0]}`.padStart(
    2,
    "0"
  )}:${`${nextUpdateTime[1]}`.padStart(
    2,
    "0"
  )}:${`${nextUpdateTime[2]}`.padStart(2, "0")}`;
};
