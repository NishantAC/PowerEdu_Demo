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
  const [mainDialog, setMainDialog] = useState(false);
  const [updateDialog, setUpdateDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
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
    title: circular.title,
    date: moment(circular.issued_date).format("DD-MMMM-YYYY"),
    message: circular.message,
    circular_links: circular.circular_links,
  }));

  useEffect(() => {
    if (status === "succeeded") {
      setUpdateDialog(false);
      setMainDialog(false);
      setDeleteDialog(false);
      setOpenDialog(false);
      setFormValues({
        title: "",
        message: "",
        circular_links: "",
      });
      dispatch(resetStatus());
    }
  }, [status, dispatch]);

  const handleUpdateCircular = (id, body) => {
    const data = {
      title: body.title,
      message: body.message,
      circular_links: body.circular_links,
    };
    dispatch(updateCircular({ id, body: data }));
  };
  const handleDeleteCircular = (id) => {
    dispatch(deleteCircular(id));
  };

  return (
    <div
      className="w-full lg:w-2/5 min-w-fit flex flex-row rounded-2xl overflow-y-scroll relative max-lg:min-h-fit lg:flex-col max-sm:flex-col "
      style={{
        color: themeProperties.textColorAlt,
        background: themeProperties?.boxBackgroundSolid,
      }}
    >
      <div className=" w-full flex items-center justify-center lg:w-full sm:w-1/2 ">
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
                <div key={index} className="">
                  <Dialog open={mainDialog} onOpenChange={setMainDialog} >
                    <DialogTrigger
                      onClick={() => setSelectedCircular(circular)}
                      className=" w-full"
                      style={{
                        "--hover-bg": themeProperties.boxHoverColor,
                        "--hover-text": themeProperties.boxHoverTextColor,
                        color: themeProperties.textColor,
                        borderColor: themeProperties.borderColor,
                      }}
                    >
                      <div
                        className="flex justify-between py-3 rounded-lg px-3 cursor-pointer transition circularButton border-2 text-sm overflow-hidden w-full"
                        style={{
                          "--hover-bg": themeProperties.boxHoverColor,
                          "--hover-text": themeProperties.boxHoverTextColor,
                          color: themeProperties.textColor,
                          borderColor: themeProperties.borderColor,
                        }}
                        onClick={() => {
                          setSelectedCircular(circular);
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
                        <p className=" truncate w-1/2 text-left">{circular?.title}</p>
                        <p className="w-full text-nowrap text-right">
                          {circular?.date}
                        </p>
                      </div>
                    </DialogTrigger>
                    {selectedCircular && (
                      <DialogContent
                        style={{  
                          backgroundColor: themeProperties?.boxBackgroundSolid,
                        }}
                      >
                        <DialogHeader>
                          <DialogTitle className="text-base">
                            {selectedCircular?.title}
                          </DialogTitle>
                        </DialogHeader>
                        <DialogDescription
                          className="flex flex-col gap-1"
                          style={{
                            color: themeProperties?.textColor,
                          }}
                        >
                          <p>{selectedCircular?.message}</p>

                          <div className="flex justify-between mt-10">
                            <p
                              className="text-sm my-2"
                              style={{
                                color: themeProperties?.logoutColor,
                              }}
                            >
                              Date: {selectedCircular?.date}
                            </p>
                          </div>

                          {selectedCircular?.circular_links && (
                            <a
                              href={selectedCircular?.circular_links}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline"
                              style={{ color: themeProperties?.specialColor }}
                            >
                              More details
                            </a>
                          )}
                        </DialogDescription>
                        <DialogFooter className="flex justify-between w-full items-center">
                          <Dialog>
                            <DialogTrigger
                              className="self-end px-4 py-2 rounded-lg text-sm"
                              style={{
                                backgroundColor: themeProperties?.logoutColor,
                                color: themeProperties?.textColorAlt,
                              }}
                            >
                              Delete
                            </DialogTrigger>
                            <DialogContent
                              style={{
                                backgroundColor:
                                  themeProperties?.boxBackgroundSolid,
                              }}
                            >
                              <DialogHeader>
                                <DialogTitle className="text-base">
                                  Delete Notice
                                </DialogTitle>
                              </DialogHeader>
                              <DialogDescription>
                                <p>
                                  Are you sure you want to delete this notice?
                                </p>
                              </DialogDescription>
                              <div className="text-end">
                                <button
                                  className="px-6 py-2 rounded-lg text-sm"
                                  style={{
                                    backgroundColor:
                                      themeProperties?.logoutColor,
                                    color: themeProperties?.textColorAlt,
                                  }}
                                  onClick={() =>
                                    handleDeleteCircular(selectedCircular?.id)
                                  }
                                >
                                  Delete
                                </button>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Dialog
                            open={updateDialog}
                            onOpenChange={setUpdateDialog}
                          >
                            <DialogTrigger
                              className="self-end px-4 py-2 rounded-lg text-sm"
                              style={{
                                backgroundColor: themeProperties?.buttonColor,
                                color: themeProperties?.textColorAlt,
                              }}
                              onClick={() => {
                                setFormValues({
                                  title: selectedCircular?.title,
                                  message: selectedCircular?.message,
                                  circular_links:
                                    selectedCircular?.circular_links,
                                });
                              }}
                            >
                              Edit
                            </DialogTrigger>
                            <DialogContent
                              style={{
                                backgroundColor:
                                  themeProperties?.boxBackgroundSolid,
                              }}
                            >
                              <DialogHeader>
                                <DialogTitle className="text-base">
                                  Edit Notice
                                </DialogTitle>
                              </DialogHeader>
                              <DialogDescription className="flex flex-col gap-10">
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
                                        notice_links: e.target.value,
                                      })
                                    }
                                    label="Circular Links"
                                  />
                                </div>
                                <div>
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
                              </DialogDescription>
                              <div className="text-end">
                                <button
                                  className="px-4 text-sm py-2 rounded-lg"
                                  style={{
                                    backgroundColor: themeProperties?.normal1,
                                    color: themeProperties?.textColorAlt,
                                  }}
                                  onClick={() => {
                                    console.log(formValues, selectedCircular?.id);
                                    handleUpdateCircular(selectedCircular?.id, {
                                      title: formValues.title,
                                      message: formValues.message,
                                      circular_links: formValues.circular_links,
                                    });
                                  }}
                                >
                                  Update
                                </button>
                                <button
                                  className="px-4 text-sm py-2 rounded-lg mx-2"
                                  style={{
                                    backgroundColor:
                                      themeProperties?.logoutColor,
                                    color: themeProperties?.textColorAlt,
                                  }}
                                  onClick={() => {
                                    setUpdateDialog(false);
                                  }}
                                >
                                  Cancel
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
    </div>
  );
}

export default CircularsList;
