import React from "react";
import InputField from "../../InputField/InputField";
import TransportService from "../../../services/transport.service";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { selectThemeProperties } from "@/slices/theme";
import { useSelector } from "react-redux";

function AddRouteForm({ formValues, setFormValues, driversList }) {
  const themeProperties = useSelector(selectThemeProperties);

  return (
    <div className="w-full min-h-[290px] rounded-lg relative shadow-sm"
    style={{ backgroundColor: themeProperties?.boxBackgroundSolid || "#ffffff" }}
    
    >
      <div className="h-16 rounded-t-md pl-2.5 font-poppins text-lg font-normal flex items-center"
        style={{ backgroundColor: themeProperties?.boxBackgroundTop || "#f5f5f5", 
          color: themeProperties?.textColorAlt || "#000000"
        }}
      >
        Add Route
      </div>
      <form>
        <div className="flex flex-wrap gap-7 p-5 pb-15 pt-8"
        >
          <div className="zone">
            <InputField
              placeholder="Zone"
              value={formValues.zone}
              handleChange={(e) =>
                setFormValues({
                  ...formValues,
                  zone: e.target.value,
                })
              }
              required
            />
          </div>

          <div className="routeName">
            <InputField
              placeholder="Route Name"
              value={formValues.route_name}
              handleChange={(e) =>
                setFormValues({
                  ...formValues,
                  route_name: e.target.value,
                })
              }
              required
            />
          </div>

          <div className="vehicleNo">
            <InputField
              placeholder="Vehicle Number"
              value={formValues.vehicle_no}
              handleChange={(e) =>
                setFormValues({
                  ...formValues,
                  vehicle_no: e.target.value,
                })
              }
              required
            />
          </div>

          <div className="">
            <Select
              value={formValues?.user_id}
              onValueChange={(selectedValue) =>
                setFormValues({
                  ...formValues,
                  user_id: selectedValue,
                })
              }
            >
              
              <SelectTrigger className="w-48" style={{ textAlign: "left" }}>
                <SelectValue
                  placeholder="Select Driver"
                  className={
                    formValues?.firstname ? "text-black" : "text-gray-400 italic"
                  }
                >
                  {formValues?.user_id ?   
                      driversList.find((driver) => driver?.user_id == formValues?.user_id)?.firstname
                      : "Select Driver"
                  }
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {driversList.map((driver, index) => (
                  <SelectItem key={index} value={driver?.user_id}>
                    {driver?.firstname}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="licenseNo">
            <InputField
              placeholder="License Number"
              value={formValues.license_no}
              handleChange={(e) =>
                setFormValues({
                  ...formValues,
                  license_no: e.target.value,
                })
              }
              required
            />
          </div>

          <div className="contactNo">
            <InputField
              placeholder="Contact Number"
              value={formValues.contact}
              handleChange={(e) =>
                setFormValues({
                  ...formValues,
                  contact: e.target.value,
                })
              }
              required
            />
          </div>
        </div>
      </form>
      <div className="absolute bottom-2.5 right-10 flex justify-center gap-5 font-rubik text-lg font-medium">
        <button
          className=" px-4 py-1 rounded-lg"
          style={{
            backgroundColor: themeProperties?.logoutColor,
            color: themeProperties?.textColorAlt,
          }
          }
          onClick={() => {
            setFormValues({
              zone: "",
              route_name: "",
              vehicle_no: "",
              user_id: "",
              license_no: "",
              contact: "",
            });
          }}
        >
          Reset
        </button>
        <button
          className=" px-6 py-1 rounded-lg"
          style={{
            backgroundColor: themeProperties?.buttonColor,
            color: themeProperties?.textColorAlt,
          }
          }
          onClick={(e) => {
            e.preventDefault();
            TransportService.addTransport(formValues).then(() => {
              // Handle success
            });
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default AddRouteForm;