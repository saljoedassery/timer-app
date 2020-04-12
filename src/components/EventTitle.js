import React from "react";
import addEventIcon from "../images/event.svg";

class EventTitle extends React.Component {
  constructor(props) {
    super(props);
    this.keyword = "";
  }

  searchEvents = () => {
    this.props.searchEvents(this.keyword);
  };

  searchOnChange = (event) => {
    this.keyword = event.target.value;
  };

  render() {
    return (
      <>
        <div className="event-title">
          <h2>Events</h2>
          <div className="event-action-div">
            <button
              className="add-event-button"
              onClick={this.props.handleShow}
            >
              <img src={addEventIcon} alt="Add event" />
              Add Event
            </button>
            <div className="event-search-div">
              <input
                type="text"
                className="event-search-input"
                placeholder="Search events.."
                onChange={this.searchOnChange}
              />
              <button
                className="event-search-button"
                onClick={this.searchEvents}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <hr />
      </>
    );
  }
}
export default EventTitle;
