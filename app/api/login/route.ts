import clientPromise from "@/utils/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Faltan datos" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("InversiatiDB");
    const users = db.collection("Users");

    const user = await users.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Credenciales inválidas" }, { status: 401 });
    }

    // Comparar password con bcrypt
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return NextResponse.json({ message: "Credenciales inválidas" }, { status: 401 });
    }

    const { _id, username, email: userEmail, date } = user;

    return NextResponse.json({
      message: "Login exitoso",
      user: { id: _id.toString(), username, email: userEmail, date },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error en servidor" }, { status: 500 });
  }
}
