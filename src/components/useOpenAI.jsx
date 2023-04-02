import { useState, useEffect, useRef } from "react";
import { Configuration, OpenAIApi } from "openai";

const useOpenAI = (apiKey) => {
  const openaiClientRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const configuration = new Configuration({
      apiKey: apiKey,
    });
    openaiClientRef.current = new OpenAIApi(configuration);
  }, [apiKey]);

  const getCompletion = async (prompt, options) => {
    setLoading(true);
    setError(null);

    try {
      const response = await openaiClientRef.current.complete({
        engine: "davinci",
        prompt,
        ...options,
      });
      setLoading(false);
      return response.choices[0].text.trim();
    } catch (error) {
      setLoading(false);
      setError(error);
      return null;
    }
  };

  return [getCompletion, loading, error];
};

export default useOpenAI;