import React, { useEffect, useRef, useState } from 'react';

function IframeContent({ content }) {
  const iframeRef = useRef(null);
  const [height, setHeight] = useState('100%');

  useEffect(() => {
    const iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(content);
    iframeDoc.close();

    const updateHeight = () => {
    };

    iframeRef.current.addEventListener('load', updateHeight);
    updateHeight();

    return () => {
      iframeRef.current.removeEventListener('load', updateHeight);
    };
  }, [content]);

  return <iframe ref={iframeRef} style={{ width: '100%', height, border: 'none' }} />;
}

export default IframeContent;