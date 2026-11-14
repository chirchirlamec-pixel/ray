import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(
  req: Request
) {

  const body =
    await req.json();

  const exists =
    await prisma.user.findUnique({
      where:{
        email:body.email
      }
    });

  if(exists){

    return Response.json(
      {
        error:"User already exists"
      },
      {
        status:400
      }
    );
  }

  const password =
    await bcrypt.hash(
      body.password,
      10
    );

  const user =
    await prisma.user.create({
      data:{
        email:body.email,
        password,
        name:body.name
      }
    });

  return Response.json(user);
}
