import clientPromise from "@/utils/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { email, username, password } = await req.json();

    if (!email || !username || !password) {
      return NextResponse.json({ message: "Faltan datos" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("InversiatiDB");
    const users = db.collection("Users");

    const userExists = await users.findOne({ email });
    if (userExists) {
      return NextResponse.json({ message: "El usuario ya existe con ese correo electronico" }, { status: 409 });
    }

    // Hashear la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = {
      email,
      username,
      password: hashedPassword,
      date: new Date().toISOString(),
    };

    const result = await users.insertOne(newUser);

    return NextResponse.json({
      message: "Registro exitoso",
      user: { id: result.insertedId.toString(), email, username, date: newUser.date },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error en servidor" }, { status: 500 });
  }
}
