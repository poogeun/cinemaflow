import jwt from "jsonwebtoken";

import AppError from "../errors/app.error.js";

const authMiddleware = (
  req,
  res,
  next
) => {
  try {
    const authHeader =
      req.headers.authorization;

    if (!authHeader) {
      throw new AppError(
        "인증이 필요합니다.",
        401
      );
    }

    const token =
      authHeader.replace(
        "Bearer ",
        ""
      );

    const payload =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    req.user = payload;

    next();
  } catch (error) {
    next(
      new AppError(
        "유효하지 않은 토큰입니다.",
        401
      )
    );
  }
};

export default authMiddleware;