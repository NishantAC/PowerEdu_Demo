import React, { useState, useRef, useMemo } from 'react';
import './InboxMessage.css';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Avatar from '@mui/material/Avatar';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import styles from './InboxMessage.module.css';
import DeleteModal from '../Deleted/DeleteModal';
import { List, ListItem, Collapse, ListItemButton } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import ReplyForwardMail from '../ReplyForwardMail/ReplyForwardMail';
import { MakefavouriteMail } from '../../../../services/mail.service';
import { toast } from 'react-toastify';
import ReactToPrint from 'react-to-print';
import { getCurrentTime } from '../../../../common/Time';
import DOMPurify from 'dompurify';

const HtmlTooltip = styled(({ className, ...props }) => (
	<Tooltip
		{...props}
		classes={{ popper: className }}
	/>
))(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: '#F8F8F8',
		color: 'rgba(0, 0, 0, 0.53)',
		fontSize: '12px',
		fontStyle: 'normal',
		lineHeight: '24px',
		padding: '1px 5px',
		marginBottom: '10px',
	},
}));

function InboxMessage({ messageData, setValue }) {
    //print
    const componentRef = useRef();
    //modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function extractNameAndEmail(inputString) {
        const regex = /([^<]*)<([^>]+)>/; // Regular expression to extract text before '<' and the text inside '<' and '>'
        const match = inputString.match(regex);

        if (match && match[1]) {
            // If a name is found before '<', return it
            return match[1].trim();
        } else if (match && match[2]) {
            // If there is no name but an email inside '<>', return "you"
            return "you";
        } else {
            // If there are no angular brackets, assume the entire string is an email and return "you"
            return "you";
        }
    }



	return (
		<div>
			{/*print style*/}
			<style>
				{`@media print {
                        .printme{
                            margin-top:20px;
                        }
                        .printme p{
                            font-size: 2rem;
                        }
                        .printme a{
                            font-size: 1.5rem;
                        }
                    }`}
			</style>

			{/*head*/}
			<div className={styles.Messagediv1}>
				<HtmlTooltip
					title="Favourites"
					placement="left-end"
				>
					<StarOutlinedIcon className={styles.Mailicon1} />
				</HtmlTooltip>
				<ReactToPrint
					trigger={() => (
						<HtmlTooltip
							title="Print"
							placement="left-end"
						>
							<PrintOutlinedIcon className={styles.Mailicon2} />
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
						className={styles.Mailicon3}
					/>
				</HtmlTooltip>
				{open && (
					<DeleteModal
						open={open}
						handleClose={handleClose}
						messageData={messageData[0]}
						setFltMails={setFltMails}
					/>
				)}
			</div>
			{/*subhead*/}
			<div
				ref={componentRef}
				className="printme"
			>
				<p className={styles.Div1P}>{getCurrentTime(messageData[0]?.date)}</p>
				<p className={styles.Inboxdiv1P2}>{messageData[0]?.subject}</p>
				{/*body*/}
				<div style={{ display: 'inline-block', width: '100%' }}>
					{/*  <iframe
                        title="Message Body"
                        style={{ border: 'none', width: '100%', minHeight: '300px' }}
                        srcDoc={sanitizedHTML}
                    /> */}

                    {<List style={{ display: 'block' }}>
                        {messageData && Object.values(messageData).map((message, index) => (
                            <div key={index}>
                                <p>{extractNameAndEmail(message?.from)}</p>
                                <Collapse style={{ display: 'inline-block' }} in={true} timeout="auto" unmountOnExit>
                                    <ListItem style={{ display: 'inline-block' }}>
                                        <div className={styles.Message} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(message?.body) }} />
                                        {/*    <img src={`data:image/png;base64,${message?.attachment}`} /> */}
                                    </ListItem>
                                </Collapse>
                            </div>
                        ))}
                    </List>}

                </div >
            </div>
            {/*Forward and reply*/}
            <div style={{ marginTop: '30px', display: 'block' }}>
                <ReplyForwardMail email={messageData} setValue={setValue} />
            </div >
        </div>
    )

}

export default InboxMessage;
