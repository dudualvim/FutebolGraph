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

def printItems(dictObj, indent):
    print('  '*indent + '<ul>')
    for k,v in dictObj.items():
        if isinstance(v, dict):
            print( '  '*indent , '<li>', k, ':', '</li>')
            printItems(v, indent+1)
        else:
            print( ' '*indent , '<li>', k, ':', v, '</li>')
    print( '  '*indent + '</ul>')

def printDict(dictObj):
    my_list = []
    i = 0
    for vert, adj in dictObj.items():
      my_list.insert(0, f'{vert} {adj} <br>')
      i += 1
    return my_list

def makeEdges(resultado, jogadores_serializer):
    makeSVG = js.eval_js("""
        function desenharAresta(x, y, number) {
            const svg = document.createElementNS('http://www.w3.org/2000/svg' ,'svg');
            svg.setAttribute('width', '1470');
            svg.setAttribute('height', '800');
        
            const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            const linearGradient = document.createElementNS("http://www.w3.org/2000/svg", 'linearGradient');
            linearGradient.setAttribute('id', 'gradient');
            linearGradient.setAttribute('x1', '0%');
            linearGradient.setAttribute('y1', '100%');
            linearGradient.setAttribute('x2', '0%');
            linearGradient.setAttribute('y2', '0%');
        
            const stop1 = document.createElementNS("http://www.w3.org/2000/svg", 'stop');
            const stop2 = document.createElementNS("http://www.w3.org/2000/svg", 'stop');
            stop1.setAttribute('offset', '0%');
            stop1.setAttribute('stop-color', '#00b824');
            stop2.setAttribute('offset', '100%');
            stop2.setAttribute('stop-color', '#007940');
            linearGradient.appendChild(stop1);
            linearGradient.appendChild(stop2);
            defs.appendChild(linearGradient);
            svg.appendChild(defs);   
            
            for (let j = 0; j < number; j++) {
                const line = document.createElementNS('http://www.w3.org/2000/svg' , 'line');
                line.setAttribute('x1', x[j]); // X inicial
                line.setAttribute('y1', y[j]); // Y Inicial
                line.setAttribute('x2', x[j]); // X Final
                line.setAttribute('y2', y[j]); // Y Final
                line.setAttribute('stroke', 'url(#gradient)');
                line.setAttribute('stroke-width', '5');
                line.setAttribute('style', 'filter: drop-shadow(0px 0px 4px rgb(80, 141, 44)');
                svg.appendChild(line);
                document.getElementById('drop-list').appendChild(svg);
              }        
        }
        """)

    x = []
    y = []

    for i in resultado:
        for j in range(10):
            if i == jogadores_serializer.data[j]['JogadorNome']:
                x.append(jogadores_serializer.data[j]['JogadorX'])
                y.append(jogadores_serializer.data[j]['JogadorY'])

    print(len(y))
    return str('<script>' + makeSVG(x, y, len(y)) + '</script>')



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
                print(len(g))

    # Mostra a matriz de distâncias no terminal
    df = pd.DataFrame(g)
    df.fillna(0, inplace=True)

    # Mostra a matriz como uma tabela HTML
    html = df.to_html(classes = 'table', justify = 'center')

    source = 'Alisson'
    destination = 'Neymar'
    resultado = gr.dijsktra(g, source, destination)
    return html, printDict(g), resultado