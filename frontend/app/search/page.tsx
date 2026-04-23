"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import {
  Amenity,
  ApiListing,
  createListingSaveEvent,
  createListingViewEvent,
  deleteListingSaveEvent,
  fetchAmenities,
  fetchListingSaveEvents,
  fetchListings,
  ListingSaveEvent,
  ListingReportReason,
  reportListing,
} from "@/lib/api";

type ListingCardProps = {
  listing: ApiListing;
  savedEventId?: number;
  formatKes: (value: string | number) => string;
  onInfoMessage: (message: string) => void;
  onSavedEventChange: (listingId: number, saveEventId?: number) => void;
};

function ListingCard({
  listing,
  savedEventId,
  formatKes,
  onInfoMessage,
  onSavedEventChange,
}: ListingCardProps) {
  const cardRef = useRef<HTMLElement | null>(null);
  const visibleSinceRef = useRef<number | null>(null);
  const trackedRef = useRef(false);
  const [reporting, setReporting] = useState(false);
  const [reportReason, setReportReason] = useState<ListingReportReason>("FAKE");

  const hasAmenity = (name: string) => {
    return listing.amenities.some((amenity) => amenity.name.toLowerCase() === name.toLowerCase());
  };

  const flushViewEvent = async (dwellSeconds: number) => {
    if (dwellSeconds <= 0) return;

    try {
      await createListingViewEvent({
        listing: listing.id,
        county: listing.county,
        dwell_time: dwellSeconds,
      });
    } catch {
      // Quietly ignore tracking failures.
    }
  };

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          if (visibleSinceRef.current === null) {
            visibleSinceRef.current = performance.now();
          }
          return;
        }

        if (visibleSinceRef.current !== null) {
          const dwellSeconds = Math.max(1, Math.round((performance.now() - visibleSinceRef.current) / 1000));
          visibleSinceRef.current = null;
          trackedRef.current = true;
          void flushViewEvent(dwellSeconds);
        }
      },
      { threshold: 0.55 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (visibleSinceRef.current !== null && !trackedRef.current) {
        const dwellSeconds = Math.max(1, Math.round((performance.now() - visibleSinceRef.current) / 1000));
        visibleSinceRef.current = null;
        void flushViewEvent(dwellSeconds);
      }
    };
    // listing.id is enough to reset tracking for a different card.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listing.id]);

  const handleSaveToggle = async () => {
    try {
      if (savedEventId) {
        await deleteListingSaveEvent(savedEventId);
        onSavedEventChange(listing.id, undefined);
        onInfoMessage("Removed from shortlist.");
        return;
      }

      const saved = (await createListingSaveEvent(listing.id)) as ListingSaveEvent;
      onSavedEventChange(listing.id, saved.id);
      onInfoMessage("Listing saved to your shortlist.");
    } catch (err) {
      if (err instanceof Error && err.message === "AUTH_REQUIRED") {
        onInfoMessage("Sign in to save listings.");
      } else {
        onInfoMessage("Could not update shortlist right now.");
      }
    }
  };

  const handleTrackViewClick = async () => {
    const visibleSince = visibleSinceRef.current;
    const dwellSeconds = visibleSince ? Math.max(1, Math.round((performance.now() - visibleSince) / 1000)) : 1;
    visibleSinceRef.current = null;
    await flushViewEvent(dwellSeconds);
    onInfoMessage(`Tracked view event for ${listing.title}.`);
  };

  const handleReport = async () => {
    try {
      setReporting(true);
      await reportListing({
        listingId: listing.id,
        reason: reportReason,
      });
      onInfoMessage("Report submitted. Our moderation team will review it.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not submit report right now.";
      onInfoMessage(message);
    } finally {
      setReporting(false);
    }
  };

  return (
    <article
      ref={cardRef}
      className="flex flex-col items-start justify-between border rounded-2xl p-4 shadow-sm hover:shadow-md transition"
    >
      <div className="w-full h-48 bg-gray-200 rounded-xl mb-4 object-cover flex items-center justify-center text-gray-400">
        Property Image
      </div>
      <div className="flex items-center gap-x-4 text-xs">
        <span className="text-gray-500">{listing.county}</span>
        <span className="relative z-10 rounded-full bg-blue-50 px-3 py-1.5 font-medium text-blue-600">
          Verified
        </span>
      </div>
      <div className="group relative w-full">
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900">{listing.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">{listing.description}</p>
        <p className="mt-2 text-xs text-gray-500">
          {listing.bedrooms} bed • {listing.bathrooms} bath • {listing.location}
        </p>
        <p className="mt-2 text-xs text-gray-500">
          {hasAmenity("Borehole Water") ? "Borehole" : "No Borehole"} • {hasAmenity("Backup Power") ? "Backup Power" : "No Backup"}
        </p>
      </div>
      <div className="mt-4 font-bold text-xl text-gray-900">{formatKes(listing.price)} / mo</div>
      <div className="mt-4 flex w-full gap-2">
        <button
          type="button"
          onClick={handleTrackViewClick}
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          View Details
        </button>
        <button
          type="button"
          onClick={handleSaveToggle}
          className="flex-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-500"
        >
          {savedEventId ? "Unsave" : "Save"}
        </button>
      </div>
      <div className="mt-3 flex w-full items-center gap-2">
        <select
          value={reportReason}
          onChange={(e) => setReportReason(e.target.value as ListingReportReason)}
          className="flex-1 rounded-md border border-gray-300 px-2 py-2 text-xs text-gray-700"
        >
          <option value="FAKE">Fake/Scam</option>
          <option value="UNAVAILABLE">Unavailable</option>
          <option value="WRONG_INFO">Wrong Info</option>
          <option value="OTHER">Other</option>
        </select>
        <button
          type="button"
          onClick={handleReport}
          disabled={reporting}
          className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700 hover:bg-red-100 disabled:opacity-60"
        >
          {reporting ? "Reporting..." : "Report"}
        </button>
      </div>
    </article>
  );
}

