import React, { useEffect, useRef, useState } from "react";
import "./NotificationModal.css";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import { getMessaging, onMessage, getToken } from 'firebase/messaging';
import { messaging } from "../../../firebase";
import styles from "../Sidebar/Nav.module.css";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  addLatestNotification,
  addNewDeviceToken,
  updateNotificationReadStatus,
} from "../../../slices/notification";
import NotificationService from "../../../services/notification.service";

const NotificationModal = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { notifications } = useSelector((state) => state.notification);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [token, setToken] = useState(null);
  const newNotification = notifications?.some((noti) => !noti.flag);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleToggleDropdown = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const requestNotificationPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          const token = await getToken(messaging);
          setToken(token);
        }
      } catch (error) {
        console.error("Error obtaining device token:", error);
      }
    };
    requestNotificationPermission();
  }, []);

  useEffect(() => {
    if (user?.userid && token) {
      NotificationService.fetchDeviceTokens(user.userid)
        .then((res) => {
          if (!res.device_tokens.includes(token)) {
            dispatch(addNewDeviceToken({ userId: user.userid, newToken: token }));
          }
        })
        .catch((error) => console.error("Error fetching device tokens:", error));
    }
  }, [user?.userid, token, dispatch]);

  useEffect(() => {
    const channel = new BroadcastChannel('bg-message-channel');
    channel.addEventListener('message', handleMessage);
    return () => {
      channel.removeEventListener('message', handleMessage);
    };
  }, []);

  const handleMessage = (event) => {
    const payload = event.data;
    const newNotif = {
      title: payload?.data?.title,
      description: payload?.data?.description,
      id: payload?.data?.id,
      flag: false,
      updatedAt: new Date().toISOString(),
    };
    dispatch(addLatestNotification(newNotif));
  };

  useEffect(() => {
    if (messaging) {
      const unsubscribe = onMessage(messaging, (payload) => {
        const newNotif = {
          title: payload?.notification?.title,
          description: payload?.notification?.body,
          id: payload?.data?.id,
          flag: false,
          updatedAt: new Date().toISOString(),
        };
        dispatch(addLatestNotification(newNotif));

        if (Notification.permission === "granted") {
          const notification = new Notification(payload.notification.title, {
            body: payload.notification.body,
            icon: payload.notification.icon,
          });
          notification.onclick = (event) => {
            event.preventDefault();
            window.focus();
          };
        } else {
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              const notification = new Notification(payload.notification.title, {
                body: payload.notification.body,
                icon: payload.notification.icon,
              });
              notification.onclick = (event) => {
                event.preventDefault();
                window.focus();
              };
            }
          });
        }
      });
      return () => unsubscribe();
    }
  }, [dispatch]);

  useEffect(() => {
    if (isOpen && newNotification) {
      notifications
        .filter((noti) => !noti.flag)
        .forEach((noti) => {
          dispatch(updateNotificationReadStatus({
            notificationId: noti.id,
            flag: true,
            userId: user?.userid,
          }));
        });
    }
  }, [isOpen, newNotification, notifications, dispatch, user?.userid]);

  return (
    <div className="notification-dropdown" ref={dropdownRef}>
      <div onClick={handleToggleDropdown} className={styles.notifydiv}>
        <NotificationsRoundedIcon
          fontSize="large"
          htmlColor="#6755D9"
          className={styles.notificationicon}
        />
        {newNotification && <span className={styles.counter} />}
      </div>
      {isOpen && (
        <div className="notification-list">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div className="notification" key={notification.id}>
                <div className="notification-header">
                  <h2 className="notification-title">
                    {notification.title} {!notification.flag && <span style={{ color: 'red' }}>*</span>}
                  </h2>
                  <span className="notification-timestamp">
                    {moment(notification.updatedAt).startOf("s").fromNow()}
                  </span>
                </div>
                <p className="notification-description">
                  {notification.description}
                </p>
              </div>
            ))
          ) : (
            <div className="no-notification-box">
              <p className="no-notifications-content">No Notifications</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationModal;