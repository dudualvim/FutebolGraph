from rest_framework import serializers
from FutebolApp.models import Jogadores

class JogadoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Jogadores
        fields = ('JogadorId',
                  'JogadorNome',
                  'JogadorForca',
                  'JogadorX',
                  'JogadorY')