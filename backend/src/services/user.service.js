import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import AppError from "../errors/app.error.js";

export const createUser = async ({ email, password, name }) => {
  if (!email) {
    throw new AppError("이메일은 필수입니다.", 400);
  }
  if(!password) {
    throw new AppError("비밀번호는 필수입니다.", 400);
  }
  if (!name) {
    throw new AppError("이름은 필수입니다.", 400);
  }

  const existngUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existngUser) {
    throw new AppError("이미 사용 중인 이메일 입니다.", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
    },
  });
};