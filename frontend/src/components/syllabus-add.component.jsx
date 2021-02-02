import React, { useState, Component } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Select from "react-select";
import { isAuth } from "../helpers/auth";

class SyllabusAddComponent extends Component {
  state = { userOptions: "", syllabuses: [], oppId: "" };

  //submit to backend
  handleSubmit(e) {
    e.preventDefault();
    const chapterName = e.target.chapterName.value;
    const moduleName = e.target.moduleName.value;
    const studentID = e.target.studentID.value;
    const teacherID = isAuth()._id;

    if (chapterName && studentID && moduleName && teacherID) {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/syllabus/add`, {
          chapterName,
          moduleName,
          studentID,
          teacherID,
        })
        .then((response) => {
          toast.success("Submitted successfully");

          e.target.chapterName.value = "";
          this.bindTable(this.state.oppId);
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
        this.setState({ userOptions: response.data.userOptions });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  bindTable(oppId) {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/syllabus/list`, {
        _id: isAuth()._id,
        role: "teacher",
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
  deleteSyllabus(id) {
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/syllabus/list/` + id)
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });

    this.setState({
      syllabuses: this.state.syllabuses.filter((el) => el._id !== id),
    });
  }
  getSyllabusList() {
    let i = 1;

    return this.state.syllabuses.map((currentSyllabus) => {
      return (
        <div className=" card shadow">
          <div className="d-flex w-100 justify-content-between">
            <h6 className="w-25 ">{i++}</h6>
            <h5 className=" text-left w-50">{currentSyllabus.chapterName}</h5>

            <h6 className=" text-left w-25">
              {" "}
              Module: {currentSyllabus.moduleName}
            </h6>
            <a
              className=" btn btn-link"
              onClick={() => {
                this.deleteSyllabus(currentSyllabus._id);
              }}
            >
              Delete
            </a>
          </div>
        </div>
      );
    });
  }
  render() {
    return (
      <React.Fragment>
        {isAuth() ? (
          isAuth().role === "teacher" ? null : (
            <Redirect to="/" />
          )
        ) : (
          <Redirect to="/login" />
        )}
        <div className=" card m-4 pt-4 shadow text-center">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1"></h5>
            <h1 className="h3 mb-3 ml-4 font-weight-normal card-title text-center">
              Add New Syllabus
            </h1>
            <small>
              <a href="/syllabus" className="btn btn-outline-secondary mr-4">
                Back
              </a>
            </small>
          </div>
          <form
            onSubmit={(props) => {
              this.handleSubmit(props);
            }}
          >
            <div className="form-group row p-2 m-2">
              <Select
                className="form-control border-0 "
                id="studentID"
                name="studentID"
                placeholder="Student"
                //  value={this.state.toID}
                options={this.state.userOptions}
                onChange={(props) => {
                  this.bindTable(props.value);
                  this.setState({ oppId: props.value });
                }}
              ></Select>
            </div>
            <div className="form-group  row p-2 m-2 ">
              <div className="container">
                <input
                  type="text"
                  className="form-control"
                  name="chapterName"
                  id="chapterName"
                  placeholder="Chapter"
                  value={this.state.chapterName}
                />
              </div>
            </div>
            <div className="form-group row p-2 m-2">
              <div className="container">
                <input
                  type="text"
                  className="form-control"
                  name="moduleName"
                  id="moduleName"
                  placeholder="Module"
                  value={this.state.moduleName}
                />
              </div>
            </div>

            <div className="form-group row">
              <div className="container">
                <button type="submit" className="btn btn-primary">
                  Add Syllabus
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="list-group  m-4  text-left">
          {this.getSyllabusList()}
        </div>
      </React.Fragment>
    );
  }
}

export default SyllabusAddComponent;
