import React from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store/store";
import CarForm from "./../components/forms/CarForm";

function AddCar() {
  const navigate = useNavigate();
  const addCar = useStore((state) => state.addCar);
  const handler = (data) => {
    addCar(data);
    navigate("/");
  };
  return (
    <>
      <h1>AddCar</h1>
      <CarForm submitHandler={handler} />
    </>
  );
}

export default AddCar;
