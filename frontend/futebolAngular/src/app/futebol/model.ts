export interface IJogador {
  JogadorId: number;
  JogadorNome: string;
  JogadorForca: number;
  JogadorX: number;
  JogadorY: number;
}

export interface IJogadores {
  Jogadores ?: IJogador[];
}
