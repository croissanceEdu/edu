import FeedbackBanner from "../banners/feedback.banner";
import JoinClassBanner from "../banners/join-class.banner";
import ProfileBanner from "../banners/profile.banner";
import SyllabusBanner from "../banners/syllabus.banner";
import WelcomeBanner from "../banners/welcome.banner";

const TeacherHomeSection = (props) => {
  return (
    <section className="home-section">
      <div className="navbar-spacer"></div>
      <div className="home-main-block">
        <WelcomeBanner
          homeContent={props.homeContent}
          userDetails={props.userDetails}
        />
        <div className="banners-block  container">
          <SyllabusBanner
            homeContent={props.homeContent}
            handleSyllabusBannerClick={props.handleSyllabusBannerClick}
            notifications={props.notifications.syllabus}
          />
          <FeedbackBanner
            homeContent={props.homeContent}
            handleFeedbackBannerClick={props.handleFeedbackBannerClick}
            notifications={props.notifications.feedback}
          />
          <JoinClassBanner
            homeContent={props.homeContent}
            handleJoinClassBannerClick={props.handleJoinClassBannerClick}
          />
          <ProfileBanner
            homeContent={props.homeContent}
            handleProfileBannerClick={props.handleProfileBannerClick}
            userDetails={props.userDetails}
            profilePicture={props.profilePicture}
          />
        </div>
      </div>
      <div className="home-profile-block"></div>
    </section>
  );
};

export default TeacherHomeSection;
