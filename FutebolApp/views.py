import math
import pandas as pd
import js2py as js
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
        return JsonResponse(str(jogadores_serializer.data), safe=False)
    elif request.method == 'POST':
        jogadores_data = JSONParser().parse(request)
        jogadores_serializer = JogadoresSerializer(data=jogadores_data, many=True)
        if jogadores_serializer.is_valid():
            jogadores_serializer.save()
            return JsonResponse(dijkstra(jogadores_serializer), safe=False)
        return JsonResponse(str(jogadores_serializer.errors), safe=False)
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

def printDict(dictObj):
    my_list = []
    i = 0
    for vert, adj in dictObj.items():
      my_list.insert(i, f'<li class="list-group-item bg-dark"> <b>{vert}</b> {adj} </li>')
      i += 1

    s = ''.join(str(x) for x in my_list)
    return str(s)

def dijkstra(jogadores_serializer):
    g = {}
    gr = Grafo()
    for i in range(0, len(jogadores_serializer.data)):
        for j in range(1, len(jogadores_serializer.data)-1):
            if jogadores_serializer.data[i] != jogadores_serializer.data[j]:
                x = [jogadores_serializer.data[i]['JogadorX'], jogadores_serializer.data[i]['JogadorY']]
                y = [jogadores_serializer.data[j]['JogadorX'], jogadores_serializer.data[j]['JogadorY']]
                gr.addEdge(g, jogadores_serializer.data[i]['JogadorNome'], jogadores_serializer.data[j]['JogadorNome'],
                                  int(math.dist(x, y)), jogadores_serializer.data[i]['JogadorForca'])

    # Mostra a matriz de distâncias no terminal
    df = pd.DataFrame(g)
    df.fillna(0, inplace=True)

    # Mostra a matriz como uma tabela HTML
    html = df.to_html(classes = ['table', 'table-dark', 'table-hover', 'table-striped'], justify = 'center')

    source = 'Alisson'
    destination = 'Neymar'
    resultado = gr.dijsktra(g, source, destination)
    return html, str('<h2>Lista de Adjacências</h2> <ul class="list-group">' + printDict(g) + '</ul>'), resultado