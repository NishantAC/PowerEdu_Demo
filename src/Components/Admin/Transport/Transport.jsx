import React, { useEffect, useState } from "react";
import "./Transport.css";
import { toast } from "sonner";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import WestIcon from "@mui/icons-material/West";
import { Link } from "react-router-dom";
import InputParent from "../Profiles/EditProfile/InputParent";
import TransportTable from "./Table/TransportTable";
import DeleteConfirmationModal from "./Modal/DeleteConfirmationModal";
import TransportService from "../../../services/transport.service";
import { useSelector } from "react-redux";
import SelectBox from "./SelectBox";

function Transport() {
  const { user } = useSelector((state) => state.user);

  const [formValues, setFormValues] = useState({
    school_code: user.schoolcode,
    user_id: "",
    zone: "",
    route_name: "",
    vehicle_no: "",
    license_no: "",
    contact: "",
  });

  const [driversList, setDriversList] = useState([]);
  const [transportList, setTransportList] = useState([]);
  
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  // const [totalRecords, setTotalRecords] = useState(0);  // Add this
  // 




  useEffect(() => {
    TransportService.getAllTransports({ 
      school_code: 1, 
      page: page,       // Pass page to support pagination
      limit: limit      // Pass limit to fetch only limited data
    }).then((response) => {
      if (response.data && response.data.rows) {
        
        setTransportList(response.data.rows);  // Update transport list
        setTotalRecords(response.count);  // Set total records if API returns it
      }
    });
  }, [page]);
  


  const handlePageChange = (event, value) => {
    
    setPage(value);
  };

  useEffect(() => {
    TransportService.getDriversList({
      school_code: 1,
    }).then((data) => {
      setDriversList(data);
    });

    TransportService.getAllTransports({ school_code: 1,page: page,       // Pass page to support pagination
      limit: limit  }).then((data) => {
      setTransportList(data);
    });
  }, [page]);

  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);

  const [deleteItemId, setDeleteItemId] = useState(-1);

  return (
    <div className="transportContainer">
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "20px",
        }}
      >
        {/* left area */}
        <div
          style={{ color: "#4D4D4D", display: "flex", alignItems: "center" }}
        >
          <div
            style={{
              fontFamily: "Roboto",
              fontSize: "18px",
              fontWeight: "400",
            }}
          >
            Home
          </div>
          <KeyboardArrowRightIcon />
          <div
            style={{
              fontFamily: "Roboto",
              fontSize: "18px",
              fontWeight: "700",
              textDecoration: "underline",
            }}
          >
            Transport
          </div>
        </div>

        {/* right area */}
        <Link to="/home" style={{ textDecoration: "none" }}>
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <WestIcon style={{ color: "#5F5F5F" }} />
            <div
              style={{
                fontFamily: "Roboto",
                fontWeight: "500",
                fontSize: "24px",
                letterSpacing: "4%",
                color: "#414141",
              }}
            >
              Back
            </div>
          </div>
        </Link>
      </nav>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div>
          <h3
            style={{
              fontFamily: "Poppins",
              fontWeight: "600",
              marginTop: "30px",
              fontSize: "25px",
            }}
          >
            Transport
          </h3>
        </div>
        <div
          style={{
            width: "100%",
            minHeight: "290px",
            boxShadow: "0 2px 7px 0 rgba(52, 52, 52, 0.35)",
            borderRadius: "5px",
            position: "relative",
          }}
        >
          <div
            style={{
              height: "64px",
              backgroundColor: "#F9F9F9",
              borderRadius: "5px 5px 0px 0px",
              paddingLeft: "10px",
              fontFamily: "Poppins",
              fontSize: "20px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
            }}
          >
            Add Route
          </div>
          <form>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "30px",
                padding: "20px 20px 60px 20px",
              }}
            >
              <div className="zone">
                <InputParent text="Zone *">
                  <input
                    placeholder="Enter Zone"
                    value={formValues.zone}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        zone: e.target.value,
                      })
                    }
                    className="inputBox"
                  />
                </InputParent>
              </div>

              <div className="routeName">
                <InputParent text="Route Name *">
                  <input
                    placeholder="Enter Name"
                    value={formValues.route_name}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        route_name: e.target.value,
                      })
                    }
                    className="inputBox"
                  />
                </InputParent>
              </div>

              <div className="vehicleNo">
                <InputParent text="Vehicle No *">
                  <input
                    placeholder="Enter Number"
                    value={formValues.vehicle_no}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        vehicle_no: e.target.value,
                      })
                    }
                    className="inputBox"
                  />
                </InputParent>
              </div>

              <div className="driverName">
                <SelectBox
                  text="Driver Name"
                  options={driversList}
                  placeHolder="Select Driver"
                  info={formValues.user_id}
                  setInfo={(selectedDriverId) =>
                    setFormValues({
                      ...formValues,
                      user_id: parseInt(selectedDriverId),
                    })
                  }
                />
              </div>

              <div className="licenseNo">
                <InputParent text="License No. *">
                  <input
                    placeholder="Enter Number"
                    value={formValues.license_no}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        license_no: e.target.value,
                      })
                    }
                    className="inputBox"
                  />
                </InputParent>
              </div>

              <div className="contactNo">
                <InputParent text="Contact No*">
                  <input
                    placeholder="Enter Number"
                    value={formValues.contact}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        contact: e.target.value,
                      })
                    }
                    className="inputBox"
                  />
                </InputParent>
              </div>
            </div>
          </form>
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              right: "40px",
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              fontFamily: "Rubik",
              fontSize: "18px",
              fontWeight: "500",
            }}
          >
            <button
              style={{
                width: "96px",
                height: "36px",
                backgroundColor: "white",
                border: "1px solid #C14D4D",
                color: " #C14D4D",
                borderRadius: "5px",
              }}
              onClick={() => {
                setFormValues({
                  zone: "",
                  route_name: "",
                  vehicle_no: "",
                  driverName: "",
                  license_no: "",
                  contact: "",
                });
              }}
            >
              Reset
            </button>
            <button
              style={{
                width: "96px",
                height: "36px",
                backgroundColor: "#204DF9",
                border: "none",
                color: "white",
                borderRadius: "5px",
              }}
              onClick={() => {
                
                TransportService.addTransport(formValues).then(() => {
                  
                });
              }}
            >
              Add
            </button>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            height: "300px",
            backgroundColor: "red",
          }}
        >
          <TransportTable
            transportList={transportList}
            setDeleteItemId={setDeleteItemId}
            showDeleteConfirmationModal={showDeleteConfirmationModal}
            setShowDeleteConfirmationModal={setShowDeleteConfirmationModal}
            page={page}
            limit={limit}
            total={transportList.count}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      {showDeleteConfirmationModal && (
        <DeleteConfirmationModal
          deleteItemId={deleteItemId}
          setDeleteItemId={setDeleteItemId}
          onClick={() => setShowDeleteConfirmationModal(false)}
        />
      )}
    </div>
  );
}

export default Transport;
