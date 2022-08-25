import {
  Add,
  AddSharp,
  Delete,
  Edit,
  ListAltRounded,
  MenuBook,
  Star,
} from "@mui/icons-material";
import {
  Avatar,
  FormControlLabel,
  IconButton,
  List,
  ListItemText,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Axios from "../shared/Axios";
import AddLottery from "./AddLottery";

const Lottery = () => {
  const [lottery, setLottery] = useState([]);
  const [play, setPlay] = useState(true);
  const [type, setType] = useState("add");
  const [controlEff, setControlEff] = useState(false);
  useEffect(() => {
    Axios.get(`/lotterys`).then((res) => {
      console.log(res.data);
      setLottery(res.data.lotteries);
      setControlEff(false);
    });
  }, [controlEff === true]);
  console.log(lottery);
  //create lottery
  const [lotCreate, setLotCreate] = useState({});
  // const [adding, setAdding] = useState({});
  const [openDia, setOpenDia] = useState(false);
  const handleDia = (type) => {
    setOpenDia(openDia ? false : true);
    setType(type);
  };
  const createLottery = (e) => {
    const { name, value } = e.target;
    setLotCreate({ ...lotCreate, [name]: value });
  };
  const switchControll = (e) => {
    const { name, checked } = e.target;
    setLotCreate({ ...lotCreate, [name]: checked });
  };
  //sentButton
  const sentData = () => {
    Axios.post(`/lotterys`, lotCreate)
      .then((res) => {
        console.log(res);
        setControlEff(true);
        setOpenDia(false);
      })
      .catch((err) => console.log(err));
  };

  //Edit Lottery
  const editLottery = (e, l) => {
    e.preventDefault();
    setLotCreate({
      id: l._id,
      pout_tee: l.pout_tee,
      hot_tee: l.hot_tee,
      time: l._time,
      play: l.play,
    });
    handleDia("edit");
  };

  // Update Lottery
  const updateLottery = () => {
    console.log(lotCreate.id);
    Axios.put(`/lotterys/${lotCreate.id}`, lotCreate).then((res) => {
      console.log(res.data.data);

      setLotCreate({
        pout_tee: null,
        hot_tee: [],
        _time: null,
        play: false,
      });
      setControlEff(true);
      setOpenDia(false);
    });
  };

  // console.log(lotCreate);
  //DeleteLottery
  const deleteLottery = (l) => {
    Axios.delete(`/lotterys/${l._id}`)
      .then((res) => {
        console.log(res);
        setControlEff(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Stack spacing={1} padding={1}>
        <Stack justifyContent={"end"} paddingX={2} spacing={1} direction>
          <FormControlLabel
            // sx={{ fontWeight: "bold", border: 1 }}
            control={
              <Switch
                checked={play}
                onChange={() => setPlay(!play)}
                name="play"
                size="small"
                color="secondary"
                // sx={{ width: "100px" }}
              />
            }
            label="Play"
            //   labelPlacement="start"
          />
          <IconButton
            size="small"
            color="secondary"
            sx={{ fontWeight: "bold" }}
            onClick={() => handleDia("add")}
          >
            <ListItemText primary={"Add Lottery"} />
            <Add />
          </IconButton>
        </Stack>

        {lottery.length &&
          lottery
            .filter((lot) => lot.play === play)
            .map((l, key) => {
              const date = new Date(l._date);
              return (
                <Stack
                  direction={"row"}
                  // display="flex"
                  justifyContent={"space-between"}
                  sx={{ borderRadius: 2 }}
                  boxShadow={1}
                  padding={1}
                >
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <Avatar
                      sizes={"small"}
                      sx={{
                        border: 3,
                        borderColor: l.play ? "green" : "red",
                        backgroundColor: red[100],
                        color: "black",
                        fontSize: 15,
                        fontWeight: "bold",
                      }}
                    >
                      {l.pout_tee !== null ? l.pout_tee : "-"}
                    </Avatar>
                    <Typography>
                      {/* {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`} */}{" "}
                      {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()} `}
                      {l._time}
                    </Typography>
                    <Typography fontWeight={"bold"}>
                      {/* {l._time} */}
                    </Typography>
                  </Stack>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    padding={1}
                    spacing={1}
                  >
                    <IconButton
                      size="small"
                      sx={{ color: "black" }}
                      onClick={(e) => editLottery(e, l)}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    {l.play ? (
                      // <IconButton
                      //   size="small"
                      //   sx={{ color: "black" }}
                      //   onClick={() => deleteLottery(l)}
                      // >
                      //   <Add fontSize="small" />
                      // </IconButton>
                      <NavLink to={`/lottery/bet/${l._id}`}>
                        <IconButton size="small" sx={{ color: "black" }}>
                          <AddSharp fontSize="small" />
                        </IconButton>
                      </NavLink>
                    ) : (
                      <IconButton
                        size="small"
                        sx={{ color: "black" }}
                        onClick={() => deleteLottery(l)}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    )}
                    {/* </NavLink> */}
                  </Stack>
                </Stack>
              );
            })}
      </Stack>
      <AddLottery
        type={type}
        sentData={sentData}
        updateLottery={updateLottery}
        openDia={openDia}
        handleDia={handleDia}
        createLottery={createLottery}
        lotCreate={lotCreate}
        switchControll={switchControll}
      />
    </>
  );
};

export default Lottery;
