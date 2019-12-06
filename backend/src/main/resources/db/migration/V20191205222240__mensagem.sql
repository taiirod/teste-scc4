create table mensagem
(
    id              bigint not null auto_increment,
    remetente_id    bigint,
    destinatario_id bigint,
    mensagem        varchar(255),
    primary key (id),
    foreign key (remetente_id) references remetente (id),
    foreign key (destinatario_id) references destinatario (id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;