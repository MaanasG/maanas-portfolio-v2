// src/lib/spotifyClient.js

// Extract Spotify track ID s
export function extractSpotifyTrackId(url) {
  const patterns = [
    /spotify:track:([a-zA-Z0-9]+)/,
    /open\.spotify\.com\/track\/([a-zA-Z0-9]+)/,
    /spotify\.com\/track\/([a-zA-Z0-9]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  
  throw new Error('Invalid Spotify URL format');
}

// Spotify access token using Client Credentials
export async function getSpotifyAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  
  if (!clientId || !clientSecret) {
    throw new Error('Spotify credentials not configured');
  }
  
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
    },
    body: 'grant_type=client_credentials'
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to get Spotify token: ${error}`);
  }
  
  const data = await response.json();
  return data.access_token;
}

// track information from Spotify
export async function getSpotifyTrack(trackId, accessToken) {
  const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to get track info: ${error}`);
  }
  
  return response.json();
}

// multiple tracks at once
export async function getSpotifyTracks(trackIds, accessToken) {
  const idsParam = trackIds.join(',');
  const response = await fetch(`https://api.spotify.com/v1/tracks?ids=${idsParam}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to get tracks info: ${error}`);
  }
  
  return response.json();
}

// Get artist information
export async function getSpotifyArtist(artistId, accessToken) {
  const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to get artist info: ${error}`);
  }
  
  return response.json();
}

// transform Spotify track data to our format
export function transformSpotifyTrack(spotifyTrack, customRole = 'Producer') {
  const durationMs = spotifyTrack.duration_ms;
  const minutes = Math.floor(durationMs / 60000);
  const seconds = Math.floor((durationMs % 60000) / 1000);
  const duration = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  
  return {
    trackTitle: spotifyTrack.name,
    artist: spotifyTrack.artists.map(artist => artist.name).join(', '),
    projectName: spotifyTrack.album.name,
    role: customRole, 
    genre: 'Electronic',
    releaseDate: spotifyTrack.album.release_date,
    duration: duration,
    plays: spotifyTrack.popularity ? `${spotifyTrack.popularity}%` : 'N/A',
    platforms: ['Spotify'],
    spotifyUrl: spotifyTrack.external_urls.spotify,
    previewUrl: spotifyTrack.preview_url,
    imageUrl: spotifyTrack.album.images[0]?.url,
    explicit: spotifyTrack.explicit,
    spotifyId: spotifyTrack.id
  };
}