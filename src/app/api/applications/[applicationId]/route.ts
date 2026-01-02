import { NextResponse } from 'next/server';
import { BASE } from '@/airtable/config';

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ applicationId: string }> }
) {
    const { applicationId } = await params;

    if (!applicationId) {
        return NextResponse.json(
            { error: 'Application ID parameter is required', success: false },
            { status: 400 }
        );
    }

    try {
        const body = await request.json();
        const { status } = body;

        if (!status) {
            return NextResponse.json(
                { error: 'Status is required', success: false },
                { status: 400 }
            );
        }

        const updatedRecords = await BASE('Applications').update([
            {
                id: applicationId,
                fields: {
                    status: status
                }
            }
        ]);

        if (!updatedRecords || updatedRecords.length === 0) {
            return NextResponse.json(
                { error: 'Failed to update application', success: false },
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
            { error: 'Failed to update application', success: false },
            { status: 500 }
        );
    }
}
