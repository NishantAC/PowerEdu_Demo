import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { resetStatus } from "@/slices/transport";

const EditDialog = ({ type, transport, handleUpdate, themeProperties }) => {
  const { status } = useSelector((state) => state.transport);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "succeeded") {
      setIsDialogOpen(false);
      // set the status to idle
      dispatch(resetStatus());
    }
  }, [status, setIsDialogOpen, dispatch]);

  return (
    <Dialog>
      <DialogTrigger
        as={Button}
        variant="contained"
        color="primary"
        className="px-4 py-2 rounded-lg mx-2"
        style={{
          backgroundColor: themeProperties?.normal1,
          color: themeProperties?.textColorAlt,
        }}
      >
        Edit
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="capitalize">
          Update {type == "Zone" && transport?.zone_name}{" "}
          {type == "Route" && transport?.route_name}{" "}
          {type == "Bus" && transport?.bus_number}{" "}
          {type == "Driver" && transport?.driver_name}
        </DialogTitle>
        <DialogDescription>
          Update the details of the {type} below.
        </DialogDescription>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 w-fit rounded-lg"
            style={{
              backgroundColor: themeProperties?.buttonColor,
              color: themeProperties?.textColorAlt,
            }}
            onClick={() => {
              handleUpdate(transport?.id);
            }}
          >
            Update
          </button>
          <button
            className="px-4 py-2 w-fit rounded-lg"
            style={{
              backgroundColor: themeProperties?.logoutColor,
              color: themeProperties?.textColorAlt,
            }}
            onClick={() => {
              // close the dialog
            }}
          >
            Cancel
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
