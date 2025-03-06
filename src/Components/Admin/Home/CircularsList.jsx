import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaCalendarAlt } from "react-icons/fa";
import { Calendarmini } from "@/Components/ui/calendarmini";
import { selectThemeProperties } from "@/slices/theme";
import {
  getCirculars,
  updateCircular,
  deleteCircular,
  resetStatus,
} from "@/slices/circular";
import Loader from "@/Components/Loader/Loader";
import AddButton from "@/Components/Buttons/AddButton";
import CreateDialog from "./CreateDialog";
import InputField from "@/Components/InputField/InputField";

function CircularsList() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [openDialog, setOpenDialog] = useState(false);
  const [updateDialog, setUpdateDialog] = useState(false);
  const [mainDialog, setMainDialog] = useState(false);
  const [selectedCircular, setSelectedCircular] = useState(null);
  const [formValues, setFormValues] = useState({
    title: "",
    message: "",
    circular_links: "",
  });

  const circulars = useSelector(
    (state) => state.circularManagementSlice.circulars
  );
  const status = useSelector((state) => state.circularManagementSlice.status);

  const { googleEvents } = useSelector((state) => state.calendarSlice);
  const themeProperties = useSelector(selectThemeProperties);

  const formattedCirculars = circulars.map((circular) => ({
    id: circular.id,
    subject: circular.title,
    date: moment(circular.issued_date).format("DD-MMMM-YYYY"),
    message: circular.message,
    circular_links: circular.circular_links,
  }));

  useEffect(() => {
    if (status === "succeeded") {
      setUpdateDialog(false);
      setMainDialog(false);
      setFormValues({
        title: "",
        message: "",
        circular_links: "",
      });
      dispatch(resetStatus());
    }
  }, [status, dispatch]);

  return (
    <div
      className="w-full lg:w-2/5 min-w-fit flex flex-row rounded-2xl overflow-y-scroll relative max-lg:min-h-fit lg:flex-col max-lg:flex-col"
      style={{
        color: themeProperties.textColorAlt,
        background: themeProperties?.boxBackgroundSolid,
      }}
    >
      <div className=" w-full flex items-center justify-center">
        <Calendarmini
          googleEvents={googleEvents}
          circular={formattedCirculars}
          className=" shadow-md rounded-lg"
        />
      </div>
      <div className=" rounded-lg flex-1 innerBlur">
        <div
          className="text-center font-normal sticky top-0 z-50 p-2 border-b-2 mb-2"
          style={{
            color: themeProperties.textColor,
            background: themeProperties.boxBackgroundSolid,
            borderColor: themeProperties.normal1,
          }}
        >
          Circulars
        </div>
        <div className="mx-1 relative">
          <div className="flex flex-col overflow-y-scroll h-full max-lg:h-72 gap-2 relative pt-2 pb-2 rounded-2xl">
            <style>
              {`
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background-color: ${themeProperties.scrollColor};
              }
              .innerBlur::after {
                content: '';
                position: sticky;
                left: 0;
                right: 0;
                height: 40px;
                pointer-events: none;
                z-index: 1;
                display: block;
              }
              .innerBlur::before {
                content: '';
                position: absolute;
                left: 0;
                right: 0;
                height: 20px;
                pointer-events: none;
                z-index: 1;
              }
              .innerBlur::before {
                top: 0;
                background: linear-gradient(to bottom, ${themeProperties.boxBackgroundSolid} 0%, rgba(255, 255, 255, 0) 100%);
              }
              .innerBlur::after {
                bottom: 0;
                background: linear-gradient(to top, ${themeProperties.boxBackgroundSolid} 0%, rgba(255, 255, 255, 0) 100%);
              }
              `}
            </style>

            {status === "loading" && circulars.length === 0 && (
              <div className="text-center text-sm text-gray-500 mt-4">
                <Loader name="Circulars" />
              </div>
            )}

            {circulars.length > 0 &&
              formattedCirculars?.map((circular, index) => (
                <Dialog
                  key={index}
                  onOpenChange={setMainDialog}
                  open={mainDialog}
                >
                  <DialogTrigger>
                    <div
                      className="flex justify-between py-3 rounded-lg px-3 cursor-pointer transition circularButton border-2 text-sm overflow-hidden"
                      style={{
                        "--hover-bg": themeProperties.boxHoverColor,
                        "--hover-text": themeProperties.boxHoverTextColor,
                        color: themeProperties.textColor,
                        borderColor: themeProperties.borderColor,
                      }}
                      onClick={() => {
                        setFormValues({
                          title: circular.subject,
                          message: circular.message,
                          circular_links: circular.circular_links,
                        });
                      }}
                    >
                      <style>
                        {`
                        .circularButton {
                          background: ${themeProperties.lightColor};
                        }
                        .circularButton:hover {
                          background: var(--hover-bg);
                          color: var(--hover-text);
                        }
                      `}
                      </style>
                      <span className="w-1/2 truncate text-left">
                        {circular?.subject}
                      </span>
                      <span className="w-1/3 text-nowrap">
                        {circular?.date}
                      </span>
                    </div>
                  </DialogTrigger>
                  <DialogContent
                    className="overflow-hidden rounded-xl shadow-lg p-0"
                    style={{
                      backgroundColor: themeProperties.boxBackgroundSolid,
                      color: themeProperties.textColorAlt,
                    }}
                  >
                    <div
                      className="p-4 font-normal"
                      style={{
                        color: themeProperties.textColorAlt,
                        background: themeProperties.boxBackgroundTop,
                      }}
                    >
                      {circular?.subject}
                    </div>
                    <div
                      className="p-6 space-y-4"
                      style={{ color: themeProperties.textColor }}
                    >
                      <div
                        className="flex gap-2 text-sm w-fit rounded-md justify-center items-center"
                        style={{
                          color: themeProperties.logoutColor,
                        }}
                      >
                        Date: {circular?.date} <FaCalendarAlt />
                      </div>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: circular.message,
                        }}
                        className="prose text-sm m-0 p-0"
                        style={{ color: themeProperties.textColor }}
                      />
                      {circular?.circular_links && (
                        <div className="  ">
                          <a
                            href={circular?.circular_links}
                            target="_blank"
                            className="text-sm cursor-pointer"
                            style={{
                              color: themeProperties.specialColor,
                            }}
                          >
                            More Info
                          </a>
                        </div>
                      )}
                    </div>
                    <DialogFooter className="flex justify-end p-4">
                      {user?.role == "Admin" && (
                        <button
                          className="text-sm px-4 py-2 rounded-lg"
                          style={{
                            backgroundColor: themeProperties.logoutColor,
                            color: themeProperties.textColorAlt,
                          }}
                          onClick={() => {
                            dispatch(deleteCircular(circular.id));
                          }}
                        >
                          Delete
                        </button>
                      )}
                      {user?.role == "Principal" && (
                        <button
                          className="text-sm px-4 py-2 rounded-lg"
                          style={{
                            backgroundColor: themeProperties.logoutColor,
                            color: themeProperties.textColorAlt,
                          }}
                          onClick={() => {
                            dispatch(deleteCircular(circular.id));
                          }}
                        >
                          Delete
                        </button>
                      )}
                      {user?.role == "Admin" && (
                        <button
                          className="text-sm px-4 py-2 rounded-lg"
                          style={{
                            backgroundColor: themeProperties.normal1,
                            color: themeProperties.textColorAlt,
                          }}
                          onClick={() => {
                            setUpdateDialog(true);
                            setSelectedCircular(circular);
                            setFormValues({
                              title: circular.subject,
                              message: circular.message,
                              circular_links: circular.circular_links,
                            });
                          }}
                        >
                          Edit
                        </button>
                      )}
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ))}
          </div>
        </div>
        <div className=" sticky z-50 bottom-0 w-full flex justify-center p-2">
          <AddButton
            name="Add Circular"
            onClick={() => {
              setOpenDialog(true);
            }}
            width={130}
          />
          <CreateDialog
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
            themeProperties={themeProperties}
            user={user}
          />
        </div>
      </div>

      {user?.role == "Admin" && (
        <Dialog open={updateDialog} onOpenChange={setUpdateDialog}>
          <DialogTrigger
            className=" px-4 py-2 rounded-lg text-sm hidden"
            style={{
              backgroundColor: themeProperties?.buttonColor,
              color: themeProperties?.textColorAlt,
            }}
          >
            Update
          </DialogTrigger>
          <DialogContent
            style={{
              backgroundColor: themeProperties?.boxBackgroundSolid,
            }}
          >
            <DialogHeader>
              <DialogTitle className="text-base">
                Update Circular : {selectedCircular?.subject}
              </DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <div
                className="flex flex-col gap-10"
                style={{
                  color: themeProperties?.textColor,
                }}
              >
                <div className="flex justify-between mt-4">
                  <InputField
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formValues.title}
                    handleChange={(e) =>
                      setFormValues({
                        ...formValues,
                        title: e.target.value,
                      })
                    }
                    label="Title"
                  />
                  <InputField
                    type="text"
                    name="circular_links"
                    placeholder="Circular Links"
                    value={formValues.circular_links}
                    handleChange={(e) =>
                      setFormValues({
                        ...formValues,
                        circular_links: e.target.value,
                      })
                    }
                    label="Circular Links"
                  />
                </div>
                <div className="">
                  <InputField
                    type="textarea"
                    name="message"
                    placeholder="Message"
                    value={formValues.message}
                    handleChange={(e) =>
                      setFormValues({
                        ...formValues,
                        message: e.target.value,
                      })
                    }
                    label="Message"
                  />
                </div>
                <div className="text-end">
                  <button
                    className="px-4 text-sm py-2 rounded-lg "
                    style={{
                      backgroundColor: themeProperties?.normal1,
                      color: themeProperties?.textColorAlt,
                      opacity:
                        formValues.title === "" || formValues.message === ""
                          ? 0.5
                          : 1,
                      cursor:
                        formValues.title === "" || formValues.message === ""
                          ? "not-allowed"
                          : "pointer",
                    }}
                    disabled={
                      formValues.title === "" || formValues.message === ""
                    }
                    onClick={() => {
                      const data = {
                        ...formValues,
                      };

                      dispatch(
                        updateCircular({
                          id: selectedCircular?.id,
                          data,
                        })
                      );
                    }}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="px-4 text-sm py-2 rounded-lg mx-2"
                    style={{
                      backgroundColor: themeProperties?.logoutColor,
                      color: themeProperties?.textColorAlt,
                    }}
                    onClick={() => {
                      setFormValues({
                        title: selectedCircular?.subject,
                        message: selectedCircular?.message,
                        circular_links: selectedCircular?.circular_links,
                      });
                      setSelectedCircular(null);
                      setUpdateDialog(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default CircularsList;
