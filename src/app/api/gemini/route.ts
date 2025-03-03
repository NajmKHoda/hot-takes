import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

// Configure safety settings to allow debate-style responses
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
];

// Generic fallback responses when we can't generate a specific one
const genericFallbackResponses: Record<string, string[]> = {
  default: [
    "I disagree with your position. The evidence suggests otherwise.",
    "That's an interesting perspective, but it fails to address the core issue.",
    "Your argument overlooks several critical factors that contradict your conclusion.",
    "While I understand your point, there are stronger counterarguments worth considering.",
    "That reasoning has some logical gaps that undermine your overall position."
  ],
  food: [
    "While taste is subjective, nutritional science contradicts your claim about this food combination.",
    "Food critics and culinary experts would strongly disagree with that perspective on flavor pairing.",
    "The texture and flavor profile you're describing actually clash rather than complement each other.",
    "From a gastronomic perspective, that combination creates an imbalance in the flavor profile.",
    "Traditional culinary techniques demonstrate why that approach to food preparation is suboptimal."
  ],
  technology: [
    "The technology you're advocating for has significant privacy implications you're overlooking.",
    "Market adoption patterns suggest your tech prediction is unlikely to materialize.",
    "The environmental cost of this technology far outweighs the efficiency benefits.",
    "Security experts have raised serious concerns about the approach you're supporting.",
    "The accessibility barriers of this technology create more problems than it solves."
  ],
  politics: [
    "That political position ignores the complex socioeconomic factors at play.",
    "Historical precedent contradicts your view on how this political approach works.",
    "The policy you're advocating for has repeatedly failed when implemented.",
    "Your political argument assumes voter priorities that polling data doesn't support.",
    "The long-term consequences of that political stance outweigh any short-term benefits."
  ],
  ethics: [
    "Your ethical framework overlooks important considerations of justice and fairness.",
    "That moral position becomes untenable when applied consistently across similar cases.",
    "Established ethical principles would challenge the foundations of your argument.",
    "The ethical implications of your position lead to concerning consequences when followed to their logical conclusion.",
    "Major philosophical traditions would raise significant objections to that ethical stance."
  ]
};

// Hardcoded API key for development
const GEMINI_API_KEY = 'AIzaSyAN3Naj8IOv8BjvXAreO8laQ6YqwfO6ibU';

/**
 * Generate a targeted counter-argument based on the user's message and topic
 */
function generateTargetedCounterArgument(userMessage: string, debateTopic: string): string {
  const messageLower = userMessage.toLowerCase();
  const topicLower = debateTopic.toLowerCase();
  
  // Extract key phrases or claims from the user message
  const keyWords: string[] = [];
  
  // Look for claims of something being "better," "best," "good," etc.
  if (messageLower.includes('better') || messageLower.includes('best') || 
      messageLower.includes('good') || messageLower.includes('great') ||
      messageLower.includes('superior')) {
    keyWords.push('quality claim');
  }
  
  // Look for claims about facts or evidence
  if (messageLower.includes('fact') || messageLower.includes('evidence') || 
      messageLower.includes('prove') || messageLower.includes('study') ||
      messageLower.includes('research') || messageLower.includes('data')) {
    keyWords.push('factual claim');
  }
  
  // Look for health-related claims
  if (messageLower.includes('health') || messageLower.includes('nutrition') || 
      messageLower.includes('healthy') || messageLower.includes('benefit')) {
    keyWords.push('health claim');
  }
  
  // Look for taste-related claims
  if (messageLower.includes('taste') || messageLower.includes('flavor') || 
      messageLower.includes('delicious') || messageLower.includes('bland') ||
      messageLower.includes('texture')) {
    keyWords.push('taste claim');
  }
  
  // Look for "because" statements which often indicate reasoning
  if (messageLower.includes('because') || messageLower.includes('since') ||
      messageLower.includes('therefore') || messageLower.includes('thus')) {
    keyWords.push('reasoning');
  }
  
  console.log('Identified key concepts in user message:', keyWords);
  
  // Generate targeted responses based on topic and key phrases
  
  // Example: For pizza with cheetos topic
  if (topicLower.includes('pizza') && topicLower.includes('cheeto')) {
    if (keyWords.includes('taste claim')) {
      return "The strong artificial flavor of Cheetos would overpower the subtle balance of a proper cheese pizza, creating a discordant flavor profile rather than an enhancement.";
    }
    if (keyWords.includes('texture claim') || messageLower.includes('texture') || messageLower.includes('crunch')) {
      return "While you value the added crunch, that texture contrast actually disrupts the harmonious mouthfeel that makes pizza satisfying. The soggy aftermath of Cheetos on hot cheese is particularly unpleasant.";
    }
    if (keyWords.includes('health claim')) {
      return "Combining two processed foods high in sodium and fat doesn't create a healthier option - it compounds the nutritional concerns while adding artificial colors and flavors.";
    }
    if (messageLower.includes('bland')) {
      return "A properly made cheese pizza isn't bland at all - it's a carefully balanced combination of acidic tomato sauce, creamy cheese, and aromatic herbs that Cheetos would only disrupt.";
    }
    
    // Generic pizza + cheetos response if no specific angle identified
    return "The artificial flavoring and texture of Cheetos fundamentally clashes with the traditional elements of pizza. This combination sacrifices culinary integrity for novelty.";
  }
  
  // Get the appropriate topic category
  let category = 'default';
  
  if (topicLower.includes('food') || topicLower.includes('pizza') || 
      topicLower.includes('cheese') || topicLower.includes('eat') || 
      topicLower.includes('taste') || topicLower.includes('flavor')) {
    category = 'food';
  } else if (topicLower.includes('tech') || topicLower.includes('computer') || 
             topicLower.includes('digital') || topicLower.includes('ai') || 
             topicLower.includes('software') || topicLower.includes('device')) {
    category = 'technology';
  } else if (topicLower.includes('politic') || topicLower.includes('government') || 
             topicLower.includes('law') || topicLower.includes('policy') || 
             topicLower.includes('election')) {
    category = 'politics';
  } else if (topicLower.includes('ethic') || topicLower.includes('moral') || 
             topicLower.includes('right') || topicLower.includes('wrong') || 
             topicLower.includes('fair') || topicLower.includes('justice')) {
    category = 'ethics';
  }
  
  // Get generic responses for the category as fallback
  const responses = genericFallbackResponses[category] || genericFallbackResponses.default;
  
  // Return a random response from the appropriate category
  return responses[Math.floor(Math.random() * responses.length)];
}

