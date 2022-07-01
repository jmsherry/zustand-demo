import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button } from "@mui/material";

import { useHydration } from "../../hooks/useHydration";

const schema = yup.object().shape({
  name: yup.string().max(30).required(),
  bhp: yup.number().integer().max(5000).required(),
  avatar_url: yup.string(),
});

const defaults = {
  name: "",
  bhp: "",
  avatar_url: "",
};

export default function CarForm({ car, submitHandler }) {
  console.log({ car });

  const hydrated = useHydration();
  console.log(
    "🚀 ~ file: CarForm.jsx ~ line 26 ~ CarForm ~ hydrated",
    hydrated
  );

  const {
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: car || defaults,
  });

  useEffect(() => {
    // console.log('useeffect', car);
    reset(car);
  }, [car, reset]);

  if (!hydrated) return <CircularProgress />;

  const formRowStyle = {
    marginBlockEnd: "1em",
  };

  let submitFn = (vals) => {
    reset();
    car ? submitHandler(car._id, vals) : submitHandler(vals);
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(submitFn)}>
      <div style={formRowStyle}>
        <Controller
          control={control}
          name="name"
          defaultValue={""}
          render={({ field }) => (
            <TextField
              type="name"
              fullWidth
              error={!!errors.name}
              {...field}
              label="name"
              helperText={errors.name?.message}
            />
          )}
        />
      </div>

      <div style={formRowStyle}>
        <Controller
          control={control}
          name="bhp"
          defaultValue={""}
          render={({ field }) => (
            <TextField
              type="number"
              fullWidth
              error={!!errors.bhp}
              {...field}
              label="bhp"
              pattern={/[0-9]{1,4}/}
              helperText={errors.bhp?.message}
            />
          )}
        />
      </div>

      <div style={formRowStyle}>
        <Controller
          control={control}
          name="avatar_url"
          defaultValue={""}
          render={({ field }) => (
            <TextField
              fullWidth
              type="text"
              error={!!errors.avatar_url}
              {...field}
              label="Avatar URL"
              helperText={errors.avatar_url?.message}
            />
          )}
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <Button
          type="reset"
          onClick={() => reset()}
          variant="contained"
          sx={{ mr: 2 }}
          disabled={!isDirty}
        >
          Reset
        </Button>
        <Button
          type="submit"
          primary="true"
          variant="contained"
          disabled={isSubmitting || !isDirty || (isDirty && !isValid)}
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
