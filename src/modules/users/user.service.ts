import config from "../../config";
import { prisma } from "../../lib/prisma";
import { Register } from "./user.interface";
import bcrypt from "bcrypt";

// -------register
const registerServices = async (payload: Register) => {
  const { name, email, password, profilePhoto } = payload;

  const isUserExist = await prisma.user.findUnique({
    where: { email },
  });

  if (isUserExist) {
    throw new Error("user alredy exist");
  }

  const hasherdPass = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );

  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hasherdPass,
      profile: {
        create: {
          profilePhoto,
        },
      },
    },
  });

  // const profile = await prisma.profile.create({
  //   data: {
  //     userId: createdUser.id,
  //     profilePhoto,
  //   },
  // });

  const user = await prisma.user.findUnique({
    where: {
      id: createdUser.id,
      email: createdUser.email || email,
    },
    omit: {
      password: true,
    },
    include: {
      profile: true,
    },
  });

  return user;
};

export const userServices = { registerServices };
