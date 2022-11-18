import React, { useEffect, useRef, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { styled, alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Button, ButtonGroup } from "@mui/material";
import Containers from "../Containers/Containers";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../store/action";
import { ClassicSpinner } from "react-spinners-kit";
import { BiXCircle } from "react-icons/bi";
import "../Pages/Home.scss";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SimpleContainer() {
  const { loader } = useSelector((store) => store);
  const dispatch = useDispatch();
  const fromRef = useRef();
  const ToRef = useRef();
  const nameRef = useRef();

  const date = new Date();
  const momentDateFrom = moment(date).startOf("month").format("YYYY-MM-DD");
  const momentDateTo = moment(date).format("YYYY-MM-DD");

  const [value, setValue] = useState(momentDateFrom);
  const [valueTo, setValueTo] = useState(momentDateTo);
  const sortRef = useRef();

  const sendAllMessagesData = () => {
    const WrapperInputDate = document.querySelector(".WrapperInputDate");
    const fromRefData = fromRef.current.value;
    const ToRefData = ToRef.current.value;
    const nameRefData = nameRef.current.value;
    dispatch(fetchNews({ fromRefData, ToRefData, nameRefData }));

    if (!loader) {
      setTimeout(() => {
        WrapperInputDate.classList.remove("open");
      }, 500);
    }
    nameRef.current.value = "";
  };
  const EnterSend = (event) => {
    if (event.key === "Enter") {
      sendAllMessagesData();
    }
  };
  const openedToolbar = () => {
    const WrapperInputDate = document.querySelector(".WrapperInputDate");
    WrapperInputDate.classList.add("open");
  };
  const iconClose = () => {
    const WrapperInputDate = document.querySelector(".WrapperInputDate");
    WrapperInputDate.classList.remove("open");
  };
  const handleOutSideClick = (e) => {
    const WrapperInputDate = document.querySelector(".WrapperInputDate");
    if (!e.path.includes(sortRef.current)) {
      WrapperInputDate.classList.remove("open");
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", handleOutSideClick);
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box sx={{ bgcolor: "#B3B3B3", height: "100vh" }}>
          <Toolbar className="Toolbar" ref={sortRef}>
            <Search className="Search" onClick={openedToolbar}>
              <span
                className="spanSearch"
                onKeyUp={(event) => EnterSend(event)}
              >
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  inputRef={nameRef}
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </span>
            </Search>

            <div className="WrapperInputDate">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="from"
                  inputFormat="YYYY-MM-DD"
                  value={value}
                  onChange={(value) => setValue(value)}
                  renderInput={(params) => <TextField {...params} />}
                  inputRef={fromRef}
                />
                <DesktopDatePicker
                  label="to"
                  inputFormat="YYYY-MM-DD"
                  value={valueTo}
                  onChange={(valueTo) => setValueTo(valueTo)}
                  renderInput={(params) => <TextField {...params} />}
                  inputRef={ToRef}
                />
              </LocalizationProvider>

              {loader ? (
                <ClassicSpinner size={30} color="#686769" loading={loader} />
              ) : (
                <span className="spanSearchX">
                  <ButtonGroup
                    variant="contained"
                    aria-label="outlined primary button group"
                  >
                    <Button
                      className="ButtonOpac"
                      onClick={sendAllMessagesData}
                    >
                      Search...
                    </Button>
                  </ButtonGroup>
                  <BiXCircle className="icon" onClick={() => iconClose()} />
                </span>
              )}
            </div>
          </Toolbar>
          <Containers />
        </Box>
      </Container>
    </React.Fragment>
  );
}
