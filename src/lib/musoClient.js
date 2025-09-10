// src/lib/musoClient.js
import { NextResponse } from 'next/server';

export async function getProfileCredits(profileId) {
  console.log("Fetching credits for profile ID:", profileId);
  
  const endpoints = [
    `https://api.muso.ai/v2/profiles/${profileId}/credits`,
    `https://api.muso.ai/v1/credits?profileId=${profileId}`,
    `https://api.muso.ai/credits/${profileId}`,
    `https://api.muso.ai/v1/profiles/${profileId}`,
  ];
  
  for (const url of endpoints) {
    console.log("Trying URL:", url);
    
    try {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${process.env.MUSO_API_KEY}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        cache: 'no-store',
      });

      console.log(`Response for ${url}:`, {
        status: res.status,
        statusText: res.statusText,
        headers: Object.fromEntries(res.headers.entries())
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Success with URL:", url);
        return data;
      } else {
        const errorText = await res.text();
        console.log(`Failed ${url}: ${res.status} - ${errorText.substring(0, 200)}...`);
      }
    } catch (error) {
      console.log(`Error with ${url}:`, error.message);
    }
  }
  
  throw new Error('All endpoint attempts failed');
}

export async function searchProfiles(query) {
  console.log("Searching for profile with query:", query);
  
  // Try different search endpoints
  const endpoints = [
    `https://api.muso.ai/v2/profiles?q=${encodeURIComponent(query)}`,
    `https://api.muso.ai/v1/search/profiles?q=${encodeURIComponent(query)}`,
    `https://api.muso.ai/search?q=${encodeURIComponent(query)}&type=profiles`,
  ];
  
  for (const url of endpoints) {
    console.log("Trying search URL:", url);
    
    try {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${process.env.MUSO_API_KEY}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        cache: 'no-store',
      });

      console.log(`Search response for ${url}:`, {
        status: res.status,
        statusText: res.statusText,
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Search success with URL:", url);
        console.log("Search result data:", JSON.stringify(data, null, 2));
        return data;
      } else {
        const errorText = await res.text();
        console.log(`Search failed ${url}: ${res.status} - ${errorText.substring(0, 200)}...`);
      }
    } catch (error) {
      console.log(`Search error with ${url}:`, error.message);
    }
  }
  
  throw new Error('All search endpoint attempts failed');
}

export async function getProfileInfo(profileId) {
  console.log("Fetching profile info for ID:", profileId);
  
  const endpoints = [
    `https://api.muso.ai/v2/profiles/${profileId}`,
    `https://api.muso.ai/v1/profiles/${profileId}`,
    `https://api.muso.ai/profiles/${profileId}`,
  ];
  
  for (const url of endpoints) {
    console.log("Trying profile URL:", url);
    
    try {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${process.env.MUSO_API_KEY}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        cache: 'no-store',
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Profile info success:", data);
        return data;
      }
    } catch (error) {
      console.log(`Profile info error with ${url}:`, error.message);
    }
  }
  
  throw new Error('Could not fetch profile info');
}