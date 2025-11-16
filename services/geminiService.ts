
import { GoogleGenAI, Type } from "@google/genai";
import type { BusinessIdea, VideoResource } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const businessIdeaSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      name: {
        type: Type.STRING,
        description: 'The name of the business idea.',
      },
      description: {
        type: Type.STRING,
        description: 'A brief, engaging one-paragraph description of the business.',
      },
      estimatedInvestment: {
        type: Type.STRING,
        description: 'A descriptive cost range (e.g., Very Low, Low, Medium, High, Very High).',
      },
      skillLevel: {
        type: Type.STRING,
        description: 'The skill level required (e.g., Beginner, Intermediate, Expert).'
      }
    },
    required: ['name', 'description', 'estimatedInvestment', 'skillLevel'],
  }
};

const videoResourceSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            title: {
                type: Type.STRING,
                description: 'The title of the YouTube video.',
            },
            url: {
                type: Type.STRING,
                description: 'The full URL of the YouTube video.',
            },
        },
        required: ['title', 'url'],
    }
};

export const generateBusinessIdeas = async (
  interests: string,
  investment: string,
  location: string
): Promise<BusinessIdea[]> => {
  const prompt = `
    You are an expert business consultant for the Indian market.
    Generate 6 innovative and practical business ideas for a new entrepreneur.
    The entrepreneur's interests are in: "${interests}".
    Their investment budget is "${investment}".
    Their target location is "${location}, India".
    Focus on ideas that are viable in the current Indian economic climate.
    Avoid any illegal, unethical, or harmful business suggestions.
    The business name should be catchy and short.
    The description should be concise and compelling for a newcomer.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: businessIdeaSchema,
        temperature: 0.8,
        topP: 0.9,
      },
    });

    const jsonText = response.text.trim();
    const ideas = JSON.parse(jsonText) as BusinessIdea[];
    return ideas;
  } catch (error) {
    console.error("Error generating business ideas:", error);
    throw new Error("Failed to get a valid response from the AI model.");
  }
};


export const findBusinessVideos = async (
    businessName: string,
    language: string
): Promise<VideoResource[]> => {
    const prompt = `
        Find 3 highly relevant and helpful YouTube video links for someone starting a "${businessName}" business in India.
        The video content MUST be in the "${language}" language.
        Prioritize videos that are practical guides, tutorials, or success stories from India.
        Do not include any illegal or misleading content.
        Ensure the URLs are valid and point directly to YouTube.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: videoResourceSchema,
            },
        });
        const jsonText = response.text.trim();
        const videos = JSON.parse(jsonText) as VideoResource[];
        return videos;
    } catch(error) {
        console.error("Error finding business videos:", error);
        throw new Error("Failed to get a valid video resource response from the AI model.");
    }
}
