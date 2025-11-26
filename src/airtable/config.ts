import Airtable from 'airtable';
import conf from '@/conf/config';

// Configure Airtable
Airtable.configure({
    apiKey: conf.airtableAPIKey,
});

export const BASE = Airtable.base(conf.airtableBaseId!);

