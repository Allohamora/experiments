import { FC, useState } from 'react';
import { Calendar, Mode } from './components/calendar';

export const App: FC = () => {
  const [isShow, setIsShow] = useState(false);

  const toggleIsShow = () => setIsShow(!isShow);
  const calendarSelectHandler = (selected: Date[]) => {
    console.log({ selected });
    setIsShow(false);
  };

  return (
    <div className="app">
      <button onClick={toggleIsShow}>toggle show</button>
      {isShow && <Calendar mode={Mode.Range} onSelect={calendarSelectHandler} />}
    </div>
  );
};
