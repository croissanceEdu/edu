
const User=require('../models/auth.model')
const ActivationLink=require('../models/activationlink.model')
const expressJwt=require('express-jwt')
const _=require('lodash')
const {OAuth2Client}=require('google-auth-library')
const fetch=require('node-fetch')
const{validationResult}=require('express-validator')
const jwt=require('jsonwebtoken')
//custom error handler
const{errorHandler}=require('../helpers/dbErrorHandling')
//for sending email
// const sgMail=require('@sendgrid/mail')
// sgMail.setApiKey(process.env.MAIL_KEY)


exports.registerController=(req,res)=>{
    const {name,email,password, imagePath,role }=req.body
    const errors=validationResult(req)

    if(!errors.isEmpty()){
        const firstError=errors.array().map(error=>error.msg)[0]
        return res.status(422).json({
            error:firstError
        })
    }else{
        User.findOne({
            email
        }).exec((err,user)=>{
            if(user){
                return res.status(400).json({
                    error:"Email is taken"
                })
            }
        })

        //Generate token
        // const token=jwt.sign(
        //     {name,email,password, imagePath },
        //     process.env.JWT_ACCOUNT_ACTIVATION,
        //     {expiresIn:'15m'}
        // )
        
        // const emailData={
        //     from:process.env.EMAIL_FROM,
        //     to:to,
        //     subject:'Account activation link',
        //     html:`
        //         <h1>Please Click to link to activate</h1>
        //         <p>${process.env.CLIENT_URL}/user/activate/${token}</p>
        //         <hr/>
        //         <p>This email contain sensetive info</p>
        //         <p>${process.env.CLIENT_URL}</p>
        //         `
        // }
        // sgMail.send(emailData).then(sent=>{
        //     return res.json({
        //         message:`Email has been sent to ${email}`
        //     })
        // }).catch(err=>{
        //     return res.status(400).json({
        //         error:errorHandler(err)
        //     })
        // })
        


        //for test
       // console.log(`${process.env.CLIENT_URL}/user/activate/${token}`)
        // res.json({
        //     message:`${process.env.CLIENT_URL}/user/activate/${token}`
        // })

    //    // Should be uncomment
    //     const activationlink = new ActivationLink({
    //         name,email,token:`${process.env.CLIENT_URL}/user/activate/${token}`
    //     })
        
    //     activationlink.save((err,user)=>{
    //        if(err){
    //            return res.status(401).json({
    //                error:errorHandler(err)
    //            })
    //        }else return res.json({
    //            success:true,
    //            message:'Activate soon'
    //        })
    //     })


        //Should be comment
        const user = new User({
            name,email,password, imagePath ,role
        })
        
        user.save((err,user)=>{
           if(err){
               return res.status(401).json({
                   error:errorHandler(err)
               })
           }else return res.json({
               success:true,
               message:'Signup success',
               user         
           })
        })

   


    }
}


exports.activationController=(req,res)=>{
    const{token}=req.body
    if(token){
        jwt.verify(token,process.env.JWT_ACCOUNT_ACTIVATION,
            (err,decoded)=>{
                if(err){
                    return res.status(401).json({
                        error:"Expired"
                    })
                }else{
                    //if valid save to db
                    //get name,email,password from token
                    const{name,email,password}=jwt.decode(token)
                     
                     const user = new User({
                         name,email,password
                     })
                     
                     user.save((err,user)=>{
                        if(err){
                            return res.status(401).json({
                                error:errorHandler(err)
                            })
                        }else return res.json({
                            success:true,
                            message:'Signup success',
                            user
                        })
                     })
            
                }
            })
    }else return res.json({
        success:false,
        message:'Something went wrong'
    })
}




exports.loginController=(req,res)=>{
    const {email,password}=req.body
    const errors=validationResult(req)

    if(!errors.isEmpty()){
        const firstError=errors.array().map(error=>error.msg)[0]
        return res.status(422).json({
            error:firstError
        })
    }else{
        //check exists
        User.findOne({
            email
        }).exec((err,user)=>{
            if(err||!user){
                return res.status(400).json({
                    error:"User doesn't exist, Please sign up"
                })
            }


            //authenticate
            if(!user.authenticate(password)){
                return res.status(400).json({
                    error:'Email and password do not match'
                })
            }
            //for test
            // if(user.password!==password){
            //         return res.status(400).json({
            //             error:'Email and password do not match'
            //         })
            //     }


            //generate token
            const token=jwt.sign(
               { _id:user._id},
               process.env.JWT_SECRET,
               {expiresIn:'7d'}
            )


            const {_id,name,email,role}=user
            return res.json({
                token,
                user:{
                    _id,name,email,role
                }, 
                success:true,
                message:'Signup success'
            })
           





        })

    }
}


exports.changePasswordController=(req,res)=>{
    const {_id,
        currentPassword,
    newPassword}=req.body
    const errors=validationResult(req)

    if(!errors.isEmpty()){
        const firstError=errors.array().map(error=>error.msg)[0]
        return res.status(422).json({
            error:firstError
        })
    }else{
        //check exists
        User.findOne({
            _id
        }).exec((err,user)=>{
            if(err||!user){
                return res.status(400).json({
                    error:"User doesn't exist, Please sign up"
                })
            }


            //authenticate
            if(!user.authenticate(currentPassword)){
                return res.status(400).json({
                    error:"Current password doesn't match"
                })
            }else{
        


            User.updateOne({_id},{hashed_password:user.encriptPassword(newPassword)})
                .then(()=>{return res.json({
                    success:true,
                    message:'Password Changed Successfully',
                    user         
                })})
           
            }


        })

    }
}




//register new admin

exports.registerNewAdminController=(req,res)=>{
    const {name,email,password, imagePath,role }=req.body
    const errors=validationResult(req)

    if(!errors.isEmpty()){
        const firstError=errors.array().map(error=>error.msg)[0]
        return res.status(422).json({
            error:firstError
        })
    }else{
        User.find()
        .exec((err, user) => {
            if (!user) {
                return res.status(400).json({
                    error: "Error"
                })
            } else 
           { if (user.length) {
                return res.status(400).json({
                    error: "Already registered"
                })
            } else{

                User.findOne({
                    email
                }).exec((err,user)=>{
                    if(user){
                        return res.status(400).json({
                            error:"Email is taken"
                        })
                    }
                })
        
                const user = new User({
                    name,email,password, imagePath ,role
                })
                
                user.save((err,user)=>{
                   if(err){
                       return res.status(401).json({
                           error:errorHandler(err)
                       })
                   }else return res.json({
                       success:true,
                       message:'Admin user created, Please login',
                       user         
                   })
                })
        
           
            }}
        })
        


    }
}



//chech is new 

exports.isUserEmptyController=(req,res)=>{
   
    const errors=validationResult(req)

    if(!errors.isEmpty()){
        const firstError=errors.array().map(error=>error.msg)[0]
        return res.status(422).json({
            error:firstError
        })
    }else{
        User.find()
        .exec((err, user) => {
            if (!user) {
                return res.status(400).json({
                    error: "Error"
                })
            } else 
           { if (user.length) {
                return res.status(400).json({
                    error: "Already registered"
                })
            } else{
                return res.json({
                    success:true,
                    message:'Empty',
                    user         
                })
              
        
           
            }}
        })
        


    }
}

