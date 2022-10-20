import math

class distancia:
    def calcularDistancia(self, x, y):
        print(f'Distância: {math.dist(x, y):.3f}.')

    def mostrarNome(self, x):
        return
        # G = nx.Graph()
        #         #
        #         # for i in range(0, 6):
        #     for j in range(1, 6):
        #         x = [jogadores_serializer.data[j]['JogadorX'], jogadores_serializer.data[j]['JogadorY']]
        #         y = [jogadores_serializer.data[i]['JogadorX'], jogadores_serializer.data[i]['JogadorY']]
        #         print(
        #             f'{jogadores_serializer.data[i]["JogadorId"]} -> {jogadores_serializer.data[j]["JogadorId"]}: {math.dist(x, y):.2f}.')
        #         G.add_edge(jogadores_serializer.data[i]["JogadorId"], jogadores_serializer.data[j]["JogadorId"],
        #                    weight=math.dist(x, y))
        #
        # elarge = [(u, v) for (u, v, d) in G.edges(data=True) if d["weight"] > 0.5]
        # esmall = [(u, v) for (u, v, d) in G.edges(data=True) if d["weight"] <= 0.5]
        #
        # pos = nx.spring_layout(G, seed=7)
        #
        # nx.draw_networkx_nodes(G, pos, node_size=700)
        #
        # nx.draw_networkx_edges(G, pos, edgelist=elarge, width=6)
        #
        # nx.draw_networkx_edges(
        #     G, pos, edgelist=esmall, width=6, alpha=0.5, edge_color="b", style="dashed"
        # )
        #
        # cycle = nx_app.christofides(G, weight="weight")
        # # cycle = nx.shortest_path(G, target=6, weight="weight", method='dijkstra')
        # edge_list = list(nx.utils.pairwise(cycle))
        #
        # length = dict(nx.all_pairs_dijkstra_path_length(G))
        #
        # # nx.draw_networkx(
        # #     G,
        # #     pos,
        # #     with_labels=True,
        # #     edgelist=edge_list,
        # #     edge_color="red",
        # #     node_size=200,
        # #     width=3,
        # # )
        #
        # print("The route of the traveller is:", cycle)
        # # plt.show()
        #
        # nx.draw_networkx_labels(G, pos, font_size=20, font_family="sans-serif")
        #
        # edge_labels = nx.get_edge_attributes(G, "weight")
        # nx.draw_networkx_edge_labels(G, pos, edge_labels)
        #
        # ax = plt.gca()
        # #
        # ax.margins(0.08)
        # plt.axis("off")
        # plt.tight_layout()
        # plt.show()
        # #
        # # dist = distancia()
        # # dist.calcularDistancia(x, y)
