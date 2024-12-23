import React, { useEffect, useRef, useState } from "react";
import { LuBell } from "react-icons/lu";
import { getMessaging, onMessage, getToken } from 'firebase/messaging';
import { messaging } from "@/firebase";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  addLatestNotification,
  addNewDeviceToken,
  updateNotificationReadStatus, 
} from "@/slices/notification";
import NotificationService from "@/services/notification.service";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { selectThemeProperties } from "@/slices/theme";

const NotificationModal = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { notifications } = useSelector((state) => state.notification);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [token, setToken] = useState(null);
  const newNotification = notifications?.some((noti) => !noti.flag);

  const handleToggleDropdown = () => setIsOpen(prev => !prev);

  const themeProperties = useSelector(selectThemeProperties);

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
      return () => unsubscribe();
    }
  }, [dispatch]);

  useEffect(() => {
    if (isOpen && newNotification) {
      notifications
        .filter((noti) => !noti.flag)
        .forEach((noti) => {
          dispatch(
            updateNotificationReadStatus({
              notificationId: noti.id,
              flag: true,
              userId: user.userid,
            })
          );
        });
    }
  }, [isOpen, newNotification, notifications, dispatch, user?.userid]);

  return (
    <div className="relative" ref={dropdownRef}>
      <Popover>
        <PopoverTrigger asChild className=" ">
          <div onClick={handleToggleDropdown} className="cursor-pointer p-2 rounded-full relative "

          >
            <LuBell size={20} color={themeProperties?.textColor}  />
            {newNotification && <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />}
          </div>
        </PopoverTrigger>
        <PopoverContent className="bg-white shadow-lg rounded-lg p-8 w-80">
          <div className="text-black">
            <div className="notification-list mt-4">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div className="notification mb-4" key={notification.id}>
                    <div className="notification-header flex justify-between items-center">
                      <h3 className="notification-title text-md font-medium">
                        {notification.title}
                        {!notification.flag && <span className="text-red-500 ml-1">*</span>}
                      </h3>
                      <span className="notification-timestamp text-xs text-gray-400">
                        {moment(notification.updatedAt).startOf("s").fromNow()}
                      </span>
                    </div>
                    <p className="notification-description text-sm text-gray-600">
                      {notification.description}
                    </p>
                  </div>
                ))
              ) : (
                <div className="no-notification-box text-center">
                  <p className="no-notifications-content text-gray-500">No New Notifications</p>
                </div>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default NotificationModal;