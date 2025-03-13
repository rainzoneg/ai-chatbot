# AI Chatbot with Gemini

A modern, responsive chatbot application built with Next.js and Google's Gemini AI.

## Features

- Real-time chat interface
- Gemini AI integration for natural conversations
- Conversation history and context
- Sound effects for message interactions
- Responsive design for all devices
- Customizable AI persona

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file based on `.env.local.example`
4. Add your Gemini API key to the `.env.local` file
5. Run the development server:
   ```bash
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Customizing the AI Persona

You can customize how the AI responds by creating your own persona instructions:

### Using Environment Variables

1. Open your `.env.local` file
2. Uncomment and modify the `NEXT_PUBLIC_CUSTOM_PROMPT` variable
3. Add your custom instructions for how the AI should behave

Example:
```
NEXT_PUBLIC_CUSTOM_PROMPT="You are Alex, a knowledgeable historian with a passion for ancient civilizations. You speak in a slightly formal manner, often making references to historical events and drawing parallels between past and present. You're particularly enthusiastic about Roman history and architecture. When chatting, you occasionally mention interesting historical facts related to the topic at hand."
```

### Tips for Creating Effective Personas

- Be specific about personality traits, interests, and speaking style
- Include details about how the persona should respond to different topics
- Consider adding background information that shapes the persona's viewpoint
- Include speech patterns or phrases the persona might use
- Specify any topics the persona should be particularly knowledgeable about

## Sound Effects

The application includes sound effects for message interactions. You can:

- Toggle sounds on/off using the volume icon
- Add custom sounds by replacing the files in the `public/sounds` directory

## License

