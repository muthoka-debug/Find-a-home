"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  StyleTag,
  fetchStyleTags,
  fetchUserPreferenceProfile,
  upsertUserPreferenceProfile,
} from "@/lib/api";

export default function PreferencesPage() {
  const [profileId, setProfileId] = useState<number | undefined>(undefined);
  const [preferredCounties, setPreferredCounties] = useState("");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [furnishing, setFurnishing] = useState("any");
  const [styleTags, setStyleTags] = useState<StyleTag[]>([]);
  const [selectedStyleTagIds, setSelectedStyleTagIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const [tags, profile] = await Promise.all([
          fetchStyleTags(),
          fetchUserPreferenceProfile(),
        ]);

        if (!mounted) return;

        setStyleTags(tags);

        if (profile) {
          setProfileId(profile.id);
          setPreferredCounties(profile.preferred_counties.join(", "));
          setBudgetMin(profile.budget_min ?? "");
          setBudgetMax(profile.budget_max ?? "");
          setBedrooms(profile.bedrooms ? String(profile.bedrooms) : "");
          setFurnishing(
            profile.furnishing === null ? "any" : profile.furnishing ? "furnished" : "unfurnished"
          );
          setSelectedStyleTagIds(profile.style_tags.map((tag) => tag.id));
        }
      } catch (err) {
        if (err instanceof Error && err.message === "AUTH_REQUIRED") {
          setMessage("Please sign in to manage your preferences.");
        } else {
          setMessage("Could not load preference settings.");
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

  const toggleStyleTag = (id: number) => {
    setSelectedStyleTagIds((prev) =>
      prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const counties = preferredCounties
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean);

      await upsertUserPreferenceProfile({
        profileId,
        preferred_counties: counties,
        budget_min: budgetMin ? Number(budgetMin) : null,
        budget_max: budgetMax ? Number(budgetMax) : null,
        bedrooms: bedrooms ? Number(bedrooms) : null,
        furnishing:
          furnishing === "any" ? null : furnishing === "furnished" ? true : false,
        style_tag_ids: selectedStyleTagIds,
      });

      setMessage("Preferences saved successfully.");
    } catch (err) {
      if (err instanceof Error && err.message === "AUTH_REQUIRED") {
        setMessage("Please sign in to save preferences.");
      } else {
        setMessage("Could not save preferences.");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="mx-auto max-w-3xl bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Your Preference Profile</h1>
        <p className="mt-2 text-sm text-gray-600">
          Set your counties, budget band, interior style, and furnishing preference to improve recommendations.
        </p>

        {loading ? (
          <p className="mt-6 text-gray-600">Loading preferences...</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">Preferred Counties</label>
              <input
                type="text"
                value={preferredCounties}
                onChange={(e) => setPreferredCounties(e.target.value)}
                placeholder="Nairobi, Kiambu, Kajiado"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Min Budget (KES)</label>
                <input
                  type="number"
                  value={budgetMin}
                  onChange={(e) => setBudgetMin(e.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Max Budget (KES)</label>
                <input
                  type="number"
                  value={budgetMax}
                  onChange={(e) => setBudgetMax(e.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Bedrooms</label>
                <input
                  type="number"
                  min={0}
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Furnishing</label>
              <select
                value={furnishing}
                onChange={(e) => setFurnishing(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="any">Any</option>
                <option value="furnished">Furnished</option>
                <option value="unfurnished">Unfurnished</option>
              </select>
            </div>

            <div>
              <p className="block text-sm font-medium text-gray-700">Style Tags</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {styleTags.map((tag) => {
                  const active = selectedStyleTagIds.includes(tag.id);
                  return (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => toggleStyleTag(tag.id)}
                      className={`rounded-full px-3 py-1 text-sm border ${
                        active
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-300"
                      }`}
                    >
                      {tag.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {message && <p className="text-sm text-blue-700">{message}</p>}

            <button
              type="submit"
              disabled={saving}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Preferences"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
