import React, { Component } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default class CreateDefaults extends Component {
  constructor(props) {
    super(props);

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      isEmptyFlag: true,
      name: "Admin",
      email: "",
      password: "admin",
      imagePath: "",
      role: "admin",
    };
  }

  componentDidMount() {
    this.checkUsersEmpty();
    // console.log(this.state);
  }
  componentWillUnmount() {}
  checkUsersEmpty() {
    // console.log(this.state);
    // this.state.isEmptyFlag = true;
    // this.setState({ isEmptyFlag: true });
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/userisempty`)
      .then((res) => {
        if (res.data.success) {
          //   this.state.isEmptyFlag = true;
          this.setState({ isEmptyFlag: true });
        } else {
          toast.error("Can't register new admin");
          //   this.state.isEmptyFlag = false;
          this.setState({ isEmptyFlag: false });
        }
      })
      .catch((err) => {
        toast.error(err.response.data.error);
        // this.state.isEmptyFlag = false;
        this.setState({ isEmptyFlag: false });
      });
  }
  handleEmailChange(props) {
    // this.state.email = props.target.value;
    this.setState({ email: props.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    if (this.state.email) {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/api/registernewadmin`, {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          imagePath: this.state.imagePath,
          role: this.state.role,
        })
        .then((res) => {
          this.setState({
            name: "Admin",
            email: "",
            password: "admin",
            imagePath: "",
            role: "admin",
          });
          toast.success(res.data.message);
          window.location = "/login";
        })
        .catch((err) => {
          toast.error(err.response.data.error);
        });
    } else {
      toast.error("please enter email address");
    }
  }
  loadPage() {
    if (this.state.isEmptyFlag === true) {
      return this.LoadForm();
    } else return <Redirect to="/login" />;
  }
  LoadForm() {
    return (
      <form
        className="form-signin text-center col-6  "
        onSubmit={this.handleSubmit}
      >
        <h1 className="h3 mb-3 font-weight-normal card-title">
          Please Choose admin email address
        </h1>
        <label>Password: admin</label>
        <br />
        <label>Change password after login</label>

        <div className="form-label-group">
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Email address"
            required
            onChange={this.handleEmailChange}
            value={this.state.email}
          />
          <label htmlFor="email">Email address</label>
        </div>
        <button className="btn btn-lg btn-success btn-block m-4 " type="submit">
          Register
        </button>
      </form>
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className="justify-content-center  align-items-center align-content-center text-center ">
          {this.loadPage()}
        </div>
      </React.Fragment>
    );
  }
}
