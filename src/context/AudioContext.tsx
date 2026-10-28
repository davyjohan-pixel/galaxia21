"use client";

import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from "react";

interface AudioContextType {
  isPlaying: boolean;
  isLoading: boolean;
  isMuted: boolean;
  volume: number;
  togglePlay: () => void;
  playAudio: () => void;
  pauseAudio: () => void;
  handleVolumeChange: (newVol: number) => void;
  toggleMute: () => void;
  streamUrl: string;
}

// Correct valid streaming server URL for Galaxia 21 HRNS
const STREAM_URL = "https://usa8.fastcast4u.com/proxy/galaxia21v2?mp=/1";

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.9);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const updateMediaSessionMetadata = useCallback(() => {
    if (typeof window === "undefined" || !("mediaSession" in navigator)) return;

    try {
      const origin = window.location.origin;
      navigator.mediaSession.metadata = new MediaMetadata({
        title: "Galaxia 21 — 95.1 FM En Vivo",
        artist: "La Radio de Lempira",
        album: "Gracias, Lempira • HRNS",
        artwork: [
          {
            src: `${origin}/icon-192.png`,
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: `${origin}/icon-512.png`,
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: `${origin}/logo-galaxia-hd.png`,
            sizes: "1024x1024",
            type: "image/png",
          },
        ],
      });
    } catch (e) {
      console.warn("MediaSession metadata not supported:", e);
    }
  }, []);

  const pauseAudio = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.src = ""; // release network connection
    setIsPlaying(false);
    setIsLoading(false);
    if (typeof window !== "undefined" && "mediaSession" in navigator) {
      navigator.mediaSession.playbackState = "paused";
    }
  }, []);

  const playAudio = useCallback(() => {
    if (!audioRef.current) return;
    setIsLoading(true);
    updateMediaSessionMetadata();

    // Direct streaming URL without extra crossOrigin restrictions
    audioRef.current.src = STREAM_URL;
    audioRef.current.volume = isMuted ? 0 : volume;

    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setIsLoading(false);
          updateMediaSessionMetadata();
          if (typeof window !== "undefined" && "mediaSession" in navigator) {
            navigator.mediaSession.playbackState = "playing";
          }
        })
        .catch((err) => {
          console.error("Audio playback play() failed:", err);
          setIsPlaying(false);
          setIsLoading(false);
        });
    }
  }, [isMuted, volume, updateMediaSessionMetadata]);

  useEffect(() => {
    // Create persistent HTML5 audio element for live radio
    const audio = new Audio();
    audio.preload = "none";
    audioRef.current = audio;

    const handleCanPlay = () => setIsLoading(false);
    const handleWaiting = () => setIsLoading(true);
    const handlePlaying = () => {
      setIsLoading(false);
      setIsPlaying(true);
      updateMediaSessionMetadata();
      if ("mediaSession" in navigator) {
        navigator.mediaSession.playbackState = "playing";
      }
    };
    const handlePause = () => {
      setIsPlaying(false);
      if ("mediaSession" in navigator) {
        navigator.mediaSession.playbackState = "paused";
      }
    };
    const handleError = (e: Event) => {
      console.error("Audio stream error:", e);
      setIsLoading(false);
      setIsPlaying(false);
    };

    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("playing", handlePlaying);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("error", handleError);

    // Initialize lock screen MediaSession metadata & handlers
    updateMediaSessionMetadata();
    if ("mediaSession" in navigator) {
      try {
        navigator.mediaSession.setActionHandler("play", () => playAudio());
        navigator.mediaSession.setActionHandler("pause", () => pauseAudio());
        navigator.mediaSession.setActionHandler("stop", () => pauseAudio());
      } catch {
        // Ignore unsupported action handlers
      }
    }

    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("playing", handlePlaying);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("error", handleError);
      audio.pause();
      audio.src = "";
    };
  }, [playAudio, pauseAudio, updateMediaSessionMetadata]);

  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : newVol;
    }
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (audioRef.current) {
      audioRef.current.volume = newMuted ? 0 : volume;
    }
  };

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        isLoading,
        isMuted,
        volume,
        togglePlay,
        playAudio,
        pauseAudio,
        handleVolumeChange,
        toggleMute,
        streamUrl: STREAM_URL,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
