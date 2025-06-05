'''/!\ pip install fastapi uvicorn'''

from fastapi import FastAPI
from recommendation import recommendation
from scipy.sparse import csr_matrix
from fastapi.middleware.cors import CORSMiddleware
import requests

from create_movieMatrix_And_userVector import movie_matrix, user_rating_vector, init

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ou ["*"] pour tout autoriser (déconseillé en prod)
    allow_credentials=True,
    allow_methods=["*"],  # GET, POST, etc.
    allow_headers=["*"],
)


url_get_requests = "http://localhost:8000"

init(url_get_requests)
m = movie_matrix(url_get_requests)

@app.get("/search/{user_id}")
def recommended_search(user_id: int):
    #movie_matrix, user_rating
    user_ratings = user_rating_vector(url_get_requests, user_id)
    movie_matrix = m
    search_result = recommendation(movie_matrix, user_ratings)
    return {"research_result": search_result}

import uvicorn
uvicorn.run(app, port=8001)