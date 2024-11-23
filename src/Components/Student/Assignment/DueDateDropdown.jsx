import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDueDate } from '../../../slices/assigndropdown.slice';

import styles from './StudentAssignment.module.css';

export default function DueDate() {
  const { classAssignment: classAssign } = useSelector(state => state.assignment);
  const [dueDate, setDueDat] = useState([]);
  const { duedate: dueDa } = useSelector((state) => state.assignDropDown);
  const dispatch = useDispatch();

  useEffect(() => {
    const names = [];
    classAssign?.forEach(ass => {
      if (!names.includes(ass.duedate)) {
        names.push(ass.duedate);
      }
    });
    setDueDat(names);
  }, [classAssign])

  const handleChange = (event) => {
    dispatch(setDueDate(event.target.value));
  };

  return (
    <div>
      <select value={dueDa} onChange={handleChange} className={styles.ddslt}>
        <option value="">Due Date</option>
        {
          dueDate?.map(sub => <><option value={sub} className={styles.ddopt}>{sub}</option><hr /></>)
        }
      </select>
    </div>
  );
}
