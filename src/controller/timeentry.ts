import { Request, Response } from "express";
import { TimeEntry } from "../models/TimeEntry";
import { Client } from "../models/Client";
import { User } from "../models/User";

export const addTimeEntry = async (req: Request, res: Response) => {
  const usertime = await User.findById(req.body.userId);
  const clienttime = await Client.findById(req.body.client);
  if (!usertime) {
    return res.status(404).send("User not found");
  }
  if (!clienttime) {
    return res.status(404).send("Client not found");
  }
  const {
    userId,
    client,
    start_time,
    end_time,
    date,
    start_break,
    end_break,
    notes,
  } = req.body;
  try {
    const newTimeEntry = new TimeEntry({
      user:userId,
      client,
      start_time,
      end_time,
      date:new Date(date) ,
      start_break,
      end_break,
      notes,
    });
    if (!clienttime.timeEntry) {
      clienttime.timeEntry = [];
    }
    if (!usertime.timeEntry) {
      usertime.timeEntry = [];
    }
    await newTimeEntry.save();
    clienttime.timeEntry.push(newTimeEntry._id as any);
    usertime.timeEntry.push(newTimeEntry._id as any);
    await clienttime.save();
    await usertime.save();
    return res.status(200).json({message:"Time Entry added successfully"});
  } catch (error) {
    console.error(error);
    return res.status(500).json({message:"Internal Server Error"});
  }
};

export const getTimeEntryByClient = async (req: Request, res: Response) => {
  const clientId = req.params.clientId;
  if (!clientId){
    return res.status(400).send("Client ID is required");
  }
  const name = req.query.name as string;
  const start = req.query.start as string;
  const end = req.query.end as string;

  try {
    const timeEntries = await TimeEntry.find({
      client: clientId,
      clientname : name,
      date: {
        $gte: new Date(start),
        $lte: new Date(end),
      },
    });

    return res.status(200).json(timeEntries);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

