import React, { Component } from "react";

import axios from "axios";

import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import { isAuth } from "../../helpers/auth";
import { Redirect } from "react-router-dom";
import Navbar from "../navbar.component";
import Footer from "../footer.component";
import StudentMap from "../student-map.component";

class ManageComponent extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        {!isAuth() ? (
          <Redirect to="/" />
        ) : (
          <React.Fragment>
            <Navbar />

            <section className=" mbr-section mbr-after-navbar   w3-gray">
              <div className="list-group container min-vh-100">
                <StudentMap />
              </div>
            </section>
            <Footer></Footer>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default ManageComponent;
