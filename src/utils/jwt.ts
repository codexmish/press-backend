import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const createToken = (
  payload: JwtPayload,
  secret: string,
  expiresIn: SignOptions,
) => {
  const token = jwt.sign(payload, secret, expiresIn);
  return token;
};

const verifiyToken = (token: string, secret: string) => {
  try {
    const verifiedToken = jwt.verify(token, secret);
    return {
      success: true,
      data: verifiedToken
    };
  } catch (error: any) {
    console.log("token verification failed");
    return{
      success: false,
      error: error.message
    }
  }
};

export const jwtUtils = { createToken, verifiyToken };
