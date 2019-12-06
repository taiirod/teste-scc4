package com.tainan.testescc4.controller;

import com.tainan.testescc4.model.Mensagem;
import com.tainan.testescc4.repository.MensagemRepository;
import com.tainan.testescc4.service.MensagemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mensagem")
public class MensagemController {

    @Autowired
    MensagemRepository mensagemRepository;

    @Autowired
    MensagemService mensagemService;

    @PostMapping("/enviar")
    private ResponseEntity<Mensagem> send(@RequestBody Mensagem mensagem) {
        return mensagemService.send(mensagem);
    }

}
