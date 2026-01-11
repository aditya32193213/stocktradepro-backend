import { validationResult } from "express-validator";

/**
 * -----------------------------------------------------
 * Validation Middleware
 * -----------------------------------------------------
 * Checks express-validator results and returns errors
 * if validation fails. This DRY approach eliminates
 * repetitive validation checking in controllers.
 * 
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "error",
      errors: errors.array().map(err => ({
      field: err.param,
      message: err.msg
    }))
    });
  }
  
  next();
};

export default validate;


