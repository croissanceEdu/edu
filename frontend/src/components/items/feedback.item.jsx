import React, { Component } from "react";
import { getFormattedDate } from "../../helpers/custom";

export const FeedbackReceivedItem = (receivedfeedback) => {
  const loadReceivedMessages = () => {
    return receivedfeedback.map((feedback) => {
      return (
        <div
          key={feedback._id}
          className=" card mr-4 ml-4 mb-2 mt-2 p-2 shadow text-center"
        >
          {/* <div className="list-group-item list-group-item-action flex-column align-items-start col-12"> */}
          <div className="d-flex w-100 justify-content-between">
            <div></div>
            <h5 className="mb-1  text-center">{feedback.titleName}</h5>
            <small>
              {!feedback.isReadStatus ? (
                <span className="badge badge-warning badge-pill">New</span>
              ) : null}
            </small>
          </div>
          <p className="mb-2 mr-2 ml-2 text-left w-100">
            {feedback.messageContent}
          </p>
          <small className="mb-2 text-right ">
            {getFormattedDate(feedback.createdAt)}
          </small>
          {/* </div> */}
        </div>
      );
    });
  };
  return <div className="list-group">{loadReceivedMessages()}</div>;
};

const FeedbackSentItem = (sentFeedback) => {
  const loadSentMessages = () => {
    return sentFeedback.map((feedback) => {
      return (
        <div
          key={feedback._id}
          className=" card mr-4 ml-4 mb-2 mt-2 p-2 shadow text-center"
        >
          {/* <div className="d-flex w-100 justify-content-between"> */}
          <div className="d-flex w-100 justify-content-between">
            <div></div>
            <h5 className="mb-1 text-center">{feedback.titleName}</h5>
            <small>
              {feedback.isDeliverStatus ? (
                feedback.isReadStatus ? (
                  <React.Fragment>
                    <span className="badge badge-success badge-pill ">R</span>
                    {/* <span>{getFormattedDate(feedback.updatedAt)}</span> */}
                  </React.Fragment>
                ) : (
                  <span className="badge badge-secondary badge-pill">D</span>
                )
              ) : (
                <span className="badge badge-light badge-pill ">S</span>
              )}
            </small>
          </div>
          <p className="mb-2  mr-2 ml-2 text-left w-100">
            {feedback.messageContent}
          </p>
          <small className="mb-2 text-right ">
            {getFormattedDate(feedback.createdAt)}
          </small>
          {/* </div> */}
        </div>
      );
    });
  };

  return <div className="list-group">{loadSentMessages()}</div>;
};
const FeedbackNewItem = (superProps) => {
  return (
    <div className=" card mr-4 ml-4 mb-2 mt-2 p-4 shadow text-center">
      <form
        onSubmit={(props) => {
          superProps.handleSubmit(props);
        }}
      >
        <div className="form-group row">
          <div className="col-sm-12 pt-4">
            <input
              type="text"
              required
              className="form-control"
              name="titleName"
              id="titleName"
              placeholder="Title"
            />
          </div>
        </div>
        <div className="form-group">
          <textarea
            placeholder="Message"
            className="form-control"
            name="messageContent"
            id="messageContent"
            rows="3"
          ></textarea>
        </div>

        <div className="form-group row">
          <div className="offset-sm-2 col-sm-10 right-align">
            <button type="submit" className="btn btn-primary float-right">
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const FeedbackItem = (props) => {
  if (props.tab === "sent") {
    return FeedbackSentItem(props.sentfeedback);
  } else if (props.tab === "receive") {
    return FeedbackReceivedItem(props.receivedfeedback);
  } else if (props.tab === "new") {
    return FeedbackNewItem(props);
  } else
    return (
      <p className="  m-4 pt-0 pb-0  text-center justify-content-between">
        Please Select
      </p>
    );
};

export default FeedbackItem;
