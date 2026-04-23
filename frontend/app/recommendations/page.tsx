"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import {
  RecommendationResult,
  fetchRecommendedListings,
  markRecommendationClicked,
} from "@/lib/api";

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<RecommendationResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchRecommendedListings();
        if (mounted) {
          setRecommendations(data);
        }
      } catch (err) {
        if (mounted) {
          if (err instanceof Error && err.message === "AUTH_REQUIRED") {
            setError("Sign in first to view personalized recommendations.");
          } else {
            setError("Could not load recommendations from the backend API.");
          }
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const formatKes = (value: string | number) => {
    const number = typeof value === "string" ? Number(value) : value;
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      maximumFractionDigits: 0,
    }).format(number);
  };

  const handleOpenRecommendation = async (item: RecommendationResult) => {
    try {
      await markRecommendationClicked(item.impression_id);
      setInfoMessage(`Recommendation click recorded for ${item.listing.title}.`);
    } catch {
      setInfoMessage("Could not record recommendation click right now.");
    }
  };

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Sparkles className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Recommended For You
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Based on your search history and preferences, our weighted algorithm found these matches.
          </p>
        </div>

        {loading && <p className="mx-auto mt-12 max-w-xl text-center text-gray-600">Loading recommendations...</p>}
        {error && <p className="mx-auto mt-12 max-w-xl text-center text-red-600">{error}</p>}
        {infoMessage && <p className="mx-auto mt-4 max-w-xl text-center text-sm text-blue-700">{infoMessage}</p>}

        {!loading && !error && (
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {recommendations.length === 0 ? (
              <p className="col-span-full text-center text-gray-600">
                No recommendations yet. View a few listings first to help the algorithm personalize your feed.
              </p>
            ) : (
              recommendations.map((item) => {
                const listing = item.listing;
                return (
                <article
                  key={item.impression_id}
                  className="flex flex-col items-start justify-between border-2 border-blue-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
                >
                  <div className="flex items-center gap-x-4 text-xs mb-4 w-full justify-between">
                    <span className="relative z-10 rounded-full bg-green-100 px-3 py-1.5 font-bold text-green-700">
                      Top {item.rank} Match
                    </span>
                    <span className="text-gray-500">Score {(item.score * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full h-64 bg-gray-200 rounded-xl mb-4 flex items-center justify-center text-gray-400">
                    Property Image
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-2xl font-semibold leading-6 text-gray-900">{listing.title}</h3>
                    <p className="mt-2 text-md leading-6 text-gray-600">{listing.description}</p>
                    <p className="mt-2 text-xs text-gray-500">
                      {listing.bedrooms} bed • {listing.bathrooms} bath • {listing.location}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between w-full gap-4">
                    <span className="font-bold text-lg text-gray-900">{formatKes(listing.price)} / mo</span>
                    <button
                      type="button"
                      onClick={() => handleOpenRecommendation(item)}
                      className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
                    >
                      View Details
                    </button>
                  </div>
                </article>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}
