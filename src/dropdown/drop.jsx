import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { setActiveCategory, setDataList, setpageChange } from "../User";

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    // console.log(event.currentTarget)
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  const taskList = useSelector((state) => state.task.taskList);
  const menuItem = [...new Set(taskList.map((val) => val.Category))];
  const activeCategory = useSelector((state) => state.task.activeCategory);

  const filterItem = (Category) => {
    dispatch(setActiveCategory(Category));
    setAnchorEl(null);
    dispatch(setpageChange(0));
  };

  const resetFilter = () => {
    dispatch(setActiveCategory(""));
    setAnchorEl(null);
    dispatch(setpageChange(0));
  };

  useEffect(() => {
    let newFilteredTasks = [];
    if (activeCategory === "") {
      newFilteredTasks = [...taskList];
    } else {
      newFilteredTasks = taskList.filter(
        (val) => val.Category === activeCategory
      );
    }
    dispatch(setDataList(newFilteredTasks));
  }, [taskList, activeCategory]);

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        // color="error"
        sx={{
          color: "#FFF",
        }}
      >
        Category
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={resetFilter}>All</MenuItem>
        {menuItem.map((val, index) => (
          <MenuItem key={index} onClick={() => filterItem(val)}>
            {val}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
