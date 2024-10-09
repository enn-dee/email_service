import { Application, Request, Response } from "express";
import { EndUser } from "./src/services/EnduserEmail";
import { Organizer } from "./src/services/OrganizerEmail"; 
import "dotenv/config";
const express = require('express');
const app: Application = express();
const port: number = 3000;

app.use(express.json());

interface RegistrationDetails {
    name: string;
    email: string;
    type: string;
    title: string;
    masjid: string;
    date: string;
    time: string;
    location: string;
    downloadUrl?: string; 
    portalUrl?: string;
}

app.post("/register", async (req: Request, res: Response) => {
    const { name, email, type, details } = req.body;

    const registrationDetails: RegistrationDetails = {
        name,
        email,
        type,
        title: details.eventName || details.serviceName || details.programName,
        masjid: details.masjid,
        date: details.date,
        time: details.time,
        location: details.location,
        downloadUrl: details.downloadUrl,  
        portalUrl: details.portalUrl
    };

    try {
        switch (type) {
            case "event":
                await EndUser.createEvent(registrationDetails);
                break;
            case "service":
                await EndUser.createService(registrationDetails);
                break;
            case "program":
                await EndUser.createProgram(registrationDetails);
                break;
            default:
                throw new Error("Invalid registration type.");
        }

        res.status(200).json({ message: `Registration successful for ${type}`, type });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to process registration." });
    }
});

app.post("/notify/creation", async (req: Request, res: Response) => {
    const { organizerName, organizerEmail, type, details } = req.body;

    console.log("Organizer Creation Request Body:", req.body);

    const organizerDetails = {
        organizerName,
        organizerEmail,
        title: details.eventName || details.serviceName || details.programName,
        masjid: details.masjid,
        date: details.date,
        time: details.time,
        location: details.location
    };

    console.log("Organizer Details:", organizerDetails);

    try {
        switch (type) {
            case "event":
                await Organizer.notifyEventCreation(organizerDetails);
                break;
            case "service":
                await Organizer.notifyServiceCreation(organizerDetails);
                break;
            case "program":
                await Organizer.notifyProgramCreation(organizerDetails);
                break;
            default:
                throw new Error("Invalid notification type.");
        }

        res.status(200).json({ message: `Organizer notified of ${type} creation.`, type });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to notify organizer." });
    }
});


app.post("/notify/cancelation", async (req: Request, res: Response) => {
    const { organizerName, organizerEmail, type, details } = req.body;

    const organizerDetails = {
        organizerName,
        organizerEmail,
        title: details.eventName || details.serviceName || details.programName,
        masjid: details.masjid,
        date: details.date,
        time: details.time,
        location: details.location
    };

    try {
        switch (type) {
            case "event":
                await Organizer.notifyEventCancellation(organizerDetails);
                break;
            case "service":
                await Organizer.notifyServiceCancellation(organizerDetails);
                break;
            case "program":
                await Organizer.notifyProgramCancellation(organizerDetails);
                break;
            default:
                throw new Error("Invalid notification type.");
        }

        res.status(200).json({ message: `Organizer notified of ${type} cancellation.`, type });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to notify organizer." });
    }
});

app.get("/", async (req: Request, res: Response) => {
    try {
        res.send("Event creation and email sending initiated successfully.");
    } catch (err) {
        console.error(`Error in route handler: ${err}`);
        res.status(500).send("Failed to create event and send email.");
    }
});

app.listen(port, () => console.log(`Server is running  127.0.0.1:${port}`));



// routing based

/*



app.post("/register", async (req: Request, res: Response) => {
    const { name, email, type, details } = req.body;

    try {
        // Determine which registration type to process
        switch (type) {
            case "event":
                await EndUser.createEvent(name, details.eventName, details.masjid, details.date, details.time, details.location);
                break;
            case "service":
                await EndUser.createService(name, details.serviceName, details.masjid, details.date, details.time, details.location);
                break;
            case "program":
                await EndUser.createProgram(name, details.programName, details.masjid, details.date, details.time, details.location);
                break;
            default:
                throw new Error("Invalid registration type.");
        }

        res.status(200).json({ message: `Registration successful for ${type}`, type });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to process registration." });
    }
});

*/