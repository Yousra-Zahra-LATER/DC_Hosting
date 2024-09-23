from django.http import JsonResponse
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from django.urls import resolve

class JWTAuthenticationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Chemins exemptés de l'authentification
        exempt_paths = ['/api/token/','/api/token/refresh/']
        
        # Récupérer le chemin de la requête actuelle
        current_path = request.path
        # Si le chemin est exempté, passer à la vue sans vérification de l'authentification
        if current_path in exempt_paths:
            return self.get_response(request)

        # Vérification du jeton JWT dans le header Authorization
        auth_header = request.headers.get('Authorization')
        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]  # Extraire le jeton
            try:
                # Valider le jeton
                AccessToken(token)
                # Si le jeton est valide, continuer la requête
                return self.get_response(request)
            except (InvalidToken, TokenError):
                # Jeton invalide ou expiré
                return JsonResponse({'error': 'Jeton invalide ou expiré'}, status=401)
        else:
            # Aucun jeton fourni
            return JsonResponse({'error': 'Jeton manquant'}, status=401)
