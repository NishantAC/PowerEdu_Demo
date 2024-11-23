import React from 'react';
import './Folder.css';
import { Link } from 'react-router-dom';
// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 480,
//   bgcolor: 'background.paper',
//   border: 'none',
//   boxShadow: 24,
//   px: 3,
//   py: 1
// };

function Folder({papers, groupKey}) {

  return (
    <div className="folder">
      <Link to={{ pathname: '/teacher/question-paper', state: { papers } }}>
        <button></button>
      </Link>
      <h4>{groupKey}</h4>
      {/* <h4>Class-6A<br />Half-Yearly 2020</h4> */}
    </div>
  )
}

export default Folder
