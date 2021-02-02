import React, { Component } from "react";
import "../css/croissance-edu.css";
class HomeComponent extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <section className="engine">
          <a rel="external" href="#"></a>
        </section>
        <section
          className="mbr-section mbr-parallax-background mbr-after-navbar"
          id="content5-2w"
        >
          <div id="content-crois-1" className="mbr-overlay"></div>

          <div className="container">
            <h3 className="mbr-section-title display-2">CROISSANCE EDU</h3>
            <div className="lead">
              <p>
                <strong>Welcoming your Kid to the world of Programming</strong>
              </p>
            </div>
          </div>
        </section>

        <section className="mbr-section" id="msg-box5-2y">
          <div className="container">
            <div className="row">
              <div className="mbr-table-md-up">
                <div className="mbr-table-cell col-md-5 text-xs-center text-md-right content-size">
                  <h3 className="mbr-section-title display-2">
                    Our Aim is to Uncover the Developer in your Kid
                  </h3>
                </div>

                <div
                  className="mbr-table-cell mbr-left-padding-md-up mbr-valign-top col-md-7 image-size"
                  id="content-crois-2"
                >
                  <div className="mbr-figure">
                    <img src="../assets/images/12.jpg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="mbr-section mbr-section__container article"
          id="header3-2z"
        >
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <h3 className="mbr-section-title display-2">
                  About Croissance EDU
                </h3>
              </div>
            </div>
          </div>
        </section>

        <section
          className="mbr-section article mbr-section__container"
          id="content6-2c"
        >
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-6 lead">
                <h4 className="class-crois-1">Who We Are</h4>
                <p className="lineh">
                  Croissance is an IT based company for years who has its root
                  in India and branches in UK and US is now expanding its
                  services to education field. In every home kids are spending
                  around 3 hours average in front of computer or mobile phone,
                  so why can’t we make that time beneficial.
                </p>
                <h4 className="class-crois-1">What We Do</h4>
                <p className="lineh">
                  We Croissance look to introduce your children to the world of
                  coding according to their skill and preference. Croissance do
                  not give any fake promises as that we will make your children
                  to make rockets or anything like that, what we assure you that
                  by completing any of our course they will be having a
                  sufficient knowledge in the coding languages from the scratch,
                  even about the pre-requisites which they need to do in a
                  computer to start development in preferred language and then
                  will increase the proficiency of the Kid’s coding language.{" "}
                </p>
                <li>Creating resources in R.java</li>
                <li>Layouts, Activity Life cycle.</li>
                <li>
                  Calling one Activity from one another activity using indents.
                </li>
                <li>Toasts,Messageboxes etc</li>
              </div>
              <div className="col-xs-12 col-md-6 lead">
                <h4 className="class-crois-1">How We Do</h4>
                <p className="lineh">
                  We Croissance are not ready with any detailed syllabus of any
                  language since each kid’s syllabus will be created only after
                  a one to one interaction with them. Most of our tutors are
                  developers who are currently working in IT industry so our
                  classNamees will more concentrated in practical side more that
                  theory. Students will be doing their coding by their own, not
                  simply retyping any domo work which we can get from internet.
                </p>
                <p>
                  As a parent you will be thinking that is it a need for my kid
                  to start coding at his early age, but what Croissance doing is
                  that to stimulate their thinking ability, solving simple
                  logics, which helps you kid on their academic level also.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mbr-section mbr-section__container" id="image2-4d">
          <div
            className="p-0"
            //style="padding:0px 0;"
          >
            <div id="thumbnail-slider">
              <div className="inner">
                <ul>
                  <li>
                    <a className="thumb" href="../assets/images/23.jpg">
                      bnb
                    </a>
                  </li>

                  <li>
                    <a className="thumb" href="../assets/images/PHP.jpg"></a>
                  </li>

                  <li>
                    <a className="thumb" href="../assets/images/34.jpg"></a>
                  </li>
                  <li>
                    <a className="thumb" href="../assets/images/dotnet.jpg"></a>
                  </li>
                  <li>
                    <a className="thumb" href="../assets/images/45.jpg"></a>
                  </li>
                  <li>
                    <a className="thumb" href="../assets/images/Java.jpg"></a>
                  </li>
                  <li>
                    <a className="thumb" href="../assets/images/67.jpg"></a>
                  </li>
                  <li>
                    <a className="thumb" href="../assets/images/Python.jpg"></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* <script src="../assets/web/assets/jquery/jquery.min.js"></script>
        <script src="../assets/tether/tether.min.js"></script>
        <script src="../assets/bootstrap/js/bootstrap.min.js"></script>
        <script src="../assets/smooth-scroll/SmoothScroll.js"></script>
        <script src="../assets/viewportChecker/jquery.viewportchecker.js"></script>
        <script src="../assets/jarallax/jarallax.js"></script>
        <script src="../assets/dropdown/js/script.min.js"></script>
        <script src="../assets/touchSwipe/jquery.touchSwipe.min.js"></script>
        <script src="../assets/theme/js/script.js"></script> */}

        <input name="animation" type="hidden" />
      </React.Fragment>
    );
  }
}

export default HomeComponent;
