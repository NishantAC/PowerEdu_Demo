import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
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
const TransportTable = ({
  transportList,
  handleDelete,
  handleUpdate,
  isLoading,
  type = "Zone",
}) => {
  const themeProperties = useSelector(selectThemeProperties);

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
              Bus ID
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
              Route ID
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
              Zone ID
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

    return (
      <TableBody>
        {transportList.length > 0 &&
          transportList?.map((transport, index) => (
            <TableRow key={index} hover>
              {type === "Driver" && (
                <>
                  <TableCell>{transport?.driver_name}</TableCell>
                  <TableCell>{transport?.license_number}</TableCell>
                  <TableCell>{transport?.contact_number}</TableCell>
                  <TableCell>{transport?.bus_id}</TableCell>
                </>
              )}
              {type === "Bus" && (
                <>
                  <TableCell>{transport?.bus_number}</TableCell>
                  <TableCell>{transport?.bus_capacity}</TableCell>
                  <TableCell>{transport?.route_id}</TableCell>
                </>
              )}
              {type === "Route" && (
                <>
                  <TableCell>{transport?.zone_id}</TableCell>
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
                <Dialog>
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
                    <DialogTitle className=" capitalize">
                      Delete {type}
                    </DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete this {type}? This action
                      cannot be undone.
                    </DialogDescription>
                    <div className="flex justify-end space-x-4">
                      <button
                        className="px-4 py-2 w-fit rounded-lg"
                        style={{
                          backgroundColor: themeProperties?.logoutColor,
                          color: themeProperties?.textColorAlt,
                        }}
                        onClick={() => {
                          handleDelete(transport?.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </DialogContent>
                </Dialog>
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
                    <DialogTitle className=" capitalize">
                      Delete {type}
                    </DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete this {type}? This action
                      cannot be undone.
                    </DialogDescription>
                    <div className="flex justify-end space-x-4">
                      <button
                        className="px-4 py-2 w-fit rounded-lg"
                        style={{
                          backgroundColor: themeProperties?.logoutColor,
                          color: themeProperties?.textColorAlt,
                        }}
                        onClick={() => {
                          handleDelete(transport?.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    );
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "none",
          borderRadius: 3,
          overflow: "hidden",
          backgroundColor: themeProperties?.boxBackgroundSolid || "#ffffff",
        }}
        style={{ height: "370px" }}
      >
        <Table>
          <TableHead>{renderTableHeaders()}</TableHead>
          {renderTableRows()}
        </Table>
      </TableContainer>
    </div>
  );
};

export default TransportTable;
