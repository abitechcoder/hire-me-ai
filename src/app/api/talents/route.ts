import { NextResponse } from 'next/server';
import {BASE} from '@/airtable/config';

export async function GET(request: Request) {
    try {
        const tableName = 'Talent Profiles';

        const records = await BASE(tableName)
            .select({
                maxRecords: 100,
                view: 'Grid view',
                filterByFormula: '{Verification Status} = "Verified"',
            })
            .all();

        const data = records.map((record) => (record.fields));

        return NextResponse.json(data);
    } catch (error) {
        console.error('Airtable API Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch talents' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const tableName = 'Talent Profiles';

        // Parse the request body
        const body = await request.json();

        const data = {
            Name: body.fullName,
            Email: body.email,
            "Phone Number": body.phone,
            Role: body.role,
            Skills: body.skills,
            "Portfolio Link": body.portfolioLink,
            "Video URL": body.videoLink,
            "Github URL": body.githubLink,
            "LinkedIn Profile URL": body.linkedInURL,
            Experience: body.experienceLevel,
            Category: body.category,
            Location: body.location,
            Rates: Number(body.rates),
        };

        // Create a new record in Airtable
        const newUser = await BASE(tableName).create([{ fields: data }], { typecast: true });

        // Return the created record
        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        // console.error('Airtable API Error:', error);
        return NextResponse.json(
            { error: 'Failed to create user'},
            { status: 400 }
        );
    }
}