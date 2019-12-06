package com.tainan.testescc4.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;


@Getter
@Setter
@Entity
@Table(name = "mensagem")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Mensagem {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "remetente_id")
    private Remetente remetente;

    @OneToMany
    @JoinColumn(name = "destinatario_id")
    private List<Destinatario> destinatario;

    private String mensagem;


}

