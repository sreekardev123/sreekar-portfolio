"use client";

import { useEffect, useState, useCallback } from "react";
import useSound from "use-sound";

// Global state so mute preference persists across components
let globalIsMuted = true;
let listeners: Array<(muted: boolean) => void> = [];

export function useUISounds() {
  const [isMuted, setIsMuted] = useState(globalIsMuted);

  // use-sound hooks
  const [playHoverSound] = useSound("/sounds/hover.mp3", { volume: 0.15, soundEnabled: !isMuted });
  const [playClickSound] = useSound("/sounds/click.mp3", { volume: 0.25, soundEnabled: !isMuted });
  const [playTypeSound] = useSound("/sounds/type.mp3", { volume: 0.15, soundEnabled: !isMuted, interrupt: true });

  useEffect(() => {
    setIsMuted(globalIsMuted);
    const listener = (muted: boolean) => setIsMuted(muted);
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, []);

  const toggleMute = useCallback(() => {
    globalIsMuted = !globalIsMuted;
    listeners.forEach((l) => l(globalIsMuted));
  }, []);

  const playHover = useCallback(() => {
    if (!globalIsMuted) {
      playHoverSound();
    }
  }, [playHoverSound]);

  const playClick = useCallback(() => {
    if (!globalIsMuted) {
      playClickSound();
    }
  }, [playClickSound]);

  const playType = useCallback(() => {
    if (!globalIsMuted) {
      playTypeSound();
    }
  }, [playTypeSound]);

  return { playHover, playClick, playType, isMuted, toggleMute };
}
