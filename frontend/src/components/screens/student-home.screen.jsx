import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { isAuth } from "../../helpers/auth";
import Footer from "../footer.component";
import HomeComponent from "../home.component";
import Navbar from "../navbar.component";

class StudentHome extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Navbar />
        {isAuth() ? (
          <section className=" mbr-section mbr-after-navbar text-center w3-dark-gray">
            <div className="container">
              <h3 className="mbr-section-title display-2  float-left">
                Welcome {isAuth().name},
              </h3>
            </div>

            <Link
              className="container btn w3-hover-pale-red  bg-dark text-white w3-hover-shadow  ml-0 mr-0"
              to="/syllabus"
            >
              <div className="row">
                <div className="mbr-table-md-up">
                  <div className="mbr-table-cell col-md-5 text-xs-center text-md-center content-size">
                    <h3 className="mbr-section-title display-2 ">Syllabus</h3>
                  </div>
                </div>
              </div>
            </Link>

            {isAuth().role !== "admin" ? (
              <React.Fragment>
                <Link
                  className="container btn w3-hover-pale-red  bg-dark text-white w3-hover-shadow ml-0 mr-0"
                  to="/joinclass"
                >
                  <div className="row">
                    <div className="mbr-table-md-up">
                      <div className="mbr-table-cell col-md-5 text-xs-center text-md-center content-size">
                        <h3 className="mbr-section-title display-2 ">
                          Join Class
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>
                <Link
                  className="container btn w3-hover-pale-red  bg-dark text-white w3-hover-shadow ml-0 mr-0"
                  to="/feedback"
                >
                  <div className="row">
                    <div className="mbr-table-md-up">
                      <div className="mbr-table-cell col-md-5 text-xs-center text-md-center content-size">
                        <h3 className="mbr-section-title display-2 ">
                          Feedback
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>
              </React.Fragment>
            ) : null}

            {isAuth().role === "admin" ? (
              <React.Fragment>
                <Link
                  className="container btn w3-hover-pale-red  bg-dark text-white w3-hover-shadow ml-0 mr-0"
                  to="/manage"
                >
                  <div className="row">
                    <div className="mbr-table-md-up">
                      <div className="mbr-table-cell col-md-5 text-xs-center text-md-center content-size">
                        <h3 className="mbr-section-title display-2 ">Manage</h3>
                      </div>
                    </div>
                  </div>
                </Link>
                <Link
                  className="container btn w3-hover-pale-red  bg-dark text-white w3-hover-shadow ml-0 mr-0"
                  to="/register"
                >
                  <div className="row">
                    <div className="mbr-table-md-up">
                      <div className="mbr-table-cell col-md-5 text-xs-center text-md-center content-size">
                        <h3 className="mbr-section-title display-2 ">
                          Register
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>
              </React.Fragment>
            ) : null}
          </section>
        ) : (
          <React.Fragment>
            <HomeComponent />
          </React.Fragment>
        )}
        <Footer />
      </React.Fragment>
    );
  }
}

export default StudentHome;
