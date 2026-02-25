import { Client, Account, Databases, ID } from "appwrite";

const client = new Client()
  .setEndpoint("https://syd.cloud.appwrite.io/v1")
  .setProject("699dc3d500023dfa67ef");

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases };

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