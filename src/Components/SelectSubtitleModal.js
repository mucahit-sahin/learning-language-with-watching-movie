import axios from "axios";
import React from "react";
import OpenSubtitles from "opensubtitles-api";

const SelectSubtitleModal = ({ setIsModalOpen, setSelectedSubtitle }) => {
  const apikey = "5a7qelCRllGZPMruNpUSjtcOqDKmo7jh";

  const [searchText, setSearchText] = React.useState("");
  const [searchLanguage, setSearchLanguage] = React.useState("en");

  const [subtitles, setSubtitles] = React.useState([]);

  const getSubtitles = () => {
    if (searchText.length === 0) {
      return;
    }
    OpenSubtitles.search({
      apikey,
      sublanguageid: searchLanguage,
      query: searchText,
    }).then((subtitles) => {
      console.log(subtitles);
    });
    axios
      .get("https://api.opensubtitles.com/api/v1/subtitles", {
        params: {
          query: searchText,
        },
        headers: { "Content-Type": "application/json", "Api-Key": apikey },
      })
      .then((response) => {
        console.log(response.data);
        setSubtitles(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-white bg-opacity-20 w-full h-full flex items-center justify-center"
        onClick={(e) => setIsModalOpen(false)}
      >
        <div
          className="w-full max-w-xl bg-white rounded-lg shadow-lg overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-row">
            <select
              className="m-1 px-4 py-2 bg-gray-200 border border-gray-200 text-gray-700 rounded-md focus:outline-none focus:bg-white focus:border-gray-500"
              value={searchLanguage}
              onChange={(e) => setSearchLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="es">Spanish</option>
              <option value="it">Italian</option>
              <option value="de">German</option>
              <option value="pt">Portuguese</option>
              <option value="ru">Russian</option>
              <option value="pl">Polish</option>
              <option value="nl">Dutch</option>
              <option value="sv">Swedish</option>
              <option value="da">Danish</option>
              <option value="fi">Finnish</option>
              <option value="no">Norwegian</option>
              <option value="ko">Korean</option>
              <option value="ja">Japanese</option>
              <option value="zh">Chinese</option>
              <option value="cs">Czech</option>
              <option value="sk">Slovak</option>
              <option value="sl">Slovenian</option>
              <option value="hr">Croatian</option>
              <option value="hu">Hungarian</option>
              <option value="tr">Turkish</option>
              <option value="el">Greek</option>
              <option value="bg">Bulgarian</option>
            </select>
            <input
              type="text"
              className="w-full m-1  px-4 py-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              className="m-1 px-4 py-2 text-white bg-blue-400 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              onClick={() => getSubtitles()}
            >
              Search
            </button>
          </div>
          {/* Subtitle List */}
          <div className="flex flex-col max-h-60 overflow-y-auto">
            {/* Subtitle Item */}
            {subtitles.map((subtitle) => (
              <div
                key={subtitle.id}
                className="flex flex-row mt-1 p-1 hover:bg-gray-200"
                onClick={() => {
                  setSelectedSubtitle(subtitle);
                  setIsModalOpen(false);
                }}
              >
                <span className="px-4 py-2 text-gray-700 bg-blue-200 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                  {subtitle.attributes.language}
                </span>
                <span className="px-4 py-2 text-gray-700  ">
                  {subtitle.attributes.feature_details.movie_name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectSubtitleModal;
