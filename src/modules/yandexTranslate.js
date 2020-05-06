export default async function translate(movieTitle) {
  const apiKey = 'trnsl.1.1.20200506T154045Z.31f0417539f1121c.e062e80f273c5fa96c92f233fb75ab484e4df37a';
  const uriBase = 'https://translate.yandex.net/api/v1.5/tr.json/translate?';
  const lang = 'ru-en';

  const requestURI = `${uriBase}key=${apiKey}&text=${movieTitle}&lang=${lang}`;

  return fetch(requestURI)
    .then((res) => res.json())
    .then((data) => data.text[0]);
}
