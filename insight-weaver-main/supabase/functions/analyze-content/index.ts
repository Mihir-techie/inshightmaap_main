import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content, type } = await req.json();

    if (!content) {
      return new Response(
        JSON.stringify({ error: 'Content is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log('Analyzing content of type:', type);
    console.log('Content length:', content.length);

    const systemPrompt = `You are an expert educational content analyzer. Your task is to analyze text content and extract a structured learning map.

IMPORTANT: You MUST respond with ONLY valid JSON, no markdown, no code blocks, no explanation text.

Analyze the provided content and extract:
1. A concise summary (2-3 sentences)
2. Key topics (5-8 main concepts as strings)
3. A hierarchical topic tree with the following structure

The response must be valid JSON with this exact structure:
{
  "summary": "A brief 2-3 sentence summary of the main content",
  "keyTopics": ["Topic 1", "Topic 2", "Topic 3", "Topic 4", "Topic 5"],
  "topicTree": [
    {
      "id": "1",
      "label": "Main Topic 1",
      "children": [
        {
          "id": "1-1",
          "label": "Subtopic 1.1",
          "children": [
            { "id": "1-1-1", "label": "Detail 1.1.1" }
          ]
        }
      ]
    }
  ]
}

Create a comprehensive hierarchical structure that captures the relationships between concepts. Make it educational and easy to navigate.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Analyze this ${type || 'text'} content and create a learning map:\n\n${content}` }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Service credits exhausted. Please try again later.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log('AI response received');

    const aiContent = data.choices?.[0]?.message?.content;
    if (!aiContent) {
      throw new Error('No content in AI response');
    }

    // Clean the response - remove markdown code blocks if present
    let cleanedContent = aiContent.trim();
    if (cleanedContent.startsWith('```json')) {
      cleanedContent = cleanedContent.slice(7);
    } else if (cleanedContent.startsWith('```')) {
      cleanedContent = cleanedContent.slice(3);
    }
    if (cleanedContent.endsWith('```')) {
      cleanedContent = cleanedContent.slice(0, -3);
    }
    cleanedContent = cleanedContent.trim();

    // Parse the JSON response
    let analysisResult;
    try {
      analysisResult = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error('Failed to parse AI response:', cleanedContent);
      throw new Error('Failed to parse AI analysis result');
    }

    console.log('Analysis complete. Topics found:', analysisResult.keyTopics?.length || 0);

    return new Response(
      JSON.stringify(analysisResult),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    console.error('Error in analyze-content function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to analyze content';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
