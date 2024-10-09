import { EmailHelper } from './EmailHelper';

// interface RegistrationDetails {
//     name: string;
//     email: string;
//     title: string; 
//     masjid: string;
//     date: string;
//     time: string;
//     location: string;
//     downloadUrl?: string;  
//     portalUrl?: string;
// }

export class EndUser {
    private static templatePath = `../htmlTemplates/endUser/`;
    private static async handleRegistration(
        replacements: any, 
        templateFile: string, 
        subject: string
    ): Promise<void> {
        if (!replacements.email || replacements.email.trim() === '') {
            console.error("No recipient email defined.");
            throw new Error("No recipient email defined.");
        }
    
        try {
            await EmailHelper.sendEmailForRegistration(replacements.email, subject, replacements, templateFile);
        } catch (error) {
            console.error(`Error sending ${subject} email for ${replacements.title}: ${error}`);
            throw new Error(`Failed to send email for ${replacements.title}`);
        }
    }
    

    public static async createEvent(details: any): Promise<void> {
        const replacements = {
            'Name': details.name,
            'email': details.email,
            'Event Name': details.title,
            'Masjid Name': details.masjid,
            'Event Date': details.date,
            'Event Time': details.time,
            'Masjid Name & Address': details.location,
            'Confirmation View URL': details.portalUrl || 'https://example.com/view-confirmation',
            'Confirmation Download URL': details.downloadUrl || 'https://example.com/download-confirmation'
        };

        const subject = `Your Event Registration for ${details.title} at ${details.masjid}`;
        await this.handleRegistration(replacements, this.templatePath+'Event.html', subject);
    }

    public static async createService(details: any): Promise<void> {
        const replacements = {
            'Name': details.name,
            'email': details.email,
            'Service Name': details.title,
            'Masjid Name': details.masjid,
            'Service Date': details.date,
            'Service Time': details.time,
            'Masjid Name & Address': details.location,
            'Confirmation View URL': details.portalUrl || 'https://example.com/view-confirmation',
            'Confirmation Download URL': details.downloadUrl || 'https://example.com/download-confirmation'
        };
        const subject = `Your Service Registration for ${details.title} at ${details.masjid}`;
        await this.handleRegistration(replacements, this.templatePath+'Service.html', subject);
    }

    public static async createProgram(details: any): Promise<void> {
        const replacements = {
            'Name': details.name,
            'email': details.email,
            'Program Name': details.title,
            'Masjid Name': details.masjid,
            'Program Date': details.date,
            'Program Time': details.time,
            'Masjid Name & Address': details.location,
            'Confirmation View URL': details.portalUrl || 'https://example.com/view-confirmation',
            'Confirmation Download URL': details.downloadUrl || 'https://example.com/download-confirmation'
        };
        const subject = `Your Program Registration for ${details.title} at ${details.masjid}`;
        await this.handleRegistration(replacements, this.templatePath+'Program.html', subject);
    }
}
