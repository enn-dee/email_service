import { EmailHelper } from './EmailHelper';

export class Organizer {
    private static creationPath = `../htmlTemplates/organizer/creation/`;
    private static cancelationPath = `../htmlTemplates/organizer/cancelation/`;

    private static async handleNotification(
        replacements: any,
        templateFile: string,
        subject: string
    ): Promise<void> {
        // Fix the email check by referencing the correct key in the replacements object
        // if (!replacements['Organizer Email'] || replacements['Organizer Email'].trim() === '') {
        //     console.error("No organizer email defined.");
        //     console.log('Replacements object:', replacements); // Add this line to inspect the replacements object
        //     throw new Error("No organizer email defined.");
        // }
    
        try {
            await EmailHelper.sendEmailForRegistration(replacements['email'], subject, replacements, templateFile);
        } catch (error) {
            console.error(`Error sending ${subject} email for ${replacements['Event Name']}: ${error}`);
            throw new Error(`Failed to send email for ${replacements['Event Name']}`);
        }
    }
    

    public static async notifyEventCreation(details: any): Promise<void> {
        const replacements = {
            'Organizer Name': details.organizerName,
            'email': details.organizerEmail,
            'Event Name': details.title,
            'Masjid Name': details.masjid,
            'Event Date': details.date,
            'Event Time': details.time,
            'Masjid Name & Address': details.location,
        };

        const subject = `Event Created: ${details.title} at ${details.masjid}`;
        // const templateFile = 'organizer/created/event.html';
        await this.handleNotification(replacements, this.creationPath + `Event.html`, subject);
    }

    public static async notifyEventCancellation(details: any): Promise<void> {
        const replacements = {
            'Organizer Name': details.organizerName,
            'email': details.organizerEmail,
            'Event Name': details.title,
            'Masjid Name': details.masjid,
            'Event Date': details.date,
            'Event Time': details.time,
            'Masjid Name & Address': details.location,
        };

        const subject = `Event Canceled: ${details.title} at ${details.masjid}`;
        // const templateFile = 'organizer/cancelation/event.html';
        await this.handleNotification(replacements, this.cancelationPath + `Event.html`, subject);
    }

    public static async notifyServiceCreation(details: any): Promise<void> {
        const replacements = {
            'Organizer Name': details.organizerName,
            'email': details.organizerEmail,
            'Service Name': details.title,
            'Masjid Name': details.masjid,
            'Service Date': details.date,
            'Service Time': details.time,
            'Masjid Name & Address': details.location,
        };

        const subject = `Service Created: ${details.title} at ${details.masjid}`;
        const templateFile = 'organizer/created/service.html';
        await this.handleNotification(replacements, templateFile, subject);
    }

    public static async notifyServiceCancellation(details: any): Promise<void> {
        const replacements = {
            'Organizer Name': details.organizerName,
            'email': details.organizerEmail,
            'Service Name': details.title,
            'Masjid Name': details.masjid,
            'Service Date': details.date,
            'Service Time': details.time,
            'Masjid Name & Address': details.location,
        };

        const subject = `Service Canceled: ${details.title} at ${details.masjid}`;
        const templateFile = 'organizer/cancelation/service.html';
        await this.handleNotification(replacements, templateFile, subject);
    }

    public static async notifyProgramCreation(details: any): Promise<void> {
        const replacements = {
            'Organizer Name': details.organizerName,
            'email': details.organizerEmail,
            'Program Name': details.title,
            'Masjid Name': details.masjid,
            'Program Date': details.date,
            'Program Time': details.time,
            'Masjid Name & Address': details.location,
        };

        const subject = `Program Created: ${details.title} at ${details.masjid}`;
        const templateFile = 'organizer/created/program.html';
        await this.handleNotification(replacements, templateFile, subject);
    }

    public static async notifyProgramCancellation(details: any): Promise<void> {
        const replacements = {
            'Organizer Name': details.organizerName,
            'email': details.organizerEmail,
            'Program Name': details.title,
            'Masjid Name': details.masjid,
            'Program Date': details.date,
            'Program Time': details.time,
            'Masjid Name & Address': details.location,
        };

        const subject = `Program Canceled: ${details.title} at ${details.masjid}`;
        const templateFile = 'organizer/cancelation/program.html';
        await this.handleNotification(replacements, templateFile, subject);
    }
}
