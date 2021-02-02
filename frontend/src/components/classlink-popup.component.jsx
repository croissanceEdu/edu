import axios from "axios";
import React, { Component } from "react";
import { BiSave, BiArrowBack } from "react-icons/bi";
import { toast } from "react-toastify";
import styled from "styled-components";
import { isAuth } from "../helpers/auth";

export const ClasslinkPopupComponent = ({
  showPopup,
  setShowPopup,
  manageId,
  studentID,
  teacherID,
  classLink,
  setClassLink,
}) => {
  //   const showPopup;
  //   const setShowPopup;

  const onChangeClassLink = (e) => {
    setClassLink(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const classLink = e.target.classLink.value;

    if (classLink || true) {
      axios
        .put(`${process.env.REACT_APP_SERVER_URL}/syllabus/map/` + manageId, {
          classLink,
        })
        .then((response) => {
          // this.setState({ studentMap: response.data.studentMap });
          //e.target.classLink.value = "";
          // setShowPopup((prev) => false);
          window.location =
            isAuth().role === "admin" ? "/manage" : "/joinclass";
          // toast.success(response.data.message);
        });
    } else {
      toast.error("please fill all fields");
    }
  };
  return (
    <>
      {showPopup ? (
        <div
          className="fixed-top align-top vh-100 h-100 bg-blue z1 list-group"
          // onClick={() => {
          //   setShowPopup((prev) => false);
          // }}
        >
          <div className="w3-display-middle w3-pale-red  z2  flex-column   container shadow border border-black   ">
            <button
              className="btn  btn-secondary-outline float-right z3"
              onClick={() => {
                setShowPopup((prev) => false);
              }}
            >
              <BiArrowBack />
            </button>
            <form
              onSubmit={(props) => {
                handleSubmit(props);
              }}
            >
              <h3>Class Link</h3>
              <div className="form-group">
                <textarea
                  placeholder="class Link"
                  className="form-control "
                  name="classLink"
                  id="classLink"
                  rows="3"
                  value={classLink}
                  onChange={onChangeClassLink}
                  required={false}
                ></textarea>
              </div>

              <div className="form-group row">
                <div className="offset-sm-2 col-sm-10">
                  <button
                    type="submit"
                    className="btn  btn-secondary-outline float-right"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Save"
                  >
                    <BiSave />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};
