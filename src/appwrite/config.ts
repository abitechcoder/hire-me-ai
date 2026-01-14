import conf from "@/conf/config"
import { Client, Account, ID, Storage } from 'appwrite';

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
export const storage = new Storage(appwriteClient);

class AppwriteService {
    async createUser({ email, password, name }: CreateUserAccount) {
        try {
            const userAccount = await account.create(
                { userId: ID.unique(), email, password, name }
            );
            // if (userAccount) {
            //     return this.loginUser({ email, password });
            // } else {
            //     return userAccount
            // }
            return userAccount;
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
            throw error;
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

    // Storage methods
    async uploadFile(file: File) {
        try {
            const response = await storage.createFile({
                bucketId: conf.appwriteBucketId,
                fileId: ID.unique(),
                file: file
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    getFileUrl(fileId: string) {
        return storage.getFileView({
            bucketId: conf.appwriteBucketId,
            fileId: fileId
        });
    }

    async deleteFile(fileId: string) {
        try {
            await storage.deleteFile({ bucketId: conf.appwriteBucketId, fileId: fileId });
            return true;
        } catch (error) {
            throw error;
        }
    }

    async listFiles() {
        try {
            const response = await storage.listFiles({ bucketId: conf.appwriteBucketId });
            return response.files;
        } catch (error) {
            throw error;
        }
    }
}

const appwriteService = new AppwriteService();

export default appwriteService;


