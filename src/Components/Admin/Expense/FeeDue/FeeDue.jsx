import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectThemeProperties } from "@/slices/theme";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import InputField from "@/Components/InputField/InputField";
import { Button } from "@/Components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import CreateDialog from "./CreateDialog.jsx";
import SelectBox from "@/Components/InputField/SelectBox";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  deleteFeeDue,
  getFeeDues,
  updateFeeDue,
  resetStatus,
} from "@/slices/feeManagement";
import Loader from "@/Components/Loader/Loader.jsx";

const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export default function FeeDue() {
  const { user } = useSelector((state) => state.user);
  const school_id = user?.school_id;
  const academic_year_id = 1;
  const dispatch = useDispatch();
  const themeProperties = useSelector(selectThemeProperties);
  const feeDues = useSelector(
    (state) => state.feeManagement.feeDues
  );

  const status = useSelector((state) => state.feeManagement.status);
  const [selectedItem, setSelectedItem] = useState(null);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [feeDueDialog, setFeeDueDialog] = useState(false);
  const { classes } = useSelector((state) => state.manageClasses);
  const [classFilter, setClassFilter] = useState(null);
  const [classShowId, setClassShowId] = useState(null);

  const sortClassCodes = (a, b) => {
    const regex = /^(\d+)([A-Za-z]*)$/;
    const aMatch = a.class_code.match(regex);
    const bMatch = b.class_code.match(regex);

    if (aMatch && bMatch) {
      const aNum = parseInt(aMatch[1], 10);
      const bNum = parseInt(bMatch[1], 10);

      if (aNum !== bNum) {
        return aNum - bNum;
      }

      return aMatch[2].localeCompare(bMatch[2]);
    }

    return a.class_code.localeCompare(b.class_code);
  };

  useEffect(() => {
    if (classes?.data) {
      const sortedClasses = classes.data.slice().sort(sortClassCodes);
      setClassFilter("All");
    }
  }, [classes]);
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    if (status === "succeeded") {
      setUpdateDialogOpen(false);
      setFeeDueDialog(false);
      dispatch(resetStatus());
      setFormValues({
        class_id: null,
        fee_type: "",
        amount: 0.0,
        frequency: "",
        penalty_amount: 0.0,
      });
    }
  }, [status, setUpdateDialogOpen, dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(getFeeDues({ school_id, academic_year_id }));
    }
  }, [user]);

  const handleUpdateNotice = (id, body) => {
    dispatch(updateFeeDue({ id, body }));
  };

  const handleDeleteNotice = (id) => {
    dispatch(deleteFeeDue(id));
  };

  if (status === "loading") {
    return (
      <>
        <Loader name="Fee Due" />
      </>
    );
  }

  if (isEmptyObject(feeDues)) {
    return (
      <div className="p-4 h-full relative">
        <div
          className="p-6 rounded-lg shadow-md h-full flex justify-center items-center relative"
          style={{ backgroundColor: themeProperties?.boxBackgroundSolid }}
        >
          <p style={{ color: themeProperties?.textColor }}>No Fee Payments Found</p>
          <CreateDialog
            themeProperties={themeProperties}
            user={user}
          />
        </div>
      </div>
    );
  }
  if (
    feeDues.length > 0 && feeDues.filter(
      (feedue) => feedue.class_id === classShowId
    ).length === 0 &&
    classShowId !== null
  ) {
    return (
      <div className="min-h-full">
        <div
          className="p-6 rounded-lg shadow-md h-full overflow-hidden"
          style={{ backgroundColor: themeProperties?.boxBackgroundSolid }}
        >
          <div className="flex justify-end gap-4 items-center">
            <p
              className="text-base "
              style={{ color: themeProperties?.textColor }}
            >
              Class Selected
            </p>
            <Select
              value={
                classFilter
                  ? classFilter
                  : classes?.data?.slice().sort(sortClassCodes)[0]?.class_code
              }
              onValueChange={(value) => {
                setClassFilter(value);
                if (value === "All") {
                  setClassShowId(null);
                  return;
                }
                setClassShowId(
                  classes?.data?.find((c) => c.class_code === value)?.id
                );
              }}
            >
              <SelectTrigger
                className="w-32 relative z-[50]" // Ensure it's on top
              >
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent
                className="capitalize z-[1000] pointer-events-auto absolute top-full mt-1 bg-white shadow-lg rounded-md"
                style={{ position: "absolute" }} // Ensures dropdown renders above
              >
                <SelectGroup>
                  <SelectLabel>Class</SelectLabel>
                  <SelectItem value="All"> All </SelectItem>
                  {classes?.data
                    ?.slice()
                    .sort(sortClassCodes)
                    .map((classItem) => (
                      <SelectItem
                        key={classItem.class_code}
                        value={classItem.class_code}
                        className="hover:bg-gray-200"
                      >
                        {classItem.class_code}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className=" flex justify-center h-full items-center">
            <p>No feedue found for {classFilter} class.</p>
          </div>
          <CreateDialog
            themeProperties={themeProperties}
            user={user}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div
        className="p-6 rounded-lg shadow-md h-full overflow-scroll"
        style={{ backgroundColor: themeProperties?.boxBackgroundSolid }}
      >
        <div className="flex justify-end gap-4 items-center px-4">
          <p
            className="text-base "
            style={{ color: themeProperties?.textColor }}
          >
            Class Selected
          </p>
          <Select
            value={
              classFilter
                ? classFilter
                : classes?.data?.slice().sort(sortClassCodes)[0]?.class_code
            }
            onValueChange={(value) => {
              setClassFilter(value);
              if (value === "All") {
                setClassShowId(null);
                return;
              }
              setClassShowId(
                classes?.data?.find((c) => c.class_code === value)?.id
              );
            }}
          >
            <SelectTrigger
              className="w-32 relative z-[50]" // Ensure it's on top
            >
              <SelectValue placeholder="Select Class" />
            </SelectTrigger>
            <SelectContent
              className="capitalize z-[1000] pointer-events-auto absolute top-full mt-1 bg-white shadow-lg rounded-md"
              style={{ position: "absolute" }} // Ensures dropdown renders above
            >
              <SelectGroup>
                <SelectLabel>Class</SelectLabel>
                <SelectItem value="All"> All </SelectItem>
                {classes?.data
                  ?.slice()
                  .sort(sortClassCodes)
                  .map((classItem) => (
                    <SelectItem
                      key={classItem.class_code}
                      value={classItem.class_code}
                      className="hover:bg-gray-200"
                    >
                      {classItem.class_code}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-4 ">
          {feeDues &&
            feeDues
              .filter((feedue) => {
                if (classShowId) {
                  return feedue.class_id === classShowId;
                }
                return feedue;
              })
              .map((feedue) => (
                <div key={feedue?.id} className="">
                  <Dialog
                    open={feeDueDialog}
                    onOpenChange={setFeeDueDialog}
                  >
                    <DialogTrigger
                      onClick={() => setSelectedItem(feedue)}
                      className="w-80 rounded-lg text-start border-2 text-base"
                      style={{
                        borderColor: themeProperties?.normal1,
                        color: themeProperties?.textColor,
                      }}
                    >
                      <div
                        className="flex justify-between items-center "
                        style={{
                          backgroundColor: themeProperties?.normal1,
                          color: themeProperties?.textColorAlt,
                        }}
                      >
                        <h1 className="p-4 text-sm">
                          {feedue?.fee_type}
                        </h1>
                        <h1 className="p-4 text-sm">
                          {feedue?.frequency}
                        </h1>
                      </div>

                      <div className="flex  justify-between items-center px-4 py-4">
                        <p className="text-sm  flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4" />
                          Amount: {feedue?.amount}
                        </p>
                        {classFilter === "All" && (
                          <p
                            className="text-sm "
                            style={{
                              color: themeProperties?.logoutColor,
                            }}
                          >
                            Class:{" "}
                            {
                              classes?.data?.find(
                                (c) => c.id === feedue.class_id
                              )?.class_code
                            }
                          </p>
                        )}
                      </div>
                    </DialogTrigger>
                    {selectedItem && selectedItem?.id === feedue?.id && (
                      <DialogContent
                        style={{
                          backgroundColor: themeProperties?.boxBackgroundSolid,
                        }}
                      >
                        <DialogHeader>
                          <DialogTitle className="text-base">
                            {selectedItem?.fee_type} : {selectedItem?.frequency}
                          </DialogTitle>
                        </DialogHeader>
                        <DialogDescription
                          className="flex flex-col gap-1"
                          style={{
                            color: themeProperties?.textColor,
                          }}
                        >
                          <div className="flex justify-between items-center">
                            <p>Frequency : {selectedItem?.frequency}</p>
                            <p>
                              Penalty : &#8377;{selectedItem?.penalty_amount}
                            </p>
                          </div>

                          <div className="flex justify-between mt-10">
                            <p
                              className="text-sm my-2"
                              style={{
                                color: themeProperties?.logoutColor,
                              }}
                            >
                              Amount: {selectedItem?.amount}
                            </p>
                            <p
                              className="text-sm my-2"
                              style={{
                                color: themeProperties?.logoutColor,
                              }}
                            >
                              Class:{" "}
                              {
                                classes?.data?.find(
                                  (c) => c.id === selectedItem.class_id
                                )?.class_code
                              }
                            </p>
                          </div>

                          {selectedItem?.notice_links && (
                            <a
                              href={selectedItem?.notice_links}
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
                                  Delete feedue
                                </DialogTitle>
                              </DialogHeader>
                              <DialogDescription>
                                <p>
                                  Are you sure you want to delete this
                                  feedue?
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
                                    handleDeleteNotice(feedue?.id)
                                  }
                                >
                                  Delete
                                </button>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Dialog
                            open={updateDialogOpen}
                            onOpenChange={setUpdateDialogOpen}
                          >
                            <DialogTrigger
                              className="self-end px-4 py-2 rounded-lg text-sm"
                              style={{
                                backgroundColor: themeProperties?.buttonColor,
                                color: themeProperties?.textColorAlt,
                              }}
                              onClick={() => {
                                setFormValues({
                                  fee_type: selectedItem?.fee_type,
                                  amount: selectedItem?.amount,
                                  frequency: selectedItem?.frequency,
                                  penalty_amount: selectedItem?.penalty_amount,
                                  class_id: selectedItem?.class_id,
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
                                  Edit feedue
                                </DialogTitle>
                              </DialogHeader>
                              <DialogDescription className="flex flex-col gap-10">
                                <div className="flex justify-between mt-4">
                                  <InputField
                                    type="text"
                                    name="fee_type"
                                    placeholder="feedue Type"
                                    value={formValues.fee_type}
                                    handleChange={(e) =>
                                      setFormValues({
                                        ...formValues,
                                        fee_type: e.target.value,
                                      })
                                    }
                                    label="feedue Type"
                                  />

                                  <div className=" relative">
                                    {formValues.class_id && (
                                      <p className="text-[12px] absolute -top-5 left-1">
                                        Class
                                      </p>
                                    )}
                                    <Select
                                      value={
                                        formValues.class_id
                                          ? classes?.data?.find(
                                              (c) =>
                                                c.id === formValues.class_id
                                            )?.class_code
                                          : ""
                                      }
                                      onValueChange={(value) =>
                                        // get the id of the selected class
                                        setFormValues((prev) => ({
                                          ...prev,
                                          class_id: classes?.data?.find(
                                            (c) => c.class_code === value
                                          )?.id,
                                        }))
                                      }
                                    >
                                      <SelectTrigger className="w-48 relative z-[50]">
                                        <SelectValue placeholder="Select Class" />
                                      </SelectTrigger>
                                      <SelectContent
                                        className="capitalize z-[1000] pointer-events-auto absolute top-full mt-1 bg-white shadow-lg rounded-md"
                                        style={{ position: "absolute" }} // Ensures dropdown renders above
                                      >
                                        <SelectGroup>
                                          <SelectLabel>Class</SelectLabel>
                                          {classes?.data
                                            ?.slice()
                                            .sort(sortClassCodes)
                                            .map((classItem) => (
                                              <SelectItem
                                                key={classItem.class_code}
                                                value={classItem.class_code}
                                                className="hover:bg-gray-200"
                                              >
                                                {classItem.class_code}
                                              </SelectItem>
                                            ))}
                                        </SelectGroup>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                <div className="flex justify-between">
                                  <InputField
                                    type="text"
                                    name="amount"
                                    placeholder="Amount"
                                    value={formValues.amount}
                                    handleChange={(e) =>
                                      setFormValues({
                                        ...formValues,
                                        amount: e.target.value,
                                      })
                                    }
                                    label="Amount"
                                  />
                                  <div className=" relative">
                                    {formValues.expiry_date && (
                                      <p className="text-[12px] absolute -top-5 left-1">
                                        Expiry Date
                                      </p>
                                    )}

                                    <SelectBox
                                      name="frequency"
                                      value={formValues.frequency}
                                      info={formValues.frequency}
                                      placeHolder="Frequency"
                                      options={[
                                        "Monthly",
                                        "Quarterly",
                                        "Annually",
                                      ]}
                                      setInfo={(selectedValue) => {
                                        setFormValues({
                                          ...formValues,
                                          frequency: selectedValue,
                                        });
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="flex justify-between">
                                  <InputField
                                    type="number"
                                    name="penalty_amount"
                                    placeholder="Penalty Amount"
                                    value={formValues.penalty_amount}
                                    handleChange={(e) =>
                                      setFormValues({
                                        ...formValues,
                                        penalty_amount: e.target.value,
                                      })
                                    }
                                    label="Penalty Amount"
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
                                    handleUpdateNotice(feedue?.id, {
                                      class_id: formValues.class_id,
                                      fee_type: formValues.fee_type,
                                      amount: formValues.amount,
                                      frequency: formValues.frequency,
                                      penalty_amount: formValues.penalty_amount,
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
                                    setUpdateDialogOpen(false);
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
        <CreateDialog
          themeProperties={themeProperties}
          user={user}
        />
      </div>
    </div>
  );
}
