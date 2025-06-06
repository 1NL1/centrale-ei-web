from fastapi import FastAPI
from recommendation import recommendation
from scipy.sparse import csr_matrix
from fastapi.middleware.cors import CORSMiddleware

from create_movieMatrix_And_userVector import movie_matrix, user_rating_vector, init
from similar_movies import similar_movies

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

search_result = [] 
user_vector_of_last_request = None


@app.get("/search/{user_id}")
def recommended_search(user_id: int):
    #movie_matrix, user_rating
    global search_result, user_vector_of_last_request
    user_ratings = user_rating_vector(url_get_requests, user_id)
    if user_vector_of_last_request is None or search_result == [] or (user_ratings != user_vector_of_last_request).nnz != 0:
        movie_matrix = m
        movie_ranking = recommendation(movie_matrix, user_ratings)

        #global search_result, user_vector_of_last_request
        user_vector_of_last_request = user_ratings
        search_result = movie_ranking  

    return {"research_result": search_result}

@app.get("/search_similar/{movie_id}")
def search_similar(movie_id: int):
    search_similar_result = similar_movies(m, movie_id)[:5]

    return {"similar_movies": search_similar_result}

import uvicorn
uvicorn.run(app, port=8001)