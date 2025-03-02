import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { resetStatus } from "@/slices/transport";
const DeleteDialog = ({ type, transport, handleDelete, themeProperties }) => {
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
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        as={Button}
        variant="contained"
        color="primary"
        className="px-4 py-2 rounded-lg"
        style={{
          backgroundColor: themeProperties?.logoutColor,
          color: themeProperties?.textColorAlt,
        }}
      >
        Delete
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="capitalize">
          Delete {type == "Zone" && transport?.zone_name}{" "}
          {type == "Route" && transport?.route_name}{" "}
          {type == "Bus" && transport?.bus_number}{" "}
          {type == "Driver" && transport?.driver_name}
        </DialogTitle>
        <DialogDescription>
          {type == "Route" && (
            <p
              className="text-sm"
              style={{
                color: themeProperties?.textColor,
              }}
            >
              Note: Deleting this route will also delete all the buses and
              drivers associated with this route.
            </p>
          )}

          {type == "Bus" && (
            <p
              className="text-sm"
              style={{
                color: themeProperties?.textColor,
              }}
            >
              Note: Deleting this bus will also delete all the drivers
              associated with this bus.
            </p>
          )}

          {type == "Zone" && (
            <p
              className="text-sm"
              style={{
                color: themeProperties?.textColor,
              }}
            >
              Note: Deleting this zone will also delete all the routes, buses
              and drivers associated with this zone.
            </p>
          )}

          <p
            className="text-sm mt-3"
            style={{
              color: themeProperties?.textColor,
            }}
          >
            If you want to keep the associated data, please reassign them to
            another zone, route, bus or driver before deleting this {type}.
          </p>
        </DialogDescription>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 w-fit rounded-lg"
            style={{
              backgroundColor: themeProperties?.logoutColor,
              color: themeProperties?.textColorAlt,
            }}
            onClick={() => {
              console.log(transport?.id);
              handleDelete(transport?.id);
            }}
          >
            Delete
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
