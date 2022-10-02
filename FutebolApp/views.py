import math
import networkx as nx
import matplotlib.pyplot as plt
import networkx.algorithms.approximation as nx_app

from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from FutebolApp.distancia.dijkstra import Grafo
from FutebolApp.models import Jogadores
from FutebolApp.serializers import JogadoresSerializer

# Create your views here.

@csrf_exempt
def futebolApi(request):
    if request.method == 'GET':
        jogadores = Jogadores.objects.all()
        jogadores_serializer = JogadoresSerializer(jogadores, many=True)
        print(jogadores_serializer.data[1]['JogadorX'])
        print(jogadores_serializer.data[1]['JogadorY'])
        g = Grafo(11)
        j = 1
        for i in range(0, 10):
            x = [jogadores_serializer.data[i]['JogadorX'], jogadores_serializer.data[i]['JogadorY']]
            y = [jogadores_serializer.data[j]['JogadorX'], jogadores_serializer.data[j]['JogadorY']]
            g.adiciona_aresta(jogadores_serializer.data[i]['JogadorId'], jogadores_serializer.data[j]['JogadorId'], int(math.dist(x, y)))
            print(f'{jogadores_serializer.data[i]["JogadorId"]} -> {jogadores_serializer.data[j]["JogadorId"]}: {math.dist(x, y):.2f}.')
            j += 1

        g.mostra_matriz()
        resultado = g.dijkstra(0)
        print(resultado)
        return JsonResponse(jogadores_serializer.data, safe=False)
    elif request.method == 'POST':
        jogadores_data = JSONParser().parse(request)
        jogadores_serializer = JogadoresSerializer(data = jogadores_data, many=True)
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
        jogadores_data = JSONParser().parse(request)
        jogadores = Jogadores.objects.get(JogadorId = jogadores_data['JogadorId'])
        jogadores.delete()
        return JsonResponse("Deletado com sucesso", safe=False)

