import React from "react";
import EventTitle from "./EventTitle";
import Event from "./Event";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.monthNames = [
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
    ];
    this.state = {
      eventList: [],
      originalEventList: [],
      show: false,
      date: new Date(),
      errorMessage: "",
      eventTitle: "",
      eventDescription: "",
    };
    this.eventEdit = false;
    this.currentEditedEvent = null;
  }

  saveChangeHandle = () => {
    if (this.state.date <= new Date().getTime()) {
      this.setState({ errorMessage: "Invalid date! Try again" });
    } else {
      this.setState({ errorMessage: "", show: false });

      if (!this.eventEdit) this.addNewEvent();
      else this.editCurrentEvent();
    }
  };

  addNewEvent = () => {
    var timeLeft = this.findTimeLeft(this.state.date);

    var event = {
      day: this.state.date.getDate(),
      month: this.monthNames[this.state.date.getMonth()],
      year: this.state.date.getFullYear(),
      daysLeft: timeLeft[0],
      hoursLeft: timeLeft[1],
      minsLeft: timeLeft[2],
      secondsLeft: timeLeft[3],
      name: this.state.eventTitle,
      description: this.state.eventDescription,
    };
    var eventList = this.state.eventList;
    eventList.push(event);
    this.setState({
      eventList: eventList,
      originalEventList: eventList,
      date: new Date(),
      errorMessage: "",
      eventTitle: "",
      eventDescription: "",
    });
    this.eventEdit = false;
  };

  findTimeLeft = (date) => {
    var today = new Date();
    today = today.getTime();
    var delta = Math.abs(date - today) / 1000;
    var days = Math.floor(delta / 86400);
    delta -= days * 86400;
    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    var seconds = delta % 60;
    seconds = seconds.toFixed(0);

    return [days, hours, minutes, seconds];
  };

  editCurrentEvent = () => {
    this.deleteEvent(this.currentEditedEvent);
    this.addNewEvent();
  };

  deleteEvent = (id) => {
    var eventList = this.state.eventList;
    eventList.splice(id, 1);
    this.setState({ eventList: eventList, originalEventList: eventList });
  };

  editEvent = (id) => {
    console.log("Edit event called for index: ", id);
    this.setState({
      show: true,
      eventTitle: this.state.eventList[id].name,
      eventDescription: this.state.eventList[id].description,
    });
    this.eventEdit = true;
    this.currentEditedEvent = id;
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  handleDateChange = (date) => {
    console.log(date.getTime(), date);
    this.setState({ date: date });
  };

  handleTitleChange = (event) => {
    this.setState({ eventTitle: event.target.value });
  };

  handleDescriptionChange = (event) => {
    this.setState({ eventDescription: event.target.value });
  };

  searchEvents = (keyword) => {
    console.log(keyword + " searched");
    var eventList = this.state.originalEventList;
    if (keyword !== null || keyword !== "") {
      eventList = eventList.filter(
        (event) =>
          event.name.includes(keyword) || event.description.includes(keyword)
      );
    }
    this.setState({ eventList: eventList });
  };

  render() {
    return (
      <div className="main">
        <EventTitle
          handleShow={this.handleShow}
          searchEvents={(keyword) => this.searchEvents(keyword)}
        />
        {this.state.eventList.map((event, index) => (
          <Event
            event={event}
            key={index}
            index={index}
            deleteEvent={(id) => this.deleteEvent(id)}
            editEvent={(id) => this.editEvent(id)}
          />
        ))}

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="add-event-container">
              <label htmlFor="event-title">Event title</label>
              <input
                type="text"
                className="event-title-input"
                name="event-title"
                placeholder="Event name..."
                onChange={this.handleTitleChange}
                value={this.state.eventTitle}
              />

              <label htmlFor="new-event-description">Event description</label>
              <input
                type="text"
                className="event-description-input"
                name="new-event-description"
                placeholder="Event description..."
                onChange={this.handleDescriptionChange}
                value={this.state.eventDescription}
              />
              <label htmlFor="event-date">Event date</label>
              <DatePicker
                selected={this.state.date}
                onChange={this.handleDateChange}
                dateFormat="MMMM d, yyyy h:mm aa"
                showTimeSelect
                timeIntervals={1}
              />
              <p className="error-message">{this.state.errorMessage}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={this.saveChangeHandle}
              style={{ backgroundColor: "#138496" }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default MainComponent;
