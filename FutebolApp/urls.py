from django.urls import re_path
from FutebolApp import views

urlpatterns = [
    re_path(r'^jogadores/$', views.futebolApi),
    re_path(r'^jogadores/([0-9]+)$', views.futebolApi)
]