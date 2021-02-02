// import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import { authenticate, isAuth } from "../../helpers/auth";
// import axios from "axios";
// import { Redirect } from "react-router-dom";
// import jwt from "jsonwebtoken";
// const Activate = () => {
//   //   const [formData, setFormData] = useState({
//   //     name: "",
//   //     token: "",
//   //     show: true,
//   //   });
//   //   useEffect(() => {
//   //     let token = match.params.token;
//   //     let name = jwt.decode(token);
//   //     if (token) {
//   //       setFormData({ ...formData, name, token });
//   //     }
//   //   }, []);

//   const handleSuccess = (e) => {
//     e.preventDefault();
//     axios
//       .post(`http://localhost:4000/api/activate`, {
//         token,
//       })
//       .then((res) => {
//         setFormData({ ...formData, show: false });
//         toast.success(res.data.message);
//       })
//       .catch((err) => {
//         toast.error(err.response.data.error);
//       });
//   };
//   return (
//     <div>
//       <form onSubmit="handleSuccess"></form>
//       <a type="submit" className="btn btn-primary">
//         Activate
//       </a>
//     </div>
//   );
// };

// export default Activate;

import React, { Component } from "react";
const Activate = () => {
  return <div>Activate</div>;
};

export default Activate;
