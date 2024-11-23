import React, { useState } from 'react';


const NoticeDescription = ({text}) => {
  const [expanded, setExpanded] = useState(false);

     const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
        <div>{text && !expanded ? text.slice(0, 200) : text}
        {" "} 
        {text &&  text.length > 200 ? 
        <span style={{color:"#6755D9", cursor:"pointer"}} onClick={toggleExpand}> {expanded ? 'Read Less ' : ' Read more...'}</span> : ""}
        </div>
    </div>
  );
};

export default NoticeDescription;