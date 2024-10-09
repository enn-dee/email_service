import nodemailer from 'nodemailer';
import "dotenv/config";
import fs from 'fs';

export class EmailService {
    public static async sendEmail(email: string, subject: string, templatePath: string, replacements: any): Promise<void> {
        const transporter = nodemailer.createTransport({
            host: String(process.env.NODE_EMAIL_HOST),
            port: Number(process.env.NODE_EMAIL_PORT),
            auth: {
                user: process.env.NODE_EMAIL_USERNAME,
                pass: process.env.NODE_EMAIL_PASSWORD,
            },
        });

        try {
            const template = fs.readFileSync(templatePath, 'utf-8');
            const htmlContent = EmailService.replaceTemplateVariables(template, replacements);

            const mailOptions = {
                from: process.env.NODE_EMAIL_USERNAME,
                to: email, 
                subject: subject,
                html: htmlContent,
            };

            const info = await transporter.sendMail(mailOptions);
            console.log(`Email sent to ${email}: ${info.response}`);
        } catch (err:any) {
            console.error(`Failed to send email: ${err.message}`);
            throw new Error(`Failed to send email to ${email}`);
        }
    }

    private static replaceTemplateVariables(template: string, variables: any): string {
        let replacedTemplate = template;
        for (const key in variables) {
            const value = variables[key];
            const regex = new RegExp(`\\[${key}\\]`, 'g');
            replacedTemplate = replacedTemplate.replace(regex, value);
        }
        return replacedTemplate;
    }
}
