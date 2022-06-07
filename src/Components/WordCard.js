import axios from "axios";
import React, { useEffect, useState } from "react";

const WordCard = ({ word, setSelectWord }) => {
  const [response, setResponse] = useState(null);
  const [examples, setExamples] = useState(null);

  const [loading, setLoading] = useState(false);

  var userLang = navigator.language || navigator.userLanguage;
  if (userLang === "tr-TR") userLang = "tur";
  else if (userLang === "en-US") userLang = "eng";
  else if (userLang === "de-DE") userLang = "ger";
  else if (userLang === "ar-SA") userLang = "ara";
  else if (userLang === "zh-CN") userLang = "chi";
  else if (userLang === "nl-NL") userLang = "dut";
  else if (userLang === "fr-FR") userLang = "fra";
  else if (userLang === "it-IT") userLang = "ita";
  else if (userLang === "ja-JP") userLang = "jpn";
  else if (userLang === "ko-KR") userLang = "kor";
  else if (userLang === "es-ES") userLang = "spa";
  else if (userLang === "sv-SE") userLang = "swe";
  else if (userLang === "uk-UA") userLang = "ukr";
  else if (userLang === "iw-IL") userLang = "heb";
  else if (userLang === "pl-PL") userLang = "pol";
  else if (userLang === "ro-RO") userLang = "rum";
  else if (userLang === "pt-PT") userLang = "por";
  else if (userLang === "ru-RU") userLang = "rus";
  else userLang = "eng";
  // fetch word from api
  const stringToHTML = function (str) {
    const parser = new DOMParser();
    const document = parser.parseFromString(str, "text/html");

    return document.body;
  };
  useEffect(() => {
    setLoading(true);
    axios
      .post(`https://api.reverso.net/translate/v1/translation`, {
        format: "text",
        from: "eng",
        input: word?.replace(/[.?!]/g, ""),
        options: {
          sentenceSplitter: true,
          origin: "translation.web",
          contextResults: true,
          languageDetection: true,
        },
        to: userLang,
      })
      .then((response) => {
        setResponse(response.data);
        setExamples({
          source: response.data.contextResults.results[0].sourceExamples,
          target: response.data.contextResults.results[0].targetExamples,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [word, userLang]);

  if (!word) return;
  return (
    <div className="fixed left-3  top-10 z-30 flex flex-col bg-gray-900 shadow shadow-gray-400 p-2 w-80 rounded">
      {loading ? (
        <div className="text-center">
          <span className="text-white">Loading...</span>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="flex flex-col items-center justify-center p-2">
            <span className="text-green-800 font-extrabold">
              {response?.input[0]}
            </span>
            <span className=" text-white font-bold">
              {response?.translation}
            </span>
            <span
              className="text-gray-600 rounded-full font-bold absolute -right-1 -top-1 bg-white p-1"
              onClick={() => setSelectWord(null)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </div>
          {examples && (
            <div className="flex flex-col p-2 bg-slate-700 max-h-80 rounded overflow-y-auto">
              <div className="flex flex-col">
                {examples.source.map((example, index) => (
                  <div className="flex flex-col">
                    <span className="text-yellow-400 font-bold">
                      {parseInt(index + 1) +
                        "- " +
                        stringToHTML(example).innerText}
                    </span>
                    <span className="text-yellow-600">
                      {stringToHTML(examples.target[index]).innerText}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WordCard;
