import React from "react";
import deleteIcon from "../images/delete.svg";
import editIcon from "../images/edit.svg";
import alarmIcon from "../images/alarm.svg";

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      daysLeft: this.props.event.daysLeft,
      hoursLeft: this.props.event.hoursLeft,
      minsLeft: this.props.event.minsLeft,
      secondsLeft: this.props.event.secondsLeft,
    };
    this.interval = null;
  }

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick = () => {
    var daysLeft = this.state.daysLeft;
    var hoursLeft = this.state.hoursLeft;
    var minsLeft = this.state.minsLeft;
    var secondsLeft = this.state.secondsLeft;
    var displayDate = true;

    secondsLeft -= 1;
    if (secondsLeft < 0) {
      secondsLeft = 59;
      minsLeft -= 1;
      if (minsLeft < 0) {
        hoursLeft -= 1;
        minsLeft = 59;
        if (hoursLeft < 0) {
          daysLeft -= 1;
          hoursLeft = 23;
          if (daysLeft < 0) {
            clearInterval(this.interval);
            displayDate = false;
          }
        }
      }
    }
    if (displayDate)
      this.setState({
        secondsLeft: secondsLeft,
        hoursLeft: hoursLeft,
        daysLeft: daysLeft,
        minsLeft: minsLeft,
      });
  };

  deleteEvent = () => {
    clearInterval(this.interval);
    this.props.deleteEvent(this.props.index);
  };

  editEvent = () => {
    this.props.editEvent(this.props.index);
  };

  render() {
    return (
      <div className="event">
        <div className="date-section">
          <p className="day-text">{this.props.event.day}</p>
          <p className="month-text">{this.props.event.month}</p>
          <p className="year-text">{this.props.event.year}</p>
        </div>

        <div className="event-detail-section">
          <div className="event-detail-container">
            <div className="event-heading">
              <img src={alarmIcon} alt="Alarm icon" />
              <p>{this.props.event.name}</p>
            </div>
            <div className="event-description">
              <p>{this.props.event.description}</p>
            </div>
          </div>
        </div>

        <div className="timer-section">
          <div className="timer-container">
            <div className="days-section">
              <p className="days">{this.state.daysLeft}</p>
              <p className="days-text">Days</p>
            </div>
            <div className="hours-section">
              <p className="hours">{this.state.hoursLeft}</p>
              <p className="hours-text">Hours</p>
            </div>
            <div className="minutes-section">
              <p className="minutes">{this.state.minsLeft}</p>
              <p className="minute-text">Minutes</p>
            </div>
            <div className="seconds-section">
              <p className="seconds">{this.state.secondsLeft}</p>
              <p className="second-text">Seconds</p>
            </div>
          </div>
        </div>

        <div className="button-section">
          <div className="button-container">
            <button className="delete-button" onClick={this.deleteEvent}>
              <img src={deleteIcon} alt="delete icon" />
              Delete
            </button>
            <button className="edit-button" onClick={this.editEvent}>
              <img src={editIcon} alt="edit icon" />
              Edit
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Event;
