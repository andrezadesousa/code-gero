import axios from "axios";
import md5 from "crypto-js/md5";
import { Character } from "../types";

const baseURL = "https://gateway.marvel.com/v1/public";

// Minhas chaves da Marvel (public e private)
const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY!;
const privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY!;

// Pega a lista dos personagens
export const getCharacters = async (
  limit = 30, //Quantos personagens trazer (padrão 30)
  offset = 0 //A partir de qual personagem começar
): Promise<{ results: Character[]; total: number }> => {
  const ts = new Date().getTime().toString(); // timestamp necessário pra autenticação
  const hash = md5(ts + privateKey + publicKey).toString(); // hash Marvel

  try {
    const res = await axios.get(`${baseURL}/characters`, {
      params: { ts, apikey: publicKey, hash, limit, offset },
    });

    // Retorno com os personagens e total de resultados
    return {
      results: res.data.data.results as Character[],
      total: res.data.data.total,
    };
  } catch (error) {
    console.error("Error fetching characters:", error);
    return { results: [], total: 0 };
  }
};

//Busca personagens pelo começo do nome (name)

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
        limit: 100,
      },
    });

    console.log("Search API Response:", res.data); // debugar sempre é bom!
    return res.data.data.results as Character[];
  } catch (error) {
    console.error("Error searching characters:", error);
    return [];
  }
};
