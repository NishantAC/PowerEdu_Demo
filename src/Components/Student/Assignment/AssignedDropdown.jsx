import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAssDate } from '../../../slices/assigndropdown.slice';

import styles from './StudentAssignment.module.css';

export default function AssignedDate() {

  const { classAssignment: classAssign } = useSelector(state => state.assignment);
  const [assignedDate, setAssignedDate] = useState([]);
  const {assdate: assDate} = useSelector((state) => state.assignDropDown);
  const dispatch = useDispatch();

  useEffect(() => {
    const names = [];
    classAssign?.forEach(ass => {
      if (!names.includes(ass.assigndate)) {
        names.push(ass.assigndate);
      }
    });
    setAssignedDate(names);
  }, [classAssign])

  const handleChange = (event) => {
    dispatch(setAssDate(event.target.value));
  };

  return (
    <div>
      <select onChange={handleChange} value={assDate} className={styles.ddslt}>
        <option value="">Assigned Date</option>
        {
          assignedDate?.map(sub => <><option value={sub} className={styles.ddopt}>{sub}</option><hr /></>)
        }
      </select>
    </div>
  );
}
