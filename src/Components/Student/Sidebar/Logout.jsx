import React, { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../slices/auth";
import { eventBus } from "../../../common/EventBus";
import WebFont from 'webfontloader';
import LogoutIcon from "../../../icons/LogoutIcon";
import styles from './Nav.module.css';

function Logout() {

    const dispatch = useDispatch();

    const logOut = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Rubik']
            }
        });
    }, []);

    useEffect(() => {
        eventBus.subscribe("logout", () => {
            logOut();
        });

        return () => {
            eventBus.unsubscribe("logout");
        };
    }, [logOut]);


    return (
        <div>
            <a href="/"
                className={styles.logoutbtn_small_screen}
                onClick={logOut}
            >
                <p>
                    <LogoutIcon style={{ color: "white" }} />

                    <span style={{ color: "white", fontStyle: "normal", fontWeight: "normal", fontSize: "13px" }}>Logout</span>
                </p>
            </a>
        </div>
    );
}

export default Logout;

