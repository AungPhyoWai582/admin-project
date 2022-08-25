import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  FormControlLabel,
  Modal,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { green, teal } from "@mui/material/colors";
import { Box, width } from "@mui/system";

const AddLottery = ({
  handleDia,
  openDia,
  createLottery,
  updateLottery,
  lotCreate,
  switchControll,
  sentData,
  type,
}) => {
  return (
    <Drawer open={openDia} onClose={handleDia} anchor={"top"}>
      <Box
        justifyContent={"center"}
        // sx={{ width: "400px" }}
        alignSelf={"center"}
        padding={1}
        width={{ xs: 350, sm: 450 }}
      >
        <Typography variant="h6" fontWeight={700} textAlign={"center"}>
          Create Lottery
        </Typography>
        <Stack boxShadow={1}>
          <Stack spacing={1.5} padding={1}>
            <Typography variant={"caption"} fontSize={16}>
              Pout Thee
            </Typography>
            <FormControlLabel
              control={
                <TextField
                  color={"success"}
                  fullWidth
                  variant="outlined"
                  size="small"
                  name="pout_tee"
                  sx={{ bgcolor: teal[50] }}
                  value={lotCreate.pout_tee}
                  onChange={(e) => createLottery(e)}
                />
              }
            />
          </Stack>
          <Stack spacing={1.5} padding={1}>
            <Typography variant={"caption"} fontSize={16}>
              Hot Tee
            </Typography>
            <FormControlLabel
              control={
                <TextField
                  color={"success"}
                  fullWidth
                  variant="outlined"
                  size="small"
                  name="hot_tee"
                  sx={{ bgcolor: teal[50] }}
                  value={lotCreate.hot_tee}
                  onChange={(e) => createLottery(e)}
                />
              }
            />
          </Stack>
          <Stack spacing={1.5} padding={1}>
            <Typography variant={"caption"} fontSize={16}>
              Time
            </Typography>
            <FormControlLabel
              control={
                <TextField
                  color={"success"}
                  fullWidth
                  variant="outlined"
                  size="small"
                  name="_time"
                  sx={{ bgcolor: teal[50] }}
                  value={lotCreate.time}
                  onChange={(e) => createLottery(e)}
                />
              }
            />
          </Stack>
          <Stack spacing={2} paddingX={3} paddingY={2}>
            <FormControlLabel
              // sx={{ fontWeight: "bold", border: 1 }}
              control={
                <Switch
                  checked={lotCreate.play}
                  onChange={(e) => switchControll(e)}
                  name="play"
                  size="small"
                  color="secondary"
                  // sx={{ width: "100px" }}
                />
              }
              label="Play"
              //   labelPlacement="start"
            />
          </Stack>
          <Stack spacing={1.5} padding={1} direction={"row"}>
            <Button
              variant={"contained"}
              sx={{ backgroundColor: "white", color: green[500] }}
              size={"small"}
              onClick={handleDia}
            >
              Cancle
            </Button>
            {type === "add" && (
              <Button
                sx={{ backgroundColor: green[500] }}
                variant={"contained"}
                size={"small"}
                onClick={sentData}
              >
                Create
              </Button>
            )}
            {type === "edit" && (
              <Button
                sx={{ backgroundColor: green[500] }}
                variant={"contained"}
                size={"small"}
                onClick={updateLottery}
              >
                Update
              </Button>
            )}
          </Stack>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default AddLottery;
