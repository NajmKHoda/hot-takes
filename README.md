# Hot Takes 🔥🔥🔥

Hot Takes is a debate app for important topics that guards against misinformation and logical fallacies, creating the optimal debate experience. Users can create debate threads with a predefined topic, which other users can click to begin a debate
Each debate starts with an AI-generated prompt summarizing the topic. One person is randomly chosen to start. Before each user submits their response, it will be scanned by AI for weaknesses or misinformation, and the user will be given one more chance to revise their response before sending. Submitted to UCLA Hack on the Hill

## Project Overview 

### Inspiration
Just another dull day on reddit, scrolling r/AITAH and r/roastme for hours, inflicting small amounts of dopamine to your already fried brain receptors. "Trump and Zelensky—an intense exchange of fiery words and bold opinions." Into the comments, the insults flew, hurled from one side of the debate to the other. Overwhelmed by the raging debate, I scrolled to the top and continued doom scrolling... WAIT? 30K upvotes? That's pretty good... Come to think of it, these fierce controversial topics always do well on social media... The world needed a platform where people could passionately voice their thoughts without fear of censorship. That’s when the idea for our app was born: a place where opinions clash, sparks fly, and the world can finally engage in the most outrageous debates. And thus, Hot Topic was born—because sometimes, you need a bombshell take to ignite a conversation!

### What it does 

Hot Takes helps users:
- 

### Technical Stack 

Frontend:
- Next.js with TypeScript
- TailwindCSS for styling

Backend:
- MongoDB for database
- Gemini API
- JSON Web Tokens for session authentication
- `bcrypt` library for password encryption

### Features 

- Debate posts with live responses from other users
- In-depth AI feedback on argument strength, logical fallacies
- One-on-one conversations with an argumentative AI
- Modern, sleek UI that enhances the user experience

## Quick Start 

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB database

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/hot-takes.git
cd hot-takes
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
- Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```
- Update the values in `.env`:
  - Add your MongoDB connection string
  - Set session configuration values
  - Add your Gemini API key

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Future Development 

- OAuth integration
- Enhanced API efficiency
- More in-depth analysis of logical fallacies
- Search function for misinformation check

## Contributing 

We welcome contributions! Please feel free to submit a Pull Request.


Thanks to Hack on the Hill for this opportunity.