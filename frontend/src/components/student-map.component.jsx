import React, { useState, Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Select from "react-select";
import { isAuth } from "../helpers/auth";
import { ClasslinkPopupComponent } from "./classlink-popup.component";

const Studentmap = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [manageId, setManageId] = useState(props.studentmap._id);
  const [classLink, setClassLink] = useState(props.studentmap.classLink);
  const [studentID, setStudentID] = useState(props.studentmap.studentID);
  const [teacherID, setTeacherID] = useState(props.studentmap.teacherID);
  const openPopup = () => {
    setShowPopup((prev) => !prev);
  };
  return (
    <>
      <tr>
        <td>{props.studentmap.studentName}</td>
        <td>{props.studentmap.teacherName}</td>
        <td>{props.studentmap.classLink}</td>
        <td>
          <Link className="" onClick={() => openPopup()}>
            edit
          </Link>
          |{" "}
          <a
            className=""
            href="#"
            onClick={() => {
              props.deleteMap(props.studentmap._id);
            }}
          >
            Delete
          </a>
        </td>
      </tr>
      <ClasslinkPopupComponent
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        manageId={manageId}
        classLink={classLink}
        setClassLink={setClassLink}
        studentID={studentID}
        teacherID={teacherID}
      />
    </>
  );
};

class StudentMap extends Component {
  constructor(props) {
    super(props);

    this.deleteMap = this.deleteMap.bind(this);

    this.state = {
      studentOptions: [],
      teacherOptions: [],
      studentMap: [],
    };
  }

  //submit to backend
  handleSubmit(e) {
    e.preventDefault();
    const studentID = e.target.studentID.value;
    const teacherID = e.target.teacherID.value;
    const classLink = e.target.classLink.value;

    if (studentID && teacherID) {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/syllabus/map/add`, {
          studentID,
          teacherID,
          classLink,
        })
        .then((response) => {
          toast.success(response.data.message);
          this.setState({ studentMap: response.data.studentMap });
          e.target.classLink.value = "";
        });
    } else {
      toast.error("please fill all fields");
    }
  }
  componentDidMount() {
    this.bindStudent();
    this.bindTeacher();
    this.bindStudentMap();
  }
  bindStudentMap() {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/syllabus/map`)
      .then((response) => {
        // toast.success(response.data.message);
        this.setState({ studentMap: response.data.studentMap });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  bindTeacher() {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/user/get`, {
        _id: "",
        role: "teacher",
      })
      .then((response) => {
        this.setState({ teacherOptions: response.data.userOptions });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  bindStudent() {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/user/get`, {
        _id: "",
        role: "student",
      })
      .then((response) => {
        this.setState({ studentOptions: response.data.userOptions });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  deleteMap(id) {
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/syllabus/map/` + id)
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });

    this.setState({
      studentMap: this.state.studentMap.filter((el) => el._id !== id),
    });
  }
  render() {
    return (
      <div className="row">
        <div className="container card m-4 pt-4 shadow">
          {isAuth() ? (
            isAuth().role === "admin" ? null : (
              <Redirect to="/" />
            )
          ) : (
            <Redirect to="/login" />
          )}
          <h1 className="h3 mb-3 font-weight-normal card-title text-center">
            Add New
          </h1>
          <form
            onSubmit={(props) => {
              this.handleSubmit(props);
            }}
          >
            <div className="form-group container">
              <Select
                className="form-control "
                id="teacherID"
                name="teacherID"
                placeholder="Teacher"
                //  value={this.state.toID}
                options={this.state.teacherOptions}
              ></Select>
            </div>
            <div className="form-group  container">
              <Select
                className="form-control"
                id="studentID"
                name="studentID"
                placeholder="Student"
                //  value={this.state.toID}
                options={this.state.studentOptions}
              ></Select>
            </div>
            <div className="form-group container">
              <textarea
                placeholder="class Link"
                className="form-control "
                name="classLink"
                id="classLink"
                rows="3"
                value={this.state.classLink}
              ></textarea>
            </div>

            <div className="form-group row">
              <div className="offset-sm-2 col-sm-10">
                <button type="submit" className="btn btn-primary float-right">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="container card  m-4 shadow">
          <table className="table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Teacher</th>
                <th>Class Link</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.studentMap.map((studentmap) => {
                return (
                  <Studentmap
                    studentmap={studentmap}
                    deleteMap={this.deleteMap}
                    key={studentmap._id}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default StudentMap;
