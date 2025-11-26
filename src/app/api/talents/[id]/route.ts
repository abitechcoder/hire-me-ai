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

        // Fetch the record by ID
        const record = await BASE(tableName).find(id);

        const data = {
            id: record.id,
            fields: record.fields,
        };

        return NextResponse.json({ data, success: true });
    } catch (error) {
        console.error('Airtable API Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch data', success: false },
            { status: 500 }
        );
    }
}