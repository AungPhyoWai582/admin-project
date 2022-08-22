import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppTopbar from "../components/AppTopbar";
import Lottery from "../lottery/Lottery";
import Login from "../login/Login";
import AccountInfo from "../accountInfo/AccountInfo";

const Dashboard = () => {
  const [authUser, setAuthUser] = useState({
    token: null,
    authorize: false,
    user_info: {},
  });

  useEffect(() => {
    const locs = localStorage.getItem("access-token");

    if (localStorage.getItem("access-token")) {
      let user = JSON.parse(localStorage.getItem("user-info"));
      console.log(user);
      if (user.role === "Admin") {
        setAuthUser({
          token: localStorage.getItem("access-token"),
          authorize: true,
          user_info: JSON.parse(localStorage.getItem("user-info")),
        });
      } else {
        setAuthUser({ token: null, authorize: false, user_info: {} });
      }
    }
  }, []);

  const routes = (
    <Routes>
      <Route path="/*" element={<Navigate to="/lottery" replace />} />
      <Route
        path="/account_info"
        element={<AccountInfo authUser={authUser} />}
      />
      <Route path="/lottery" element={<Lottery />} />
      {/* <Route path="/view" element={<View />} />
      <Route path="/view/lager/:lotteryId" element={<LagerReport />} />

      <Route path="/lottery/bet/:lotteryId" element={<Bet />} />
      <Route path="/lottery/calls/:lotteryId" element={<CallsList />} />
      <Route path="/lottery/lager/:lotteryId" element={<Lager />} />

      <Route path="/reports/agent/:lotteryId" element={<Report />} />
      <Route
        path="/reports/agent/:agentId/calls/:lotteryId"
        element={<ReportCalls />}
      />
      <Route
        path="/reports/agent/:agentId/calls/:lotteryId/:callId"
        element={<CallDetail />}
      />
      <Route path="/change_password" element={<ChangePassword />} />
      
      <Route path="/customer" element={<Customer />} /> */}
    </Routes>
  );

  return (
    <>
      {!authUser.authorize ? (
        <Routes>
          <Route
            path="/login"
            element={<Login authUser={authUser} setAuthUser={setAuthUser} />}
          />
          <Route path="/*" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : (
        <Grid container overflow={"hidden"}>
          <Grid item xs={12} margin={{ md: 0 }}>
            <AppTopbar
              // name={"nnz"}
              authUser={authUser}
              setAuthUser={setAuthUser}
            />
          </Grid>
          <Grid item xs={12} padding={{ xs: 0, md: 0 }}>
            {routes}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Dashboard;
