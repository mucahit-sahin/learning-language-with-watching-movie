import React from "react";
import screenfull from "screenfull";
import WordCard from "./WordCard";

const VideoUI = ({
  channelUrl,
  isPlaying,
  volume,
  setVolume,
  setIsPlaying,
  playerContainerRef,
  playerRef,
  playedSubtitleText,
  playedSubtitleText2,
  selectWord,
  setSelectWord,
  played,
}) => {
  const [soundIcon, setSoundIcon] = React.useState(
    "url(https://img.icons8.com/flat-round/344/high-volume--v1.png)"
  );
  const [fontSizeModal, setFontSizeModal] = React.useState(false);
  const [fontSize, setFontSize] = React.useState("text-2xl");

  const handleVolumeChange = (e) => {
    setVolume(e);
    document.querySelector("video").volume = e;
    if (e > 0) {
      setSoundIcon(
        "url(https://img.icons8.com/flat-round/344/high-volume--v1.png)"
      );
    } else {
      setSoundIcon("url(https://img.icons8.com/flat-round/344/mute.png)");
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleFullScreen = () => {
    screenfull.toggle(playerContainerRef.current);
  };

  const formatTime = (time) => {
    // Hours, minutes and seconds
    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = Math.floor(time % 60);
    if (hrs > 0) {
      return `${hrs}:${mins < 10 ? "0" : ""}${mins}:${
        secs < 10 ? "0" : ""
      }${secs}`;
    } else {
      return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    }
  };

  return (
    <div
      id="video-ui"
      className="absolute left-0 bottom-0 w-full z-50 p-4 bg-transparent flex flex-col"
    >
      <div className="flex flex-row justify-between">
        {/* subtitle */}

        <div className="p-2 w-full flex flex-col items-center justify-center bg-black bg-opacity-20">
          <div
            className={` flex flex-row text-white font-semibold ${fontSize}`}
          >
            {playedSubtitleText}
          </div>
          <div
            className={`flex flex-row text-gray-500 font-semibold ${fontSize}`}
          >
            {playedSubtitleText2}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          {/* video seek bar */}
          <input
            type="range"
            min="0"
            max={playerRef.current && playerRef.current.getDuration()}
            value={document.querySelector("video") ? played : 0}
            onChange={(e) => playerRef.current.seekTo(e.target.value)}
            className="w-full h-full"
          />
        </div>
        <div className="flex flex-row justify-between">
          {/* played duration (hh:mm:ss)*/}
          <span className="text-white text-sm font-bold">
            {document.querySelector("video") ? formatTime(played) : "00:00:00"}
          </span>

          {/* video duration (hh:mm:ss)*/}
          <span className="ml-auto text-white text-sm font-bold">
            {document.querySelector("video")
              ? formatTime(document.querySelector("video").duration)
              : "00:00:00"}
          </span>
        </div>
      </div>
      <div className="flex flex-row items-center">
        {/* play button */}
        <button
          className="w-16 h-16 bg-transparent font-semibold hover:text-white"
          style={{
            backgroundImage:
              isPlaying === true
                ? "url(https://img.icons8.com/color/48/000000/pause.png)"
                : "url(https://img.icons8.com/color/48/000000/play.png)",
            backgroundSize: "cover",
          }}
          onClick={() => handlePlayPause()}
        ></button>
        {/* volume range button */}
        <div className="flex flex-row items-center ml-4">
          <button
            className="w-10 h-10 bg-transparent font-semibold hover:text-white"
            style={{
              backgroundImage: soundIcon,
              backgroundSize: "cover",
            }}
            onClick={() => handleVolumeChange(volume === 0 ? 1 : 0)}
          ></button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            className="w-16 h-16 bg-transparent"
            style={{
              backgroundImage:
                "url(https://img.icons8.com/color/48/000000/volume-high.png)",
              backgroundSize: "cover",
            }}
            onChange={(e) => handleVolumeChange(e.target.value)}
          />
        </div>
        {/* Font-size button */}
        <button
          className="w-10 h-10 ml-auto mr-2 bg-transparent font-semibold hover:text-white"
          style={{
            backgroundImage:
              "url(https://img.icons8.com/stickers/344/sentence-case.png)",
            backgroundSize: "cover",
          }}
          onClick={() => setFontSizeModal(!fontSizeModal)}
        ></button>
        {/* full screen button */}
        <button
          className="w-10 h-10 bg-transparent font-semibold hover:text-white rounded"
          style={{
            backgroundImage:
              "url(https://img.icons8.com/color/48/000000/full-screen.png)",
            backgroundSize: "cover",
          }}
          onClick={() => toggleFullScreen()}
        ></button>
      </div>
      {/* font size modal */}
      {fontSizeModal && (
        <div className="absolute bottom-0 right-0 bg-black bg-opacity-20">
          <div className="flex items-center justify-center h-screen">
            <div className="relative inline-block">
              <div className="absolute right-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-xl dark:bg-gray-800">
                <div className="flex flex-row items-center px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                  <span
                    className="flex-1"
                    onClick={() => {
                      setFontSize("text-2xl");
                      setFontSizeModal(!fontSizeModal);
                    }}
                  >
                    Small
                  </span>
                  {fontSize === "text-2xl" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <div className="flex flex-row items-center px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                  <span
                    className="flex-1"
                    onClick={() => {
                      setFontSize("text-3xl");
                      setFontSizeModal(!fontSizeModal);
                    }}
                  >
                    Medium
                  </span>
                  {fontSize === "text-3xl" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <div className="flex flex-row items-center px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                  <span
                    className="flex-1"
                    onClick={() => {
                      setFontSize("text-4xl");
                      setFontSizeModal(!fontSizeModal);
                    }}
                  >
                    Large
                  </span>
                  {fontSize === "text-4xl" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* word card modal */}

      <WordCard word={selectWord} setSelectWord={setSelectWord} />
    </div>
  );
};

export default VideoUI;
