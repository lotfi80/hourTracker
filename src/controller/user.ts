import { Request, Response } from "express";
import { User } from "../models/User";
import { issueJwt, verifyJwt } from "../libs/jwt";
import { createHash } from "crypto";
import bcrypt from "bcrypt";

export const register = async (req: Request, res: Response) => {
  const { username, firstname, lastname, email, password } = req.body;

  try {
    const existUser = await User.findOne({ username: username });
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Passwort hashen
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Neuen Benutzer erstellen
    const newUser = new User({
      username,
      firstname,
      lastname,
      email,
      hash: hashedPassword,
    });
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  // const sha256 = createHash("sha256");
  // const hash = sha256.update(password).digest("hex");
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("User not found");
    }
    const validatePassword = await bcrypt.compare(password, user.hash);
    if (!validatePassword) {
      throw new Error("invalid password");
    }
    const token = issueJwt(user);
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 3600000,
    });

    const test = verifyJwt(token);
    console.log(token);
    return res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.query;
  const user = await User.findOne({
    _id: id,
  });
  if (!user) {
    return res.status(404).send("User not found");
  }
  return res.status(200).send(user);
};
