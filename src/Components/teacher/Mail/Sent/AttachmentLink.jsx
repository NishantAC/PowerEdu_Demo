import AttachFileIcon from '@mui/icons-material/AttachFile';
;

const AttachmentLink = ({ mimeType, base64Data, fileName }) => {
  const downloadFile = () => {
    const blob = new Blob([Uint8Array.from(atob(base64Data), c => c.charCodeAt(0))], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.attachchild}>
      <li onClick={downloadFile}>
        {fileName}
      </li>
      <AttachFileIcon />
    </div>
  );
};

export default AttachmentLink;