import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useSelector, useDispatch } from "react-redux";
import { setpageChange } from "../User";

function Page() {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.task.page);
  const rowsPerPage = useSelector((state) => state.task.rowsPerPage);
  const data = useSelector((state) => state.task.data);

  const handlePageChange = (event, newPage) => {
    console.log("event", event);
    console.log("value", newPage);
    dispatch(setpageChange(newPage));
  };

  return (
    <Stack spacing={3}>
      {data.length > 7 && (
        <Pagination
          count={Math.ceil(data.length / rowsPerPage)}
          variant="outlined"
          shape="rounded"
          page={page + 1}
          onChange={(event, value) => handlePageChange(event, value - 1)}
          color="secondary"
        />
      )}
    </Stack>
  );
}
export default Page;
