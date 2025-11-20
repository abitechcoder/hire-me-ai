import Airtable from 'airtable';

// Configure Airtable
Airtable.configure({
    apiKey: process.env.AIRTABLE_API_KEY,
});

export const BASE = Airtable.base(process.env.AIRTABLE_BASE_ID!);

