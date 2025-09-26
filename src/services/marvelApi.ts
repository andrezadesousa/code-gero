import axios from "axios";
import md5 from "crypto-js/md5";
import { Character } from "../types";

const baseURL = "https://gateway.marvel.com/v1/public";
const publicKey = "57f1ab16e82c2f6c364c74cfd7ad9021";
const privateKey = "e62acce1ece713356cbaf2c96f9ed45ce3ee3194";

export const getCharacters = async (
  limit: number = 20,
  offset: number = 0
): Promise<Character[]> => {
  const ts = new Date().getTime().toString();
  const hash = md5(ts + privateKey + publicKey).toString();

  const res = await axios.get(`${baseURL}/characters`, {
    params: {
      ts,
      apikey: publicKey,
      hash,
      limit,
      offset,
    },
  });

  return res.data.data.results as Character[];
};
