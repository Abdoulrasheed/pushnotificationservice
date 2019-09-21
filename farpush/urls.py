from django.urls import path
from . import views

urlpatterns = [
	path('', views.home, name='home'),
	path('api/', views.messages_api, name='messages_api'),
	]
