from rest_framework import viewsets
from dc_management.models import *
from dc_management.serializers import *
from rest_framework.authentication import *
from rest_framework.permissions import *
from django.db.models import Q
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import RegisterSerializer, LoginSerializer
from django.contrib.auth import get_user_model
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer, LoginSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class RegisterView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    


@api_view(['POST'])
def LoginView(request):
    print("LoginView called")  # Indique que la vue a été appelée
    
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        print("Serializer is valid")  # Indique que les données sont valides
        
        email = serializer.validated_data.get('email')
        password = serializer.validated_data.get('password')
        print(f"Email: {email}, Password: {password}")  # Affiche l'email et le mot de passe reçus
        
        try:
            user1 = User.objects.get(email=email)
            print(f"User found: {user1.password}")  # Affiche le prénom de l'utilisateur trouvé
        except User.DoesNotExist:
            print("User with this email does not exist")  # Si l'utilisateur n'existe pas
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        
        
        # Authentifier l'utilisateur
        user = authenticate(request, email=email, password=password)
        
        if user is None:
            print("Authentication failed")  # Indique que l'authentification a échoué
            return Response({"detail": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)
        
        print(f"User authenticated: {user.email}")  # Affiche l'email de l'utilisateur authentifié
        
        # Vérifier le statut de l'utilisateur
        if not user.is_active:
            print("User account is not active")  # Indique que le compte de l'utilisateur est inactif
            return Response({"detail": "Account is not active."}, status=status.HTTP_403_FORBIDDEN)

        # Préparer la réponse en fonction du rôle
        response_data = {
            'role': user.role,
            'email': user.email,
        }

        print("Returning success response")  # Indique que la réponse de succès est sur le point d'être retournée
        return Response(response_data, status=status.HTTP_200_OK)
    
    print("Serializer is not valid:", serializer.errors)  # Affiche les erreurs du sérialiseur
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def logout_view(request):
    try:
        logout(request)
        return Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

"""class LogoutViewSet(viewsets.ViewSet):
    def create(self, request):
        try:
            refresh_token = request.data.get('refresh')
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({'message': 'Logout successful.'}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)"""


"""class DataCenterViewSet(viewsets.ModelViewSet):


    queryset = DataCenter.objects.all()
    serializer_class = DataCenterSerializer"""
    
"""class RackViewSet(viewsets.ModelViewSet):
    queryset = Rack.objects.all()
    serializer_class = RackSerializer

class DeviceViewSet(viewsets.ModelViewSet):
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer
    
@api_view(['GET'])
def get_Active(request):
    active_devices = Device.objects.filter(Status='active')
    serializer = DeviceSerializer(active_devices, many=True)
    return Response(serializer.data)


   
class ServeurViewSet(viewsets.ModelViewSet):
    queryset = Serveur.objects.all()
    serializer_class = ServeurSerializer

    
    
class DeviceHistoryViewSet(viewsets.ModelViewSet):
    queryset = Device_history.objects.all()
    serializer_class = DeviceHistorySerializer

class VlanViewSet(viewsets.ModelViewSet):
    queryset = Vlan.objects.all()
    serializer_class = VlanSerializer

class PlageViewSet(viewsets.ModelViewSet):
    queryset = Plage.objects.all()
    serializer_class = PlageSerializer

class IPv4NetworksViewSet(viewsets.ModelViewSet):
    queryset = IPv4Networks.objects.all()
    serializer_class = IPv4NetworksSerializer

class CableViewSet(viewsets.ModelViewSet):
    queryset = Cable.objects.all()
    serializer_class = CableSerializer

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
class SwitchViewSet(viewsets.ModelViewSet):
    queryset = Switch.objects.all()
    serializer_class = SwitchSerializer

class RouteurViewSet(viewsets.ModelViewSet):
    queryset = Routeur.objects.all()
    serializer_class = RouteurSerializer

class FirewallViewSet(viewsets.ModelViewSet):
    queryset = Firewall.objects.all()
    serializer_class = FirewallSerializer

class VlanLinkViewSet(viewsets.ModelViewSet):
    queryset = Vlan_Link.objects.all()
    serializer_class = VlanLinkSerializer"""