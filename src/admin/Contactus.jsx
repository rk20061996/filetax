import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import authFunc from '../serviceApi/admin';
import { useNavigate } from "react-router-dom";

function TimeAgo({ timestamp }) {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const updateAgo = () => {
      const currentDate = new Date();
      const notificationDate = new Date(timestamp);

      const seconds = Math.floor((currentDate - notificationDate) / 1000);

      let interval = Math.floor(seconds / 31536000);

      if (interval >= 1) {
        setTimeAgo(`${interval} ${interval === 1 ? 'year' : 'years'} ago`);
        return;
      }

      interval = Math.floor(seconds / 2592000);
      if (interval >= 1) {
        setTimeAgo(`${interval} ${interval === 1 ? 'month' : 'months'} ago`);
        return;
      }

      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        setTimeAgo(`${interval} ${interval === 1 ? 'day' : 'days'} ago`);
        return;
      }

      interval = Math.floor(seconds / 3600);
      if (interval >= 1) {
        setTimeAgo(`${interval} ${interval === 1 ? 'hour' : 'hours'} ago`);
        return;
      }

      interval = Math.floor(seconds / 60);
      if (interval >= 1) {
        setTimeAgo(`${interval} ${interval === 1 ? 'minute' : 'minutes'} ago`);
        return;
      }

      setTimeAgo('Just now');
    };

    updateAgo();
  }, [timestamp]);

  return <p className="text-muted"><small>{timeAgo}</small></p>;
}

function Contactus(props) {
  const [completeuserData, setcompleteuserData] = useState([]);
  const [fileData, setfileData] = useState([]);
  const [visibleNotifications, setVisibleNotifications] = useState(5);
  let navigate = useNavigate();

  useEffect(() => {
    getAllNotification();
  }, []);

  const getAllNotification = async () => {
    try {
      const result = await authFunc.getAllContactUs();
      console.log("result----11", result?.data?.data);
      setfileData(result?.data?.data ? result?.data?.data : []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const fileExtensionRemove = (fileName) => {
    const lastDotIndex = fileName.lastIndexOf('.');

    // If a dot is found and it is not the first character, remove the extension
    const fileNameWithoutExtension = lastDotIndex !== -1 && lastDotIndex !== 0
      ? fileName.slice(0, lastDotIndex)
      : fileName;
    return fileNameWithoutExtension
  }

  const loadMoreNotifications = () => {
    setVisibleNotifications((prev) => prev + 5);
  };

  return (
    <>
      <div className="main d-flex w-100 h-100">
        <Sidebar
          firstLoad={props.firstLoad}
          setfirstLoad={props.setfirstLoad}
          completeuserData={completeuserData}
          setfilterStatus={props.setfilterStatus}
          filterStatus={props.filterStatus}
          isLoggedIn={props.isLoggedIn}
          setisLoggedIn={props.setisLoggedIn}
        />
        <div className="mainContent container-fluid">
          <div className="card dashboard">
            <section className="section-50">
              <div className="container">
                <h3 className="m-b-50 heading-line">Contact Us Messages <i className="fa fa-bell text-muted"></i></h3>

                <div className="notification-ui_dd-content">
                  {fileData.slice(0, visibleNotifications).map((notification, index) => (
                    <div style={{cursor:'pointer'}} className={!notification.is_read?"notification-list notification-list--unread":"notification-list" } key={index} >
                      <div className="notification-list_content">
                        <div className="notification-list_img">
                          {/* <img src={notification.image ? "uploads/profile/"+notification.image :"images/dummyImage.jpg"} alt="user" /> */}
                        </div>
                        <div className="notification-list_detail">
                          <p className="text-muted">{(notification.fullname).charAt(0).toUpperCase() + (notification.fullname).slice(1)} has query {notification.message}  phone:-{notification.phone} email:-{notification.email}</p>
                          <TimeAgo timestamp={notification.created_at} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

               {visibleNotifications < fileData.length && <div style={{cursor:'pointer'}} className="text-center">
                  <a  className="dark-link" onClick={loadMoreNotifications}>Load more Notification</a>
                </div>}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contactus;
