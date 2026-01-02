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
        // 1. Fetch from Applications table where jobId matches
        const applications = await BASE('Applications').select({
            filterByFormula: `{jobId} = '${jobId}'`,
        }).all();

        if (!applications || applications.length === 0) {
            return NextResponse.json({ data: [], success: true });
        }

        // 2. Extract talentIds and create a map of talentId -> application status
        const talentApplicationMap = new Map<string, any>();
        const talentIds: string[] = [];

        applications.forEach(app => {
            let talentId = app.fields.talentId;

            // Handle Linked Record field (returns array of IDs)
            if (Array.isArray(talentId)) {
                talentId = talentId[0];
            }

            if (talentId) {
                talentIds.push(talentId as string);
                talentApplicationMap.set(talentId as string, {
                    status: app.fields.status,
                    applicationId: app.id
                });
            }
        });

        if (talentIds.length === 0) {
            return NextResponse.json({ data: [], success: true });
        }

        // 3. Fetch Talent Profiles
        const formula = `OR(${talentIds.map(id => `RECORD_ID()='${id}'`).join(',')})`;
        const talentRecords = await BASE('Talent Profiles').select({
            filterByFormula: formula,
        }).all();

        // 4. Merge Talent data with Application status
        const data = talentRecords.map((record) => {
            const applicationInfo = talentApplicationMap.get(record.id);
            // Ensure we don't overwrite the real ID with one from fields if it exists
            const { id: _fieldId, ...otherFields } = record.fields as any;

            return {
                ...otherFields,
                id: record.id, // Explicitly set ID
                status: applicationInfo?.status || 'pending',
                applicationId: applicationInfo?.applicationId
            };
        });

        return NextResponse.json({ data, success: true });

    } catch (error) {
        console.error('Airtable API Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch applicants', success: false },
            { status: 500 }
        );
    }
}
