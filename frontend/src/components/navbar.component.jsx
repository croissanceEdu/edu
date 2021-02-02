import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { signout } from "../helpers/auth";
import UserPanel from "./user-panel.component";
import axios from "axios";
import { isAuth } from "../helpers/auth";
export default class Navbar extends Component {
  state = { feedback: [] };
  componentDidMount() {
    if (isAuth()) this.bindMessages();
  }
  bindMessages() {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/feedback/notify`, {
        _id: isAuth()._id,
      })
      .then((response) => {
        this.setState({ feedback: response.data.feedback });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <React.Fragment>
        <section id="ext_menu-14">
          <nav className="navbar navbar-dropdown navbar-fixed-top">
            <div className="container">
              <div className="mbr-table">
                <div className="mbr-table-cell">
                  <div className="navbar-brand">
                    <a href="#" className="navbar-logo">
                      <img
                        src="assets/images/alpha-helix-logo-1069x322-quarter-128x128-15.png"
                        alt="CROISSANCE TECHNOLOGIES"
                      />
                    </a>
                    <a
                      className="navbar-caption"
                      href="http://croissancetechnologies.com/"
                    >
                      CROISSANCE EDU
                    </a>
                  </div>
                </div>
                <div className="mbr-table-cell">
                  <button
                    className="navbar-toggler pull-xs-right hidden-md-up"
                    type="button"
                    data-toggle="collapse"
                    data-target="#exCollapsingNavbar"
                  >
                    <div className="hamburger-icon"></div>
                  </button>

                  <ul
                    className="nav-dropdown collapse pull-xs-right nav navbar-nav navbar-toggleable-sm"
                    id="exCollapsingNavbar"
                  >
                    <li className="nav-item">
                      <a className="nav-link link" href="/">
                        HOME
                      </a>
                    </li>

                    {isAuth() ? (
                      <React.Fragment>
                        <li className="nav-item">
                          <a className="nav-link link" href="/syllabus">
                            SYLLABUS
                          </a>
                        </li>

                        {isAuth().role !== "admin" ? (
                          <React.Fragment>
                            <li className="nav-item">
                              <a className="nav-link link" href="/joinclass">
                                JOIN CLASS
                              </a>
                            </li>
                            <li className="nav-item">
                              <a className="nav-link link" href="/feedback">
                                FEEDBACK{" "}
                                <span className="badge-success badge badge-pill">
                                  {this.state.feedback.length === 0
                                    ? null
                                    : this.state.feedback.length}
                                </span>
                              </a>
                            </li>
                          </React.Fragment>
                        ) : null}
                        {isAuth().role === "admin" ? (
                          <React.Fragment>
                            <li className="nav-item">
                              <a className="nav-link link" href="/manage">
                                MANAGE
                              </a>
                            </li>
                            <li className="nav-item">
                              <a className="nav-link link" href="/register">
                                REGISTER
                              </a>
                            </li>
                          </React.Fragment>
                        ) : null}
                      </React.Fragment>
                    ) : null}
                    <UserPanel className="float-right"></UserPanel>
                  </ul>
                  <button
                    hidden
                    className="navbar-toggler navbar-close"
                    type="button"
                    data-toggle="collapse"
                    data-target="#exCollapsingNavbar"
                  >
                    <div className="close-icon"></div>
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </section>
        {/* <nav className="navbar navbar-dark bg-dark navbar-expand-lg ">
          <Link to="/" className="navbar-brand">
            Home
          </Link>
          <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/syllabus" className="nav-link">
                  Syllabus
                </Link>
              </li>

              <li className="navbar-item">
                <Link to="/feedback" className="nav-link">
                  Feedback{" "}
                  <small className="badge-info badge badge-pill">
                    {this.state.feedback.length === 0
                      ? null
                      : this.state.feedback.length}
                  </small>
                </Link>
              </li>

              <li className="navbar-item">
                <Link to="/joinclass" className="nav-link">
                  Class
                </Link>
              </li>
            </ul>
            <UserPanel className=""></UserPanel>
          </div>
        </nav> */}
      </React.Fragment>
    );
  }
}
