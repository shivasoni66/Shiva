export interface Alumni {
  id: number;
  name: string;
  profilePictureUrl: string;
  jobTitle: string;
  company: string;
  graduationYear: number;
  major: string;
  location: string;
  bio: string;
  skills: string[];
  willingToMentor: boolean;
  email: string; // Added for login simulation
}

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Internship' | 'Contract' | 'Part-time';
  description: string;
  postedDate: string; // ISO 8601 format
  postedBy: string; // Alumni name
}

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string; // ISO 8601 format
  location: string;
  type: 'Networking' | 'Workshop' | 'Webinar' | 'Social';
}

// User types for authentication
export interface AdminUser {
    id: number;
    name: string;
    email: string;
    profilePictureUrl: string;
    role: 'admin';
}

export interface AlumniUser extends Alumni {
    role: 'alumni';
}

export type User = AdminUser | AlumniUser;

// Main data structure from Gemini
export interface AppData {
  alumni: Alumni[];
  jobs: Job[];
  events: Event[];
  // Fix: Added currentUser to the main AppData interface to hold the logged-in user's state.
  currentUser: User;
}

export interface Filters {
  years: Set<number>;
  majors: Set<string>;
  locations: Set<string>;
}

// Fix: Moved Toast types here to be shared across components.
// Toast types for UI feedback
export type ToastType = 'success' | 'info';
export type ShowToastFunction = (message: string, type: ToastType) => void;
