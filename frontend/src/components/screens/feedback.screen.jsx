import React, { Component } from "react";
import { isAuth } from "../../helpers/auth";
import Navbar from "../navbar.component";
import { Redirect } from "react-router-dom";
import FeedbackComponent from "../feedback.component";
import Footer from "../footer.component";

class Feedback extends Component {
  render() {
    return (
      <React.Fragment>
        {!isAuth() ? (
          <Redirect to="/" />
        ) : (
          <React.Fragment>
            <Navbar />
            <section className=" mbr-section mbr-after-navbar  w3-gray ">
              <div className="container  min-vh-100">
                <FeedbackComponent />
              </div>
            </section>
            <Footer></Footer>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default Feedback;
