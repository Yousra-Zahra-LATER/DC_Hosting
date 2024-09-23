# middleware.py
from django.http import JsonResponse
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed

class CustomJWTMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Identifier les requêtes à protéger
        protected_paths = ['/api/protected/', '/api/another_protected_path/']
        
        # Vérifier si la requête correspond à un chemin protégé
        if request.path in protected_paths:
            jwt_auth = JWTAuthentication()
            try:
                user, _ = jwt_auth.authenticate(request)
                request.user = user  # Ajouter l'utilisateur à la requête
            except AuthenticationFailed:
                return JsonResponse({'detail': 'Jeton invalide ou expiré.'}, status=401)

        # Traiter la requête
        response = self.get_response(request)

        return response
