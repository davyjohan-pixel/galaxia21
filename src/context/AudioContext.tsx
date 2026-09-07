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

const STREAM_URL = "https://cp.usa8.fastcast4u.com/proxy/galaxia21v2?mp=/1";

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.9);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create persistent audio element
    const audio = new Audio();
    audio.preload = "none";
    audio.crossOrigin = "anonymous";
    audioRef.current = audio;

    const handleCanPlay = () => setIsLoading(false);
    const handleWaiting = () => setIsLoading(true);
    const handlePlaying = () => {
      setIsLoading(false);
      setIsPlaying(true);
    };
    const handlePause = () => setIsPlaying(false);
    const handleError = () => {
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

    // Refresh stream source to ensure no buffering delay from past live stream
    audioRef.current.src = `${STREAM_URL}&nocache=${Date.now()}`;
    audioRef.current.volume = isMuted ? 0 : volume;

    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Audio playback error:", err);
        setIsPlaying(false);
        setIsLoading(false);
      });
  };

  const pauseAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.src = ""; // stop downloading stream bandwidth
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
