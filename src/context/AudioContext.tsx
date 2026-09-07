"use client";

import React, { createContext, useContext, useState, useRef, useEffect } from "react";

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
    };
    const handlePause = () => setIsPlaying(false);
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

    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("playing", handlePlaying);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("error", handleError);
      audio.pause();
      audio.src = "";
    };
  }, []);

  const playAudio = () => {
    if (!audioRef.current) return;
    setIsLoading(true);

    // Direct streaming URL without extra crossOrigin restrictions
    audioRef.current.src = STREAM_URL;
    audioRef.current.volume = isMuted ? 0 : volume;

    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Audio playback play() failed:", err);
          setIsPlaying(false);
          setIsLoading(false);
        });
    }
  };

  const pauseAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.src = ""; // release network connection
    setIsPlaying(false);
    setIsLoading(false);
  };

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
