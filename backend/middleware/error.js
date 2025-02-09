const ErrorHandler = require('../utils/errorhandler')


module.exports = (err ,req,res, next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

// wrong mongodb id error
if (err.name === "CastError"){
    const message = `resource not found . invalid: ${err.path}`;
    err = new ErrorHandler(message , 400)
}



  // Wrong Mongodb Id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  


// mongo duplicate error
if(err.code == 11000){
    const message = `duplicate ${Object.keys(err.keyValue)} entered`
    err = new ErrorHandler(message , 400)

}


// Wrong JWT error
if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again `;
    err = new ErrorHandler(message, 400);
  }

  // JWT EXPIRE error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try again `;
    err = new ErrorHandler(message, 400);
  }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    })
}



