INSERT INTO t_local (sigla,nome) VALUES('AC','Acre');
INSERT INTO t_local (sigla,nome) VALUES('AL','Alagoas');
INSERT INTO t_local (sigla,nome) VALUES('AM','Amazonas');
INSERT INTO t_local (sigla,nome) VALUES('AP','Amapá');
INSERT INTO t_local (sigla,nome) VALUES('BA','Bahia');
INSERT INTO t_local (sigla,nome) VALUES('CE','Ceará');
INSERT INTO t_local (sigla,nome) VALUES('DF','Distrito Federal');
INSERT INTO t_local (sigla,nome) VALUES('ES','Espírito Santo');
INSERT INTO t_local (sigla,nome) VALUES('GO','Goiás');
INSERT INTO t_local (sigla,nome) VALUES('MA','Maranhão');
INSERT INTO t_local (sigla,nome) VALUES('MG','Minas Gerais');
INSERT INTO t_local (sigla,nome) VALUES('MS','Mato Grosso do Sul');
INSERT INTO t_local (sigla,nome) VALUES('MT','Mato Grosso');
INSERT INTO t_local (sigla,nome) VALUES('PA','Pará');
INSERT INTO t_local (sigla,nome) VALUES('PB','Paraíba');
INSERT INTO t_local (sigla,nome) VALUES('PE','Pernambuco');
INSERT INTO t_local (sigla,nome) VALUES('PI','Piauí');
INSERT INTO t_local (sigla,nome) VALUES('PR','Paraná');
INSERT INTO t_local (sigla,nome) VALUES('RJ','Rio de Janeiro');
INSERT INTO t_local (sigla,nome) VALUES('RN','Rio Grande do Norte');
INSERT INTO t_local (sigla,nome) VALUES('RO','Rondônia');
INSERT INTO t_local (sigla,nome) VALUES('RR','Roraima');
INSERT INTO t_local (sigla,nome) VALUES('RS','Rio Grande do Sul');
INSERT INTO t_local (sigla,nome) VALUES('SC','Santa Catarina');
INSERT INTO t_local (sigla,nome) VALUES('SE','Sergipe');
INSERT INTO t_local (sigla,nome) VALUES('SP','São Paulo');
INSERT INTO t_local (sigla,nome) VALUES('TO','Tocantins');
INSERT INTO t_local (sigla,nome) VALUES('BR','Brasil');

INSERT INTO t_coligacao (ehDe, nome) VALUES('BR','Brisil icimi di tidi, Dis icimi di tidis');
INSERT INTO t_coligacao (ehDe, nome) VALUES('AC','Pelo Menino do Acre');
INSERT INTO t_coligacao (ehDe, nome) VALUES('GO','Goiás Radiante');
INSERT INTO t_coligacao (ehDe, nome) VALUES('ES','Não Somos o Acre do Sudeste');
INSERT INTO t_coligacao (ehDe, nome) VALUES('DF','Águas Claras Independente');

INSERT INTO t_partido (sigla, nome) VALUES('PT', 'Partido dos Transeuntes');
INSERT INTO t_partido (sigla, nome) VALUES('PP', 'Partido da Plantinha');
INSERT INTO t_partido (sigla, nome) VALUES('PSOL', 'Partido do Sistema Solar');
INSERT INTO t_partido (sigla, nome) VALUES('PSL', 'Partido dos Sem Leis');
INSERT INTO t_partido (sigla, nome) VALUES('PUM', 'Partido da União Mobilizadora');
INSERT INTO t_partido (sigla, nome) VALUES('PST', 'Partido Social Trabalhista');
INSERT INTO t_partido (sigla, nome) VALUES('PMB', 'Partido da Monarquia Brasileira');

INSERT INTO r_partido_coligacao (codColigacao, siglaPartido)
    SELECT (
        SELECT codigo
        FROM t_coligacao
        WHERE nome='Brisil icimi di tidi, Dis icimi di tidis'
    ) AS codColigacao, 'PSL' AS siglaPartido;

