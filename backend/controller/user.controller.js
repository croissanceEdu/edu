const User = require("../models/auth.model");
const ActivationLink = require("../models/activationlink.model");
const expressJwt = require("express-jwt");
const _ = require("lodash");
const { OAuth2Client } = require("google-auth-library");
const fetch = require("node-fetch");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
//custom error handler
const { errorHandler } = require("../helpers/dbErrorHandling");
const { Mongoose,Types } = require("mongoose");
const ObjectId = Types.ObjectId
const StudentMap = require('../models/studentmap.model')


exports.classLinkController = (req, res) => {
  const { id,role } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      error: firstError,
    });
  } else {
     if(role==="student") {
    StudentMap.aggregate([
        {$match:{
            studentID:ObjectId( id)
        }},
      {
        $lookup: {
          from: "users",
          localField: "teacherID",
          foreignField: "_id",
          as: "user",
        },
      },

      { $unwind: "$user" },

      {
        $project: {
          _id: 1,
          name:"$user.name",
          classLink:1
        },
    }
    
    ]).exec((err, studentmap) => {
      if (!studentmap) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      } else
        res.json({
          success: true,
          message: "Done",
          classlinks: studentmap,
        });
    });
}else if(role==="teacher") {
    StudentMap.aggregate([
        {$match:{
            teacherID:ObjectId( id)
        }},
      {
        $lookup: {
          from: "users",
          localField: "studentID",
          foreignField: "_id",
          as: "user",
        },
      },

      { $unwind: "$user" },

      {
        $project: {
          _id: 1,
          name:"$user.name",
          classLink:1
        },
    }
    
    ])
    .exec((err, studentmap) => {
      if (!studentmap) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      } else
        res.json({
          success: true,
          message: "Done",
          classlinks: studentmap,
        });
    });
}
  }
};

exports.getUsersController = (req, res) => {
  const { _id, role } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      error: firstError,
    });
  } else {
    User.find({
      role,
    }).exec((err, user) => {
      if (!user) {
        return res.status(400).json({
          error:  errorHandler(err),
        });
      } else {
        const userOptions = [];
        user.map((user) => {
          userOptions.push({ value: user._id, label: user.name });
        });
        res.json({
          success: true,
          message: "Done",
          user,
          userOptions,
        });
      }
    });
  }
};

exports.getUsersByIdController = (req, res) => {
  const { _id, role } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      error: firstError,
    });
  } else {
if(role==="teacher"){
    User.aggregate([
        {$match:{
            _id:ObjectId( _id)
        }},
      {
        $lookup: {
          from: "studentmaps",
          localField: "_id",
          foreignField: "teacherID",
          as: "studentmap",
        },
      },

      { $unwind: "$studentmap" },

      {
        $project: {
          _id: "$studentmap.studentID",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "student",
        },
      },
      { $unwind: "$student" },
      {
        $project: {
          _id: "$student._id",
          name: "$student.name",
          role: "$student.role",
        },
      },
      
    ])
     
      .exec((err, user) => {
        if (!user) {
          return res.status(400).json({
            error:  errorHandler(err),
          });
        } else {
          const userOptions = [];
          user.map((user) => {
            userOptions.push({ value: user._id, label: user.name });
          });
          res.json({
            success: true,
            message: "Done",
            user,
            userOptions,
          });
        }
      });
    }else if(role==="student"){
        User.aggregate([
            {$match:{
                _id:ObjectId( _id)
            }},
          {
            $lookup: {
              from: "studentmaps",
              localField: "_id",
              foreignField: "studentID",
              as: "studentmap",
            },
          },
    
          { $unwind: "$studentmap" },
    
          {
            $project: {
              _id: "$studentmap.teacherID",
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "_id",
              foreignField: "_id",
              as: "teacher",
            },
          },
          { $unwind: "$teacher" },
          {
            $project: {
              _id: "$teacher._id",
              name: "$teacher.name",
              role: "$teacher.role",
            },
          },
          
        ])
         
          .exec((err, user) => {
            if (!user) {
              return res.status(400).json({
                error:  errorHandler(err),
              });
            } else {
              const userOptions = [];
              user.map((user) => {
                userOptions.push({ value: user._id, label: user.name });
              });
              res.json({
                success: true,
                message: "Done",
                user,
                userOptions,
              });
            }
          });
        }else if(role==="admin"){
          User.aggregate([
              
            {
              $lookup: {
                from: "studentmaps",
                localField: "_id",
                foreignField: "teacherID",
                as: "studentmap",
              },
            },
      
            { $unwind: "$studentmap" },
      
            {
              $project: {
                _id: "$studentmap._id",
                studentID: "$studentmap.studentID",
                teacherID: "$studentmap.teacherID",
                teacherName:"$name"
              },
            },
            {
              $lookup: {
                from: "users",
                localField: "studentID",
                foreignField: "_id",
                as: "student",
              },
            },
            { $unwind: "$student" },
            {
              $project: {
               _id:1,
                studentID: 1,
                teacherID: 1,
                studentName: "$student.name",
                teacherName:1,
                
              },
            },
            
          ])
           
            .exec((err, user) => {
              if (!user) {
                return res.status(400).json({
                  error:  errorHandler(err),
                });
              } else {
                const userOptions = [];
                user.map((user) => {
                  userOptions.push({ value: user._id, label: user.studentName+"-"+user.teacherName, studentID:user.studentID, teacherID:user.teacherID  });
                });
                res.json({
                  success: true,
                  message: "Done",
                  user,
                  userOptions,
                });
              }
            });
          }
  }
};