export async function POST(request: NextRequest) {
  console.log('🔥🔥🔥 API route called - /api/gemini');
  
  // Parse request body early, so it's available in the catch block
  let parsedBody: { userMessage?: string; debateTopic?: string; debateHistory?: any[] } = {};
  
  try {
    // Parse the request body
    parsedBody = await request.json();
    const { userMessage, debateTopic, debateHistory = [] } = parsedBody;
    
    // Always use the hardcoded API key for now
    console.log('Using hardcoded API key for testing');
    
    console.log('📥 Received request:', { 
      debateTopic, 
      userMessagePreview: userMessage?.substring(0, 30) + '...', 
      historyLength: debateHistory.length 
    });

    if (!userMessage || !debateTopic) {
      console.log('❌ Missing required parameters');
      return NextResponse.json({ 
        error: 'Missing required parameters', 
        response: 'I need more context to provide a meaningful response.'
      }, { status: 400 });
    }

    // Initialize Gemini with the hardcoded key
    console.log('🤖 Initializing Gemini API with key...');
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    
    try {
      // Use the flash model for better performance
      // Make sure to use "gemini-1.5-flash" instead of "gemini-pro"
      console.log('Using model: gemini-1.5-flash');
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        safetySettings,
      });
      
      // Build conversation history for context
      const historyContext = debateHistory.length > 0
        ? `Previous messages in this debate:\n${debateHistory
            .map((msg: any) => `${msg.sender === "user" ? "User" : "Opponent"}: ${msg.content}`)
            .join('\n')}\n\n`
        : '';

      // Craft a prompt that encourages Gemini to play devil's advocate
      const prompt = `
You are participating in a rapid-fire debate on the topic: "${debateTopic}".

${historyContext}

The user's most recent argument is: "${userMessage}"

Your task is to play devil's advocate and counter their argument effectively. Your response should:
1. Be concise (no more than 2-3 sentences)
2. Challenge the user's perspective with a strong counterpoint
3. Use persuasive language and relevant facts or logic
4. Stay directly relevant to the topic and the user's specific points
5. Adopt a slightly adversarial but respectful tone

Respond as if you are the user's debate opponent. Do not include any labels, prefixes, or explanations - just the debate response itself.
`;
      console.log('📤 Sending prompt to Gemini...');

      // Generate the response
      const result = await model.generateContent(prompt);
      const response = result.response.text()
        .trim()
        .replace(/^["']|["']$/g, '')
        .replace(/^(Opponent: |Response: )/i, '');
      
      console.log('📩 Received Gemini response:', response.substring(0, 50) + '...');
      return NextResponse.json({ response });
    } catch (error) {
      console.error('❌ Error generating content:', error);
      throw error; // Rethrow to be caught by the outer catch
    }
  } catch (error) {
    console.error('❌ Error in Gemini API:', error);
    
    // Generate a targeted counter-argument based on the actual user message and topic
    const counterArgument = generateTargetedCounterArgument(
      parsedBody?.userMessage || '', 
      parsedBody?.debateTopic || ''
    );
    console.log('💬 Using targeted counter-argument fallback:', counterArgument);
    
    return NextResponse.json({ 
      error: 'Failed to generate response',
      response: counterArgument
    }, { status: 200 });
  }
}
