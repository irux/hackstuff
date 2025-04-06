# EcoDish - AI-Powered Meal Planning App

EcoDish is an innovative application that uses AI to analyze cooking videos and generate personalized meal plans, recipes, and shopping lists. The app features a voice agent powered by 11labs that interacts with users to understand their preferences and dietary needs.


## Features

- **Video Analysis**: Upload cooking videos to get personalized meal suggestions
- **AI Voice Assistant**: Interact with an 11labs voice agent to refine your meal plan
- **Weekly Meal Planning**: View a complete 7-day meal plan
- **Detailed Recipes**: Get ingredients, instructions, and preparation times
- **Smart Shopping List**: Automatically generated based on your meal plan
- **Supermarket Integration**: Order ingredients directly from Lidl, REWE, or EDEKA

## Prerequisites

Make sure you have the following installed on your machine:

- Docker
- Python >= 3.11
- Node.js >= 18
- npm

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/meal-genius.git
cd meal-genius
```

2. **Install dependencies**

```bash
# Install Node.js dependencies
npm i

# Install Python dependencies
pip install -r requirements.txt

```


3. **Start the Docker containers**


```shellscript
docker compose up
```

4. **Start the backend server**


```shellscript
uvicorn main:app
```

5. **Start the frontend development server**


```shellscript
npm run dev
```

6. **Access the application**


Open your browser and navigate to:

```plaintext
http://localhost:3000/
```

## Usage

### 1. Upload a Video

- On the home page, click "Browse files" or drag and drop a cooking video
- Click "Generate Meal Ideas" to process the video


### 2. Interact with the Voice Agent

- Speak with the AI assistant to refine your meal preferences
- The agent will analyze your video and preferences to create a personalized meal plan
- Click "Stop Conversation" when you're satisfied with the plan


### 3. View Your Results

- Browse your weekly meal plan organized by day
- Explore detailed recipes with ingredients and instructions
- Check your automatically generated shopping list
- Order ingredients directly from your preferred supermarket


## Architecture

The application consists of three main components:

1. **Frontend**: Next.js React application with Tailwind CSS for styling

1. Handles user interface and interactions
2. Communicates with the backend API



2. **Backend API**: Python FastAPI application

1. Processes video uploads
2. Analyzes content using AI models
3. Generates meal plans and shopping lists


3. **Voice Agent**: 11labs voice AI

1. Provides natural language interaction
2. Refines meal preferences through conversation


## API Endpoints

- `/api/py/analysis`: Returns meal plan data based on video analysis
- `/api/upload`: Handles video file uploads
- `/api/voice`: Manages voice agent interactions


## Technologies Used

- **Frontend**: Next.js, React, Tailwind CSS, shadcn/ui
- **Backend**: Python, FastAPI, Docker
- **AI**: 11labs Voice AI, Custom video analysis models
- **Database**: MongoDB (via Docker)


## Troubleshooting

### Common Issues

1. **API Connection Errors**

1. Ensure the backend server is running (`uvicorn main:app`)
2. Check that the Docker containers are running (`docker ps`)



2. **Voice Agent Not Responding**

1. Ensure your microphone permissions are enabled
2. Check your internet connection



3. **Video Upload Issues**

1. Verify the video format is supported (MP4, MOV, AVI)
2. Check that the file size is under the limit (100MB)



### Logs

- Frontend logs: Browser console
- Backend logs: Terminal running `uvicorn`
- Docker logs: `docker logs <container_id>`


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- 11labs for the voice AI technology
- All contributors who have helped shape this project

