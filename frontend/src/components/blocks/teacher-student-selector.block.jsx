import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import TeacherStudentSelectorItem from "../items/teacher-student-selector.item";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const TeacherStudentSelectorBlock = (props, ref) => {
  const [userOptions, setUserOptions] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [selectorTitle, setSelectorTitle] = useState("");
  const [visibilityclass, setVisibilityclass] = useState("");

  const handleUserSelect = (user) => {
    if (visibilityclass === "") {
      setVisibilityclass("collapse-block");
      if (selectedUser !== user) {
        setSelectedUser(user);
        props.handleUserSelect(user.teacher, user.student);
      }
    }
  };
  const handleSelectorClick = (user) => {
    if (visibilityclass === "collapse-block") setVisibilityclass("");
  };
  const loadUsers = (role, _id) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/user/getbyid`, {
        _id,
        role,
      })
      .then((response) => {
        setUserOptions(response.data.user);
      })
      .catch((error) => {
        toast(error);
      });
    switch (role) {
      case "admin":
        setSelectorTitle("--Select Teacher-Student--");
        break;
      case "teacher":
        setSelectorTitle("--Select Student--");
        break;
      case "student":
        setSelectorTitle("--SelectTeacher--");
        break;

      default:
        setSelectorTitle("--Select User--");
        break;
    }
  };
  const bindUsers = () => {
    if (!userOptions.length) return <p className="empty-p">Empty</p>;
    return userOptions.map((item) => {
      let itemClassName = "non-selected";
      if (selectedUser._id === item._id) {
        itemClassName = "selected-user";
      }
      return (
        <TeacherStudentSelectorItem
          key={uuidv4()}
          user={item}
          handleUserSelect={handleUserSelect}
          itemClassName={itemClassName}
        />
      );
    });
  };
  useEffect(() => {
    if (props.autoLoad) loadUsers(props.myRole, props.myId);
  }, [props.autoLoad, props.myRole, props.myId]);

  return (
    <div className={`user-selector-block ${visibilityclass}`}>
      <h5>{selectorTitle}</h5>
      <ul onClick={handleSelectorClick}>
        {bindUsers()}{" "}
        <ArrowDropDownIcon
          style={{ color: "#fff" }}
          className="dropdown-icon"
        />
      </ul>
    </div>
  );
};

export default TeacherStudentSelectorBlock;
