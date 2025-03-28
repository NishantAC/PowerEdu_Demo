import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputField from "@/Components/InputField/InputField";
import {
  createTransportZone,
  createBusRoutesRoute,
  createBus,
  createBusDriverRoute,
  resetStatus,
} from "@/slices/transport";
import { selectThemeProperties } from "@/slices/theme";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
const CreateTransportForm = ({
  activeTab,
  setIsDialogOpen,
  zones,
  routes,
  buses,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const themeProperties = useSelector(selectThemeProperties);
  const { status } = useSelector((state) => state.transport);

  const [formValues, setFormValues] = useState({
    school_id: user?.school_id,
    zone_name: "",
    route_name: "",
    driver_name: "",
    license_number: "",
    contact_number: "",
    description: "",
    route_description: "",
    zone_id: null,
    route_id: null,
    bus_id: null,
    bus_capacity: null,
    bus_number: null,
    selected_zone: null,
    selected_route: null,
    selected_bus: null,
  });

  useEffect(() => {
    if (status === "succeeded") {
      setIsDialogOpen(false);
      dispatch(resetStatus());
      setFormValues({
        school_id: user?.school_id,
        zone_name: "",
        route_name: "",
        driver_name: "",
        license_number: "",
        contact_number: "",
        description: "",
        route_description: "",
        zone_id: null,
        route_id: null,
        bus_id: null,
        bus_capacity: null,
        bus_number: null,
        selected_zone: null,
        selected_route: null,
        selected_bus: null,
      });
    }
  }, [status, setIsDialogOpen, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    switch (activeTab) {
      case "Zones":
        const ZoneData = {
          zone_name: formValues.zone_name,
          description: formValues.description,
          school_id: formValues.school_id,
        };
        console.log(ZoneData);
        dispatch(createTransportZone(ZoneData));
        break;
      case "Routes":
        const RouteData = {
          route_name: formValues.route_name,
          school_id: formValues.school_id,
          zone_id: formValues.zone_id,
          route_description: formValues.route_description,
        };

        dispatch(createBusRoutesRoute(RouteData));
        break;
      case "Buses":
        const BusData = {
          bus_number: formValues.bus_number,
          school_id: formValues.school_id,
          bus_capacity: formValues.bus_capacity,
          route_id: formValues.route_id,
        };

        dispatch(createBus(BusData));
        break;
      case "Drivers":
        const DriverData = {
          license_number: formValues.license_number,
          driver_name: formValues.driver_name,
          contact_number: formValues.contact_number,
          school_id: formValues.school_id,
          bus_id: formValues.bus_id,
        };
        dispatch(createBusDriverRoute(DriverData));
        break;
      default:
        break;
    }
  };

  return (
    <form id="create-transport-form" onSubmit={handleCreate}>
      {activeTab === "Zones" && (
        <div className="flex flex-col gap-10 mt-6">
          <InputField
            value={formValues.zone_name}
            htmlFor="zone_name"
            placeholder="Zone Name"
            name="zone_name"
            handleChange={handleInputChange}
          />

          <InputField
            value={formValues.description}
            htmlFor="description"
            placeholder="Description for the Zone"
            name="description"
            handleChange={handleInputChange}
            type="textarea"
          />
        </div>
      )}
      {activeTab === "Routes" && (
        <div className="flex flex-col gap-10 mt-6">
          <div className="flex justify-between ">
            <InputField
              value={formValues.route_name}
              htmlFor="route_name"
              placeholder="Route Name"
              name="route_name"
              handleChange={handleInputChange}
            />

            <Select
              value={formValues?.zone_id}
              onValueChange={(selectedValue) =>
                setFormValues({
                  ...formValues,
                  zone_id: selectedValue,
                  selected_zone: zones.find((zone) => zone.id === selectedValue)
                    .zone_name,
                })
              }
            >
              <SelectTrigger className="w-48" style={{ textAlign: "left" }}>
                <SelectValue
                  placeholder="Select Zone"
                  className={`${
                    formValues.zone_id ? "text-black" : "text-gray-400 italic"
                  } capitalize`}
                >
                  {formValues.selected_zone || "Select Zone"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className=" capitalize">
                {zones.map((zone, index) => (
                  <SelectGroup key={index} title={zone.zone_name}>
                    <SelectItem value={zone.id}>{zone.zone_name}</SelectItem>
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>

          <InputField
            value={formValues.route_description}
            htmlFor="route_description"
            placeholder="Description for the Route"
            name="route_description"
            handleChange={handleInputChange}
            type="textarea"
          />
        </div>
      )}
      {activeTab === "Buses" && (
        <div className="flex flex-col gap-10 mt-6">
          <div className="flex justify-between ">
            <InputField
              value={formValues.bus_number}
              htmlFor="bus_number"
              placeholder="Bus Number"
              name="bus_number"
              handleChange={handleInputChange}
            />
            <InputField
              value={formValues.bus_capacity}
              htmlFor="bus_capacity"
              placeholder="Bus Capacity"
              name="bus_capacity"
              handleChange={handleInputChange}
            />
          </div>
          <Select
            value={formValues?.route_id}
            onValueChange={(selectedValue) =>
              setFormValues({ ...formValues, route_id: selectedValue , selected_route: routes.find((route) => route.id === selectedValue).route_name})
            }
          >
            <SelectTrigger className="w-48" style={{ textAlign: "left" }}>
              <SelectValue
                placeholder="Select Route"
                className={`${
                  formValues.route_id ? "text-black" : "text-gray-400 italic"
                } capitalize`}
              >
                {formValues.selected_route || "Select Route"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className=" capitalize">
              {routes.map((route, index) => (
                <SelectGroup key={index} title={route?.route_name}>
                  <SelectItem value={route.id}>{route?.route_name}</SelectItem>
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      {activeTab === "Drivers" && (
        <div className="flex flex-col gap-10 mt-6">
          <div className="flex justify-between ">
            <InputField
              value={formValues.driver_name}
              htmlFor="driver_name"
              placeholder="Driver Name"
              name="driver_name"
              handleChange={handleInputChange}
            />
            <InputField
              value={formValues.license_number}
              htmlFor="license_number"
              placeholder="License Number"
              name="license_number"
              handleChange={handleInputChange}
            />
          </div>
          <div className="flex justify-between ">
            <InputField
              value={formValues.contact_number}
              htmlFor="contact_number"
              placeholder="Contact Number"
              name="contact_number"
              type="tel"
              pattern="[0-9]{10}"
              handleChange={handleInputChange}
            />
            <Select
              value={formValues?.bus_id}
              onValueChange={(selectedValue) =>
                setFormValues({ ...formValues, bus_id: selectedValue , selected_bus: buses.find((bus) => bus.id === selectedValue).bus_number})
              }
            >
              <SelectTrigger className="w-48" style={{ textAlign: "left" }}>
                <SelectValue
                  placeholder="Select Bus"
                  className={`${
                    formValues.bus_id ? "text-black" : "text-gray-400 italic"
                  } capitalize`}
                >
                  {formValues.selected_bus || "Select Bus"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className=" capitalize">
                {buses.map((bus, index) => (
                  <SelectGroup key={index} title={bus.bus_number}>
                    <SelectItem value={bus.id}>{bus.bus_number}</SelectItem>
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </form>
  );
};

export default CreateTransportForm;
