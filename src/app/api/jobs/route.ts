import { NextResponse } from 'next/server';
import {BASE} from '@/airtable/config';

export async function GET(request: Request) {
    try {
        const tableName = 'Jobs';

        const records = await BASE(tableName)
            .select({
                maxRecords: 100,
                view: 'Grid view',
            })
            .all();

        const data = records.map((record) => (record.fields));

        return NextResponse.json({ data, success: true });
    } catch (error) {
        console.error('Airtable API Error:', error);
        return NextResponse.json(
            { error: 'Error occured while fetching Jobs data', success: false },
            { status: 500 }
        );
    }
}
