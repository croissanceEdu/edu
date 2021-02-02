import React, { Component } from "react";
import axios from "axios";
import { isAuth } from "../helpers/auth";
import { toast } from "react-toastify";
import Select from "react-select";
import feedbackItem from "./items/feedback.item";

//import { FeedbackListItem, FeedbackListBodyItem } from "./items/feedback.item";
class FeedbackComponent extends Component {
  state = {
    receivedfeedback: [],
    sentfeedback: [],
    titleName: "",
    messageContent: "",
    toID: "",
    handleSubmit: this.handleSubmit.bind(this),
    userOptions: [],
    tab: "",
  };

  //submit to backend
  handleSubmit(e) {
    e.preventDefault();

    const toID = this.state.toID;
    const titleName = e.target.titleName.value;
    const messageContent = e.target.messageContent.value;
    if (titleName && messageContent) {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/feedback/send`, {
          titleName,
          messageContent,
          fromID: isAuth()._id,
          toID,
        })
        .then((response) => {
          toast.success("Submitted successfully");
          // this.setState({ titleName: "", messageContent: "" });
          e.target.titleName.value = "";
          e.target.messageContent.value = "";
          // this.bindSentMessages(toID);
        });
    } else {
      toast.error("please fill all fields");
    }
  }
  componentDidMount() {
    this.bindUsers();
  }
  bindUsers() {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/user/getbyid`, {
        _id: isAuth()._id,
        role: isAuth().role,
      })
      .then((response) => {
        response.data.user.map((user) => {
          this.state.userOptions.push({ value: user._id, label: user.name });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  bindSentMessages(oppoId) {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/feedback/receive`, {
        fromID: isAuth()._id,
        toID: oppoId,
        isSender: true,
      })
      .then((response) => {
        this.setState({ sentfeedback: response.data.feedback });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  bindReceivedMessages(oppoId) {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/feedback/receive`, {
        fromID: oppoId,
        toID: isAuth()._id,
        isSender: false,
      })
      .then((response) => {
        this.setState({ receivedfeedback: response.data.newFeedback });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <React.Fragment>
        <div className=" card m-4 pt-4 shadow text-center">
          <div className="d-flex w-100 justify-content-between">
            <div></div>
            <h1 className="h3 mb-3 ml-4 font-weight-normal card-title text-center">
              Feedback
            </h1>
            <div></div>
          </div>
          <div className="mb-3 d-flex w-100 justify-content-between">
            <Select
              className="container-sm container-fluid"
              id="toID"
              name="toID"
              //placeholder="Teacher"
              // value={this.state.toID}
              options={this.state.userOptions}
              onChange={(props) => {
                this.setState({ toID: props.value });
                if (this.state.tab === "") {
                  this.setState({ tab: "receive" });
                  this.bindReceivedMessages(props.value);
                }
                if (this.state.tab === "sent")
                  this.bindSentMessages(props.value);
                if (this.state.tab === "receive")
                  this.bindReceivedMessages(props.value);
              }}
            ></Select>
          </div>
          <small></small>
        </div>
        {this.state.toID ? (
          <div className="  m-4 pt-0 pb-0  text-center justify-content-between">
            <div className="btn-group">
              <button
                type="button"
                className={
                  this.state.tab === "receive"
                    ? "btn  btn-secondary "
                    : "btn  btn-outline-secondary"
                }
                onClick={() => {
                  if (this.state.toID) {
                    this.setState({ tab: "receive" });
                    this.bindReceivedMessages(this.state.toID);
                  }
                }}
              >
                Receive
              </button>
              <button
                type="button"
                className={
                  this.state.tab === "sent"
                    ? "btn  btn-secondary "
                    : "btn  btn-outline-secondary"
                }
                onClick={() => {
                  if (this.state.toID) {
                    this.setState({ tab: "sent" });
                    this.bindSentMessages(this.state.toID);
                  }
                }}
              >
                Sent
              </button>
              <button
                type="button"
                className={
                  this.state.tab === "new"
                    ? "btn  btn-secondary "
                    : "btn  btn-outline-secondary"
                }
                onClick={() => {
                  if (this.state.toID) this.setState({ tab: "new" });
                }}
              >
                New
              </button>
            </div>
          </div>
        ) : null}
        <div>{feedbackItem(this.state)}</div>
      </React.Fragment>
    );
  }
}

export default FeedbackComponent;
