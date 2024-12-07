	import React, { useState, useRef } from 'react';
	import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
	import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
	import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
	import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
	import { styled } from '@mui/material/styles';
	import DeleteModal from '../Deleted/DeleteModal';
	import ReplyForwardMail from '../ReplyForwardMail/ReplyForwardMail';
	import ReactToPrint from 'react-to-print';
	import { getCurrentTime } from '../../../../common/Time';
	import DOMPurify from 'dompurify';
	import IframeContent from '../IframeContent';
	
	const HtmlTooltip = styled(({ className, ...props }) => (
	  <Tooltip
	    {...props}
	    classes={{ popper: className }}
	  />
	))(({ theme }) => ({
	  [`& .${tooltipClasses.tooltip}`]: {
	    backgroundColor: '#F8F8F8',
	    color: 'rgba(0, 0, 0, 0.87)',
	    fontSize: '12px',
	    fontStyle: 'normal',
	    lineHeight: '24px',
	    padding: '1px 5px',
	    marginBottom: '10px',
	  },
	}));
	
	function InboxMessage({ messageData, setValue }) {
	  const componentRef = useRef();
	  const [open, setOpen] = useState(false);
	  const handleOpen = () => setOpen(true);
	  const handleClose = () => setOpen(false);
	
	  return (
	    <div className=' h-full'>
		 {/* <div>
		   <HtmlTooltip
			title="Favourites"
			placement="left-end"
		   >
			<StarOutlinedIcon />
		   </HtmlTooltip>
		   <ReactToPrint
			trigger={() => (
			  <HtmlTooltip
			    title="Print"
			    placement="left-end"
			  >
			    <PrintOutlinedIcon />
			  </HtmlTooltip>
			)}
			content={() => componentRef.current}
		   />
		   <HtmlTooltip
			title="Delete"
			placement="left-end"
		   >
			<DeleteOutlineOutlinedIcon
			  onClick={handleOpen}
			/>
		   </HtmlTooltip>
		   {open && (
			<DeleteModal
			  open={open}
			  handleClose={handleClose}
			  messageData={messageData}
			/>
		   )}
		 </div> */}
	
		 <div  className=" h-full ">
		   <p>{getCurrentTime(messageData.date)}</p>
		   <p>{messageData.subject}</p>
		   <IframeContent content={DOMPurify.sanitize(messageData.body)} />
		 </div>
	
		 <div style={{ marginTop: '30px', display: 'block' }}>
		   <ReplyForwardMail email={messageData} setValue={setValue} />
		 </div>
	    </div>
	  );
	}
	
	export default InboxMessage;