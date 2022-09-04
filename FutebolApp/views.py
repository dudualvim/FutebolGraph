from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from FutebolApp.models import Jogadores
from FutebolApp.serializers import JogadoresSerializer

# Create your views here.

@csrf_exempt
def futebolApi(request,id=0):
    if request.method == 'GET':
        jogadores = Jogadores.objects.all()
        jogadores_serializer = JogadoresSerializer(jogadores, many=True)
        return JsonResponse(jogadores_serializer.data, safe=False)
    elif request.method == 'POST':
        jogadores_data = JSONParser().parse(request)
        jogadores_serializer = JogadoresSerializer(data = jogadores_data)
        if jogadores_serializer.is_valid():
            jogadores_serializer.save()
            return JsonResponse("Adicionado com sucesso!", safe=False)
        return JsonResponse("Falha ao salvar um novo jogador", safe=False)
    elif request.method == 'PUT':
        jogadores_data = JSONParser().parse(request)
        jogadores = Jogadores.objects.get(JogadorId=jogadores_data['JogadorId'])
        jogadores_serializer = JogadoresSerializer(jogadores, data = jogadores_data)
        if jogadores_serializer.is_valid():
            jogadores_serializer.save()
            return JsonResponse("Atualizado com sucesso!", safe=False)
        return JsonResponse("Falha ao atualizar", safe=False)

    elif request.method == "DELETE":
        jogadores = Jogadores.objects.get(JogadoresId = id)
        jogadores.delete()
        return JsonResponse("Deletado com sucesso", safe=False)

