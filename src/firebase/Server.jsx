import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

import { db, storage } from ".";

import { setTaskList, setDataList } from "../User";

export const getStates = () => async (dispatch) => {
  const value = query(collection(db, "users"));
  const querySnapshot = await getDocs(value);
  let data = [];
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });
  dispatch(setTaskList(data));
  dispatch(setDataList(data));
};

export const addTaskToList = (task) => async (dispatch) => {
  const coverImageRef = ref(
    storage,
    `coverImages/${task.CoverImage.name + v4()}`
  );

  await uploadBytes(coverImageRef, task.CoverImage);

  const coverImageUrl = await getDownloadURL(coverImageRef);

  console.log(coverImageUrl);
  const newTask = {
    ...task,
    CoverImage: coverImageUrl,
  };
  await addDoc(collection(db, "users"), newTask);
  dispatch(getStates());
};

export const updateTaskToList =
  ({ id, Title, Author }) =>
  async (dispatch) => {
    await updateDoc(doc(db, "users", id), {
      Title,
      Author,
    });
    dispatch(getStates());
  };

export const deleteTaskList = (id) => async (dispatch) => {
  await deleteDoc(doc(db, "users", id));
  dispatch(getStates());
};
