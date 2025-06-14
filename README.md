

# ⚙️ Chatbot Backend (FastAPI)

This is the **FastAPI backend** for the RAG-based chatbot. It handles user queries and generates responses using LangChain, FAISS and Gemini API.

To Run, Save this frontend and backend two repositories in a one single folder. After that, run separately frontend and backend using seperate terminals. First run backend and then run frontend.

## 🧰 Tech Stack

- [FastAPI](https://fastapi.tiangolo.com/)
- [LangChain](https://www.langchain.com/)
- [FAISS](https://github.com/facebookresearch/faiss)
- [Gemini API](https://ai.google.dev/)
- [Uvicorn](https://www.uvicorn.org/)

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/chatbot-backend.git
cd chatbot-backend
```

# Create virtual environment
```
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
```

# Install dependencies
```
pip install -r requirements.txt
```


# Run the server
```
uvicorn main:app --reload
```

