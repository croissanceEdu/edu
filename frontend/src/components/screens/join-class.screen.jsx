import axios from "axios";
import React, { Component, useState } from "react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import { isAuth } from "../../helpers/auth";
import { Redirect } from "react-router-dom";
import Navbar from "../navbar.component";
import Footer from "../footer.component";

import { JoinClassItem } from "../items/join-class.item";

class JoinClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: "",
      role: "",
      classLinks: [],
    };
  }
  componentDidMount() {
    if (isAuth()) {
      this.state.role = isAuth().role;
      this.state.userId = isAuth()._id;
      this.getClassLink();
    }
  }
  getClassLink() {
    if (isAuth()) {
      console.log(this.state.userId, this.state.role);
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/user/classlink`, {
          id: this.state.userId,
          role: this.state.role,
        })
        .then((res) => {
          if (res.data.classlinks.length) {
            this.setState({ classLinks: res.data.classlinks });
          } else toast.error("No class are available now");
        })
        .catch((err) => {
          toast.error(err.response.data.error);
        });
    } else {
      toast.error("err");
    }
  }

  BindClassLinks() {
    return this.state.classLinks.map((classlink) => {
      return <JoinClassItem classlink={classlink} />;
    });
  }

  render() {
    return (
      <React.Fragment>
        {!isAuth() ? (
          <Redirect to="/" />
        ) : (
          <React.Fragment>
            <Navbar />

            <section className=" mbr-section mbr-after-navbar   w3-gray  min-vh-100">
              <div className="list-group container">
                {this.BindClassLinks()}
              </div>
            </section>
            <Footer></Footer>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default JoinClass;
