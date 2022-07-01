import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useStore from "../store/store";
import CarForm from "./../components/forms/CarForm";

function UpdateCar() {
  const navigate = useNavigate();
  const {id} = useParams();
  console.log("🚀 ~ file: UpdateCar.jsx ~ line 9 ~ UpdateCar ~ id", id)
  
  const updateCar = useStore((state) => state.updateCar);
  const cars = useStore((state) => state.cars);
  console.log("🚀 ~ file: UpdateCar.jsx ~ line 13 ~ UpdateCar ~ cars", cars)
  
  const car = cars.find(({_id}) => _id === id);
  console.log("🚀 ~ file: UpdateCar.jsx ~ line 16 ~ UpdateCar ~ car", car)
  
  const handler = (id, data) => {
    updateCar(id, data);
    navigate("/");
  };
  return (
    <>
      <h1>UpdateCar</h1>
      <CarForm submitHandler={handler} car={car} />
    </>
  );
}

export default UpdateCar;
