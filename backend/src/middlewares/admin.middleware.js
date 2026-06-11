import AppError from "../errors/app.error.js";

const adminMiddleware = (
  req,
  res,
  next
) => {
  if (req.user.role !== "ADMIN") {
    return next(
      new AppError(
        "관리자 권한이 필요합니다.",
        403
      )
    );
  }

  next();
};

export default adminMiddleware;