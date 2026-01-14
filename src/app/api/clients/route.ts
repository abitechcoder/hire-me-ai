import { NextResponse } from 'next/server';
import { BASE } from '@/airtable/config';
import { assignLabelToUser } from '@/lib/appwriteServer';

export async function POST(request: Request) {
    try {
        const tableName = 'Clients';

        // Parse the request body
        const body = await request.json();
        const { userId, ...formData } = body;

        // Assign 'client' label to the user if userId is provided
        if (userId) {
            try {
                await assignLabelToUser(userId, 'client');
            } catch (labelError) {
                console.error('Error assigning label:', labelError);
                // Continue even if label assignment fails, but log it
            }
        }

        const data = {
            userId: userId,
            "Company Name": formData.companyName,
            Industry: formData.industry,
            "Contact Person": formData.contactPerson,
            Email: formData.email,
            "Role Needs": formData.roleRequirements,
            Budget: Number(formData.budget),
            "LinkedIn Profile URL": formData.linkedInUrl,
        };

        // Create a new record in Airtable
        const record = await BASE(tableName).create([{ fields: data }]);

        // Return the created record
        return NextResponse.json({ data: record, success: true });
    } catch (error) {
        console.error('Airtable API Error:', error);
        return NextResponse.json(
            { error: 'Failed to create record in Airtable', success: false },
            { status: 500 }
        );
    }
}