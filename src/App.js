import React, { useRef, useState, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaRedo
} from "react-icons/fa";
import "./App.css";

const playlist = [
  {
    title: "When I am Powerless",
    artist: "jumadiharyanto",
    src: "/music/song1.mp3",
    cover: "https://picsum.photos/300?random=1"
  },
  {
    title: "Love Syndrome",
    artist: "AI Pop",
    src: "/music/song2.mp3",
    cover: "https://picsum.photos/300?random=2"
  },
  {
    title: "Tere Sang- With You",
    artist: "80sElectricmusicandlyrics",
    src: "/music/song3.mp3",
    cover: "https://picsum.photos/300?random=3"
  },
  {
    title: "Hero Mass Entry",
    artist: "Tollywood Indian",
    src: "/music/song4.mp3",
    cover: "https://picsum.photos/300?random=4"
  },
  {
    title: "Indian Deep House",
    artist: "Jack",
    src: "/music/song5.mp3",
    cover: "https://picsum.photos/300?random=5"
  }
];

const formatTime = (time) => {
  if (isNaN(time)) return "00:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

function App() {
  const audioRef = useRef(null);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loop, setLoop] = useState(true);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentTrack]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
  };

  const handlePrev = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  const handleTrackClick = (index) => {
    setCurrentTrack(index);
    setIsPlaying(true);
  };

  return (
    <div className="app">
      <div className="player">
        <img
          src={playlist[currentTrack].cover}
          alt="cover"
          className="cover"
        />
        <h2>{playlist[currentTrack].title}</h2>
        <p>{playlist[currentTrack].artist}</p>

        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={(e) => {
            const seekTime = parseFloat(e.target.value);
            audioRef.current.currentTime = seekTime;
            setCurrentTime(seekTime);
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        <div className="controls">
          <button onClick={handlePrev}><FaStepBackward /></button>
          <button onClick={togglePlay}>{isPlaying ? <FaPause /> : <FaPlay />}</button>
          <button onClick={handleNext}><FaStepForward /></button>
          <button onClick={() => setLoop(!loop)} title="Toggle Loop">
            <FaRedo style={{ color: loop ? "#00bcd4" : "#aaa" }} />
          </button>
        </div>

        <audio
          ref={audioRef}
          src={playlist[currentTrack].src}
          onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
          onLoadedMetadata={() => setDuration(audioRef.current.duration)}
          onEnded={handleNext}
          loop={loop}
          autoPlay
        />

        <div className="playlist">
          {playlist.map((track, index) => (
            <div
              key={index}
              className={`track ${index === currentTrack ? "active" : ""}`}
              onClick={() => handleTrackClick(index)}
            >
              <img src={track.cover} alt="cover" />
              <div>
                <p>{track.title}</p>
                <small>{track.artist}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
