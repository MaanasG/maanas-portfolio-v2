// src/app/api/muso-credits/route.js
import { searchProfiles, getProfileCredits, getProfileInfo } from '@/lib/musoClient';
import { NextResponse } from 'next/server';

let cache = { timestamp: 0, data: null };
const CACHE_DURATION = 3600000; // 1 hour

export async function GET() {
  const now = Date.now();
  if (cache.data && now - cache.timestamp < CACHE_DURATION) {
    console.log("Returning cached data");
    return NextResponse.json(cache.data);
  }

  try {
    let profileId = process.env.MUSO_PROFILE_ID;
    console.log("Initial profile ID:", profileId);

    // no profileId is set, try to search for it
    if (!profileId) {
      console.log("No profile ID found, searching...");
      const searchResult = await searchProfiles('1mains');
      
      if (searchResult && searchResult.profiles && searchResult.profiles.length > 0) {
        profileId = searchResult.profiles[0].id;
        console.log("Found profile ID from search:", profileId);
      } else if (searchResult && searchResult.data && searchResult.data.length > 0) {
        // different response structure
        profileId = searchResult.data[0].id;
        console.log("Found profile ID from search (alt structure):", profileId);
      } else {
        console.log("Search result structure:", JSON.stringify(searchResult, null, 2));
        throw new Error('Muso.ai profile not found and no ID provided.');
      }
    }

    // try to get basic profile info to verify the profile exists
    console.log("Attempting to get profile info...");
    try {
      const profileInfo = await getProfileInfo(profileId);
      console.log("Profile exists:", profileInfo);
    } catch (profileError) {
      console.log("Could not get profile info:", profileError.message);
      // maybe credits endpoint works without profile info
    }

    // try to get credits
    console.log("Attempting to get credits...");
    const credits = await getProfileCredits(profileId);
    
    const response = {
      credits: credits.credits || credits.data || credits,
      profileId: profileId,
      timestamp: now
    };
    
    cache = { timestamp: now, data: response };
    return NextResponse.json(response);

  } catch (error) {
    console.error('API Error:', error.message);
    console.error('Error stack:', error.stack);
    
    const fallbackResponse = {
      credits: [],
      error: error.message,
      profileId: process.env.MUSO_PROFILE_ID || 'unknown',
      timestamp: now,
      fallback: true
    };
    
    return NextResponse.json(fallbackResponse, { status: 200 });
  }
}

// a debug endpoint
export async function POST(request) {
  try {
    const { action, profileId, query } = await request.json();
    
    switch (action) {
      case 'search':
        const searchResult = await searchProfiles(query || '1mains');
        return NextResponse.json({ action, result: searchResult });
        
      case 'profile':
        const profileInfo = await getProfileInfo(profileId || process.env.MUSO_PROFILE_ID);
        return NextResponse.json({ action, result: profileInfo });
        
      case 'credits':
        const credits = await getProfileCredits(profileId || process.env.MUSO_PROFILE_ID);
        return NextResponse.json({ action, result: credits });
        
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ 
      error: error.message,
      stack: error.stack 
    }, { status: 200 }); // Return 200 so we can see the error details
  }
}