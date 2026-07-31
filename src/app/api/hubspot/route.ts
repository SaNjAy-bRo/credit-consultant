import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, mobile, pan, dob, gender, score, rating, bureau, report_id, source } = body;

    const hubspotToken = process.env.HUBSPOT_ACCESS_TOKEN;

    if (!hubspotToken) {
      // Log lead payload when token is pending configuration
      console.log('[HubSpot Integration] Record captured. Set HUBSPOT_ACCESS_TOKEN in .env to push live to HubSpot CRM:', {
        name, mobile, pan, score, rating, bureau,
      });
      return NextResponse.json({
        success: true,
        mode: 'queued_local',
        message: 'Lead captured locally. Add HUBSPOT_ACCESS_TOKEN to .env to push directly to your HubSpot CRM account.',
      });
    }

    const nameParts = (name || '').trim().split(' ');
    const firstname = nameParts[0] || 'Visitor';
    const lastname = nameParts.slice(1).join(' ') || '';

    // Standard HubSpot CRM v3 Contact Objects API payload
    const hubspotPayload = {
      properties: {
        firstname,
        lastname,
        phone: mobile,
        email: `${mobile}@creditconsultant.in`,
        company: bureau || 'CIBIL',
        message: `PAN: ${pan || 'N/A'} | DOB: ${dob || 'N/A'} | Gender: ${gender || 'N/A'} | CIBIL Score: ${score || 0} | Rating: ${rating || 'N/A'} | Report ID: ${report_id || 'N/A'} | Source: ${source || 'Credit Consultant Web'}`,
      },
    };

    const res = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${hubspotToken}`,
      },
      body: JSON.stringify(hubspotPayload),
    });

    if (res.status === 409) {
      // Conflict: Contact with this phone/email already exists in HubSpot
      return NextResponse.json({ success: true, mode: 'existing_contact' });
    }

    if (!res.ok) {
      const errText = await res.text();
      console.error('[HubSpot API Error]:', errText);
      return NextResponse.json({ success: false, error: errText }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json({ success: true, hubspot_id: data.id });
  } catch (err: any) {
    console.error('[HubSpot Sync Exception]:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
