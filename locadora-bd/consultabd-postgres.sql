SELECT * FROM ator;

SELECT titulo, descricao
	FROM filme, categoria
	WHERE filme.codcat = categoria.codcat;

SELECT titulo, nfan
	FROM filme, filme_ator, ator
	WHERE filme.codfilme = filme_ator.codfilme and ator.codator = filme_ator.codator;

SELECT titulo, nfan
	FROM filme
    LEFT JOIN (
        	SELECT *
        		FROM ator, filme_ator
        		WHERE ator.codator = filme_ator.codator
          ) AS atores ON filme.codfilme = atores.codfilme;

WITH filmes AS (
    SELECT codfilme
    FROM ator INNER JOIN filme_ator ON ator.codator = filme_ator.codator
    WHERE ator.nfan = 'Gloria Pires'
)
SELECT nfan
	FROM ator, filme_ator, filmes
    WHERE ator.codator = filme_ator.codator and filme_ator.codfilme = filmes.codfilme
    ORDER BY nfan;

SELECT nreal
	FROM ator
    WHERE nreal LIKE 'A%';

SELECT COUNT(*)
	FROM cliente;

SELECT DISTINCT nome
	FROM cliente, locacao
    WHERE cliente.codcli = locacao.codcli;

SELECT cliente.nome, COUNT(locacao.codloc)
	FROM cliente, locacao
	WHERE cliente.codcli = locacao.codcli
	GROUP BY cliente.nome;

SELECT cliente.nome, COUNT(locacao.codloc)
	FROM cliente, locacao
	WHERE cliente.codcli = locacao.codcli
	GROUP BY cliente.nome
	HAVING COUNT(locacao.codloc) > 1;
