const conf = {
    appwriteUrl: String(process.env.NEXT_PUBLIC_APPWRITE_BASE_URL),
    appwriteProjectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
    airtableAPIKey: String(process.env.AIRTABLE_API_KEY),
    airtableBaseId: String(process.env.AIRTABLE_BASE_ID),
}

export default conf;