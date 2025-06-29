// Em um arquivo de tipos (ex: types/jogos.d.ts)
export interface JogoData {
  jogos_id: string;
  jogos_nome: string;
  jogos_descricao?: string;
  jogos_link?: string;
  jogos_autor?: string;
  jogos_url_img?: string;
  // Adicione outros campos que possam ser necessários
}