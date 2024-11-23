import React, { useEffect, useRef, useState } from "react";
import "./NotificationModal.css";
import { LuBell } from "react-icons/lu";
import { getMessaging, onMessage, getToken } from 'firebase/messaging';
import { messaging } from "../../../firebase";
import styles from "../Sidebar/Nav.module.css";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  addLatestNotification,
  addNewDeviceToken,
  fetchNotificationsByUserId,
  updateNotificationReadStatus,
} from "../../../slices/notification";
import NotificationService from "../../../services/notification.service";

const AdminNotificationModal = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { notifications } = useSelector((state) => state.notification);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [token, setToken] = useState(null);
  const [deviceTokens, setDeviceTokens] = useState([]);
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

  const handleToggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const requestNotificationPermission = async () => {
      try {
        await Notification.requestPermission();
        const token = await getToken(messaging);
        setToken(token);
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
          setDeviceTokens(res.device_tokens || []);
          if (!res.device_tokens.includes(token)) {
            dispatch(addNewDeviceToken({ userId: user.userid, newToken: token }));
          }
        })
        .catch((err) => console.error("Error fetching device tokens:", err));
    }
  }, [user, token, dispatch]);

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
    if (isOpen && newNotification) {
      notifications
        .filter((noti) => !noti.flag)
        .forEach((noti) =>
          dispatch(
            updateNotificationReadStatus({
              notificationId: noti.id,
              flag: true,
              userId: user.userid,
            })
          )
        );
    }
  }, [isOpen, newNotification, notifications, dispatch, user?.userid]);

  useEffect(() => {
    if (messaging) {
      const unsubscribe = onMessage(messaging, (payload) => {
        console.log("Push notification received:", payload);
        const newNotif = {
          title: payload?.notification?.title,
          description: payload?.notification?.body,
          id: payload?.data?.id,
          flag: false,
          updatedAt: new Date().toISOString(),
        };
        dispatch(addLatestNotification(newNotif));
        if (Notification.permission === "granted") {
          new Notification(payload.notification.title, {
            body: payload.notification.body,
            icon: payload.notification.icon,
          }).onclick = (event) => {
            event.preventDefault();
            window.focus();
          };
        } else {
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              new Notification(payload.notification.title, {
                body: payload.notification.body,
                icon: payload.notification.icon,
              }).onclick = (event) => {
                event.preventDefault();
                window.focus();
              };
            }
          });
        }
      });
      return () => unsubscribe(); // Cleanup the listener
    }
  }, [dispatch]);

  return (
    <div className="notification-dropdown" ref={dropdownRef}>
      <div onClick={handleToggleDropdown} className={styles.notifydiv}>
        <LuBell
          size={25}
        />
        {newNotification && <span className={styles.counter} />}
      </div>
      {isOpen && (
        <div className="notification-list">
          {notifications?.length > 0 ? (
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

export default AdminNotificationModal;

