import { prisma } from "../../lib/prisma";
import { Logindata } from "./auth.interface";
import brypt from "bcrypt"


// ---------login service
const loginUser = async (payload: Logindata) => {
  const { email, password } = payload;

  const user = await prisma.user.findUniqueOrThrow({
    where: {email}
  })

  


  const isPasswordMatchaed = await brypt.compare(password, user.password)

  if(!isPasswordMatchaed){
    throw new Error("invalid credantial")
  }

  return user

};

export const authService = { loginUser };
