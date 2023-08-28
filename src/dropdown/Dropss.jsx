import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { setActiveCategory, setDataList, setpageChange } from "../User";

function Drop() {
  const dispatch = useDispatch();
  const taskList = useSelector((state) => state.task.taskList);
  const activeCategory = useSelector((state) => state.task.activeCategory);
  const [filteredTasks, setFilteredTasks] = useState([]);
  //   console.log(filteredTasks);
  const menuItem = [...new Set(taskList.map((val) => val.Category))];

  const filterItem = (Category) => {
    dispatch(setActiveCategory(Category));
    dispatch(setpageChange(0));
  };

  const resetFilter = () => {
    dispatch(setActiveCategory(""));
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
    // setFilteredTasks(newFilteredTasks);
    dispatch(setDataList(newFilteredTasks));
  }, [taskList, activeCategory]);

  return (
    <Box>
      <Button onClick={resetFilter}>All</Button>
      {menuItem.map((val, index) => (
        <Button key={index} onClick={() => filterItem(val)}>
          {val}
        </Button>
      ))}
    </Box>
  );
}

export default Drop;
