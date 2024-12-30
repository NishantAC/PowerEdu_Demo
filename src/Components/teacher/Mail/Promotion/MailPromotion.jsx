import React, { useEffect, useMemo, useState } from 'react';
import { Avatar } from '@mui/material';
;
import SearchIcon from '@mui/icons-material/Search';
import { toast } from 'sonner';
import { getTime } from '../../../../common/Time';
import PromotionMessage from './PromotionMessage';

function MailPromotion({ promotionMails }) {
    

    const [value, setValue] = useState({});

    const openMsg = (m) => {

        setValue(m);


    }

    // 

    return (

        <div className={styles.Mail}>
            <div className={styles.Maild1}>

                <div className={styles.searchBox}>
                    <SearchIcon className={styles.SearchIcon} />
                    <input
                        type="search"
                        placeholder="Search Contact" />
                </div>

                {promotionMails && Object.values(promotionMails).map((mail) => {
                    return (
                        <button
                            value={value}
                            onClick={() => openMsg(mail)}
                            className={`${styles.selectmsgtype} ${value === 0 ? styles.activecontact : ''}`}>

                            <div className={styles.Avatard1}>
                                <div className={styles.Avatard2}>
                                    <h4 className={styles.d1h4}>{mail.from}</h4>
                                    <span className={styles.d1h4Span}>{getTime(mail.date)}</span>
                                </div>
                                <p className={styles.Maild1P}>{mail.subject}</p>
                            </div>
                        </button>)
                })}
            </div>
            <div className={styles.Maild2}>
                {value && Object.keys(value).length > 0 && <PromotionMessage messageData={value} setValue={setValue} />}
            </div>

        </div>
    )
}

export default MailPromotion
