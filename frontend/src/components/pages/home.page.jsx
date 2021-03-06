import { Redirect } from "react-router-dom";

import StudentHomeSection from "../sections/student-home.section";
import { useEffect } from "react";
import TeacherHomeSection from "../sections/teacher-home.section";
import AdminHomeSection from "../sections/admin-home.section";
import { getHomeContent } from "../../helpers/content-api";

const HomePage = (props) => {
  useEffect(() => {
    props.setselectedPage("homePage");
  }, [props]);
  const handleSyllabusBannerClick = () => {
    window.location = props.urlPathContent.syllabusPage;
  };
  const handleFeedbackBannerClick = () => {
    window.location = props.urlPathContent.feedbackPage;
  };
  const handleJoinClassBannerClick = () => {
    window.location = props.urlPathContent.joinClassPage;
  };
  const handleProfileBannerClick = () => {
    window.location = props.urlPathContent.profilePage;
  };
  const handleManageBannerClick = () => {
    window.location = props.urlPathContent.managePage;
  };
  const handleActivateAccountBannerClick = () => {
    window.location = props.urlPathContent.activateAccountPage;
  };

  if (props.userDetails) {
    switch (props.userDetails.role) {
      case "student":
        return (
          <StudentHomeSection
            homeContent={getHomeContent(props.language)}
            userDetails={props.userDetails}
            handleSyllabusBannerClick={handleSyllabusBannerClick}
            handleFeedbackBannerClick={handleFeedbackBannerClick}
            handleJoinClassBannerClick={handleJoinClassBannerClick}
            handleProfileBannerClick={handleProfileBannerClick}
            notifications={props.notifications}
            profilePicture={props.profilePicture}
          />
        );
      case "teacher":
        return (
          <TeacherHomeSection
            homeContent={getHomeContent(props.language)}
            userDetails={props.userDetails}
            handleSyllabusBannerClick={handleSyllabusBannerClick}
            handleFeedbackBannerClick={handleFeedbackBannerClick}
            handleJoinClassBannerClick={handleJoinClassBannerClick}
            handleProfileBannerClick={handleProfileBannerClick}
            notifications={props.notifications}
            profilePicture={props.profilePicture}
          />
        );
      case "admin":
        return (
          <AdminHomeSection
            homeContent={getHomeContent(props.language)}
            userDetails={props.userDetails}
            handleSyllabusBannerClick={handleSyllabusBannerClick}
            handleProfileBannerClick={handleProfileBannerClick}
            handleManageBannerClick={handleManageBannerClick}
            handleActivateAccountBannerClick={handleActivateAccountBannerClick}
            notifications={props.notifications}
            profilePicture={props.profilePicture}
          />
        );
      default:
        return <Redirect to={props.urlPathContent.loginPage} />;
    }
  } else return <Redirect to={props.urlPathContent.loginPage} />;
};

export default HomePage;
