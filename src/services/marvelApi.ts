import axios from "axios";
import md5 from "crypto-js/md5";
import type { Character } from "../types";

const baseURL = "https://gateway.marvel.com/v1/public";
const publicKey = "57f1ab16e82c2f6c364c74cfd7ad9021";
const privateKey = "e62acce1ece713356cbaf2c96f9ed45ce3ee3194";

export const getCharacters = async (
  limit = 20,
  offset = 0
): Promise<{ results: Character[]; total: number }> => {
  const ts = new Date().getTime().toString();
  const hash = md5(ts + privateKey + publicKey).toString();

  try {
    const res = await axios.get(`${baseURL}/characters`, {
      params: { ts, apikey: publicKey, hash, limit, offset },
    });

    return {
      results: res.data.data.results as Character[],
      total: res.data.data.total,
    };
  } catch (error) {
    console.error("Error fetching characters:", error);
    return { results: [], total: 0 };
  }
};

export const searchCharacters = async (name: string): Promise<Character[]> => {
  const ts = new Date().getTime().toString();
  const hash = md5(ts + privateKey + publicKey).toString();

  try {
    const res = await axios.get(`${baseURL}/characters`, {
      params: {
        ts,
        apikey: publicKey,
        hash,
        nameStartsWith: name,
        limit: 100, // Increased limit for search results
      },
    });

    console.log("Search API Response:", res.data);
    return res.data.data.results as Character[];
  } catch (error) {
    console.error("Error searching characters:", error);
    return [];
  }
};
