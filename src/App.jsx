import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import IndexTable from "./components/indexTable";
import Reducer from "./User";

const store = configureStore({
  reducer: {
    task: Reducer,
  },
});

function App() {
  return (
    <>
      <Provider store={store}>
        <IndexTable />
      </Provider>
    </>
  );
}

export default App;
