import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  LinearProgress,
} from "@mui/material";

import { useMediaQuery, Skeleton, Button } from "@mui/material";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSelector } from "react-redux";
import { selectThemeProperties } from "@/slices/theme";
import InputField from "@/Components/InputField/InputField";
import SelectBox from "@/Components/InputField/SelectBox";
import DeleteDialog from "./DeleteDialog";
import EditDialog from "./EditDialog";

const TransportTable = ({
  transportList,
  handleDelete,
  handleUpdate,
  isLoading,
  busData,
  routeData,
  zoneData,
  type = "Zone",
}) => {
  const themeProperties = useSelector(selectThemeProperties);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getBusNameById = (id) => {
    const bus = busData.find((bus) => bus.id === id);
    return bus ? bus.bus_number : "Unknown Bus";
  };

  const getRouteNameById = (id) => {
    const route = routeData.find((route) => route?.id === id);
    return route ? route?.route_name : "Unknown Route";
  };

  const getZoneNameById = (id) => {
    const zone = zoneData.find((zone) => zone.id === id);
    return zone ? zone.zone_name : "Unknown Zone";
  };

  const renderTableHeaders = () => {
    switch (type) {
      case "Driver":
        return (
          <TableRow
            sx={{
              backgroundColor: themeProperties?.boxBackgroundTop || "#f5f5f5",
            }}
          >
            <TableCell
              sx={{
                fontWeight: "normal",
                color: themeProperties?.textColorAlt,
              }}
            >
              Driver Name
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "normal",
                color: themeProperties?.textColorAlt,
              }}
            >
              License No.
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "normal",
                color: themeProperties?.textColorAlt,
              }}
            >
              Contact No.
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "normal",
                color: themeProperties?.textColorAlt,
              }}
            >
              Bus No.
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "normal",
                color: themeProperties?.textColorAlt,
                textAlign: "end",
                paddingRight: "30px",
              }}
            >
              Action
            </TableCell>
          </TableRow>
        );
      case "Bus":
        return (
          <TableRow
            sx={{
              backgroundColor: themeProperties?.boxBackgroundTop || "#f5f5f5",
            }}
          >
            <TableCell
              sx={{
                fontWeight: "normal",
                color: themeProperties?.textColorAlt,
              }}
            >
              Bus Number
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "normal",
                color: themeProperties?.textColorAlt,
              }}
            >
              Bus Capacity
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "normal",
                color: themeProperties?.textColorAlt,
              }}
            >
              Route Name
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "normal",
                color: themeProperties?.textColorAlt,
                textAlign: "end",
                paddingRight: "30px",
              }}
            >
              Action
            </TableCell>
          </TableRow>
        );
      case "Route":
        return (
          <TableRow
            sx={{
              backgroundColor: themeProperties?.boxBackgroundTop || "#f5f5f5",
            }}
          >
            <TableCell
              sx={{
                fontWeight: "normal",
                color: themeProperties?.textColorAlt,
              }}
            >
              Zone Name
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "normal",
                color: themeProperties?.textColorAlt,
              }}
            >
              Route Name
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "normal",
                color: themeProperties?.textColorAlt,
              }}
            >
              Route Description
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "normal",
                color: themeProperties?.textColorAlt,
                textAlign: "end",
                paddingRight: "30px",
              }}
            >
              Action
            </TableCell>
          </TableRow>
        );
      case "Zone":
        return (
          <TableRow
            sx={{
              backgroundColor: themeProperties?.boxBackgroundTop || "#f5f5f5",
            }}
          >
            <TableCell
              sx={{
                fontWeight: "normal",
                color: themeProperties?.textColorAlt,
              }}
            >
              Zone Name
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "normal",
                color: themeProperties?.textColorAlt,
              }}
            >
              Description
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "normal",
                color: themeProperties?.textColorAlt,
                textAlign: "end",
                paddingRight: "30px",
              }}
            >
              Action
            </TableCell>
          </TableRow>
        );
      default:
        return null;
    }
  };

  const renderTableRows = () => {
    if (isLoading) {
      return (
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell colSpan={7} align="center">
                <Skeleton height={50} variant="rectangular" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      );
    }

    if (transportList.length == 0) {
      return (
        <div
          className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center "
          style={{ color: themeProperties?.textColor }}
        >
          <p className="text-lg font-semibold">No {type} Found</p>
          <p className="text-sm mt-2">
            Create a new {type} by clicking the button below
          </p>
        </div>
      );
    }

    return (
      <TableBody>
        {transportList
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((transport, index) => (
            <TableRow key={index} hover>
              {type === "Driver" && (
                <>
                  <TableCell>{transport?.driver_name}</TableCell>
                  <TableCell>{transport?.license_number}</TableCell>
                  <TableCell>{transport?.contact_number}</TableCell>
                  <TableCell>{getBusNameById(transport?.bus_id)}</TableCell>
                </>
              )}
              {type === "Bus" && (
                <>
                  <TableCell>{transport?.bus_number}</TableCell>
                  <TableCell>{transport?.bus_capacity}</TableCell>
                  <TableCell>{getRouteNameById(transport?.route_id)}</TableCell>
                </>
              )}
              {type === "Route" && (
                <>
                  <TableCell>{getZoneNameById(transport?.zone_id)}</TableCell>
                  <TableCell>{transport?.route_name}</TableCell>
                  <TableCell>{transport?.route_description}</TableCell>
                </>
              )}
              {type === "Zone" && (
                <>
                  <TableCell>{transport?.zone_name}</TableCell>
                  <TableCell>{transport?.description}</TableCell>
                </>
              )}
              <TableCell sx={{ textAlign: "end" }}>
                <DeleteDialog
                  type={type}
                  transport={transport}
                  handleDelete={handleDelete}
                  themeProperties={themeProperties}
                />
                <EditDialog
                  type={type}
                  transport={transport}
                  handleUpdate={handleUpdate}
                  themeProperties={themeProperties}
                />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    );
  };

  return (
    <div
      className="flex flex-col justify-between h-full"
      style={{
        backgroundColor: themeProperties?.boxBackgroundSolid || "#ffffff",
        borderRadius: "10px",

      }}
    >
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "none",
          overflow: "hidden",
          backgroundColor: themeProperties?.boxBackgroundSolid || "#ffffff",
          minHeight: "400px",
          borderRadius: "10px",
        }}
      >
        <Table>
          <TableHead>{renderTableHeaders()}</TableHead>
          {renderTableRows()}
        </Table>
      </TableContainer>
      {transportList.length > 0 && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={transportList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </div>
  );
};

export default TransportTable;
