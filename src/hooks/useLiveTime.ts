import { useEffect, useState } from "react";

export function useLiveTime(timeZone: string) {
  const [time, setTime] = useState(() => format(timeZone));

  useEffect(() => {
    const id = setInterval(() => setTime(format(timeZone)), 1000);
    return () => clearInterval(id);
  }, [timeZone]);

  return time;
}

function format(timeZone: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}
