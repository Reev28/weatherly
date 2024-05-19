'use client'
import React, { useState, useEffect } from 'react';

function Clock({ timeZoneOffset,suppressHydrationWarning }:{timeZoneOffset:number,suppressHydrationWarning:boolean}) {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const fetchTime = () => {
      const d = new Date();
      const localTime = d.getTime();
      const localOffset = d.getTimezoneOffset() * 60000;
      const utc = localTime + localOffset;
      const locationLocalTime = utc + (1000 * timeZoneOffset);

      setCurrentTime(new Date(locationLocalTime));
    };

    // Fetch time when the component mounts
    fetchTime();

    // Update time every second
    const intervalId = setInterval(fetchTime, 1000);

    // Clean up interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [timeZoneOffset]);

  return (
    <div>
      {/* <h2>Clock for Timezone: {getTimeZoneName(timeZoneOffset)}</h2> */}
      <p className='clock'>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase()}</p>
    </div>
  );
}

export default Clock;
