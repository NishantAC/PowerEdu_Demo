import { useState } from "react";

//Readmore Component
function Readmore({ quote, wordLength = 20, underline = false }) {

  //check quote length is gt than wordLength
  const isGtThnLength = quote?.length > wordLength;
  //by default show fullQuote is false
  const [showFullQuote, setshowFullQuote] = useState(false);
  //slice quote if length exceed
  const showText = showFullQuote ? quote : quote?.slice(0, wordLength);

  function handleShow() {
    //set showFullQuote true or false
    setshowFullQuote(!showFullQuote);
  }

  /**
   * on hover feature
   */
  const [isHovered, setIsHovered] = useState(false);

  const handleMouse = () => {
    setIsHovered(!isHovered);
  };

  const linkStyle = {
    cursor: 'pointer',
    fontWeight: 'bold',
    color: '#6755D9',
    textDecoration: underline && isHovered ? 'underline' : 'none',
  };

  return (
    <>
      {showText}

      {/*check if isGtThnLength(length > n) is true then show */}
      {isGtThnLength && (
        <a onClick={handleShow} style={linkStyle} onMouseEnter={handleMouse} onMouseLeave={handleMouse}>
          {/*show sliced quote then show read more*/}
          {showFullQuote ? ' ...Read Less' : ' ...Read More'}
        </a>
      )}
    </>
  );
}

export default Readmore;