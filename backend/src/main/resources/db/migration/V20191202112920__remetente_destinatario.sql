create table destinatario
(
    id          bigint not null auto_increment,
    nome        varchar(255),
    cpf         varchar(255),
    telefone    varchar(255),
    email       varchar(255),
    bairro      varchar(255),
    cep         varchar(255),
    complemento varchar(255),
    localidade  varchar(255),
    logradouro  varchar(255),
    numero      integer,
    uf          varchar(255),
    primary key (id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

create table remetente
(
    id          bigint not null auto_increment,
    nome        varchar(255),
    cpf         varchar(255),
    telefone    varchar(255),
    email       varchar(255),
    bairro      varchar(255),
    cep         varchar(255),
    complemento varchar(255),
    localidade  varchar(255),
    logradouro  varchar(255),
    numero      integer,
    uf          varchar(255),
    primary key (id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;