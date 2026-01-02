import { NextResponse } from 'next/server';
import { BASE } from '@/airtable/config';

export async function GET(request: Request,
    { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    if (!id) {
        return NextResponse.json(
            { error: 'ID parameter is required', success: false },
            { status: 400 }
        );
    }

    try {
        const tableName = 'Talent Profiles';
        let record;

        // Check if id looks like an Airtable Record ID
        if (id.startsWith('rec')) {
            try {
                record = await BASE(tableName).find(id);
            } catch (error) {
                // If find fails, it might not be a record ID or record not found
                console.warn('Failed to find by Record ID, trying formula:', error);
            }
        }

        // If not found by Record ID, try custom ID field
        if (!record) {
            record = await BASE(tableName).select({
                filterByFormula: `{id} = '${id}'`,
                maxRecords: 1,
            }).firstPage().then(records => records[0]);
        }

        if (!record) {
            return NextResponse.json(
                { error: 'Talent not found', success: false },
                { status: 404 }
            );
        }

        const data = {
            id: record.id,
            ...record.fields
        };

        return NextResponse.json(data);
    } catch (error) {
        console.error('Airtable API Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch data', success: false },
            { status: 500 }
        );
    }
}