/**
 * Client-side API functions for interacting with server endpoints
 */

// Get the base URL for API calls, defaulting to the current origin
const getApiBaseUrl = (): string => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return 'http://localhost:3001'; // Fallback for server-side rendering
};

/**
 * Generates a debate response via the server's Gemini API route
 * 
 * @param userMessage The message from the user to respond to
 * @param debateTopic The topic of the ongoing debate
 * @param debateHistory Previous messages for context (optional)
 * @returns Promise resolving to the AI response
 */
export async function generateDebateResponse(
  userMessage: string,
  debateTopic: string,
  debateHistory: { content: string; sender: "user" | "opponent" }[] = []
): Promise<string> {
  console.log('🔄 API client: generateDebateResponse called', {
    topic: debateTopic,
    messageLength: userMessage.length,
    historyLength: debateHistory.length
  });
  
  try {
    const baseUrl = getApiBaseUrl();
    const apiUrl = `${baseUrl}/api/gemini`;
    console.log('Making API request to:', apiUrl);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userMessage,
        debateTopic,
        debateHistory,
      }),
    });

    console.log('API response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log('API response parsed:', {
      hasError: !!data.error,
      responseLength: data.response?.length || 0
    });
    
    if (data.error) {
      console.warn('API returned an error:', data.error);
    }
    
    return data.response;
  } catch (error) {
    console.error('Error calling debate API:', error);
    
    // Fallback responses if the API call fails
    const fallbackResponses = [
      "I disagree with your position. The evidence suggests otherwise.",
      "That's an interesting perspective, but it fails to address the core issue.",
      "Your argument overlooks several critical factors that contradict your conclusion.",
      "While I understand your point, there are stronger counterarguments worth considering.",
      "That reasoning has some logical gaps that undermine your overall position."
    ];
    
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  }
}
