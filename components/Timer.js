import React, { useEffect, useState } from 'react';

export default function Timer({ start, handleTimeEnd, className }) {
  const [time, setTime] = useState(start);

  useEffect(() => {
    let myInterval;
    if (time === 0) {
      handleTimeEnd();
    } else {
      myInterval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => {
      myInterval && clearInterval(myInterval);
    };
  }, [time]);

  return <div className={className}>{time}</div>;
}
