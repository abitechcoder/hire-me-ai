import conf from "@/conf/config"
import { Client, Account, ID } from 'appwrite';

type CreateUserAccount = {
    email: string,
    password: string,
    name: string
}

type LoginUserAccount = {
    email: string,
    password: string
}

const appwriteClient = new Client();

appwriteClient
    .setEndpoint(conf.appwriteUrl) // Your Appwrite Endpoint
    .setProject(conf.appwriteProjectId); // Replace with your project ID

export const account = new Account(appwriteClient);

class AppwriteService {
    async createUser({ email, password, name }: CreateUserAccount) {
        try {
            const userAccount = await account.create(
                { userId: ID.unique(), email, password, name }
            );
            if (userAccount) {
                return this.loginUser({ email, password });
            } else {
                return userAccount
            }
        } catch (error) {
            throw error;
        }
    }

    async loginUser({ email, password }: LoginUserAccount) {
        try {
            const session = await account.createEmailPasswordSession({
                email,
                password
            });

            return session;
        } catch (error) {
            // throw error;
            return null
        }
    }

    async isLoggedIn(): Promise<Boolean> { 
        try {
            const data = await this.getCurrentUser();
            return Boolean(data);
        } catch (error) {
            // throw error;
            return false;
        }
        
    }

    async getCurrentUser() {
        try {
            return await account.get();
        } catch (error) {
            // console.log("Error getting current user:", error);
            // throw error;
            return null;
        }
        
     }

    async logoutUser() {
        try {
            return await account.deleteSession({ sessionId: 'current' });
        } catch (error) {
            // throw error;
            return null;
        }
     }
}

const appwriteService = new AppwriteService();

export default appwriteService;


