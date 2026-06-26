import config from "../../config";
import { prisma } from "../../lib/prisma";
import { jwtUtils } from "../../utils/jwt";
import { Logindata } from "./auth.interface";
import brypt from "bcrypt";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

// ---------login service
const loginUser = async (payload: Logindata) => {
  const { email, password } = payload;

  //   -----checking if user exist
  const user = await prisma.user.findUniqueOrThrow({
    where: { email },
  });

  //   ----password vallidation
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

  //   acc token generate
  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret!,
    { expiresIn: config.jwt_access_expires_in } as SignOptions,
  );

  //   ref token generate
  const refreshToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_refresh_secret!,
    { expiresIn: config.jwt_refresh_expires_in } as SignOptions,
  );

  return { accessToken, refreshToken };
};

// ---------refresh token service
const refreshToken = async (ref_tkn: string) => {
  const verifiedToken = jwtUtils.verifiyToken(
    ref_tkn,
    config.jwt_refresh_secret as string,
  );

  if (!verifiedToken.success) {
    throw new Error(verifiedToken.error);
  }

  const { id } = verifiedToken.data as JwtPayload;

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });

  if (user.activeStatus === "DEACTIVE") {
    throw new Error("user id not active");
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const acc_tkn = jwtUtils.createToken(jwtPayload, config.jwt_access_secret!, {
    expiresIn: config.jwt_access_expires_in,
  } as SignOptions);

  return { acc_tkn };
};

export const authService = { loginUser, refreshToken };
