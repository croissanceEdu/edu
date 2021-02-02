import React, { Component } from "react";
import { isAuth } from "../../helpers/auth";
import Navbar from "../navbar.component";
import { Redirect } from "react-router-dom";
import SyllabusComponent from "../syllabus.component";
import Footer from "../footer.component";

class SyllabusList extends Component {
  render() {
    return (
      <React.Fragment>
        {!isAuth() ? <Redirect to="/" /> : null}
        <Navbar />
        <section className="  mbr-section mbr-after-navbar text-center w3-gray ">
          <div className="container  min-vh-100">
            <SyllabusComponent />
          </div>
        </section>
        <Footer></Footer>
      </React.Fragment>
    );
  }
}

export default SyllabusList;
