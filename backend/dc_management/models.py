from django.db import models
from django.contrib.auth.base_user import *
from django.contrib.auth.models import *
from django.db import models


from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('client', 'Client'),
        ('commercial', 'Commercial'),
    ]
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    city = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='client')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
   

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'city', 'phone']

    def __str__(self):
        return self.email
    

'''class User(models.Model):
   
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    password = models.CharField(max_length=30)
    city = models.CharField(max_length=50)
    phone = models.CharField(max_length=15)
    
    


    def __str__(self):
        return self.email'''
"""class DataCenter(models.Model):
    Name = models.CharField(max_length=255)
    Localisation = models.CharField(max_length=255)
    Status=models.CharField(max_length=255)

    def __str__(self):
        return self.Name"""
"""   
class Rack(models.Model):
    Tag = models.CharField(max_length=255)
    Status = models.CharField(max_length=255)
    Height = models.IntegerField()
    U_utilise = models.IntegerField()
    U_dispo = models.IntegerField()
    Devices_Number = models.IntegerField()
    ID_DC = models.ForeignKey(DataCenter, on_delete=models.SET_NULL,null=True)

    def __str__(self):
        return self.Tag

class Device(models.Model):
    Name = models.CharField(max_length=255)
    Description = models.CharField(max_length=255)
    U_Position = models.IntegerField()
    Serial_number = models.CharField(max_length=255)
    Status = models.CharField(max_length=255)
    ID_Rack = models.ForeignKey(Rack, on_delete=models.SET_NULL,null=True)

    def __str__(self):
        return self.Name
    
class Serveur(models.Model):
    Ram = models.CharField(max_length=255)
    Processor = models.CharField(max_length=255)
    Disque = models.IntegerField()
    Stockage = models.CharField(max_length=255)
    OS_type = models.CharField(max_length=255)
    Ilo_ad = models.CharField(max_length=255)
    ID_Device = models.OneToOneField(Device, on_delete=models.CASCADE)
    cluster
    status
    site
    emplacement u et rack
    brand
    
class Device_history(models.Model):
    From = models.DateField()
    To = models.DateField()
    Description = models.CharField(max_length=255)
    Created = models.DateField()
    created_by = models.CharField(max_length=255)
    Localisation = models.CharField(max_length=255)
    ID_Device = models.ForeignKey(Device, on_delete=models.CASCADE)

class Vlan(models.Model):
    Vlan_number = models.IntegerField()
    Vlan_Name = models.CharField(max_length=255)

class Plage(models.Model):
    Address_Net = models.CharField(max_length=255)
    Subnet_Mask = models.CharField(max_length=255)
    Gateway = models.CharField(max_length=255)
    Nombre_Address = models.CharField(max_length=255)
    Description = models.CharField(max_length=255)

class IPv4Networks(models.Model):
    Address_ip = models.IntegerField(primary_key=True)
    Description = models.CharField(max_length=255)
    ID_Plage = models.ForeignKey(Plage, on_delete=models.CASCADE)


class Cable(models.Model):
    Device_A = models.CharField(max_length=255)
    Side_A = models.CharField(max_length=255)
    Side_B = models.CharField(max_length=255)
    Device_B = models.CharField(max_length=255)
    Type = models.CharField(max_length=255)
    Description = models.CharField(max_length=255)
    Length = models.CharField(max_length=255)
    Status = models.CharField(max_length=255)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=30, unique=True)
    first_name = models.CharField( max_length=30, blank=True)
    last_name = models.CharField( max_length=30, blank=True)
    is_staff = models.BooleanField(default=False)                           
    is_active = models.BooleanField( default=True)
    date_joined = models.DateTimeField( auto_now_add=True)

    USERNAME_FIELD='username'"
class Switch(models.Model):
    Port_number = models.IntegerField()
    Vlan_ip = models.CharField(max_length=255)
    mgmt_ad = models.CharField(max_length=255)
    ID_Device = models.ForeignKey(Device, on_delete=models.CASCADE)

class Routeur(models.Model):
    protocol_routing = models.CharField(max_length=255)
    Address_ip = models.CharField(max_length=255)
    Port_number = models.IntegerField()
    mgmt_ad = models.CharField(max_length=255)
    ID_Device = models.ForeignKey(Device, on_delete=models.CASCADE)

class Firewall(models.Model):
    Name = models.CharField(max_length=255)
    mgmt_ad = models.CharField(max_length=255)
    ID_Device = models.ForeignKey(Device, on_delete=models.CASCADE)


class Vlan_Link(models.Model):
    ID_Vlan = models.ForeignKey(Vlan, on_delete=models.CASCADE)
    ID_Serveur = models.ForeignKey(Serveur, on_delete=models.CASCADE)
    ID_Switch = models.ForeignKey(Switch, on_delete=models.CASCADE)
    ID_Routeur = models.ForeignKey(Routeur, on_delete=models.CASCADE)
    ID_Firewall = models.ForeignKey(Firewall, on_delete=models.CASCADE)
"""
