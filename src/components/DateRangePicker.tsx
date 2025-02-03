import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';


export default function DateRangePicker({
  onChange,
}: {
  onChange: (dates: [Date, Date]) => void;
}) {
  const [dates, setDates] = useState<[Date, Date]>([new Date(), new Date()]);

  return (
    <div className="flex items-center gap-2">
      <DatePicker
        selectsRange
        startDate={dates[0]}
        endDate={dates[1]}
        onChange={(update: [Date, Date]) => {
          setDates(update);
          onChange(update);
        }}
        dateFormat="dd/MM/yyyy"
        className="border rounded-md p-2"
      />
    </div>
  );
}