export class EmailTemplates {
    public static TicketConfirmation(
        name: string,
        eventName: string,
        masjidName: string,
        eventDate: string,
        eventTime: string,
        location: string
    ): string {
        return `
        Assalamu Alaikum ${name},

        We are delighted to confirm your registration for the upcoming ${eventName} at ${masjidName}. ✨
        You can download your ticket here or view your ticket on the portal.
    
        Here are the event details for your convenience:
        Event: ${eventName}
        Date: ${eventDate}
        Time: ${eventTime}
        Location: ${location}
    
        JazakAllah Khair for being an active part of our community. We can’t wait to see you there!
    
        Warm regards,
        The ConnectMazjid Team
        `;
    }
}
