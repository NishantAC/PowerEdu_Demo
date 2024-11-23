import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSubject } from '../../../slices/assigndropdown.slice';

import styles from './StudentAssignment.module.css';

export default function SubjectSelect() {
  const { classAssignment: classAssign } = useSelector(state => state.assignment);
  const [subjectNames, setSubjectNames] = useState([]);
  const { subject: subj } = useSelector((state) => state.assignDropDown);
  const dispatch = useDispatch();
  useEffect(() => {
    const names = [];
    classAssign?.forEach(ass => {
      if (!names.includes(ass.subjectname)) {
        names.push(ass.subjectname);
      }
    });
    setSubjectNames(names);
  }, [classAssign])

  const handleChange = (event) => {
    dispatch(setSubject(event.target.value));
  };

  return (
    <div>
      <select value={subj} onChange={handleChange} className={styles.ddslt}>
        <option value="">Subject Name</option>
        {
          subjectNames?.map(sub => <><option value={sub} className={styles.ddopt}>{sub}</option><hr/></>)
        }
      </select>
    </div>
  );
}
