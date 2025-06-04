#Algo de recomendation, content-based
#Movies: m = [acteurs, genres, AVGrating, idFilm] (vecteur de taille n+2)
#Users: u = [moyenne de (notes des films vus - note moyenne du user) pour chaque caracteristique] (vecteur de taille n)
#score = similarité cosinus = u.m / ||u|| * ||m||
import numpy as np

def cosine_similarity(u, m):
    """
    Calcule la similarité cosinus entre deux vecteurs u et m
    """
    norm_u = np.linalg.norm(u)
    norm_m = np.linalg.norm(m)
    if norm_u == 0 or norm_m == 0:
        return 0
    return np.dot(u, m) / (norm_u * norm_m)

def recommend_movies(u, m):
    """
    u: vecteur utilisateur (caractéristiques)
    m: matrice des films (chaque ligne est un vecteur de caractéristiques d'un film)
    Retourne les indices des films recommandés triés par score décroissant
    """
    scores = []
    for i in range(m.shape[0]):
        score = cosine_similarity(u, m[i][:-1])  # Exclure les deux dernières colonnes (AVGrating et idFilm)
        scores.append((m[i][-1], score))
    
    # Trier les films par score décroissant
    scores.sort(key=lambda x: x[1], reverse=True)
    print("scores", scores)
    # Retourner les indices des films triés
    return [index for index, score in scores if score > 0]


def calculate_user_vector(movies_matrix, user_ratings):
    """
    Calcule le vecteur utilisateur à partir de la matrice des films
    movies_matrix: matrice des films (chaque ligne est un vecteur de caractéristiques d'un film)
    user_ratings: vecteur des notes de l'utilisateur pour les films
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

    return user_vector

def recommendation(movies_matrix, user_ratings):
    u = calculate_user_vector(movies_matrix, user_ratings)
    return recommend_movies(u, movies_matrix)

m = np.array([
    [1,0,1,0,0,3,1],#0
    [0,1,0,0,1,5,2],
    [0,1,0,0,0,5,3],#4
    [0,0,0,0,1,4,4],#5
])
user = [0, -1, 4, 5]
print("here", recommendation(m,user))

#PB: nouvel utilisateur? on a pas son profil...
#==> recomendations populaires au debut? Avec possibilité de noter plein de films d'un coup? 