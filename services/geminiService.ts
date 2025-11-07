
import { GoogleGenAI, Type } from "@google/genai";

// Fix: Corrected import path for types.
import type { AppData } from '../types';

const ai = new GoogleGenAI({apiKey: process.env.API_KEY});

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        alumni: {
            type: Type.ARRAY,
            description: "A list of 50 alumni profiles from Sagar Institute of Science, Technology and Engineering, Ratibad Campus, Bhopal (MP) with common Indian student names.",
            items: {
                type: Type.OBJECT,
                properties: {
                    id: { type: Type.INTEGER, description: "Unique identifier for the alumni." },
                    name: { type: Type.STRING, description: "Full name of the alumni (common Indian names)." },
                    email: { type: Type.STRING, description: "A unique, realistic email address for the alumnus."},
                    profilePictureUrl: { type: Type.STRING, description: "URL to a profile picture. Use placeholder URLs from a service like picsum.photos." },
                    jobTitle: { type: Type.STRING, description: "Current job title." },
                    company: { type: Type.STRING, description: "Current company." },
                    graduationYear: { type: Type.INTEGER, description: "Year of graduation (between 2010 and 2023)." },
                    major: { type: Type.STRING, description: "Major of study (e.g., Computer Science, Mechanical Engineering, Electronics)." },
                    location: { type: Type.STRING, description: "Current city and state, e.g., 'Bhopal, MP', 'Pune, MH', 'Bangalore, KA'." },
                    bio: { type: Type.STRING, description: "A short biography of about 50-100 words." },
                    skills: { type: Type.ARRAY, description: "A list of 5-8 professional skills.", items: { type: Type.STRING } },
                    willingToMentor: { type: Type.BOOLEAN, description: "Whether they are available for mentorship." },
                },
                required: ["id", "name", "email", "profilePictureUrl", "jobTitle", "company", "graduationYear", "major", "location", "bio", "skills", "willingToMentor"]
            }
        },
        jobs: {
            type: Type.ARRAY,
            description: "A list of 20 job postings, relevant to engineering graduates.",
            items: {
                type: Type.OBJECT,
                properties: {
                    id: { type: Type.INTEGER, description: "Unique identifier for the job." },
                    title: { type: Type.STRING, description: "Job title." },
                    company: { type: Type.STRING, description: "Hiring company." },
                    location: { type: Type.STRING, description: "Job location, e.g., 'Pune, MH' or 'Remote'." },
                    type: { type: Type.STRING, enum: ['Full-time', 'Internship', 'Contract', 'Part-time'], description: "Job type (Full-time, Internship, Contract, Part-time)." },
                    description: { type: Type.STRING, description: "A detailed job description of about 150-200 words." },
                    postedDate: { type: Type.STRING, description: "Date of posting in ISO 8601 format." },
                    postedBy: { type: Type.STRING, description: "Name of an alumni from the generated list who posted the job." },
                },
                required: ["id", "title", "company", "location", "type", "description", "postedDate", "postedBy"]
            }
        },
        events: {
            type: Type.ARRAY,
            description: "A list of 10 upcoming events.",
            items: {
                type: Type.OBJECT,
                properties: {
                    id: { type: Type.INTEGER, description: "Unique identifier for the event." },
                    title: { type: Type.STRING, description: "Event title." },
                    description: { type: Type.STRING, description: "A short description of the event." },
                    date: { type: Type.STRING, description: "Event date and time in ISO 8601 format." },
                    location: { type: Type.STRING, description: "Event location, e.g., 'Online' or 'SISTec-R Campus, Bhopal'." },
                    type: { type: Type.STRING, enum: ['Networking', 'Workshop', 'Webinar', 'Social'], description: "Event type (Networking, Workshop, Webinar, Social)." },
                },
                required: ["id", "title", "description", "date", "location", "type"]
            }
        }
    },
    required: ["alumni", "jobs", "events"]
};


export async function generateInitialData(): Promise<Omit<AppData, 'currentUser'>> {
    try {
        const prompt = `Generate a realistic dataset for an alumni network application named "ConnectEd" for the "Sagar Institute of Science, Technology and Engineering, Ratibad Campus, Bhopal (MP)". The data should include a diverse set of alumni, job postings, and community events.
        - Alumni MUST have common Indian student names and be graduates of Sagar Institute of Science, Technology and Engineering. IDs should be sequential starting from 1.
        - Jobs should cover different industries and experience levels relevant to engineering graduates.
        - Events should be a mix of online and in-person gatherings.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });
        
        const jsonText = response.text;
        const data = JSON.parse(jsonText);
        // Ensure alumni have a valid email, fallback if model fails
        data.alumni.forEach((alum: any) => {
            if (!alum.email) {
                alum.email = `${alum.name.toLowerCase().replace(' ', '.')}@example.com`;
            }
        });
        return data;
    } catch (error) {
        console.error("Error generating initial data:", error);
        throw new Error("Failed to fetch initial data from Gemini API.");
    }
}