import { Client, Databases, ID } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Or your custom endpoint
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

export const databases = new Databases(client);
export const WAITLIST_DB_ID = process.env.NEXT_PUBLIC_APPWRITE_WAITLIST_DATABASE_ID!;
export const WAITLIST_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_WAITLIST_COLLECTION_ID!;

export const addEmailToWaitlist = async (email: string) => {
  return databases.createDocument(
    WAITLIST_DB_ID,
    WAITLIST_COLLECTION_ID,
    ID.unique(),
    { email }
  );
};