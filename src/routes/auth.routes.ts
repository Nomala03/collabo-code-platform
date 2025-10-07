import { Router, Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { register, login } from "../controllers/auth.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = Router();

// Define valid roles
const validRoles = ["REVIEWER", "SUBMITTER", "ADMIN"];

router.post(
  "/register",
  [
    body("email")
      .isEmail()
      .withMessage("Please provide a valid email address."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
    body("name")
      .notEmpty()
      .withMessage("Name is required."),
    body("role")
      .notEmpty()
      .withMessage("Role is required.")
      .isIn(validRoles)
      .withMessage(`Role must be one of: ${validRoles.join(", ")}`),
  ],
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next(); // proceed to controller
  },
  register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email format."),
    body("password").notEmpty().withMessage("Password is required."),
  ],
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  login
);

router.get("/me", authenticateToken, (req: any, res: Response) => {
  res.json({ user: req.user });
});

export default router;

