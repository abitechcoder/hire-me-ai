import { NextResponse } from 'next/server';
import { BASE } from '@/airtable/config';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const talentId = searchParams.get('talentId');

    if (!talentId) {
        return NextResponse.json(
            { error: 'Talent ID is required', success: false },
            { status: 400 }
        );
    }

    try {
        // 1. Find the Talent Record ID using the provided ID (which could be userId or Record ID)
        const talentTableName = 'Talent Profiles'; // Based on applicants route usage
        let talentRecordId = talentId;

        // If it doesn't look like a Record ID (starts with 'rec'), assume it's a userId and look it up
        if (!talentId.startsWith('rec')) {
            const talentRecord = await BASE(talentTableName).select({
                filterByFormula: `{userId} = '${talentId}'`,
                maxRecords: 1,
            }).firstPage().then(records => records[0]);

            if (!talentRecord) {
                return NextResponse.json(
                    { error: 'Talent not found', success: false },
                    { status: 404 }
                );
            }
            talentRecordId = talentRecord.id;
        }

        // 2. Fetch Applications for this Talent
        // Assuming 'talentId' field in Applications is a Linked Record to Talent Profiles
        const records = await BASE('Applications').select({
            filterByFormula: `{talentId} = '${talentRecordId}'`,
        }).all();

        const applications = records.map(record => ({
            id: record.id,
            ...record.fields
        }));

        return NextResponse.json({ data: applications, success: true });
    } catch (error) {
        console.error('Airtable API Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch applications', success: false },
            { status: 500 }
        );
    }
}
