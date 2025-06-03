import * as Speech from "expo-speech";

let africanVoice: string | undefined;

export const setAfricanVoice = async () => {
  const voices = await Speech.getAvailableVoicesAsync();
  // Look for English with South African accent
  const preferred = voices.find(
    (v) => v.language === "en-ZA" || v.identifier?.includes("en-ZA")
  );
  if (preferred) {
    africanVoice = preferred.identifier;
  }
};

export const appGuide = (sentence: string) => {
  Speech.speak(sentence, {
    rate: 0.9,
    ...(africanVoice && { voice: africanVoice }),
  });
};

export const stopGuide = () => Speech.stop();
