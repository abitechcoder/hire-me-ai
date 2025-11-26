import { NextResponse } from 'next/server';
import {BASE} from '@/airtable/config';

export async function POST(request: Request) {
    try {
        const tableName = 'Clients';

        // Parse the request body
        const body = await request.json();

        const data = {
            "Company Name": body.companyName,
            Industry: body.industry,
            "Contact Person": body.contactPerson,
            Email: body.email,
            "Role Needs": body.roleRequirements,
            Budget: Number(body.budget),
            "LinkedIn Profile URL": body.linkedInUrl,
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