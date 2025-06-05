import requests
from scipy.sparse import csr_matrix
import json



nb_genres = 0
nb_people = 0
nb_original_lenguage = 0
nb_release_date = 6 #Pre-80, 80->90, 90->00, 00->10, 10->20, Post-20

#Pour movie_matrix
dico_id_genres = {}
dico_id_people = {}
dico_id_original_language = {}
dico_id_release_date = {}

#Pour user_ratings_vector
dico_id_film = {}

def init(url_get):
    global dico_id_genres, dico_id_people, dico_id_original_language, dico_id_release_date
    m_json = requests.get(f"{url_get}/movies/").json()
    max_pos = 0

    for movie in m_json:
        for genre_id in json.loads(movie["genre_ids"]):
            if genre_id is not None and genre_id not in dico_id_genres:
                dico_id_genres[genre_id] = max_pos
                max_pos += 1

    for movie in m_json:
        for n_actor in range(1,6):
            actor_id = movie[f"actor{n_actor}_id"]
            if actor_id is not None and actor_id not in dico_id_people:
                dico_id_people[actor_id] = max_pos
                max_pos += 1
        director_id = movie["director_id"]
        if director_id is not None and director_id not in dico_id_people:
            dico_id_people[director_id] = max_pos
            max_pos += 1
        writer_id = movie["writer_id"]
        if writer_id is not None and writer_id not in dico_id_people:
            dico_id_people[writer_id] = max_pos
            max_pos += 1
    
    for movie in m_json:
        original_language = movie["original_language"]
        if original_language is not None and original_language not in dico_id_original_language:
            dico_id_original_language[original_language] = max_pos
            max_pos += 1

    for i in range(6):
        dico_id_release_date[i] = max_pos
        max_pos += 1
    
    max_pos = 0
    for movie in m_json:
        dico_id_film[movie["id"]] = max_pos
        max_pos += 1

    global nb_genres, nb_people, nb_original_lenguage, nb_release_date, nb_films
    nb_genres = len(dico_id_genres)
    nb_people = len(dico_id_people)
    nb_original_lenguage = len(dico_id_original_language)
    nb_release_date = len(dico_id_release_date)
    nb_films = len(dico_id_film)
   

def id_in_categories(category, id_value):
    """
    Retourne l'index dans le vecteur correspondant à la représentation du film.
    """
    if category == "genre":
        return dico_id_genres[id_value]
    elif category == "people":
        return dico_id_people[id_value]
    elif category == "original_language":
        return dico_id_original_language[id_value]
    elif category == "release_date":
        return dico_id_release_date[id_value]
    else:
        raise ValueError("Catégorie inconnue")

def movie_matrix(url_get):
    m_json = requests.get(f"{url_get}/movies/").json()
    res = csr_matrix((len(m_json), nb_genres + nb_people + nb_original_lenguage + nb_release_date + 1), dtype=int)
    res = res.tolil()
    for i, movie in enumerate(m_json):
        #Genres:
        for genre_id in json.loads(movie["genre_ids"]):
            res[i, id_in_categories("genre", genre_id)] = 1
        
        #People:
        director_id = movie["director_id"]
        if director_id is not None:
            res[i, id_in_categories("people", director_id)] = 1
        writer_id = movie["writer_id"]
        if writer_id is not None:
            res[i, id_in_categories("people", writer_id)] = 1
        for n_actor in range(1, 6):  # On prend les 5 premiers acteurs
            actor_id = movie[f"actor{n_actor}_id"]
            if actor_id is not None:
                res[i, id_in_categories("people", actor_id)] = 1
    
        #Original language:
        original_language = movie["original_language"]
        if original_language is not None:
            res[i, id_in_categories("original_language", original_language)] = 1

        #Release date:
        release_date = movie["release_date"]
        if release_date is not None and release_date != "":
            year_category = 0
            if int(release_date[:4]) < 1980:
                year_category = 0
            elif int(release_date[:4]) < 1990:
                year_category = 1
            elif int(release_date[:4]) < 2000:
                year_category = 2
            elif int(release_date[:4]) < 2010:
                year_category = 3
            elif int(release_date[:4]) < 2020:
                year_category = 4
            else:
                year_category = 5
            res[i, id_in_categories("release_date", year_category)] = 1
        
        #id:
        res[i, -1] = movie["id"]

    return res.tocsr()

def user_rating_vector(url_get, user_id):
    user_json = requests.get(f"{url_get}/users/").json()
    res = csr_matrix((1, nb_films))
    res = res.tolil()

    user_ratings = next((user['dict'] for user in user_json['users'] if user['id'] == user_id), None)

    if user_ratings is None:
        print(f"User with ID {user_id} not found.")
        return res.tocsr()

    for movie_id, rating in user_ratings.items():
        rating = int(rating)        #en str dans le json
        movie_id = int(movie_id)  
        if movie_id in dico_id_film:
            res[0, dico_id_film[movie_id]] = rating + 1  # On ajoute 1 pour avoir des 0 dans le vecteur: 0 si non vu, 1 si vu avec note 0, etc
                                                         #On veut des 0s car on travaille avec des matrices creuses
    return res.tocsr()