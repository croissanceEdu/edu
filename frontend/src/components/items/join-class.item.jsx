import React, { useState } from "react";
import styled from "styled-components";

import axios from "axios";

import { Link } from "react-router-dom";

import { toast } from "react-toastify";

import { BiEdit, BiCopy, BiChevronRightSquare } from "react-icons/bi";
import { ClasslinkPopupComponent } from "../classlink-popup.component";
import { isAuth } from "../../helpers/auth";

export const JoinClassItem = ({ classlink }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [manageId, setManageId] = useState(classlink._id);
  const [classLink, setClassLink] = useState(classlink.classLink);
  const [studentID, setStudentID] = useState(classlink.studentID);
  const [teacherID, setTeacherID] = useState(classlink.teacherID);
  const openPopup = () => {
    setShowPopup((prev) => !prev);
  };

  return (
    <>
      <div
        key={classlink._id}
        href="#"
        className="list-group-item list-group-item-action flex-column align-items-start m-3 p-3  container shadow border border-black "
      >
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{classlink.name}</h5>
          {classlink.classLink ? (
            <small>
              <a
                onClick={() => {
                  var copyText = document.getElementById(classlink._id);
                  copyText.select();
                  copyText.setSelectionRange(0, 99999);
                  document.execCommand("copy");
                  // toast.success("Link copied");
                  copyText.setSelectionRange(0, 0);
                }}
                className="btn  btn-secondary-outline"
                data-toggle="tooltip"
                data-placement="top"
                title="Copy link"
              >
                <BiCopy />
              </a>{" "}
              <a
                href={classlink.classLink}
                className="btn  btn-secondary-outline"
                data-toggle="tooltip"
                data-placement="top"
                title="Goto link"
              >
                <BiChevronRightSquare />
              </a>
            </small>
          ) : (
            <small>Class not started yet</small>
          )}
        </div>
        <textarea
          rows={1}
          id={classlink._id}
          className="m-1 border rounded-5  container"
          value={classlink.classLink}
          readOnly
        ></textarea>
        {isAuth().role === "teacher" ? (
          <>
            {/* <Link
              className="btn btn-sm btn-info mr-2 float-right"
              to={"/classlinkedit/" + classlink._id}
            >
              Edit
            </Link> */}
            <Link
              className="btn   btn-secondary-outline float-right"
              onClick={() => openPopup()}
              data-toggle="tooltip"
              data-placement="top"
              title="Edit link"
            >
              <BiEdit />
            </Link>
          </>
        ) : null}
      </div>
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
