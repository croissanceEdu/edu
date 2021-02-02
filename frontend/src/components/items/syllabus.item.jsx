import React from "react";
import { isAuth } from "../../helpers/auth";

const SyllabusItem = (props) => {
  return (
    <React.Fragment>
      <tr>
        <td>{props.i}</td>
        <td>{props.syllabus.chapterName}</td>
        <td>{props.syllabus.moduleName}</td>

        <td>
          <input
            type="checkbox"
            name="teacherComplete"
            id="teacherComplete"
            checked={props.syllabus.teacherComplete}
            value={props.syllabus.teacherComplete}
            readOnly
          />
        </td>
        <td>
          <input
            className=" "
            type="checkbox"
            name="studentComplete"
            id="studentComplete"
            checked={props.syllabus.studentComplete}
            value={props.syllabus.studentComplete}
            readOnly
          />
        </td>
        <td>
          {isAuth().role === "student" ? (
            props.syllabus.studentComplete ? null : (
              <a
                className="btn btn-info"
                onClick={() => {
                  props.completeSyllabus(props.syllabus._id);
                }}
              >
                Complete
              </a>
            )
          ) : isAuth().role === "teacher" ? (
            props.syllabus.teacherComplete ? null : (
              <a
                className="btn btn-info"
                onClick={() => {
                  props.completeSyllabus(props.syllabus._id);
                }}
              >
                Complete
              </a>
            )
          ) : null}
        </td>
      </tr>
    </React.Fragment>
  );

  if (isAuth().role === "student") {
    return (
      <React.Fragment>
        <tr>
          <td>{props.syllabus.chapterName}</td>
          <td>{props.syllabus.moduleName}</td>
          <td>
            {props.syllabus.studentComplete ? (
              <p
                className={
                  props.syllabus.teacherComplete
                    ? "text-secondary"
                    : "text-black"
                }
              >
                Completed
              </p>
            ) : (
              <a
                className={
                  props.syllabus.teacherComplete
                    ? "btn btn-success"
                    : "btn btn-info"
                }
                onClick={() => {
                  props.completeSyllabus(props.syllabus._id);
                }}
              >
                Complete
              </a>
            )}
          </td>
        </tr>
      </React.Fragment>
    );
  } else if (isAuth().role === "teacher") {
    return (
      <React.Fragment>
        <tr>
          <td>{props.syllabus.chapterName}</td>
          <td>{props.syllabus.moduleName}</td>
          {/* <td>
            {props.syllabus.studentMessage}

            <input
              type="text"
              className="text-dark rounded-5"
              name="teacherMessage"
              id="teacherMessage"
              aria-describedby="helpId"
              placeholder="your Message"
            />
          </td> */}
          <td>
            {props.syllabus.teacherComplete ? (
              <p
                className={
                  props.syllabus.studentComplete
                    ? "text-secondary"
                    : "text-black"
                }
              >
                Completed
              </p>
            ) : (
              <a
                className={
                  props.syllabus.studentComplete
                    ? "btn btn-success"
                    : "btn btn-info"
                }
                onClick={() => {
                  props.completeSyllabus(props.syllabus._id);
                }}
              >
                Complete
              </a>
            )}
          </td>
        </tr>
      </React.Fragment>
    );
  } else
    return (
      <tr>
        <td>details not availabe</td>
        {/* <td>--</td> */}
        <td>--</td>
        <td>--</td>
      </tr>
    );
};

export default SyllabusItem;
