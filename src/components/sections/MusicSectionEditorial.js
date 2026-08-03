"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ExternalLink, Music2 } from "lucide-react";
import { spotifyTrackConfig, DEFAULT_ROLE } from "../../data/spotifyTracks";

function Cover({ src, alt, size = 56 }) {
  const [errored, setErrored] = useState(false);
  const style = {
    width: size,
    height: size,
    borderRadius: 14,
    border: "1px solid var(--border)",
    background: "var(--control-bg)",
    overflow: "hidden",
    flexShrink: 0,
  };

  if (!src || errored) {
    return (
      <div style={style} aria-hidden="true" />
    );
  }

  return (
    <div style={style}>
      <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        onError={() => setErrored(true)}
      />
    </div>
  );
}

function parseSpotifyId(url) {
  if (!url) return null;
  const match = url.match(/spotify\.com\/track\/([a-zA-Z0-9]+)/);
  return match?.[1] ?? null;
}

function formatNumberCompact(n) {
  const num = typeof n === "string" ? Number(String(n).replace(/[^\d]/g, "")) : n;
  if (!Number.isFinite(num) || num <= 0) return null;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(num >= 10_000_000 ? 0 : 1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(num >= 10_000 ? 0 : 1)}K`;
  return String(num);
}

function resolveCreditLinks(credit) {
  const source = credit.source || "spotify";
  const youtubeUrl = credit.youtubeUrl || credit.youtube_url || null;
  const soundcloudUrl =
    source === "soundcloud" ? credit.url || credit.soundcloudUrl || null : credit.soundcloudUrl || null;
  const spotifyUrl =
    source === "soundcloud"
      ? credit.spotifyUrl || credit.spotify_url || null
      : credit.spotifyUrl || credit.spotify_url || credit.url || null;
  return { spotifyUrl, youtubeUrl, soundcloudUrl };
}

function normalizeTitle(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/[\u2019']/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function findCreditByTitle(credits, query) {
  const q = normalizeTitle(query);
  if (!q) return null;
  const exact = credits.find((c) => normalizeTitle(c.trackTitle) === q);
  if (exact) return exact;
  return credits.find((c) => normalizeTitle(c.trackTitle).includes(q)) || null;
}

const LinkPill = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 text-sm"
    style={{
      fontFamily: "var(--font-geist-sans)",
      color: "var(--foreground)",
      textDecoration: "none",
      padding: "8px 10px",
      borderRadius: 999,
      border: "1px solid var(--border)",
      background: "var(--control-bg)",
    }}
  >
    <ExternalLink className="w-4 h-4" />
    {children}
  </a>
);

const PlatformLink = ({ href, platform }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 text-sm"
    style={{
      fontFamily: "var(--font-geist-sans)",
      color: "var(--foreground)",
      textDecoration: "none",
      padding: "7px 10px",
      borderRadius: 999,
      border: "1px solid var(--border)",
      background: "var(--control-bg)",
    }}
  >
    <ExternalLink className="w-4 h-4" />
    {platform}
  </a>
);

const MusicSectionEditorial = () => {
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const [creditsExpanded, setCreditsExpanded] = useState(false);

  const CREDITS_PREVIEW = 3;

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        let apiCredits = null;
        try {
          const res = await fetch("/api/spotify-credits");
          const data = await res.json();
          if (data?.credits?.length) {
            apiCredits = data.credits;
          } else if (data?.error) {
            console.warn("Spotify credits unavailable:", data.error);
          }
        } catch {
          // ignore; we'll fall back to config-only
        }

        const merged = (apiCredits ?? []).map((credit) => {
          const creditSpotifyId = credit.spotifyId || parseSpotifyId(credit.spotifyUrl);
          const config = spotifyTrackConfig.find((t) => {
            const cfgId = parseSpotifyId(t.url);
            return (creditSpotifyId && cfgId && creditSpotifyId === cfgId) || t.url === credit.spotifyUrl;
          });

          return {
            ...credit,
            trackTitle: credit.trackTitle || credit.title,
            artist: credit.artist,
            year: config?.year || (credit.releaseDate ? String(new Date(credit.releaseDate).getFullYear()) : credit.year),
            role: config?.role || credit.role || DEFAULT_ROLE,
            description: config?.description || credit.description,
            plays: config?.plays || credit.plays,
            customGenre: config?.customGenre || credit.customGenre || credit.genre,
            youtubeUrl: config?.youtubeUrl || credit.youtubeUrl,
            source: config?.source || credit.source || "spotify",
            spotifyUrl: credit.spotifyUrl,
            imageUrl: config?.imageUrl || credit.imageUrl,
          };
        });

        const seenSpotifyIds = new Set(merged.map((c) => c.spotifyId || parseSpotifyId(c.spotifyUrl)).filter(Boolean));
        const configOnly = spotifyTrackConfig
          .filter((t) => {
            if (t.source !== "spotify") return true;
            const id = parseSpotifyId(t.url);
            return !id || !seenSpotifyIds.has(id);
          })
          .map((t, index) => ({
            trackTitle: t.title || t.trackTitle || `Track ${index + 1}`,
            artist: t.artist || "1mains",
            year: t.year,
            role: t.role || DEFAULT_ROLE,
            description: t.description,
            plays: t.plays,
            customGenre: t.customGenre || t.genre,
            youtubeUrl: t.youtubeUrl,
            source: t.source || "spotify",
            spotifyUrl: t.source === "spotify" ? t.url : null,
            url: t.source === "soundcloud" ? t.url : null,
            imageUrl: t.imageUrl,
          }));

        const all = [...merged, ...configOnly].filter((c) => c.trackTitle);
        all.sort((a, b) => String(b.year || "").localeCompare(String(a.year || "")));

        if (!cancelled) {
          setCredits(all);

          // Choose featured: explicit `featured: true` wins, otherwise highest plays, otherwise first.
          const explicitFeaturedIdx = all.findIndex((c) => c.featured === true);
          if (explicitFeaturedIdx >= 0) {
            setFeaturedIdx(explicitFeaturedIdx);
          } else {
            const playsValue = (x) => {
              const raw = x?.plays;
              const n = typeof raw === "string" ? Number(String(raw).replace(/[^\d]/g, "")) : raw;
              return Number.isFinite(n) ? n : 0;
            };
            const maxPlaysIdx = all.reduce((bestIdx, cur, idx) => {
              return playsValue(cur) > playsValue(all[bestIdx] ?? {}) ? idx : bestIdx;
            }, 0);
            setFeaturedIdx(maxPlaysIdx);
          }
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const featured = credits[featuredIdx] || null;
  const featuredLinks = featured ? resolveCreditLinks(featured) : null;

  const featuredTheyDontEvenKnow = useMemo(() => findCreditByTitle(credits, "they don't even know"), [credits]);
  const featuredHoldOn = useMemo(() => findCreditByTitle(credits, "hold on"), [credits]);

  // Keep the list focused: hide tracks already called out in Featured.
  const listCredits = useMemo(() => {
    const featuredKeys = new Set(
      [featuredTheyDontEvenKnow, featuredHoldOn]
        .filter(Boolean)
        .map((c) => normalizeTitle(c.trackTitle))
    );
    if (featuredKeys.size === 0) return credits;
    return credits.filter((c) => !featuredKeys.has(normalizeTitle(c.trackTitle)));
  }, [credits, featuredTheyDontEvenKnow, featuredHoldOn]);

  return (
    <section id="music" className="px-4 sm:px-6 py-7 sm:py-8">
      <div className="reading-container">
        <div className="section-title-block mb-3">
          <div className="kicker mb-2">Studio notes</div>
          <h2 className="section-heading section-heading-masthead text-2xl sm:text-3xl">
            Music
          </h2>
        </div>
        <p className="text-[15px] leading-relaxed mb-5" style={{ color: "var(--muted-foreground)" }}>
          A few credits + favorites—more like liner notes than a flex wall.
        </p>

        {/* Featured */}
        <div
          className="rounded-2xl border p-5 sm:p-6 mb-5"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          {loading ? (
            <div style={{ fontFamily: "var(--font-geist-sans)", color: "var(--muted-foreground)" }}>
              Loading credits…
            </div>
          ) : featuredTheyDontEvenKnow || featuredHoldOn ? (
            <div>
              <div className="section-title-block mb-3">
                <div className="kicker">Featured</div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[featuredTheyDontEvenKnow, featuredHoldOn].filter(Boolean).map((t) => {
                  const links = resolveCreditLinks(t);
                  return (
                    <div
                      key={`${t.trackTitle}-${t.spotifyUrl || t.url || ""}`}
                      className="rounded-2xl border p-4 sm:p-5"
                      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
                    >
                      <div className="flex items-start gap-3">
                        <Cover src={t.imageUrl} alt={`${t.trackTitle} cover`} size={64} />
                        <div className="min-w-0 flex-1">
                          <div className="section-heading text-lg font-semibold leading-snug">
                            {t.trackTitle}
                          </div>
                          <div
                            className="mt-1 text-sm"
                            style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-geist-sans)" }}
                          >
                            {t.artist ? `${t.artist} • ` : ""}{t.year || "—"} • {t.role || DEFAULT_ROLE}
                            {t.plays ? ` • ${formatNumberCompact(t.plays)} streams` : ""}
                          </div>
                        </div>
                      </div>

                      {t.description && (
                        <p className="mt-3 text-[14px] leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                          {t.description}
                        </p>
                      )}

                      <div className="mt-3 flex flex-wrap gap-2">
                        {links.spotifyUrl && <LinkPill href={links.spotifyUrl}>Spotify</LinkPill>}
                        {links.soundcloudUrl && <LinkPill href={links.soundcloudUrl}>SoundCloud</LinkPill>}
                        {links.youtubeUrl && <LinkPill href={links.youtubeUrl}>YouTube</LinkPill>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : featured ? (
            <div className="grid gap-5 sm:grid-cols-[1fr_240px] sm:items-start">
              <div className="min-w-0">
                <div className="flex items-start gap-4">
                  <div className="sm:hidden">
                    <Cover src={featured.imageUrl} alt={`${featured.trackTitle} cover`} size={96} />
                  </div>
                  <div className="hidden sm:block">
                    <Cover src={featured.imageUrl} alt={`${featured.trackTitle} cover`} size={72} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="section-title-block mb-2">
                      <div className="kicker mb-2">Featured</div>
                      <div className="section-heading text-xl sm:text-2xl font-semibold leading-snug">
                        {featured.trackTitle}
                      </div>
                    </div>
                    <div className="mt-1 text-sm" style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-geist-sans)" }}>
                      {featured.artist ? `${featured.artist} • ` : ""}{featured.year || "—"} • {featured.role || DEFAULT_ROLE}
                      {featured.plays ? ` • ${formatNumberCompact(featured.plays)} streams` : ""}
                    </div>
                  </div>
                </div>

                {featured.description && (
                  <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                    {featured.description}
                  </p>
                )}

                <div className="mt-5 flex flex-wrap gap-2">
                  {featuredLinks?.spotifyUrl && <LinkPill href={featuredLinks.spotifyUrl}>Spotify</LinkPill>}
                  {featuredLinks?.soundcloudUrl && <LinkPill href={featuredLinks.soundcloudUrl}>SoundCloud</LinkPill>}
                  {featuredLinks?.youtubeUrl && <LinkPill href={featuredLinks.youtubeUrl}>YouTube</LinkPill>}
                </div>
              </div>

              <div>
                <div
                  className="rounded-2xl border px-3 py-3"
                  style={{ borderColor: "var(--border)", background: "var(--control-bg)", fontFamily: "var(--font-geist-sans)" }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Music2 className="w-4 h-4" />
                      Up next
                    </div>
                    <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                      {credits.length} tracks
                    </div>
                  </div>

                  <div
                    className="mt-2"
                    style={{
                      maxHeight: 168,
                      overflowY: "auto",
                      paddingRight: 4,
                    }}
                  >
                    <div className="space-y-1.5">
                      {credits.slice(0, 8).map((c, idx) => (
                        <button
                          key={`${c.trackTitle}-${idx}`}
                          onClick={() => setFeaturedIdx(idx)}
                          className="w-full text-left rounded-xl border px-2.5 py-2 transition-colors"
                          style={{
                            borderColor: "var(--border)",
                            background: idx === featuredIdx ? "var(--control-bg-strong)" : "var(--surface-muted)",
                            color: "var(--foreground)",
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <Cover src={c.imageUrl} alt={`${c.trackTitle} cover`} size={32} />
                            <div className="min-w-0 flex-1">
                              <div className="text-sm font-medium truncate">{c.trackTitle}</div>
                              <div className="text-xs truncate" style={{ color: "var(--muted-foreground)" }}>
                                {c.year || "—"} • {c.role || DEFAULT_ROLE}
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ fontFamily: "var(--font-geist-sans)", color: "var(--muted-foreground)" }}>
              No credits found yet. Add items in `src/data/spotifyTracks.js`.
            </div>
          )}
        </div>

        {/* Credits list — stacked liner notes, collapsible */}
        {!loading && listCredits.length > 0 && (
          <div className="mb-5">
            <div className="flex items-baseline justify-between gap-3 mb-3">
              <div className="section-title-block">
                <div className="kicker">Credits</div>
              </div>
              <div
                className="text-xs"
                style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-geist-sans)" }}
              >
                {listCredits.length} tracks
              </div>
            </div>

            <div
              className="rounded-2xl border overflow-hidden"
              style={{ borderColor: "var(--border)", background: "var(--surface-muted)" }}
            >
              {(creditsExpanded ? listCredits : listCredits.slice(0, CREDITS_PREVIEW)).map((c, idx) => {
                const links = resolveCreditLinks(c);
                const streams = formatNumberCompact(c.plays);
                return (
                  <article
                    key={`${c.trackTitle}-${idx}`}
                    className="p-4 sm:p-5"
                    style={{
                      borderTop: idx === 0 ? "none" : "1px solid var(--border)",
                    }}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <Cover src={c.imageUrl} alt={`${c.trackTitle} cover`} size={56} />

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                          <div className="section-heading text-base sm:text-lg font-semibold leading-snug">
                            {c.trackTitle}
                          </div>
                          <div
                            className="text-xs shrink-0"
                            style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-geist-sans)" }}
                          >
                            {c.year || "—"}
                            {streams ? ` · ${streams} streams` : ""}
                          </div>
                        </div>

                        <div
                          className="mt-1 text-sm"
                          style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-geist-sans)" }}
                        >
                          {c.artist ? `${c.artist} · ` : ""}
                          {c.role || DEFAULT_ROLE}
                          {c.customGenre ? ` · ${c.customGenre}` : ""}
                        </div>

                        {c.description && (
                          <p className="mt-2 text-[14px] leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                            {c.description}
                          </p>
                        )}

                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          {links.spotifyUrl && <PlatformLink href={links.spotifyUrl} platform="Spotify" />}
                          {links.soundcloudUrl && <PlatformLink href={links.soundcloudUrl} platform="SoundCloud" />}
                          {links.youtubeUrl && <PlatformLink href={links.youtubeUrl} platform="YouTube" />}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}

              {listCredits.length > CREDITS_PREVIEW && (
                <div
                  className="px-4 sm:px-5 py-3"
                  style={{ borderTop: "1px solid var(--border)" }}
                >
                  <button
                    type="button"
                    onClick={() => setCreditsExpanded((v) => !v)}
                    className="text-sm underline"
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      color: "var(--muted-foreground)",
                      textUnderlineOffset: 3,
                    }}
                    aria-expanded={creditsExpanded}
                  >
                    {creditsExpanded
                      ? "Show less"
                      : `Show ${listCredits.length - CREDITS_PREVIEW} more`}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* About + link out */}
        <div>
          <div
            className="group rounded-3xl border overflow-hidden"
            style={{ borderColor: "var(--border)", background: "var(--surface-muted)" }}
          >
            <div className="relative isolate">
              {/* Dedicated clip layer: filtered backgrounds ignore parent radius in some engines */}
              <div
                className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl"
                aria-hidden="true"
              >
                <div
                  className="absolute inset-0 rounded-3xl bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/logos/studio.jpg')",
                    filter: "saturate(0.9) contrast(1.05)",
                  }}
                />
                <div
                  className="absolute inset-0 rounded-3xl transition-opacity duration-500 ease-out group-hover:opacity-0"
                  style={{ background: "var(--studio-veil)" }}
                />
              </div>

              <div className="relative z-10 p-5 sm:p-6">
                <div className="max-w-[560px]">
                  <div className="section-heading text-xl sm:text-2xl font-semibold leading-snug text-[var(--foreground)] transition-[color,text-shadow] duration-300 group-hover:text-white group-hover:[text-shadow:0_1px_2px_rgba(0,0,0,0.55),0_0_24px_rgba(0,0,0,0.35)]">
                    This is just the beginning!
                  </div>
                  <p className="mt-3 text-[15px] leading-relaxed text-[var(--muted-foreground)] transition-[color,text-shadow] duration-300 group-hover:text-white/95 group-hover:[text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
                    My CS + music backgrounds blend all the time; over the past few years I’ve worked on
                    records that have reached hundreds of thousands of streams, and I've since 
                    helped shape the sound behind a handful of my favorite artists! Follow my journey below.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2" style={{ fontFamily: "var(--font-geist-sans)" }}>
                    <a
                      href="https://mains.live/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm rounded-full border px-3 py-2 transition-[color,background-color,border-color,box-shadow,transform] duration-200 border-[var(--border)] bg-[var(--control-bg)] !text-[var(--muted-foreground)] no-underline hover:no-underline group-hover:border-white/25 group-hover:bg-white/10 group-hover:!text-white/95 hover:!border-amber-400/55 hover:!bg-amber-500/15 hover:!text-amber-200 hover:shadow-[0_0_22px_rgba(245,158,11,0.55),0_0_48px_rgba(251,191,36,0.28),inset_0_0_20px_rgba(254,243,199,0.12)] hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400/80 active:scale-[0.99]"
                    >
                      <ExternalLink className="w-4 h-4 shrink-0" />
                      Visit mains.live
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicSectionEditorial;

