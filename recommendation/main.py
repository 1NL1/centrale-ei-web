'''/!\ pip install fastapi uvicorn'''

from fastapi import FastAPI
from recommendation.py import recommendation

app = FastAPI()

@app.get("/search/{user_id}")
def recommended_search(user_id: int):
    #movie_matrix, user_ratings, id_forced_categories = []
    movie_matrix = ???
    user_ratings = ???
    search_result = recommendation(movie_matrix, user_ratings)
    return {"research_result": str(search_result)}

@app.get("/search/{user_id}/{id_forced_category}")
def recommended_search(user_id: int, id_forced_categories: int list):
    #movie_matrix, user_ratings, id_forced_categories
    movie_matrix = ???
    user_ratings = ???
    search_result = recommendation(movie_matrix, user_ratings, id_forced_categories)
    return {"research_result": str(search_result)}