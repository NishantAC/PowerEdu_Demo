import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNoticeDropdownClasses, classnoticedata } from "../../../slices/classnotice";
import { selectThemeProperties } from "@/slices/theme";
import ClassNoticeService from "../../../services/classnotice.service";

export default function AdminNotice() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const school_id = user?.school_id;
  const academic_year_id = 1;
  const themeProperties = useSelector(selectThemeProperties);
  const classnotice = useSelector((state) => state.classnotice.classnotice);
  const [allNotices, setAllNotices] = useState();
  const [selectedNotice, setSelectedNotice] = useState(null);

  useEffect(() => {
    if (user) {
      dispatch(classnoticedata({ school_id, academic_year_id }));
    }
  }, [user]);

  useEffect(() => {
    if (classnotice) {
      setAllNotices(classnotice?.data);
    }
  }, [classnotice]);

  if (!allNotices) {
    return (
      <div className="p-4 h-full">
        <div
          className="p-6 rounded-lg shadow-md h-full flex justify-center items-center"
          style={{ backgroundColor: themeProperties?.boxBackgroundSolid }}
        >
          <p style={{ color: themeProperties?.textColor }}>No notices found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="  h-full">
      <div
        className="p-6 rounded-lg shadow-md h-full"
        style={{ backgroundColor: themeProperties?.boxBackgroundSolid }}
      >
        {allNotices.map((notice) => (
          <div key={notice?.id} className="mb-4">
            <Dialog>
              <DialogTrigger onClick={() => setSelectedNotice(notice)}>
                <button
                  className=" p-4 w-80 rounded-lg text-start flex flex-col  gap-4  text-base"
                  style={{
                    backgroundColor: themeProperties?.normal1,
                    color: themeProperties?.textColorAlt,
                  }}
                >
                  <h1>{notice?.title}</h1>
                  <p className="text-sm">
                    Date: {new Date(notice?.issued_date).toLocaleDateString()}
                  </p>
                </button>
              </DialogTrigger>
              {selectedNotice && selectedNotice?.id === notice?.id && (
                <DialogContent
                  style={{
                    backgroundColor: themeProperties?.boxBackgroundSolid,
                  }}
                >
                  <DialogHeader>
                    <DialogTitle>{selectedNotice?.title}</DialogTitle>
                  </DialogHeader>
                  <DialogDescription>
                    <p>{selectedNotice?.message}</p>
                    {selectedNotice?.notice_links && (
                      <a
                        href={selectedNotice?.notice_links}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        More details
                      </a>
                    )}
                  </DialogDescription>
                  <DialogFooter>
                    <p>
                      Expiry date:{" "}
                      {new Date(
                        selectedNotice.expiry_date
                      ).toLocaleDateString()}
                    </p>

                    <Dialog className="self-end">
                      <DialogTrigger
                        className="self-end "
                        style={{ color: themeProperties?.logoutColor }}
                      >
                        <MdDelete />
                      </DialogTrigger>
                      <DialogContent
                        style={{
                          backgroundColor: themeProperties?.boxBackgroundSolid,
                        }}
                      >
                        <DialogHeader>
                          <DialogTitle>Delete Notice</DialogTitle>
                        </DialogHeader>
                        <DialogDescription>
                          <p>Are you sure you want to delete this notice?</p>
                        </DialogDescription>
                        <div className="text-end">
                          <button
                            className=" px-6 py-2 rounded-lg"
                            style={{
                              backgroundColor: themeProperties?.logoutColor,
                              color: themeProperties?.textColorAlt,
                            }}
                            onClick={() => {
                              // deleteNotice(notice?.id);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </DialogFooter>
                </DialogContent>
              )}
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  );
}
