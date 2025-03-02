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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  getDriversList,
  getBusesList,
  getTransportRoutesList,
  getTransportZonesList,
  createTransportZone,
  createBusRoutesRoute,
  createBus,
  createBusDriverRoute,
  deleteTransportZone,
  deleteBusRouter,
  deleteBus,
  deleteDrivers,
  updateTransportZoneRoutes,
  updateBusRouter,
  updateBus,
  updateDrivers,
} from "@/slices/transport";
import { selectThemeProperties } from "@/slices/theme";
import SelectBox from "@/Components/InputField/SelectBox";
const Transport = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const themeProperties = useSelector(selectThemeProperties);
  const { drivers, buses, routes, zones } = useSelector(
    (state) => state.transport
  );

  const [activeTab, setActiveTab] = useState("Zones");
  const [formValues, setFormValues] = useState({
    school_code: user?.school_id,
    user_id: "",
    zone: "",
    route_name: "",
    vehicle_no: "",
    license_no: "",
    contact: "",
  });

  useEffect(() => {
    if (user) {
      dispatch(getDriversList());
      dispatch(getBusesList());
      dispatch(getTransportRoutesList());
      dispatch(getTransportZonesList());
    }
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleCreate = () => {
    switch (activeTab) {
      case "Zones":
        dispatch(createTransportZone(formValues));
        break;
      case "Routes":
        dispatch(createBusRoutesRoute(formValues));
        break;
      case "Buses":
        dispatch(createBus(formValues));
        break;
      case "Drivers":
        dispatch(createBusDriverRoute(formValues));
        break;
      default:
        break;
    }
  };

  const handleDelete = (id) => {
    switch (activeTab) {
      case "Zones":
        dispatch(deleteTransportZone(id));
        break;
      case "Routes":
        dispatch(deleteBusRouter(id));
        break;
      case "Buses":
        dispatch(deleteBus(id));
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
        <p className="text-sm"> 
          Showing {activeTab}
        </p>
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
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
            type="Zone"
          />
        )}
        {activeTab === "Routes" && (
          <TransportTable
            transportList={routes}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
            type="Route"
          />
        )}
        {activeTab === "Buses" && (
          <TransportTable
            transportList={buses}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
            type="Bus"
          />
        )}
        {activeTab === "Drivers" && (
          <TransportTable
            transportList={drivers}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
            type="Driver"
          />
        )}
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <button 
            className="px-4 py-2 rounded-lg capitalize bottom-5 right-5 fixed"
            style={{
              backgroundColor: themeProperties?.buttonColor,
              color: themeProperties?.textColorAlt,
            }}
          >Add {activeTab}</button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create {activeTab.slice(0, -1)}</DialogTitle>
          </DialogHeader>
          <form>
            <InputField
              value={formValues.zone}
              htmlFor="zone"
              placeholder="Zone"
              name="zone"
              handleChange={handleInputChange}
            />
            <InputField
              value={formValues.route_name}
              htmlFor="route_name"
              placeholder="Route Name"
              name="route_name"
              handleChange={handleInputChange}
            />
            <InputField
              value={formValues.vehicle_no}
              htmlFor="vehicle_no"
              placeholder="Vehicle No"
              name="vehicle_no"
              handleChange={handleInputChange}
            />
            <InputField
              value={formValues.license_no}
              htmlFor="license_no"
              placeholder="License No"
              name="license_no"
              handleChange={handleInputChange}
            />
            <InputField
              value={formValues.contact}
              htmlFor="contact"
              placeholder="Contact"
              name="contact"
              handleChange={handleInputChange}
            />
          </form>
          <DialogFooter>
            <button onClick={handleCreate}>Create</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Transport;
