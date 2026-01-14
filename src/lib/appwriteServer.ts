import { Client, Users } from "node-appwrite";

export function getAppwriteServer() {
    const client = new Client()
        .setEndpoint(process.env.APPWRITE_ENDPOINT!)
        .setProject(process.env.APPWRITE_PROJECT_ID!)
        .setKey(process.env.APPWRITE_API_KEY!);

    return {
        client,
        users: new Users(client),
    };
}

/**
 * Assigns a label to an Appwrite user.
 * If the label already exists on the user, it will not be duplicated.
 * @param userId - The ID of the user to assign the label to
 * @param label - The label to assign (e.g., 'talent', 'client', 'admin')
 * @returns The updated user object
 */
export async function assignLabelToUser(userId: string, label: string) {
    const { users } = getAppwriteServer();

    // Get current user to retrieve existing labels
    const user = await users.get({ userId: userId });
    const currentLabels = user.labels || [];

    // Add new label if it doesn't already exist
    if (!currentLabels.includes(label)) {
        const updatedLabels = [...currentLabels, label];
        return await users.updateLabels({ userId: userId, labels: updatedLabels });
    }

    return user;
}
