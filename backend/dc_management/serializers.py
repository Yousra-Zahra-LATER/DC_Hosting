from rest_framework import serializers
from .models import *
from django.contrib.auth.hashers import make_password
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import get_user_model, authenticate
# Récupère le modèle utilisateur personnalisé ou le modèle utilisateur par défaut de Django.
User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'password', 'first_name', 'last_name', 'city', 'phone', 'role')
        extra_kwargs = {
            'password': {'write_only': True},   
            'role': {'read_only': True},
        }

    def validate_password(self, value):
        validate_password(value)
        return value

    def create(self, validated_data):
        password = validated_data.pop('password')
        #validated_data['last_login'] = datetime.now()
        validated_data.setdefault('role', 'client')
        user = User(**validated_data)
        user.set_password(password)  # Hachage du mot de passe avant le stockage
        user.save()
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

   
'''class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [ 'email', 'password','first_name','last_name', 'phone', 'city']
        extra_kwargs = {
            'password': {'write_only': True},  # Assure que le mot de passe est uniquement pour l'écriture   # Le mot de passe ne sera pas retourné dans les réponses API
        }
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])  # Hachage du mot de passe
        return super(UserSerializer, self).create(validated_data)'''




"""class DataCenterSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataCenter
        fields = '__all__' """

"""class RackSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Rack
        fields = '__all__'
class DeviceSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Device
        fields = '__all__'

class ServeurSerializer(serializers.ModelSerializer):

    device = DeviceSerializer(source='ID_Device')
    class Meta:
        model = Serveur
        fields = ('id', 'Ram', 'Processor', 'Disque', 'Stockage', 'OS_type', 'Ilo_ad', 'device')

class DeviceHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Device_history
        fields = '__all__'

class VlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vlan
        fields = '__all__'

class PlageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plage
        fields = '__all__'

class IPv4NetworksSerializer(serializers.ModelSerializer):
    class Meta:
        model = IPv4Networks
        fields = '__all__'

class CableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cable
        fields = '__all__'

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'

class SwitchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Switch
        fields = '__all__'

class RouteurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Routeur
        fields = '__all__'

class FirewallSerializer(serializers.ModelSerializer):
    class Meta:
        model = Firewall
        fields = '__all__'

class VlanLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vlan_Link
        fields = '__all__'
"""