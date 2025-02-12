import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import TransportTable from "./Table/TransportTable";
import DeleteConfirmationModal from "./Modal/DeleteConfirmationModal";
import TransportService from "../../../services/transport.service";
import { useSelector } from "react-redux";
import AddRouteForm from "./AddRouteForm"; // Import the new component
import { selectThemeProperties } from "@/slices/theme";

function Transport() {
  const { user } = useSelector((state) => state.user);
  const themeProperties = useSelector(selectThemeProperties);

  const [formValues, setFormValues] = useState({
    school_code: user?.school_id,
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
      page: page, // Pass page to support pagination
      limit: limit, // Pass limit to fetch only limited data
    }).then((response) => {
      if (response.data && response.data.rows) {
        setTransportList(response.data.rows); // Update transport list
        setTotalRecords(response.count); // Set total records if API returns it
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

    TransportService.getAllTransports({
      school_code: 1,
      page: page, // Pass page to support pagination
      limit: limit,
    }).then((data) => {
      setTransportList(data);
    });
  }, [page]);

  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);

  const [deleteItemId, setDeleteItemId] = useState(-1);

  return (
    <div className="px-10">
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {driversList && (
          <AddRouteForm
            formValues={formValues}
            setFormValues={setFormValues}
            driversList={driversList}
          />
        )}
        <div
          className=" h-full "
          style={{
            width: "100%",
          }}
        >
          {transportList && (
            <TransportTable
              transportList={transportList}
              setDeleteItemId={setDeleteItemId}
              showDeleteConfirmationModal={showDeleteConfirmationModal}
              setShowDeleteConfirmationModal={setShowDeleteConfirmationModal}
              page={page}
              limit={limit}
              total={transportList.count}
              onPageChange={handlePageChange}
              themeProperties={themeProperties}
            />
          )}
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
