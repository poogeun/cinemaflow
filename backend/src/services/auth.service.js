import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import prisma from "../lib/prisma.js";
import AppError from "../errors/app.error.js";

export const login = async ({
  email,
  password,
}) => {
  const user =
    await prisma.user.findUnique({
      where: {
        email,
      },
    });
  
  if (!user) {
    throw new AppError(
      "이메일 또는 비밀번호가 올바르지 않습니다.",
      401
    );
  }

  const isMatch =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!isMatch) {
    throw new AppError(
      "이메일 또는 비밀번호가 올바르지 않습니다.",
      401
    );
  }

  const accessToken =
    jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn:
          process.env.JWT_EXPIRES_IN,
      }
    );

  return {
    accessToken,
  };
};

export const getMe = async (userId) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  });
};