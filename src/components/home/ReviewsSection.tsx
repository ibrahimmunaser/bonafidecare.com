'use client';

import { useEffect, useState } from 'react';
import { Star, MessageCircle } from 'lucide-react';
import type { GoogleReview } from '@/types';

export function ReviewsSection() {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch('/api/reviews');
        const data = await response.json();
        
        if (data.success && data.data) {
          setReviews(data.data);
        } else {
          // No error - just means no reviews yet
          setReviews([]);
        }
      } catch (err) {
        console.error('Failed to fetch reviews:', err);
        setError('Unable to load reviews');
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, []);

  return (
    <section className="section bg-primary-600" id="reviews">
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
            What Patients Say
          </h2>
          <p className="mt-4 text-lg text-primary-50">
            Real feedback from our community
          </p>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card p-6">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className="w-5 h-5 skeleton rounded" />
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="h-4 skeleton w-full" />
                  <div className="h-4 skeleton w-3/4" />
                  <div className="h-4 skeleton w-1/2" />
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-10 h-10 skeleton rounded-full" />
                  <div className="h-4 skeleton w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-primary-100">{error}</p>
          </div>
        ) : reviews.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(0, 6).map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: GoogleReview }) {
  return (
    <div className="card p-6">
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className="w-5 h-5 text-yellow-400 fill-yellow-400"
          />
        ))}
      </div>

      {/* Review text */}
      <p className="text-neutral-700 leading-relaxed line-clamp-4">
        "{review.text}"
      </p>

      {/* Author */}
      <div className="mt-4 flex items-center gap-3">
        {review.authorPhotoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={review.authorPhotoUrl}
            alt=""
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold">
            {review.authorName.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <p className="font-medium text-neutral-900 text-sm">
            {review.authorName}
          </p>
          <p className="text-neutral-500 text-xs">
            {review.relativeTimeDescription}
          </p>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="max-w-md mx-auto text-center py-12">
      <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
        <MessageCircle className="w-8 h-8 text-white" />
      </div>
      <h3 className="font-heading text-xl font-semibold text-white mb-2">
        We're New Here
      </h3>
      <p className="text-primary-50">
        We haven't collected reviews yet, but we're committed to providing 
        excellent care. Check back soon to see what our patients have to say!
      </p>
      <div className="mt-6 flex justify-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className="w-6 h-6 text-white/30"
          />
        ))}
      </div>
    </div>
  );
}

