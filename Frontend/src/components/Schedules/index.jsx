import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { BACKEND_URI } from "../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";

const Schedules = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetch(`${BACKEND_URI}/api/v1/updateCalendar`)
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  const getDate = dayjs(new Date());

  const today = [];
  const tom = [];

  events.forEach((e) => {
    const str = e.startDateTime.substring(0, 10);
    if (
      str ===
      getDate.year() + "-" + (getDate.month() + 1) + "-" + getDate.date()
    )
      today.push(e);
    if (
      str ===
      getDate.year() + "-" + (getDate.month() + 1) + "-" + (getDate.date() + 1)
    )
      tom.push(e);
  });

  function getDay(i) {
    return [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ][i];
  }
  function getMonth(i) {
    return [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ][i];
  }

  const obj = useOutletContext();

  const style = {
    position: "absolute",
    width: "45vw",
    height: "70vh",
    top: "54%",
    left: "48%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#17202a",
    border: "1px solid rgb(255 255 255/ 20%)",
    borderRadius: "15px",
    boxShadow: 24,
    p: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1.5rem",
    "&::before, &::after": {
      content: '""',
    },
  };

  const [open, setOpen] = useState(false);

  const [modalInfo, setModelInfo] = useState({});

  const handleOpen = (e) => {
    const key = e.target.getAttribute("id");
    events.filter(e => {
      if(e.id ===key)
        setModelInfo(e)
    })
    setOpen(true)
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <h1 className="text-center text-[#FF007A] font-['Cairo'] text-[2.5rem] py-[1rem] font-[600]">
        Your Schedule
      </h1>
      <div>
        <div className="flex justify-between items-center">
          <h3 className="text-[#FF007A] font-['Cairo'] text-[1.7rem] font-[200]">
            Today
          </h3>
          <hr
            className="border-[#313942]"
            style={{ width: obj.large ? "38vw" : "55vw" }}
          />
          <div className="flex flex-col justify-center items-end">
            <h3 className="text-[#fff] font-['Cairo'] text-[1.2rem] font-[200]">
              {getMonth(getDate.month())} {getDate.date()}, {getDate.year()}
            </h3>
            <h3 className="text-[#fff] font-['Cairo'] text-[1.2rem] font-[200]">
              {getDay(getDate.day() % 7)}
            </h3>
          </div>
        </div>
        <div className="m-[1.5rem] flex justify-start items-start gap-[2rem]">
          <div className="flex flex-col justify-start gap-[1rem] p-[0rem]">
            <h3 className="text-[#FF007A] font-['Cairo'] text-[1.5rem] font-[200]">
              Time
            </h3>
            <h3 className="text-[#FF007A] font-['Cairo'] text-[1.5rem] font-[200]">
              Event
            </h3>
          </div>
          {today.map((elem) => (
            <>
              <div className="flex flex-col justify-start gap-[1rem] p-[0.5rem]">
                <h3 className="text-[#fff] font-['Cairo'] text-[1.2rem] font-[200]">
                  {elem.startDateTime.substring(11, 16)}
                </h3>
                <h3
                  id={elem.id}
                  data-function="today"
                  onClick={handleOpen}
                  className="text-[#fff] font-['Cairo'] text-[1.2rem] font-[200] cursor-pointer"
                >
                  {elem.eventName}
                </h3>
              </div>
            </>
          ))}
        </div>
      </div>
      <div className="mt-[4rem]">
        <div className="flex justify-between items-center">
          <h3 className="text-[#FF007A] font-['Cairo'] text-[1.7rem] font-[200]">
            Tomorrow
          </h3>
          <hr
            // eslint-disable-next-line react/prop-types
            className="border-[#313942]"
            style={{ width: obj.large ? "35vw" : "52vw" }}
          />
          <div className="flex flex-col justify-center items-end">
            <h3 className="text-[#fff] font-['Cairo'] text-[1.2rem] font-[200]">
              {getMonth(getDate.month())} {getDate.date() + 1}, {getDate.year()}
            </h3>
            <h3 className="text-[#fff] font-['Cairo'] text-[1.2rem] font-[200]">
              {getDay((getDate.day() + 1) % 7)}
            </h3>
          </div>
        </div>
        <div className="m-[1.5rem] flex justify-start items-start gap-[2rem]">
          <div className="flex flex-col justify-start gap-[1rem] p-[0rem]">
            <h3 className="text-[#FF007A] font-['Cairo'] text-[1.5rem] font-[200]">
              Time
            </h3>
            <h3 className="text-[#FF007A] font-['Cairo'] text-[1.5rem] font-[200]">
              Event
            </h3>
          </div>
          {tom.map((elem) => (
            <>
              <div className="flex flex-col justify-start gap-[1rem] p-[0.5rem]">
                <h3 className="text-[#fff] font-['Cairo'] text-[1.2rem] font-[200]">
                  {elem.startDateTime.substring(11, 16)}
                </h3>
                <h3
                  id={elem.id}
                  data-function="tomorrow"
                  onClick={handleOpen}
                  className="text-[#fff] font-['Cairo'] text-[1.2rem] font-[200] cursor-pointer"
                >
                  {elem.eventName}
                </h3>
              </div>
            </>
          ))}
        </div>
      </div>
      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FontAwesomeIcon
            style={{
              position: "absolute",
              top: 15,
              right: 17,
              fontSize: "1.5rem",
              cursor: "pointer",
            }}
            onClick={handleClose}
            icon={faXmark}
          />
          <div className="w-[100%]">
            <h2 className="font-['Cairo'] text-[#ff007a] text-[2rem] text-center">
              Event Details
            </h2>
            <Divider sx={{ "border-color": "#313942" }} />
          </div>
          <div className="flex flex-col justify-center items-center gap-[1rem]">
            <div className="flex justify-center items-center gap-[1.5rem]">
              <h2>Event Name: </h2>
              <h2>{modalInfo.eventName}</h2>
            </div>
            <div className="flex justify-center items-center gap-[1.5rem]">
              <h2>Start Time: </h2>
              <h2>{modalInfo.startDateTime.substring(0,10)+' @ '+modalInfo.startDateTime.substring(11,16)}</h2>
            </div>
            <div className="flex justify-center items-center gap-[1.5rem]">
              <h2>Creator Email: </h2>
              <h2>{modalInfo.email}</h2>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Schedules;
