CREATE TABLE t_local (
    sigla		CHAR(2),
	nome 		VARCHAR(30),
    PRIMARY KEY (sigla)
);

CREATE TABLE t_coligacao (
    codigo      SERIAL,
    nome        VARCHAR(40),
    ehDe        CHAR(2) REFERENCES t_local(sigla),
    PRIMARY KEY (codigo)
);

CREATE TABLE t_partido (
    sigla		VARCHAR(5),
	nome 		VARCHAR(40),
    PRIMARY KEY (sigla)
);

CREATE TABLE r_partido_coligacao (
    codColigacao SERIAL REFERENCES t_coligacao(codigo),
    siglaPartido VARCHAR(5) REFERENCES t_partido(sigla),
    PRIMARY KEY (codColigacao, siglaPartido)
);

CREATE TABLE t_cargo (
    codigo      SERIAL PRIMARY KEY,
    nome        VARCHAR(20)
);

CREATE TABLE t_veiculo (
    codigo      SERIAL PRIMARY KEY,
    nome        VARCHAR(30)
);

CREATE TABLE t_usuario (
    email      VARCHAR(50) PRIMARY KEY,
    nome        VARCHAR(50)
);

CREATE TABLE t_noticia (
    codigo          SERIAL PRIMARY KEY,
    manchete        VARCHAR(200),
    corpo           TEXT,
    submetidaPor    VARCHAR(50) REFERENCES t_usuario(email)
);

CREATE TABLE t_publicacao (
    link        VARCHAR(100) PRIMARY KEY,
    autor       VARCHAR(50),
    codVeiculo  SERIAL REFERENCES t_veiculo(codigo),
    codNoticia  SERIAL REFERENCES t_noticia(codigo)
);

CREATE TABLE t_candidato (
    cpf             CHAR(11) PRIMARY KEY,
    nome            VARCHAR(50),
    dataNascimento  DATE,
    siglaPartido    CHAR(5) REFERENCES t_partido(sigla),
    concorreEm      CHAR(2) REFERENCES t_local(sigla),
    codCargo        SERIAL REFERENCES t_cargo(codigo)
);

CREATE TABLE r_candidato_noticia (
    cpfCandidato    CHAR(11) REFERENCES t_candidato(cpf),
    codNoticia      SERIAL REFERENCES t_noticia(codigo),
    PRIMARY KEY (cpfCandidato, codNoticia)
);

CREATE TABLE t_midia (
    md5             BYTEA PRIMARY KEY,
    arquivo         BYTEA,
    fotoVideo       BOOLEAN,
    linkPublicacao  VARCHAR(100) REFERENCES t_publicacao(link),
    codNoticia      SERIAL REFERENCES t_noticia(codigo)
);
