import { useState, useRef, useEffect } from "react";

interface AudioPlayerProps {
  sound: string;
  actionToBePerformed: boolean;
  clearActionToBePerformed: () => void;
}

const AudioPlayer = ({
  sound,
  actionToBePerformed,
  clearActionToBePerformed,
}: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement && actionToBePerformed) {
      console.log("actionToBePerformed", actionToBePerformed);
      if (audioElement.paused) audioElement.play();
      else audioElement.pause();
      clearActionToBePerformed();
    }
  }, [actionToBePerformed]);

  return (
    <div>
      <audio
        id="audioPlayer"
        controls
        ref={audioRef}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={sound} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <p>{isPlaying ? "Playing" : "Paused"}</p>
    </div>
  );
};

export default AudioPlayer;
