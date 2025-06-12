// Translation service using DeepL API
const DEEPL_API_KEY = "ae37db2e-bda7-be96-d4d5-8579066f8346"
const DEEPL_API_URL = "https://api-free.deepl.com/v2/translate"

type DeepLResponse = {
  translations: {
    detected_source_language: string
    text: string
  }[]
}

export async function translateText(text: string, targetLang: string): Promise<string> {
  try {
    const response = await fetch(DEEPL_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `DeepL-Auth-Key ${DEEPL_API_KEY}`,
      },
      body: new URLSearchParams({
        text,
        target_lang: targetLang,
      }),
    })

    if (!response.ok) {
      console.error("DeepL API error:", response.statusText)
      return text // Return original text if translation fails
    }

    const data: DeepLResponse = await response.json()
    return data.translations[0].text
  } catch (error) {
    console.error("Translation error:", error)
    return text // Return original text if translation fails
  }
}

// Cache for storing translations to reduce API calls
export const translationCache = new Map<string, string>()

export async function translateWithCache(text: string, targetLang: string): Promise<string> {
  // Skip translation if target language is English
  if (targetLang === "EN") return text

  const cacheKey = `${text}_${targetLang}`

  // Check if translation is in cache
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!
  }

  // Translate and cache the result
  const translated = await translateText(text, targetLang)
  translationCache.set(cacheKey, translated)

  return translated
}
