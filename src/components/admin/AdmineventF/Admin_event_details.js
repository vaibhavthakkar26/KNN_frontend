import React, { useEffect, useState } from "react";
import Adminsidebar from "../Adminsidebar";
import deletesvg from "../../../assets/image/delete.svg";
import addsvg from "../../../assets/image/plus.svg";
import queryString from "query-string";
import EventService from "../../../services/event.services";
import Loaderring from "../../../comman/Loader";
import "jquery/dist/jquery.min.js";
import { styled, Box } from "@mui/system";
import ModalUnstyled from "@mui/core/ModalUnstyled";
import ErrorToast from "../../../comman/ErrorToast";
import SuccessToast from "../../../comman/SuccessToast";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

function Admineventdetails(props) {
  const { id } = queryString.parse(props.location.search);
  console.log("Event Id: ", id);
  const [event, setEvent] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [eventDate, setEventDate] = useState();
  const [eventEndDate, setEventEndDate] = useState();
  const [registrationEndsAt, setRegistrationEndsAt] = useState();
  const [eventReg, setEventReg] = useState([]);
  // for Modal start ==>>
  const [open, setOpen] = React.useState(false);
  const [learningopen, setlearningopen] = React.useState(false);
  const [spekersopen, setspekersopen] = React.useState(false);
  const [requrementopen, setrequrementopen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handlelearningopen = () => setlearningopen(true);
  const handlelearningclose = () => setlearningopen(false);
  const handlespekersopen = () => setspekersopen(true);
  const handlespekersopenclose = () => setspekersopen(false);
  const handlerequrementopenopen = () => setrequrementopen(true);
  const handlerequrementopenclose = () => setrequrementopen(false);
  // for Modak End ==>>

  const getEvent = async () => {
    setisLoading(true);
    const getEnevnt = await EventService.getEvent(id);
    console.log("getEnevnt  ", getEnevnt);
    await setEvent(getEnevnt.data.data);
    await setEventDate(
      new Date(getEnevnt.data.data.startAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    );
    await setEventEndDate(
      new Date(getEnevnt.data.data.endAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    );
    await setRegistrationEndsAt(
      new Date(getEnevnt.data.data.registrationEndAt).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
          weekday: "long",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }
      )
    );
    await setEventReg(getEnevnt.data.data.EventRegistration);
    $(document).ready(function () {
      $("#example").DataTable();
    });
    setisLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getEvent();
    };
    fetchData();
  }, []);

  const [eventBenefits, setEventBenefits] = useState();
  const [eventLearning, setEventLearning] = useState();
  const [eventReq, setEventReq] = useState();

  const [speakerName, setSpeakerName] = useState("");
  const [speakerProfilePicture, setSpeakerProfilePicture] = useState();
  const [speakerDesignation, setSpeakerDesignation] = useState();
  const [speakerCompany, setSpeakerCompany] = useState();

  const onAddEventBenefits = async () => {
    const AddEventBenefits = await EventService.addBenifits(id, eventBenefits);
    if (AddEventBenefits.status === 200) {
      SuccessToast(AddEventBenefits.data.message);
      await getEvent();
    } else {
      ErrorToast(AddEventBenefits.data.message);
    }
  };

  const onAddEventLearning = async () => {
    const AddEventLearning = await EventService.addLearning(id, eventLearning);
    if (AddEventLearning.status === 200) {
      SuccessToast(AddEventLearning.data.message);
      await getEvent();
    } else {
      ErrorToast(AddEventLearning.data.message);
    }
  };

  const onAddEventReq = async () => {
    const AddEventReq = await EventService.addReq(id, eventReq);
    if (AddEventReq.status === 200) {
      SuccessToast(AddEventReq.data.message);
      await getEvent();
    } else {
      ErrorToast(AddEventReq.data.message);
    }
  };

  const onAddEventSpeaker = async () => {
    const AddEventSpeaker = await EventService.addSpeaker(
      id,
      speakerName,
      speakerProfilePicture[0],
      speakerCompany,
      speakerDesignation
    );
    if (AddEventSpeaker.status === 200) {
      SuccessToast(AddEventSpeaker.data.message);
      await getEvent();
    } else {
      ErrorToast(AddEventSpeaker.data.message);
    }
  };

  const onDeleteBLSR = async (blsrId, table) => {
    const DeleteBLSR = await EventService.deleteBLRS(blsrId, table);
    if (DeleteBLSR.status === 200) {
      SuccessToast(DeleteBLSR.data.message);
      await getEvent();
    } else {
      ErrorToast(DeleteBLSR.data.message);
    }
  };

  // for modal start===>>
  const StyledModal = styled(ModalUnstyled)`
    position: fixed;
    z-index: 1300;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const Backdrop = styled("div")`
    z-index: -1;
    position: fixed;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-tap-highlight-color: transparent;
  `;

  const style = {
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    p: 2,
    px: 4,
    pb: 3,
  };

  // for modal end ==>>
  return (
    <div>
      <div className="admin_side_main">
        <Adminsidebar />
        <div className="MainDiv">
          <div class="event_btn_admin">
            <h3>Event Details</h3>
          </div>
          {isLoading ? (
            <div style={{ marginLeft: "123px" }}>
              <Loaderring />
            </div>
          ) : (
            <div class="admin_event_">
              <div class="Details_event_main_admin">
                <div class="Image_area_event_admin">
                  <img
                    src={event.titleImage}
                    alt=""
                    width="200"
                    height="200"
                    style={{ marginTop: "50px" }}
                  />
                </div>
                <div class="main_details_area_admin">
                  <div class="details_one_">
                    <h2>Title</h2>
                    <p> {event.title}</p>
                  </div>
                  <div class="details_one_">
                    <h2> SubTitle</h2>
                    <p> {event.subTitle} </p>
                  </div>
                  <div class="details_one_">
                    <h2>Description </h2>
                    <p> {event.body}</p>
                  </div>
                  <div class="details_one_">
                    <h2> StartAt</h2>
                    <p>{eventDate} </p>
                  </div>
                  <div class="details_one_">
                    <h2> EndAt</h2>
                    <p>{eventEndDate} </p>
                  </div>
                  <div class="details_one_">
                    <h2>Eligibility</h2>
                    <p>{event.eligibility}</p>
                  </div>
                  <div class="details_one_">
                    <h2> Fee</h2>
                    <p> {event.fee}</p>
                  </div>
                  <div class="details_one_">
                    <h2> Registration End At</h2>
                    <p>{registrationEndsAt}</p>
                  </div>
                  <div class="details_one_">
                    <h2> Shifts</h2>
                    <p> {event.shifts} </p>
                  </div>
                  <div class="details_one_">
                    <h2> Venne</h2>
                    <p> {event.venue}</p>
                  </div>
                  <div class="details_one_">
                    <h2> Video Links</h2>
                    <p> {event.videoLink} </p>
                  </div>

                  <div class="details_one_">
                    <h2> Add Benfits</h2>
                    <div class="Admin_btn_benfits">
                      {event.EventBenefits ? (
                        event.EventBenefits.map((eventBebefits, i) => (
                          <div>
                            <li> {eventBebefits.benefits} </li>
                            <img
                              src={deletesvg}
                              width="30"
                              height="30"
                              onClick={() =>
                                onDeleteBLSR(eventBebefits.id, "Benefits")
                              }
                            alt="" />
                          </div>
                        ))
                      ) : (
                        <div style={{ marginLeft: "123px" }}>
                          <Loaderring />
                        </div>
                      )}
                    </div>

                    <img
                      src="https://img.icons8.com/pastel-glyph/64/4a90e2/add.png"
                      alt=""
                      onClick={handleOpen}
                    />
                    <br />
                  </div>

                  <div class="details_one_">
                    <h2> learning</h2>

                    {event.EventLearning ? (
                      event.EventLearning.map((eventLearning, i) => (
                        <div class="Admin_btn_benfits">
                          <li> {eventLearning.learning} </li>
                          <img
                            src={deletesvg}
                            width="30"
                            height="30"
                            alt=""
                            onClick={() =>
                              onDeleteBLSR(eventLearning.id, "Learning")
                            }
                          />
                        </div>
                      ))
                    ) : (
                      <div style={{ marginLeft: "123px" }}>
                        <Loaderring />
                      </div>
                    )}

                    <img
                      src="https://img.icons8.com/pastel-glyph/64/4a90e2/add.png"
                      alt=""
                      onClick={handlelearningopen}
                    />
                  </div>

                  <div class="details_one_">
                    <h2> Requrirement </h2>

                    {event.EventRequirements ? (
                      event.EventRequirements.map((eventRequirement, i) => (
                        <div class="Admin_btn_benfits">
                          <li> {eventRequirement.requirements} </li>
                          <img
                            src={deletesvg}
                            width="30"
                            height="30"
                            onClick={() =>
                              onDeleteBLSR(eventRequirement.id, "Requirement")
                            }
                          alt=""/>
                        </div>
                      ))
                    ) : (
                      <div style={{ marginLeft: "123px" }}>
                        <Loaderring />
                      </div>
                    )}

                    <br />
                    <img
                      src="https://img.icons8.com/pastel-glyph/64/4a90e2/add.png"
                      alt=""
                      onClick={handlerequrementopenopen}
                    />
                  </div>

                  <div class="details_one_">
                    <h2> Speaker </h2>

                    {event.EventSpeakers ? (
                      event.EventSpeakers.map((eventSpeaker, i) => (
                        <div class="Admin_btn_benfits">
                          <li> {eventSpeaker.name} </li>
                          <img
                            src={deletesvg}
                            width="30"
                            height="30"
                            onClick={() =>
                              onDeleteBLSR(eventSpeaker.id, "Speaker")
                            }
                          alt=""/>
                        </div>
                      ))
                    ) : (
                      <div style={{ marginLeft: "123px" }}>
                        <Loaderring />
                      </div>
                    )}

                    <br />
                    {/* <img src={addsvg} width="40" height="40"/> */}
                    <img
                      src="https://img.icons8.com/pastel-glyph/64/4a90e2/add.png"
                      alt=""
                      onClick={handlespekersopen}
                    />
                  </div>
                </div>
              </div>
              <hr />
              <br />
              <div>
                {/* Event Participants Table */}
                <div class="event_btn_admin">
                  <h3>Event Registration Details</h3>
                </div>
                <table id="example" class="cell-border stripe">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Name</th>
                      <th>EmailId</th>
                      <th>Address</th>
                      <th>Payment Done ?</th>
                      <th>Event Fees</th>
                    </tr>
                  </thead>
                  <tbody>
                    {event.EventRegistration ? (
                      event.EventRegistration.map((reg, i) => {
                        return (
                          <tr class="table-success">
                            <td>{i + 1}</td>
                            <td>{reg.User.firstName}</td>
                            <td>{reg.User.emailId}</td>
                            <td>{reg.User.address}</td>
                            <td>{reg.isPaymentDone.toString()}</td>
                            <td>{event.fee}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <div style={{ marginLeft: "123px" }}>
                        <Loaderring />
                      </div>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* modal React */}
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
          <input
            type="text"
            placeholder="Benfits"
            onChange={(e) => setEventBenefits(e.target.value)}
            required
          />
          <button onClick={() => onAddEventBenefits()}> Add</button>
        </Box>
      </StyledModal>

      {/* learning part modal  start */}
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={learningopen}
        onClose={handlelearningclose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
          <input
            type="text"
            placeholder="Learning"
            onChange={(e) => setEventLearning(e.target.value)}
            required
          />
          <button onClick={() => onAddEventLearning()}> Add</button>
        </Box>
      </StyledModal>
      {/* learning part modal  end */}

      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={requrementopen}
        onClose={handlerequrementopenclose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
          <input
            type="text"
            placeholder="Requirement"
            onChange={(e) => setEventReq(e.target.value)}
            required
          />
          <button onClick={() => onAddEventReq()}> Add</button>
        </Box>
      </StyledModal>

      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={spekersopen}
        onClose={handlespekersopenclose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setSpeakerName(e.target.value)}
            required
          />
          <input
            type="file"
            placeholder="Profile picture"
            onChange={(e) => setSpeakerProfilePicture(e.target.files)}
            required
          />
          <input
            type="text"
            placeholder="Designation"
            onChange={(e) => setSpeakerDesignation(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="company"
            onChange={(e) => setSpeakerCompany(e.target.value)}
            required
          />
          <button onClick={() => onAddEventSpeaker()}> Add</button>
        </Box>
      </StyledModal>

      {/* react modal end  */}
    </div>
  );
}

export default Admineventdetails;
