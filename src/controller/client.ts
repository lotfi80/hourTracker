import { Request, Response } from "express";
import { User } from "../models/User";
import { Client } from "../models/Client";

export const addClient = async (req: Request, res: Response) => {
  // const { name } = req.body;

  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(404).json("User not found");
    }

    const newClient = new Client({
      ...req.body,
      user: req.params.id,
    });

    await newClient.save();

    if (!user.clients) {
      user.clients = [];
    }

    user.clients.push(newClient._id as any);
    await user.save();

    return res
      .status(200)
      .json({ message: "Client added successfully", name: newClient.name });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

export const getClient = async (req: Request, res: Response) => {
  const userId = req.params.userid;

  if (!userId) {
    return res.status(400).send("User ID is required");
  }

  try {
    const user = await User.findById(userId).populate("clients");

    if (!user) {
      return res.status(404).send("User not found");
    }

    return res.status(200).json(user.clients);
  } catch (error) {
    console.error("Error fetching user clients:", error);
    return res.status(500).send("Internal Server Error");
  }
};
