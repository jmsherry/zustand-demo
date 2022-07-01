import React from "react";
import shallow from 'zustand/shallow'
import { NavLink} from "react-router-dom";
import useStore, { selectCars, removeCar } from "../store/store";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function CarsList() {
  const cars = useStore(selectCars, shallow);
  const remove = useStore(removeCar);
  return (
    <Box>
      <List>
        {cars.map(({ name, bhp, avatar_url, _id }, i) => (
          <ListItem key={i}>
            <ListItemAvatar>
              <Avatar alt="" src={avatar_url} />
            </ListItemAvatar>
            <ListItemText>
              {name} (BHP: {bhp})
            </ListItemText>
            <IconButton
              aria-label="update"
              to={`/update/${_id}`}
              component={NavLink}
            >
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={() => remove(_id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default CarsList;

// function Controls() {
//   const inc = useStore(state => state.inc)
//   return <button onClick={inc}>one up</button>
// }

// function Counter() {
//   const count = useStore(state => state.count)
//   return <h1>{count}</h1>
// }
