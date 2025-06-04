'''/!\ pip install fastapi uvicorn'''

from fastapi import FastAPI
from recommendation import recommendation
from scipy.sparse import csr_matrix
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
    # tu peux aussi ajouter "http://127.0.0.1:3000" si besoin
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # ou ["*"] pour tout autoriser (déconseillé en prod)
    allow_credentials=True,
    allow_methods=["*"],  # GET, POST, etc.
    allow_headers=["*"],
)

m = csr_matrix([[1, 0, 5, 238],
                [1, 1, 3, 278],
                [0, 1, 4, 335],
                [0, 0, 2.8, 348]])
u = [0, -1, 5, -1]

@app.get("/search/{user_id}")
def recommended_search(user_id: int):
    #movie_matrix, user_ratings
    user_ratings = u
    movie_matrix = m
    search_result = recommendation(movie_matrix, user_ratings)
    return {"research_result": search_result}

import uvicorn
uvicorn.run(app, port=8001)