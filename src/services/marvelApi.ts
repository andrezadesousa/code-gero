import axios from "axios";
import CryptoJS from "crypto-js";

const publicKey = "57f1ab16e82c2f6c364c74cfd7ad9021";
const privateKey = "e62acce1ece713356cbaf2c96f9ed45ce3ee3194";
const baseUrl = "https://gateway.marvel.com/v1/public";

export const getCharacters = async () => {
  const ts = Date.now().toString();
  const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

  try {
    const response = await axios.get(`${baseUrl}/characters`, {
      params: {
        ts,
        apikey: publicKey,
        hash,
        limit: 1,
      },
    });
    console.log("Resposta da Marvel API:", response.data);

    return response.data.data.results;
  } catch (error) {
    console.error("Erro ao buscar personagens", error);
    return [];
  }
};
