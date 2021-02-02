import React, { Component } from "react";
import { isAuth } from "../helpers/auth";
import SyllabusItem from "./items/syllabus.item";
import axios from "axios";
import Select from "react-select";
import { toast } from "react-toastify";

class SyllabusComponent extends Component {
  constructor(props) {
    super(props);

    this.completeSyllabus = this.completeSyllabus.bind(this);
    this.unCheckSyllabus = this.unCheckSyllabus.bind(this);

    this.state = {
      syllabuses: [],
      users: [],
      userOptions: [],
      role: "",
      userId: "",

      otheruserId: "",
      oppId: "",
    };
  }

  componentDidMount() {
    if (isAuth()) {
      this.state.role = isAuth().role;
      this.state.userId = isAuth()._id;
    }

    this.bindUsers();
  }

  bindTable(oppId) {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/syllabus/list`, {
        _id: this.state.userId,
        role: this.state.role,
        oppId: oppId,
      })
      .then((response) => {
        if (response.data.syllabus) {
          this.setState({ syllabuses: response.data.syllabus });
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  }
  bindTableForAdmin(teacherID, studentID) {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/syllabus/list`, {
        _id: teacherID,
        role: "teacher",
        oppId: studentID,
      })
      .then((response) => {
        if (response.data.syllabus) {
          this.setState({ syllabuses: response.data.syllabus });
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  }
  bindUsers() {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/user/getbyid`, {
        _id: this.state.userId,
        role: this.state.role,
      })
      .then((response) => {
        //console.log(response.data.user);
        this.setState({ users: response.data.user });
        if (isAuth().role === "admin") {
          this.state.users.map((user) => {
            this.state.userOptions.push({
              value: user._id,
              label: user.studentName + "-" + user.teacherName,
              studentID: user.studentID,
              teacherID: user.teacherID,
            });
          });
        } else {
          this.state.users.map((user) => {
            this.state.userOptions.push({ value: user._id, label: user.name });
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getSyllabusList() {
    let i = 1;
    return this.state.syllabuses.map((currentSyllabus) => {
      return (
        <SyllabusItem
          i={i++}
          syllabus={currentSyllabus}
          completeSyllabus={this.completeSyllabus}
          key={currentSyllabus._id}
        />
      );
    });
  }
  completeSyllabus(id) {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/syllabus/complete`, {
        id,
        role: this.state.role,
      })
      .then((response) => {
        this.bindTable(this.state.oppId);
      });
  }
  unCheckSyllabus(id) {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/syllabus/uncheck`, {
        id,
        role: this.state.role,
      })
      .then((response) => {
        this.bindTable(this.state.oppId);
      });
  }

  render() {
    if (isAuth())
      return (
        <div className="w-100">
          <div className="list-group container ">
            <div className="list-group-item list-group-item-action flex-column align-items-start m-3 p-3  container shadow border border-black ">
              <div className="d-flex w-100 justify-content-between">
                <div className=""></div>
                <h3 className="mb-1">Syllabus</h3>
                <small>
                  {isAuth().role === "teacher" ? (
                    <a
                      href="/syllabusadd"
                      className="btn btn-outline-secondary mr-4"
                    >
                      New
                    </a>
                  ) : null}
                </small>
              </div>

              <Select
                placeholder={
                  this.state.role === "student"
                    ? "Select Teacher"
                    : this.state.role === "teacher"
                    ? "Select Student"
                    : this.state.role === "admin"
                    ? "Select Student-Teacher"
                    : ""
                }
                className=" basic-single  float-left  border-0 w-100 p-2 rounded-5"
                bindTable={this.bindTable}
                name="userSelect"
                onChange={(props) => {
                  if (isAuth().role === "admin") {
                    this.bindTableForAdmin(props.teacherID, props.studentID);
                    this.setState({ oppId: props.value });
                  } else {
                    this.bindTable(props.value);
                    this.setState({ oppId: props.value });
                  }
                }}
                options={this.state.userOptions}
              />
            </div>
          </div>
          <div className="list-group container">
            <div className="list-group-item list-group-item-action flex-column align-items-start m-3 p-3  container shadow border border-black ">
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th>No</th>
                    <th>Chapter</th>
                    <th>Module</th>
                    <th>Teacher</th>
                    <th>Student</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.syllabuses.length ? (
                    this.getSyllabusList()
                  ) : (
                    <tr>
                      <td>not availabe</td>
                      <td>--</td>
                      <td>--</td>
                      <td>--</td>
                      <td>--</td>
                      <td>--</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    else return null;
  }
}

export default SyllabusComponent;
