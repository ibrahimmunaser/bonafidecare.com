import { NextResponse } from 'next/server';
import type { GoogleReview } from '@/types';

// Cache reviews for 1 hour
let cachedReviews: GoogleReview[] | null = null;
let cacheExpiry: number = 0;
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

/**
 * Fetch reviews from Google Places API
 */
async function fetchGoogleReviews(): Promise<GoogleReview[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    console.log('Google Places API not configured');
    return [];
  }

  try {
    // Use Place Details API to get reviews
    const url = new URL('https://maps.googleapis.com/maps/api/place/details/json');
    url.searchParams.set('place_id', placeId);
    url.searchParams.set('fields', 'reviews');
    url.searchParams.set('key', apiKey);

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      console.error('Google Places API error:', response.status);
      return [];
    }

    const data = await response.json();

    if (data.status !== 'OK' || !data.result?.reviews) {
      console.log('No reviews found or API error:', data.status);
      return [];
    }

    // Map Google's review format to our format
    const reviews: GoogleReview[] = data.result.reviews.map((review: {
      author_name: string;
      profile_photo_url?: string;
      rating: number;
      text: string;
      relative_time_description: string;
      time: number;
    }) => ({
      authorName: review.author_name,
      authorPhotoUrl: review.profile_photo_url,
      rating: review.rating,
      text: review.text,
      relativeTimeDescription: review.relative_time_description,
      time: review.time,
    }));

    return reviews;
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    return [];
  }
}

export async function GET() {
  try {
    // Check cache
    if (cachedReviews && Date.now() < cacheExpiry) {
      return NextResponse.json({
        success: true,
        data: cachedReviews,
        cached: true,
      });
    }

    // Fetch fresh reviews
    const allReviews = await fetchGoogleReviews();

    // Filter to only 5-star reviews
    const fiveStarReviews = allReviews
      .filter((review) => review.rating === 5)
      .sort((a, b) => b.time - a.time) // Newest first
      .slice(0, 6); // Max 6 reviews

    // Update cache
    cachedReviews = fiveStarReviews;
    cacheExpiry = Date.now() + CACHE_TTL;

    return NextResponse.json({
      success: true,
      data: fiveStarReviews,
      cached: false,
    });
  } catch (error) {
    console.error('Reviews API error:', error);
    return NextResponse.json({
      success: false,
      data: [],
      error: 'Failed to fetch reviews',
    });
  }
}







