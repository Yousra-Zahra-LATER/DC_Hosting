from rest_framework.routers import DefaultRouter
from .views import *
from . import views 
from django.urls import path

router = DefaultRouter()
router.register(r'register', RegisterView, basename='register')
#router.register(r'logout', LogoutViewSet, basename='logout')


urlpatterns = [
      path('login/', LoginView, name='login'),
      path('logout/', logout_view, name='logout'),
]

urlpatterns += router.urls




"""router.register(r'datacenters', DataCenterViewSet)"""
"""router.register(r'racks', RackViewSet)
router.register(r'devices', DeviceViewSet)

router.register(r'devicehistories', DeviceHistoryViewSet)
router.register(r'vlans', VlanViewSet)
router.register(r'plages', PlageViewSet)
router.register(r'ipv4networks', IPv4NetworksViewSet)
router.register(r'cables', CableViewSet)
router.register(r'users', CustomUserViewSet)
router.register(r'serveurs', ServeurViewSet)
router.register(r'switchs', SwitchViewSet)
router.register(r'routeurs', RouteurViewSet)
router.register(r'firewalls', FirewallViewSet)
router.register(r'vlanlinks', VlanLinkViewSet)"""