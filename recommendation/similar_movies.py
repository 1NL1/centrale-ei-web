#Movies: m = [acteurs, genres, AVGrating, idFilm] (vecteur de taille n+2)
#score = similarité cosinus = u.m / ||u|| * ||m||

import numpy as np
from scipy.sparse import csr_matrix, linalg

def cosine_similarity(u, m):
    """
    Calcule la similarité cosinus entre deux vecteurs u et m
    """
    norm_u = linalg.norm(u)
    norm_m = linalg.norm(m)
    if norm_u == 0 or norm_m == 0:
        return 0
    return (u @ m.T) / (norm_u * norm_m)

def get_pos_from_id(movie_matrix, id_movie):
    """
    Retourne la position d'un film dans la matrice m à partir de son identifiant
    """
    for i in range(movie_matrix.shape[0]):
        if movie_matrix[i, -1] == id_movie:
            return i
    return None

def similar_movies(movies_matrix, id_movie):
    """
    movie_matrix: matrice des films (chaque ligne est un vecteur de caractéristiques d'un film) (matrice creuse)
    id_movie: identifiant du film pour lequel on veut trouver des films similaires
    Retourne les indices des films similaires triés par score décroissant
    """
    scores = []
    original_movie_vector = movies_matrix[get_pos_from_id(movies_matrix, id_movie), :-1]
    for i in range(movies_matrix.shape[0]):
        if movies_matrix[i, -1] != id_movie:
            score = cosine_similarity(original_movie_vector, movies_matrix[i, :-1])  # Exclure la dernière colonne (idFilm)
            scores.append((int(movies_matrix[i, -1]), score))
    
    # Trier les films par score décroissant
    scores.sort(key=lambda x: x[1], reverse=True)
    # Retourner les indices des films triés
    return [index for index, score in scores if score > 0]