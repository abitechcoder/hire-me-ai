import { NextResponse } from 'next/server';
import { BASE } from '@/airtable/config';

export async function GET(request: Request,
    { params }: { params: Promise<{ jobId: string }> }) {
    const { jobId } = await params;

    if (!jobId) {
        return NextResponse.json(
            { error: 'Job ID parameter is required', success: false },
            { status: 400 }
        );
    }

    try {
        const tableName = 'Jobs';

        // Fetch the record by ID
        const record = await BASE(tableName).select({
            filterByFormula: `{id} = '${jobId}'`,
            maxRecords: 1,
        }).firstPage().then(records => records[0]);

        if (!record) {
            return NextResponse.json(
                { error: 'Job not found', success: false },
                { status: 404 }
            );
        }

        const data = {
            id: record.id,
            ...record.fields
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

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ jobId: string }> }
) {
    const { jobId } = await params;

    if (!jobId) {
        return NextResponse.json(
            { error: 'Job ID parameter is required', success: false },
            { status: 400 }
        );
    }

    try {
        const body = await request.json();
        const updates = body;

        if (Object.keys(updates).length === 0) {
            return NextResponse.json(
                { error: 'No update data provided', success: false },
                { status: 400 }
            );
        }

        // First find the Airtable Record ID
        const records = await BASE('Jobs').select({
            filterByFormula: `{id} = '${jobId}'`,
            maxRecords: 1,
        }).firstPage();

        if (records.length === 0) {
            return NextResponse.json(
                { error: 'Job not found', success: false },
                { status: 404 }
            );
        }

        const recordId = records[0].id;

        const updatedRecords = await BASE('Jobs').update([
            {
                id: recordId,
                fields: updates
            }
        ]);

        if (!updatedRecords || updatedRecords.length === 0) {
            return NextResponse.json(
                { error: 'Failed to update job', success: false },
                { status: 404 }
            );
        }

        return NextResponse.json({
            data: {
                id: updatedRecords[0].id,
                ...updatedRecords[0].fields
            },
            success: true
        });

    } catch (error) {
        console.error('Airtable API Error:', error);
        return NextResponse.json(
            { error: 'Failed to update job', success: false },
            { status: 500 }
        );
    }
}