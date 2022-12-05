import sys
from heapq import heapify, heappush
from random import randint, choice
from operator import add, sub
class Grafo:
    def dijsktra(self, grafo, origem, dest):
        inf = sys.maxsize
        grafo_aux = {'Alisson': {'custo': inf, 'pred': [], 'forca': randint(50, 500)}, # Custo = Distância
                     'Danilo': {'custo': inf, 'pred': [], 'forca': randint(50, 500)},
                     'Thiago Silva': {'custo': inf, 'pred': [], 'forca': randint(50, 500)},
                     'Marquinhos': {'custo': inf, 'pred': [], 'forca': randint(50, 500)},
                     'Casemiro': {'custo': inf, 'pred': [], 'forca': randint(50, 500)},
                     'Alexandro': {'custo': inf, 'pred': [], 'forca': randint(50, 500)},
                     'Raphinha': {'custo': inf, 'pred': [], 'forca': randint(50, 500)},
                     'Paquetá': {'custo': inf, 'pred': [], 'forca': randint(50, 500)},
                     'Richarlison': {'custo': inf, 'pred': [], 'forca': randint(50, 500)},
                     'Neymar': {'custo': inf, 'pred': [], 'forca': randint(50, 500)},
                     'Vini Jr.': {'custo': inf, 'pred': [], 'forca': randint(50, 500)}
                     }
        grafo_aux[origem]['custo'] = 0
        visitado = []
        temp = origem
        for i in range(0, len(grafo)-1):
            if temp not in visitado:
                visitado.append(temp)
                min_heap = []
                for j in grafo[temp]:
                    if j not in visitado:
                        custo = grafo_aux[temp]['custo'] + grafo[temp][j]
                        if custo < grafo_aux[j]['custo']:
                            grafo_aux[j]['custo'] = custo
                            grafo_aux[j]['pred'] = grafo_aux[temp]['pred'] + [temp]
                        heappush(min_heap, (grafo_aux[j]['custo'], j))
            heapify(min_heap)
            temp = min_heap[0][1]
        jogadores = []
        jogadores.append('<h2>Resultado</h2>')
        for i in grafo_aux[dest]['pred']:
            jogadores.append('<a type="button" class="btn btn-dark btn-lg">' + i + '</a>')
            jogadores.append('<button type="button" class="btn btn-light btn-lg"> -> </button>')
        jogadores.append('<a type="button" class="btn btn-dark btn-lg">' + dest + '</a>')
        return jogadores, str('<br><br><button type="button" class="btn btn-success btn-lg"> Menor distância: ' + str(grafo_aux[dest]['custo']) + ' </button> ')

    """
        Função que insere uma nova aresta no grafo
        grafo: grafo com os jogadores
        a: primeiro vértice
        b: segundo vértice
        dist: distância
        forca: número aleatório   
    """
    def addEdge(self, grafo, a, b, dist, forca):

        if a not in grafo:
            grafo[a] = {}
        if b not in grafo:
            grafo[b] = {}

        ops = (add, sub)
        op = choice(ops)

        pesoBola = 0.41
        velocidadeVento = randint(-7, 7)
        atritoGramado = randint(-5, 5)

        distanciaBola = dist * pesoBola
        ventoAtrito = op(velocidadeVento, atritoGramado)
        pesoFinal = op(distanciaBola, ventoAtrito)

        if forca >= pesoFinal:
            grafo[a][b] = int(pesoFinal)
            grafo[b][a] = int(pesoFinal)
