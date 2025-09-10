// src/app/api/spotify-credits/route.js
import { NextResponse } from 'next/server';
import { 
  getSpotifyAccessToken, 
  getSpotifyTracks, 
  extractSpotifyTrackId, 
  transformSpotifyTrack 
} from '@/lib/spotifyClient';
import { spotifyTrackConfig, DEFAULT_ROLE } from '@/data/spotifyTracks';

let cache = { timestamp: 0, data: null };
const CACHE_DURATION = 3600000; // 1 hour

export async function GET() {
  const now = Date.now();
  if (cache.data && now - cache.timestamp < CACHE_DURATION) {
    console.log("Returning cached Spotify data");
    return NextResponse.json(cache.data);
  }

  try {
    console.log("Fetching Spotify tracks...");
    
    const accessToken = await getSpotifyAccessToken();
    
    // Extract track IDs and prepare config
    const trackData = [];
    const trackIds = [];
    
    for (const config of spotifyTrackConfig) {
      try {
        const trackId = extractSpotifyTrackId(config.url);
        trackIds.push(trackId);
        trackData.push({
          id: trackId,
          role: config.role || DEFAULT_ROLE,
          customGenre: config.customGenre,
          description: config.description
        });
      } catch (error) {
        console.error(`Invalid Spotify URL: ${config.url}`, error);
      }
    }
    
    if (trackIds.length === 0) {
      console.log("No valid Spotify track IDs found");
      return NextResponse.json({
        credits: [],
        error: "No valid Spotify tracks configured",
        source: 'spotify-empty',
        timestamp: now
      });
    }
    
    // fetch track data from Spotify (max 50 tracks per request)
    const spotifyResponse = await getSpotifyTracks(trackIds.slice(0, 50), accessToken);
    
    if (!spotifyResponse.tracks) {
      throw new Error('Invalid response from Spotify API');
    }
    
    // transform tracks to our format
    const credits = spotifyResponse.tracks
      .filter(track => track !== null) // filter out null tracks (invalid IDs)
      .map((track, index) => {
        const config = trackData.find(td => td.id === track.id) || {};
        const transformed = transformSpotifyTrack(track, config.role);
        
        // add custom fields from config
        return {
          ...transformed,
          genre: config.customGenre || transformed.genre,
          description: config.description
        };
      });
    
    const response = {
      credits: credits,
      source: 'spotify',
      timestamp: now,
      totalTracks: credits.length
    };
    
    cache = { timestamp: now, data: response };
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Spotify API Error:', error.message);
    
    //return error info but don't fail completely
    const errorResponse = {
      credits: [],
      error: error.message,
      source: 'spotify-error',
      timestamp: now
    };
    
    return NextResponse.json(errorResponse, { status: 200 });
  }
}

// POST endpoint for testing individual tracks
export async function POST(request) {
  try {
    const { spotifyUrl, role, genre, description } = await request.json();
    
    if (!spotifyUrl) {
      return NextResponse.json({ error: 'Spotify URL required' }, { status: 400 });
    }
    
    const accessToken = await getSpotifyAccessToken();
    const trackId = extractSpotifyTrackId(spotifyUrl);
    
    const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status}`);
    }
    
    const spotifyTrack = await response.json();
    const transformed = transformSpotifyTrack(spotifyTrack, role);
    
    return NextResponse.json({
      success: true,
      track: {
        ...transformed,
        genre: genre || transformed.genre,
        description: description
      }
    });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 200 });
  }
}