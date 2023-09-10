const errorHandler = (err, req, res, next) => {
  let status = 500
  let message = "Internal Server Error"
  console.log(err.name, "dari errorHandler");
  switch (err.name) {
    case "SequelizeValidationError":
      const nameErr = err.errors.map(el => {
        return el.message
      });
      status = 400;
      message = nameErr
      break
    case "error":
      status = 503
      message = 'error'
      break
    case "notFound":
      status = 404
      message = "error Not Found"
      break
    case "email can't be empty":
      status = 400
      message = "email can't be empty"
      break
    case "Password can't be empty":
      status = 400
      message = "Password can't be empty"
      break
    case "Invalid Login":
      status = 401
      message = 'Unauthorized'
      break
    case "SequelizeUniqueConstraintError":
      const UniqueErr = err.errors.map(el => {
          return el.message
        })
      status = 400
      message = UniqueErr
      break
    case "Forbidden":
      status = 403;
      message = `You aren't allow access this point`;
      break;
    case "Unauthenticated":
      status = 401;
      message = "user not found"
      break
    case "data already exist":
      status = 409;
      message = "data already exist"
      break
    default: break
    
  }
  res.status(status).json({
    errors: message
  })
}
module.exports = errorHandler