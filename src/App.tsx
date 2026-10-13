import { useRef, useState, useEffect, useCallback, Suspense, lazy } from "react";
import "./App.css";
import WeddingLoading from "./components/WeddingLoading";

const WelcomePage = lazy(() => import("./components/WelcomePage"));
const MainLandingPage = lazy(() => import("./pages/MainLandingPage"));

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const playMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const playback = audio.play();
    if (playback) {
      playback.catch(() => setAudioEnabled(false));
    } else {
      setAudioEnabled(true);
    }
  }, []);

  useEffect(() => {
    // Try to start the soundtrack as soon as the invitation page loads.
    // Browsers that block audible autoplay will start it from the envelope tap.
    playMusic();
  }, [playMusic]);

  const startMusic = () => playMusic();

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      return;
    }

    playMusic();
  };

  const handleOpenInvitation = () => {
    setShowWelcome(false);
    // TODO: Navigate to main landing page
    console.log("Đang mở thiệp cưới...");
  };

  return (
    <div className="min-h-screen">
      <audio
        ref={audioRef}
        autoPlay
        loop
        preload="auto"
        className="hidden"
        onPlay={() => setAudioEnabled(true)}
        onPause={() => setAudioEnabled(false)}
      >
        <source src="/music/wedding-music.mp3" type="audio/mpeg" />
        Trình duyệt của bạn chưa hỗ trợ phát nhạc.
      </audio>
      <Suspense fallback={<WeddingLoading />}>
        {showWelcome ? (
          <WelcomePage onOpen={handleOpenInvitation} onStartMusic={startMusic} />
        ) : (
          <MainLandingPage audioEnabled={audioEnabled} onToggleAudio={toggleAudio} />
        )}
      </Suspense>
    </div>
  );
}

export default App;
