import sys
from heapq import heapify, heappush
from random import randint

x = 0
class Grafo:

    def dijsktra(self, grafo, origem, dest):
        global x
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
                        grafo_aux[j]['custo'] = custo
                        grafo_aux[j]['pred'] = grafo_aux[temp]['pred'] + [temp]
                        heappush(min_heap, (grafo_aux[j]['custo'], j))
            heapify(min_heap)
            temp = min_heap[0][1]
        return ("Menor Caminho: " + str(grafo_aux[dest]['pred'] + [dest])), ("Menor distância: " + str(grafo_aux[dest]['custo']))

    # Função que insere uma nova aresta no grafo
    def addEdge(self, grafo, key, vert, dist, forca):

        if key not in grafo:
            grafo[key] = {}
        if vert not in grafo:
            grafo[vert] = {}

        grafo[key][vert] = dist
        grafo[vert][key] = dist




#
#
# Jogadores = ['Alisson', 'Thiago Silva', 'Marquinhos', 'Danilo', 'Militão',
#              'Coutinho', 'Paquetá', 'B. Guimarães', 'Richarlison', 'Vini Jr.', 'Neymar']
#
# g = {}
# gr = Grafo()
# # Preenche automaticamente o grafo
# for i in range(11):
#     for j in range(10):
#         if Jogadores[i] != Jogadores[j]:
#             gr.addEdge(g, Jogadores[i], Jogadores[j], randint(0, 100))
#
# # Mostra a lista de adjacências no terminal
# print('Lista de Adjacências')
# for vert, adj in g.items():
#     print(f'{vert} {adj}')
#
# # Mostra a matriz de distâncias no terminal
# df = pd.DataFrame(g)
# df.fillna(0, inplace=True)
# print(df.iloc[::-1])
#
# # Mostra a matriz como uma tabela HTML
# html = df.to_html()
# print(html)
#
# source = 'Alisson'
# destination = 'Neymar'
# gr.dijsktra(g, source, destination)