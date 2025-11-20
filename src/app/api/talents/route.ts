import { NextResponse } from 'next/server';
import {BASE} from '../../../../airtable';

export async function GET(request: Request) {
    try {
        const tableName = 'Talent Profiles';

        const records = await BASE(tableName)
            .select({
                maxRecords: 100,
                view: 'Grid view',
                filterByFormula: '{Verification Status} = "Verified"',
            })
            .all();

        const data = records.map((record) => ({
            id: record.id,
            fields: record.fields,
        }));

        return NextResponse.json({ data, success: true });
    } catch (error) {
        console.error('Airtable API Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch data from Airtable', success: false },
            { status: 500 }
        );
    }
}