DROP VIEW IF EXISTS v_todasnoticias, v_noticia_midia, v_partidos_coligacao;
CREATE VIEW v_todasnoticias AS
    SELECT DISTINCT t_noticia.codigo as codNoticia,
		   manchete,
		   corpo,
		   submetidapor,
		   cpf,
		   t_candidato.nome as nome,
		   datanascimento,
		   concorreem,
		   t_cargo.nome as cargo,
           t_candidato.siglaPartido as partido
	FROM t_noticia,
         t_candidato,
         r_candidato_noticia,
         t_cargo
	WHERE r_candidato_noticia.cpfCandidato = t_candidato.cpf
	  AND r_candidato_noticia.codNoticia = t_noticia.codigo
	  AND t_cargo.codigo = t_candidato.codCargo;


CREATE VIEW v_noticia_midia AS
SELECT
	t_noticia.codigo as codigo,
	manchete,
	corpo,
	submetidapor,
	t_publicacao.link,
	autor,
	t_veiculo.nome as veiculo,
	arquivo,
	fotovideo,
	t_midia.codNoticia as midia_cod,
	t_midia.linkPublicacao as midia_link
	FROM t_noticia, t_publicacao, t_veiculo, t_midia
	WHERE t_publicacao.codveiculo = t_veiculo.codigo
		AND (
			t_midia.linkpublicacao = t_publicacao.link
			OR t_midia.codnoticia = t_noticia.codigo
		);

CREATE VIEW v_partidos_coligacao AS
SELECT
	t_partido.sigla as sigla,
	t_partido.nome as nomePartido,
	t_coligacao.nome as nomeColigacao,
	t_coligacao.ehDe as estado
	FROM t_partido, r_partido_coligacao, t_coligacao
	WHERE t_partido.sigla = r_partido_coligacao.siglaPartido
	AND   t_coligacao.codigo = r_partido_coligacao.codColigacao;
