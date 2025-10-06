import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationChain, ValidationError } from "express-validator";

const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Run each validation in parallel
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map((err: ValidationError) => ({
          field: err,
          message: err.msg,
        })),
      });
    }

    next();
  };
};

export default validate;