export default function SearchPage() {
  const [listings, setListings] = useState<ApiListing[]>([]);
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [savedEventsByListingId, setSavedEventsByListingId] = useState<Record<number, number>>({});
  const [query, setQuery] = useState("");
  const [selectedBedrooms, setSelectedBedrooms] = useState("any");
  const [selectedBudget, setSelectedBudget] = useState("any");
  const [selectedAmenity, setSelectedAmenity] = useState("any");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const [data, savedEvents, amenitiesData] = await Promise.all([
          fetchListings(),
          fetchListingSaveEvents().catch((err) => {
            if (err instanceof Error && err.message === "AUTH_REQUIRED") {
              return [] as ListingSaveEvent[];
            }
            return [] as ListingSaveEvent[];
          }),
          fetchAmenities().catch(() => [] as Amenity[]),
        ]);
        if (mounted) {
          setListings(data);
          setAmenities(amenitiesData);
          const savedMap = savedEvents.reduce<Record<number, number>>((acc, event) => {
            acc[event.listing] = event.id;
            return acc;
          }, {});
          setSavedEventsByListingId(savedMap);
        }
      } catch {
        if (mounted) {
          setError("Could not load listings from the backend API.");
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

  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        q.length === 0 ||
        listing.title.toLowerCase().includes(q) ||
        listing.description.toLowerCase().includes(q) ||
        listing.county.toLowerCase().includes(q) ||
        listing.location.toLowerCase().includes(q);

      const matchesBedrooms =
        selectedBedrooms === "any" ||
        (selectedBedrooms === "3+" ? listing.bedrooms >= 3 : listing.bedrooms === Number(selectedBedrooms));

      const price = Number(listing.price);
      const matchesBudget =
        selectedBudget === "any" ||
        (selectedBudget === "under20" && price < 20000) ||
        (selectedBudget === "20to50" && price >= 20000 && price <= 50000) ||
        (selectedBudget === "50plus" && price > 50000);

      const matchesAmenity =
        selectedAmenity === "any" ||
        listing.amenities.some((amenity) => amenity.name.toLowerCase() === selectedAmenity.toLowerCase());

      return matchesQuery && matchesBedrooms && matchesBudget && matchesAmenity;
    });
  }, [listings, query, selectedBedrooms, selectedBudget, selectedAmenity]);

  const formatKes = (value: string | number) => {
    const number = typeof value === "string" ? Number(value) : value;
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      maximumFractionDigits: 0,
    }).format(number);
  };

  const handleSavedEventChange = (listingId: number, saveEventId?: number) => {
    setSavedEventsByListingId((prev) => {
      const next = { ...prev };
      if (saveEventId) {
        next[listingId] = saveEventId;
      } else {
        delete next[listingId];
      }
      return next;
    });
  };

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Find Your Next Home
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Search 100% verified listings by location, budget, and amenities.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mx-auto mt-10 max-w-xl">
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md">
            <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              name="query"
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="block flex-1 border-0 bg-transparent py-3 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="E.g., 2 bedroom in Kilimani under 50k"
            />
            <button className="rounded-r-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500">
              Search
            </button>
          </div>
        </div>

        {/* Filters MVP placeholder */}
        <div className="mx-auto mt-6 flex max-w-xl gap-4 justify-center">
          <select
            value={selectedBedrooms}
            onChange={(e) => setSelectedBedrooms(e.target.value)}
            className="rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
          >
            <option value="any">Any Bedrooms</option>
            <option value="1">1 Bedroom</option>
            <option value="2">2 Bedrooms</option>
            <option value="3+">3+ Bedrooms</option>
          </select>
          <select
            value={selectedBudget}
            onChange={(e) => setSelectedBudget(e.target.value)}
            className="rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
          >
            <option value="any">Any Budget</option>
            <option value="under20">Under 20k</option>
            <option value="20to50">20k - 50k</option>
            <option value="50plus">50k+</option>
          </select>
          <select
            value={selectedAmenity}
            onChange={(e) => setSelectedAmenity(e.target.value)}
            className="rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
          >
            <option value="any">Any Amenity</option>
            {amenities.map((amenity) => (
              <option key={amenity.id} value={amenity.name}>
                {amenity.name}
              </option>
            ))}
          </select>
        </div>

        {loading && <p className="mx-auto mt-12 max-w-xl text-center text-gray-600">Loading listings...</p>}
        {error && <p className="mx-auto mt-12 max-w-xl text-center text-red-600">{error}</p>}
        {infoMessage && <p className="mx-auto mt-4 max-w-xl text-center text-sm text-blue-700">{infoMessage}</p>}

        {!loading && !error && (
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {filteredListings.length === 0 ? (
              <p className="col-span-full text-center text-gray-600">No listings matched your filters.</p>
            ) : (
              filteredListings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  savedEventId={savedEventsByListingId[listing.id]}
                  formatKes={formatKes}
                  onInfoMessage={setInfoMessage}
                  onSavedEventChange={handleSavedEventChange}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
