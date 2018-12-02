DROP VIEW v_todasnoticias, v_noticia_midia;
CREATE VIEW v_todasnoticias AS
    SELECT t_noticia.codigo as codNoticia,
		   manchete,
		   corpo,
		   submetidapor,
		   cpf,
		   t_candidato.nome as nome,
		   datanascimento,
		   concorreem,
		   t_cargo.nome as cargo,
           t_coligacao.nome as coligacao,
           t_candidato.siglaPartido as partido
	FROM t_noticia,
         t_candidato,
         r_candidato_noticia,
         t_cargo,
         t_coligacao,
         r_partido_coligacao
	WHERE r_candidato_noticia.cpfCandidato = t_candidato.cpf
	  AND r_candidato_noticia.codNoticia = t_noticia.codigo
	  AND t_cargo.codigo = codcargo
      AND r_partido_coligacao.siglaPartido = t_candidato.siglaPartido
      AND r_partido_coligacao.codColigacao = t_coligacao.codigo;


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
