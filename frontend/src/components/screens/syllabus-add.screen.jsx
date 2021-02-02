import React, { Component } from "react";
import SyllabusAddComponent from "../syllabus-add.component";

import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { isAuth } from "../../helpers/auth";
import { Redirect } from "react-router-dom";
import Navbar from "../navbar.component";
import Footer from "../footer.component";

class SyllabusAdd extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        {!isAuth() ? (
          <Redirect to="/" />
        ) : !isAuth().role === "teacher" ? (
          <Redirect to="/" />
        ) : (
          <React.Fragment>
            <Navbar />

            <section className=" mbr-section mbr-after-navbar   w3-gray">
              <div className="list-group container min-vh-100">
                <SyllabusAddComponent />
              </div>
            </section>
            <Footer></Footer>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default SyllabusAdd;
