import { NextRequest, NextResponse } from 'next/server';

// Debate counter-arguments based on common topics
const debateResponses: Record<string, string[]> = {
  default: [
    "I disagree with your perspective. Here's a counterpoint to consider.",
    "While I understand your position, there's compelling evidence to the contrary.",
    "Your argument overlooks several important factors that change the conclusion.",
    "That's an interesting point, but there's another way to look at this issue.",
    "I'd challenge that assumption with some key facts you may not have considered."
  ],
  politics: [
    "Your political analysis ignores the complex socioeconomic factors at play.",
    "That policy position has repeatedly failed when implemented in similar contexts.",
    "The data actually suggests the opposite of what you're claiming about this issue.",
    "Historical precedent contradicts your view on how this political approach works.",
    "Your argument assumes voter priorities that polling data simply doesn't support."
  ],
  technology: [
    "The technology you're advocating for has significant privacy implications you're overlooking.",
    "Market adoption patterns suggest your tech prediction is unlikely to materialize.",
    "The environmental cost of this technology far outweighs the efficiency benefits.",
    "Security experts have raised serious concerns about the approach you're supporting.",
    "The accessibility barriers of this technology create more problems than it solves."
  ],
  environment: [
    "Your environmental solution doesn't account for the economic impact on vulnerable communities.",
    "The scientific consensus doesn't support the effectiveness of the approach you mentioned.",
    "This environmental policy has been tried before with disappointing results.",
    "Your perspective fails to consider the global scale of this environmental challenge.",
    "The timeline you're suggesting for environmental change isn't supported by current models."
  ]
};

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'API test route is working!' });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Test API received body:', body);
    
    // Extract message and topic
    const userMessage = body.message || '';
    const debateTopic = body.topic || '';
    
    // Determine which category of responses to use
    let category = 'default';
    const topicLower = debateTopic.toLowerCase();
    
    if (topicLower.includes('politic') || topicLower.includes('government') || topicLower.includes('election')) {
      category = 'politics';
    } else if (topicLower.includes('tech') || topicLower.includes('ai') || topicLower.includes('digital')) {
      category = 'technology';
    } else if (topicLower.includes('environment') || topicLower.includes('climate') || topicLower.includes('green')) {
      category = 'environment';
    }
    
    // Get responses for the category
    const responses = debateResponses[category] || debateResponses.default;
    
    // Select a random response
    const response = responses[Math.floor(Math.random() * responses.length)];
    
    return NextResponse.json({ 
      message: 'Debate response generated',
      received: { message: userMessage, topic: debateTopic },
      response: response
    });
  } catch (error) {
    console.error('Error in test API:', error);
    return NextResponse.json({ 
      error: 'Failed to generate test response',
      response: "I disagree with your argument based on several critical factors."
    }, { status: 200 });
  }
}
