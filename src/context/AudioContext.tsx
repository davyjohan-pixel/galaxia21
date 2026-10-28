"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";

interface AudioContextType {
  isPlaying: boolean;
  isLoading: boolean;
  isMuted: boolean;
  volume: number;
  volumeSupported: boolean;
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
  const [volumeSupported, setVolumeSupported] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const volumeRef = useRef(0.9);
  const isMutedRef = useRef(false);

  // Keep refs in sync with state
  volumeRef.current = volume;
  isMutedRef.current = isMuted;

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
            src: `${origin}/lockscreen-square.png`,
            sizes: "800x800",
            type: "image/png",
          },
          {
            src: `${origin}/lockscreen-cover.png`,
            sizes: "960x640",
            type: "image/png",
          },
          {
            src: `${origin}/icon-512.png`,
            sizes: "512x512",
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
    try {
      audioRef.current.volume = isMutedRef.current ? 0 : volumeRef.current;
    } catch {
      // Ignore mobile volume restrictions
    }

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
  }, [updateMediaSessionMetadata]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  }, [isPlaying, pauseAudio, playAudio]);

  const handleVolumeChange = useCallback((newVol: number) => {
    const clamped = Math.max(0, Math.min(1, newVol));
    setVolume(clamped);
    volumeRef.current = clamped;

    if (audioRef.current) {
      try {
        audioRef.current.volume = isMutedRef.current ? 0 : clamped;
      } catch {
        // Some mobile browsers restrict setting volume programmatically
      }
    }

    if (clamped > 0 && isMutedRef.current) {
      setIsMuted(false);
      isMutedRef.current = false;
      if (audioRef.current) {
        try {
          audioRef.current.volume = clamped;
        } catch {
          // Ignore
        }
      }
    }
  }, []);

  const toggleMute = useCallback(() => {
    const newMuted = !isMutedRef.current;
    setIsMuted(newMuted);
    isMutedRef.current = newMuted;
    if (audioRef.current) {
      // `muted` works on iOS too, unlike `volume`
      audioRef.current.muted = newMuted;
      try {
        audioRef.current.volume = newMuted ? 0 : volumeRef.current;
      } catch {
        // Ignore
      }
    }
  }, []);

  // Store action handlers in refs to avoid recreating the audio element
  const playAudioRef = useRef(playAudio);
  const pauseAudioRef = useRef(pauseAudio);
  playAudioRef.current = playAudio;
  pauseAudioRef.current = pauseAudio;

  useEffect(() => {
    // Create persistent HTML5 audio element for live radio - ONLY ONCE
    const audio = new Audio();
    audio.preload = "none";
    audioRef.current = audio;

    // iOS Safari ignores programmatic volume (always stays at 1): detect it
    try {
      audio.volume = 0.5;
      if (audio.volume !== 0.5) setVolumeSupported(false);
      audio.volume = volumeRef.current;
    } catch {
      setVolumeSupported(false);
    }

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
        navigator.mediaSession.setActionHandler("play", () => playAudioRef.current());
        navigator.mediaSession.setActionHandler("pause", () => pauseAudioRef.current());
        navigator.mediaSession.setActionHandler("stop", () => pauseAudioRef.current());
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
  }, [updateMediaSessionMetadata]);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        isLoading,
        isMuted,
        volume,
        volumeSupported,
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
