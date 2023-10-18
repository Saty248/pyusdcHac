import { useState } from "react";
import moment from "moment/moment";

const TimezoneSelectComponent = () => {
    const [timezone, setTimezone] = useState('UTC');
  
    const timezones = moment.tz.names().map(tz => {
      return { value: tz, label: tz };
    });
  
    return (
      <>
        <label htmlFor="timezoneSelect">Select Timezone:</label>
        <select 
          id="timezoneSelect"
          value={timezone} 
          onChange={(e) => setTimezone(e.target.value)}
        >
          {timezones.map(tz => (
            <option key={tz.value} value={tz.value}>
              {tz.label}
            </option>
          ))}
        </select>
      </>
    );
  }

  export default TimezoneSelectComponent;