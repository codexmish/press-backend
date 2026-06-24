import config from "../../config";
import { prisma } from "../../lib/prisma";
import { jwtUtils } from "../../utils/jwt";
import { Logindata } from "./auth.interface";
import brypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";

// ---------login service
const loginUser = async (payload: Logindata) => {
  const { email, password } = payload;

  const user = await prisma.user.findUniqueOrThrow({
    where: { email },
  });

  const isPasswordMatchaed = await brypt.compare(password, user.password);

  if (!isPasswordMatchaed) {
    throw new Error("invalid credantial");
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret!,
    { expiresIn: config.jwt_access_expires_in } as SignOptions,
  );

  const refreshToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_refresh_secret!,
    { expiresIn: config.jwt_refresh_expires_in } as SignOptions,
  );

  return { accessToken, refreshToken };
};

export const authService = { loginUser };
