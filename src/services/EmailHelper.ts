import { EmailService } from './EmailService';
import path from 'path';

export class EmailHelper {
    public static async sendEmailForRegistration(
        recipientEmail: string,  
        subject: string,
        replacements: any,
        templateFileName: string
    ): Promise<void> {
        const templatePath = path.resolve(__dirname, '..', 'htmlTemplates', templateFileName);

        try {
            await EmailService.sendEmail(recipientEmail, subject, templatePath, replacements);
            console.log(`Email sent successfully to ${recipientEmail}, check mail`);
        } catch (error:any) {
            console.error(`Error sending email to ${recipientEmail}: ${error.message}`);
            throw new Error(`Failed to send email to ${recipientEmail}`);
        }
    }
}