INSERT INTO r_partido_coligacao (codColigacao, siglaPartido)
    SELECT (
        SELECT codigo
        FROM t_coligacao
        WHERE nome='Brisil icimi di tidi, Dis icimi di tidis'
    ) AS codColigacao, 'PUM' AS siglaPartido;

INSERT INTO r_partido_coligacao (codColigacao, siglaPartido)
    SELECT (
        SELECT codigo
        FROM t_coligacao
        WHERE nome='Goiás Radiante'
    ) AS codColigacao, 'PUM' AS siglaPartido;

INSERT INTO r_partido_coligacao (codColigacao, siglaPartido)
    SELECT (
        SELECT codigo
        FROM t_coligacao
        WHERE nome='Pelo Menino do Acre'
    ) AS codColigacao, 'PSOL' AS siglaPartido;

INSERT INTO r_partido_coligacao (codColigacao, siglaPartido)
    SELECT (
        SELECT codigo
        FROM t_coligacao
        WHERE nome='Águas Claras Independente'
    ) AS codColigacao, 'PSL' AS siglaPartido;

INSERT INTO r_partido_coligacao (codColigacao, siglaPartido)
    SELECT (
        SELECT codigo
        FROM t_coligacao
        WHERE nome='Águas Claras Independente'
    ) AS codColigacao, 'PMB' AS siglaPartido;

INSERT INTO t_cargo (nome) VALUES('Presidente');
INSERT INTO t_cargo (nome) VALUES('Deputado Federal');
INSERT INTO t_cargo (nome) VALUES('Senador');
INSERT INTO t_cargo (nome) VALUES('Governador');
INSERT INTO t_cargo (nome) VALUES('Deputado Estadual');

INSERT INTO t_veiculo (nome) VALUES('Facebook');
INSERT INTO t_veiculo (nome) VALUES('Blog');
INSERT INTO t_veiculo (nome) VALUES('Portal de Notícias');
INSERT INTO t_veiculo (nome) VALUES('Twitter');

INSERT INTO t_candidato (
    codCargo,
    cpf,
    nome,
    dataNascimento,
    siglaPartido,
    concorreEm
) SELECT (
    SELECT codigo
    FROM t_cargo
    WHERE nome='Presidente'
) AS codCargo,
'90512942048',
'Bolobiro',
'2008-03-21',
'PSL',
'BR';

INSERT INTO t_candidato (
    codCargo,
    cpf,
    nome,
    dataNascimento,
    siglaPartido,
    concorreEm
) SELECT (
    SELECT codigo
    FROM t_cargo
    WHERE nome='Presidente'
) AS codCargo,
'83564394001',
'Andrade',
'1963-01-25',
'PT',
'BR';

INSERT INTO t_candidato (
    codCargo,
    cpf,
    nome,
    dataNascimento,
    siglaPartido,
    concorreEm
) SELECT (
    SELECT codigo
    FROM t_cargo
    WHERE nome='Presidente'
) AS codCargo,
'12611526036',
'Giro Comes',
'1957-11-06',
'PST',
'BR';

INSERT INTO t_candidato (
    codCargo,
    cpf,
    nome,
    dataNascimento,
    siglaPartido,
    concorreEm
) SELECT (
    SELECT codigo
    FROM t_cargo
    WHERE nome='Senador'
) AS codCargo,
'82045696022',
'Júlio César',
'0001-07-13',
'PSOL',
'CE';

INSERT INTO t_candidato (
    codCargo,
    cpf,
    nome,
    dataNascimento,
    siglaPartido,
    concorreEm
) SELECT (
    SELECT codigo
    FROM t_cargo
    WHERE nome='Deputado Estadual'
) AS codCargo,
'26346928031',
'Alceu Dispor',
'1973-04-22',
'PSOL',
'GO';

INSERT INTO t_candidato (
    codCargo,
    cpf,
    nome,
    dataNascimento,
    siglaPartido,
    concorreEm
) SELECT (
    SELECT codigo
    FROM t_cargo
    WHERE nome='Deputado Federal'
) AS codCargo,
'49772997010',
'Lora do Boticário',
'1983-07-12',
'PP',
'BR';
