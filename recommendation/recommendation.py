#Algo de recomendation, content-based
#Movies: m = [acteurs, genres, AVGrating, idFilm] (vecteur de taille n+2)
#Users: u = [moyenne de (notes des films vus - note moyenne du user) pour chaque caracteristique] (vecteur de taille n)
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

def filmValide(m, i_film, id_forced_categories):
    for id_forced_category in id_forced_categories:
        if not m[i_film, id_forced_category] == 1:
            return False
    return True

def recommend_movies(u, m, id_forced_categories):
    """
    u: vecteur utilisateur (caractéristiques) (matrice creuse)
    m: matrice des films (chaque ligne est un vecteur de caractéristiques d'un film) (matrice creuse)
    id_forced_category: catégorie forcée pour la recherche par genre (optionnel, None par défaut)
    Retourne les indices des films recommandés triés par score décroissant
    """
    scores = []
    for i in range(m.shape[0]):
        if id_forced_categories == [] or filmValide(m, i, id_forced_categories): #On ne considère que les films de la catégorie choisie
            score = cosine_similarity(u, m[i, :-1])  # Exclure la dernière colonne (idFilm)
            print(i, (m[i, -1], score))
            scores.append((m[i, -1], score))
    
    # Trier les films par score décroissant
    scores.sort(key=lambda x: x[1], reverse=True)
    print("scores", scores)
    # Retourner les indices des films triés
    return [index for index, score in scores] #if score > 0]


def calculate_user_vector(movies_matrix, user_ratings):
    """
    Calcule le vecteur utilisateur à partir de la matrice des films
    movies_matrix: matrice des films (chaque ligne est un vecteur de caractéristiques d'un film) (matrice creuse)
    user_ratings: vecteur des notes de l'utilisateur pour les films (matrice creuse)
    Retourne le vecteur utilisateur
    """
    user_mean_rating = np.mean([rating for rating in user_ratings if rating != -1])
    print("User mean rating:", user_mean_rating)

    user_vector = []
    for characteristic in range(movies_matrix.shape[1] - 1):
        ratings = [user_ratings[j] - user_mean_rating for j in range(len(user_ratings)) if movies_matrix[j, characteristic] != 0 and user_ratings[j] != -1]
        print(f"characteristic {characteristic} : ", ratings)
        if ratings:
            mean = np.mean(ratings)
            user_vector.append(mean)
        else:
            user_vector.append(0)

    return csr_matrix(user_vector)

def recommendation(movies_matrix, user_ratings, id_forced_categories = []):
    u = calculate_user_vector(movies_matrix, user_ratings)
    return recommend_movies(u, movies_matrix, id_forced_categories)

m = csr_matrix([[1, 0, 0, 1],
                [1, 1, 0, 2],
                [0, 1, 1, 3],
                [0, 0, 1, 4]])
print("m", m.toarray())
user = [0, -1, 4, 5]
print("here", recommendation(m,user))

#PB: nouvel utilisateur? on a pas son profil...
#==> recomendations populaires au debut? Avec possibilité de noter plein de films d'un coup? 