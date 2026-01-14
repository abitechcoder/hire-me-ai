import { NextResponse } from 'next/server';
import { BASE } from '@/airtable/config';

export async function POST(request: Request, { params }: { params: Promise<{ jobId: string }> }) {
    const { jobId } = await params;

    if (!jobId) {
        return NextResponse.json(
            { error: 'Job ID is required', success: false },
            { status: 400 }
        );
    }

    try {
        const body = await request.json();
        const { talentId } = body;

        if (!talentId) {
            return NextResponse.json(
                { error: 'Talent ID is required', success: false },
                { status: 400 }
            );
        }

        // 1. Find the Talent Record ID
        // We assume talentId passed is the userId (from Appwrite)
        const talentRecord = await BASE('Talent Profiles').select({
            filterByFormula: `{userId} = '${talentId}'`,
            maxRecords: 1,
        }).firstPage().then(records => records[0]);

        if (!talentRecord) {
            return NextResponse.json(
                { error: 'Talent profile not found', success: false },
                { status: 404 }
            );
        }

        // 2. Check if already applied
        const existingApplication = await BASE('Applications').select({
            filterByFormula: `AND({jobId} = '${jobId}', {talentId} = '${talentRecord.id}')`,
            maxRecords: 1,
        }).firstPage().then(records => records[0]);

        if (existingApplication) {
            return NextResponse.json(
                { error: 'You have already applied for this job', success: false },
                { status: 400 }
            );
        }

        // 3. Create Application
        // We need to link to the Job and the Talent
        // Assuming 'Applications' table has 'Job' (linked to Jobs) and 'Talent' (linked to Talent Profiles)
        // And maybe text fields for IDs if needed, but Linked Records are best.
        // Based on previous files, we used 'jobId' and 'talentId' as text fields or linked?
        // In `src/app/api/jobs/[jobId]/applicants/route.ts`, we filtered by `{jobId} = '${jobId}'`.
        // This suggests `jobId` is a text field or we are filtering by the primary field of the linked record?
        // Usually `jobId` as a column name implies it holds the ID.
        // Let's assume we save the ID in `jobId` field and also `talentId` field.
        // AND we should probably set the Linked Record fields if they exist.
        // Let's try to set both if we can guess the column names, or just the text fields if that's what's used.
        // Given the previous code used `filterByFormula: \`{jobId} = '${jobId}'\``, it seems `jobId` is a field.

        const applicationData = {
            jobId: jobId,
            talentId: talentRecord.id, // Using Airtable Record ID for consistency with other route
            status: 'pending',
            appliedDate: new Date().toISOString().split('T')[0],
            // If there are linked fields, we might need to set them too, e.g. "Job": [jobId] (if jobId is record id)
            // But jobId from params might be a slug or record ID.
            // Let's assume it's the Record ID for now as that's standard for Airtable apps usually.
            // If it's not, this might fail if we try to link.
            // Safest is to save the text fields as seen in other routes.
        };

        const createdRecord = await BASE('Applications').create([
            { fields: applicationData }
        ]);

        return NextResponse.json({ success: true, data: createdRecord[0] });

    } catch (error) {
        console.error('Airtable API Error:', error);
        return NextResponse.json(
            { error: 'Failed to submit application', success: false },
            { status: 500 }
        );
    }
}
