package com.tainan.testescc4.service;

import com.tainan.testescc4.model.Destinatario;
import com.tainan.testescc4.model.Mensagem;
import com.tainan.testescc4.model.Remetente;
import com.tainan.testescc4.repository.DestinatarioRepository;
import com.tainan.testescc4.repository.MensagemRepository;
import com.tainan.testescc4.repository.RemetenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;

@Service
public class MensagemService {

    @Autowired
    MensagemRepository mensagemRepository;

    @Autowired
    RemetenteRepository remetenteRepository;

    @Autowired
    DestinatarioRepository destinatarioRepository;

    public ResponseEntity<Mensagem> send(Mensagem mensagem) {
        /*Mensagem novaMensagem = new Mensagem();
        Destinatario destinatario = new Destinatario();
        Remetente remetente = remetenteRepository.getOne(mensagem.getRemetente().getId());
        List<Destinatario> destinatarios = new ArrayList<>();

        for (Destinatario dest : mensagem.getDestinatario()) {
            destinatario = destinatarioRepository.getOne(dest.getId());
            destinatarios.add(destinatario);

            novaMensagem.setRemetente(remetente);
            novaMensagem.setDestinatario(destinatarios);
            novaMensagem.setMensagem(mensagem.getMensagem());

            mensagemRepository.save(novaMensagem);
        }*/

        return ResponseEntity.ok(mensagem);
    }
}
