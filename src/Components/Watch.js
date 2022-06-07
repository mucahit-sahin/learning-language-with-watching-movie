import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import VideoUI from "./VideoUI";

const Watch = () => {
  const playerContainerRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const [isStart, setIsStart] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [played, setPlayed] = useState(0);

  const [videoFilePath, setVideoFilePath] = useState(null);
  const [subtitle, setSubtitle] = useState(null);
  const [subtitle2, setSubtitle2] = useState(null);

  const [playedSubtitleText, setPlayedSubtitleText] = useState(null);
  const [playedSubtitleText2, setPlayedSubtitleText2] = useState(null);
  const [selectWord, setSelectWord] = useState(null);

  let fileReader;

  const loadOriginalSubtitle = (e) => {
    let file = e.target.files;
    fileReader = new FileReader();
    fileReader.onloadend = () => {
      let content = fileReader.result;
      // let text = deleteLines(content, 3);
      content = cleanContent(content);
      // … do something with the 'content' …
      setSubtitle(content);
    };
    fileReader.readAsText(file[0]);
  };
  const loadTranslatedSubtitle = (e) => {
    let file = e.target.files;
    fileReader = new FileReader();
    fileReader.onloadend = () => {
      let content = fileReader.result;
      // let text = deleteLines(content, 3);
      content = cleanContent(content);
      // … do something with the 'content' …
      console.log(content);
      setSubtitle2(content);
    };
    fileReader.readAsText(file[0], "ISO-8859-9");
  };
  const cleanContent = (string) => {
    string = string.replace(/^\s*[\r\n]/gm, "");
    let array = string.split(new RegExp(/[\r\n]/gm));
    let newArray = [];
    let subItem = {
      id: 1,
      start: "",
      end: "",
      text: "",
    };
    let index = 1;
    array.forEach((element) => {
      if (index.toString() === element.trim()) {
      } else if (element.split(" --> ").length > 1) {
        subItem.start = element.split(" --> ")[0];
        subItem.end = element.split(" --> ")[1];
        // convert to milliseconds
        subItem.start = convertToSeconds(subItem.start);
        subItem.end = convertToSeconds(subItem.end);
      } else if (index + 1 === parseInt(element)) {
        index++;
        subItem.text = subItem.text.trim();
        newArray.push(subItem);
        subItem = {
          id: parseInt(element),
          start: "",
          end: "",
          text: "",
        };
      } else {
        subItem.text += " " + element;
      }
    });
    console.log(newArray);
    return newArray;
  };
  const convertToSeconds = (time) => {
    let timeArray = time.split(":");
    let seconds = 0;
    timeArray.forEach((element) => {
      seconds = seconds * 60 + parseFloat(element);
    });
    return seconds;
  };
  const writeSubtitle = (sub) => {
    let words = sub.split(" ");
    return words.map((word) => {
      return (
        <span onClick={translateWord} className="hover:text-yellow-400">
          {word}&nbsp;
        </span>
      );
    });
  };
  const onTimeUpdate = (e) => {
    let currentTime = e.target.currentTime;
    setPlayed(currentTime);
    let currentSubtitle = subtitle.filter(
      (item) => item.start <= currentTime && item.end >= currentTime
    );
    let currentSubtitle2 = subtitle2.filter(
      (item) => item.start <= currentTime && item.end >= currentTime
    );
    if (currentSubtitle.length > 0) {
      let words = writeSubtitle(currentSubtitle[0].text);
      setPlayedSubtitleText(words);
    } else {
      setPlayedSubtitleText(null);
    }
    if (currentSubtitle2.length > 0) {
      setPlayedSubtitleText2(currentSubtitle2[0].text);
    } else {
      setPlayedSubtitleText2(null);
    }
  };
  const translateWord = (word) => {
    setSelectWord(word.target.innerText);
  };
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);
  return (
    <div className="h-screen w-screen flex flex-row">
      <div
        id="video-container"
        ref={playerContainerRef}
        className="container relative text-gray-400 bg-gray-900 body-font h-screen"
        style={{ width: "calc(100vm - 300px)" }}
      >
        {!isStart && (
          <div className="fixed left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2  p-2 flex flex-col bg-neutral-700 rounded">
            <div className="flex flex-row items-center">
              <span className="text-white mr-3">Video File:</span>
              <input
                id="film"
                type="file"
                className="hidden"
                accept="video/*,.mkv"
                onChange={(e) => {
                  setVideoFilePath(URL.createObjectURL(e.target.files[0]));
                }}
              />
              <button
                className="w-full px-4 py-1 text-white transition-colors duration-200 transform bg-blue-600 rounded-md focus:outline-none sm:w-auto sm:mx-1 hover:bg-blue-500 focus:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-40 font-semibold"
                onClick={() => {
                  document.querySelector("#film").click();
                }}
              >
                Select Video
              </button>
            </div>
            <div className="flex flex-col">
              <span className="text-white py-1">Original Subtitle:</span>
              <input
                id="subtitle"
                type="file"
                name="subtitle"
                accept=".srt"
                onChange={loadOriginalSubtitle}
              />
            </div>
            <div className="flex flex-col py-1 ">
              <span className="text-white py-1">Native Subtitle:</span>
              {/* accept srt file */}
              <input
                id="subtitle"
                type="file"
                name="subtitle"
                accept=".srt"
                onChange={loadTranslatedSubtitle}
              />
            </div>
            <div className="flex flex-col py-1">
              <button
                className="w-full px-4 py-1 text-white transition-colors duration-200 transform bg-blue-600 rounded-md focus:outline-none sm:w-auto sm:mx-1 hover:bg-blue-500 focus:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-40 font-semibold"
                onClick={() => {
                  if (videoFilePath && subtitle && subtitle2) {
                    setIsStart(true);
                  } else {
                    alert("Please select all files");
                  }
                }}
              >
                Start
              </button>
            </div>
          </div>
        )}
        {isStart && (
          <>
            <ReactPlayer
              ref={playerRef}
              url={videoFilePath}
              className="absolute top-0 left-0 z-10 w-full h-full transition-all"
              width="100%"
              height="100%"
              playing={isPlaying}
              config={{
                file: {
                  attributes: {
                    onTimeUpdate: (a) => {
                      onTimeUpdate(a);
                    },
                  },
                },
              }}
            />

            <VideoUI
              setIsPlaying={setIsPlaying}
              isPlaying={isPlaying}
              playerContainerRef={playerContainerRef}
              playerRef={playerRef}
              setVolume={setVolume}
              volume={volume}
              playedSubtitleText={playedSubtitleText}
              playedSubtitleText2={playedSubtitleText2}
              selectWord={selectWord}
              setSelectWord={setSelectWord}
              played={played}
            />
          </>
        )}
      </div>
      <div style={{ width: "300px" }}>
        <ins
          class="adsbygoogle"
          style={{ display: "block" }}
          data-ad-format="autorelaxed"
          data-ad-client="ca-pub-6821390482298484"
          data-ad-slot="6363246062"
        ></ins>
      </div>
    </div>
  );
};

export default Watch;
