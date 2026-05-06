// Cloudflare Worker - Airtable Proxy for Finca Natural Catalogue
// This worker securely fetches data from Airtable without exposing your token

export default {
  async fetch(request, env) {
    // Only allow requests from your domain
    const allowedOrigins = [
      'https://fincanatural.com',
      'https://www.fincanatural.com',
      'http://localhost:3000', // for local testing
    ];

    const origin = request.headers.get('Origin');
    
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    // Only allow GET requests
    if (request.method !== 'GET') {
      return new Response('Method not allowed', { status: 405 });
    }

    // Airtable configuration
    const AIRTABLE_TOKEN = env.AIRTABLE_TOKEN; // Secret stored in Cloudflare
    const BASE_ID = 'appS6Wqg52SEanUjH';
    const TABLE_ID = 'tblsjbC8tkBbCIuz9';

    try {
      // Fetch from Airtable
      const airtableUrl = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`;
      
      const airtableResponse = await fetch(airtableUrl, {
        headers: {
          'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
        },
      });

      if (!airtableResponse.ok) {
        throw new Error(`Airtable API error: ${airtableResponse.status}`);
      }

      const data = await airtableResponse.json();

      // Return data with CORS headers
      return new Response(JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
          'Cache-Control': 'public, max-age=60', // Cache for 1 minute
        },
      });

    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
        },
      });
    }
  },
};
