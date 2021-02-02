import React from "react";

import { isAuth, signout } from "../helpers/auth";
import { Redirect } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { BiEdit, BiLogOut } from "react-icons/bi";

const UserPanel = () => {
  //logout
  const handleLogout = () => {
    signout(() => {
      if (isAuth()) {
        window.location = "/";
      } else {
        window.location = "/login";
      }
    });
  };

  if (isAuth()) {
    console.log(isAuth());
    return (
      <React.Fragment>
        {/* <li className="nav-item">
          <a className="nav-link link" href="/changepassword">
            CHANGE PASSWORD
          </a>
        </li> */}

        {/* <li className="nav-item"></li> */}
        <li>
          <div className="btn-group">
            <a
              className="nav-link link  "
              id="triggerId"
              data-toggle="dropdown"
              aria-haspopup="false"
              aria-expanded="false"
            >
              <BsFillPersonFill />
            </a>
            <div
              className="dropdown-menu dropdown-menu-left justify-content-center text-center"
              aria-labelledby="triggerId"
            >
              {/* <div className="">
                <img
                  src="assets/images/alpha.png"
                  height={50}
                  className="rounded-circle"
                  alt="No Image"
                ></img>
                <a href="" className="float-right nav-link link btn p-0 m-0">
                  <BiEdit></BiEdit>
                </a>
              </div> */}
              <h6 className="dropdown-header align-items-center">
                {isAuth().name}
              </h6>

              <a className="nav-link link  " href="/changepassword">
                CHANGE PASSWORD
              </a>
              <a className="nav-link link " onClick={handleLogout} href="">
                <BiLogOut /> Logout
              </a>
            </div>
          </div>
        </li>
      </React.Fragment>
    );
  } else
    return (
      <li className="nav-item">
        <a className="nav-link link" href="/login">
          LOGIN
        </a>
      </li>
    );
};

export default UserPanel;
