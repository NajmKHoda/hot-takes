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
- bla bla bla

Backend:
- bla bla bla

### Features 

- Zip code-based nonprofit search
- Interest-based filtering
- Favorite organization saving
- Real-time nonprofit information
- Interactive loading screen with LeBron James highlights

## Quick Start 

### Prerequisites
- Node.js (v18 or higher)
- Python 3.8+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/toomzheng/unity-nonprofits.git
cd unity-nonprofits
```

2. Install frontend dependencies:
```bash
cd irvinehacks2
npm install
```

3. Install backend dependencies:
```bash
cd backend
pip install -r requirements.txt
```

4. Set up environment variables:
- Create a `.env` file in the backend directory
- Add required environment variables:
```env
AGENTQL_API_KEY=your_agentql_key
PERPLEXITY_API_KEY=your_perplexity_key
EMAIL=your_melissa_email
PASSWORD='your_melissa_password'
^ make sure to create an account on melissa first.
```

5. Start the development servers:

Frontend:
```bash
npm run dev
```

Backend:
```bash
cd backend
ngrok http 8000
uvicorn app:app --reload
python login.py
```

## Future Development 

- User authentication system
- Enhanced API efficiency
- Community blog platform
- Event organization features
- Review system for nonprofit experiences

## Contributing 

We welcome contributions! Please feel free to submit a Pull Request.

## Acknowledgments 

- Melissa API for nonprofit data
- AgentQL for reliable web scraping
- Our Uber driver for the inspiration
- IrvineHacks 2025 for the opportunity
