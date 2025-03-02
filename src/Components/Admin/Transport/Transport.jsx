import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import TransportTable from "./Table/TransportTable";
import InputField from "@/Components/InputField/InputField";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SelectBox from "@/Components/InputField/SelectBox";
import {
  getDriversList,
  getBusesList,
  getTransportRoutesList,
  getTransportZonesList,
  deleteTransportZone,
  deleteBusRouter,
  deleteBus,
  deleteDrivers,
  updateBusRouter,
  updateBus,
  updateDrivers,
} from "@/slices/transport";
import { selectThemeProperties } from "@/slices/theme";
import CreateTransportForm from "./CreateTransportForm";

const Transport = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const themeProperties = useSelector(selectThemeProperties);
  const { drivers, buses, routes, zones } = useSelector(
    (state) => state.transport
  );

  const [activeTab, setActiveTab] = useState("Zones");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(getDriversList());
      dispatch(getBusesList());
      dispatch(getTransportRoutesList());
      dispatch(getTransportZonesList());
    }
  }, [dispatch]);

  const handleDelete = (id) => {
    switch (activeTab) {
      case "Zones":

        dispatch(deleteTransportZone(id));
        dispatch(getDriversList());
        dispatch(getBusesList());
        dispatch(getTransportRoutesList());
        break;
      case "Routes":
        dispatch(deleteBusRouter(id));
        dispatch(getDriversList());
        dispatch(getBusesList());
        break;
      case "Buses":
        dispatch(deleteBus(id));
        dispatch(getDriversList());
        break;
      case "Drivers":
        dispatch(deleteDrivers(id));
        break;
      default:
        break;
    }
  };

  const handleUpdate = (id) => {
    switch (activeTab) {
      case "Zones":
        dispatch(updateTransportZoneRoutes({ id, body: formValues }));
        break;
      case "Routes":
        dispatch(updateBusRouter({ id, body: formValues }));
        break;
      case "Buses":
        dispatch(updateBus({ id, body: formValues }));
        break;
      case "Drivers":
        dispatch(updateDrivers({ id, body: formValues }));
        break;
      default:
        break;
    }
  };

  return (
    <div className="px-10">
      <div className="flex gap-10  items-center justify-end mb-5">
        <p className="text-sm">Showing {activeTab}</p>
        <SelectBox
          options={["Zones", "Routes", "Buses", "Drivers"]}
          info={activeTab}
          setInfo={setActiveTab}
          placeHolder="Select a category"
        />
      </div>

      <div className="tab-content">
        {activeTab === "Zones" && (
          <TransportTable
            transportList={zones}
            type="Zone"
            busData={buses}
            routeData={routes}
            zoneData={zones}
            handleDelete={handleDelete}
          />
        )}
        {activeTab === "Routes" && (
          <TransportTable
            transportList={routes}
            type="Route"
            busData={buses}
            routeData={routes}
            zoneData={zones}
            handleDelete={handleDelete}

          />
        )}
        {activeTab === "Buses" && (
          <TransportTable
            transportList={buses}
            type="Bus"
            busData={buses}
            routeData={routes}
            zoneData={zones}
            handleDelete={handleDelete}

          />
        )}
        {activeTab === "Drivers" && (
          <TransportTable
            transportList={drivers}
            type="Driver"
            busData={buses}
            routeData={routes}
            zoneData={zones}
            handleDelete={handleDelete}

          />
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button
            className="px-4 py-2 rounded-lg capitalize bottom-5 right-5 fixed"
            style={{
              backgroundColor: themeProperties?.buttonColor,
              color: themeProperties?.textColorAlt,
            }}
          >
            Add {activeTab}
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create {activeTab.slice(0, -1)}</DialogTitle>
          </DialogHeader>
          <CreateTransportForm activeTab={activeTab} setIsDialogOpen={setIsDialogOpen}
            zones={zones} buses={buses} routes={routes}
          
          />
          <DialogFooter>
            <button
              form="create-transport-form"
              className="px-4 py-2 w-fit rounded-lg"
              style={{
                backgroundColor: themeProperties?.buttonColor,
                color: themeProperties?.textColorAlt,
              }}
            >
              Create
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Transport;