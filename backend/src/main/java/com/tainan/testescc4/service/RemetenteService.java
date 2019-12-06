package com.tainan.testescc4.service;

import com.tainan.testescc4.model.Remetente;
import com.tainan.testescc4.repository.RemetenteRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RemetenteService {

    @Autowired
    RemetenteRepository remetenteRepository;

    public Remetente update(Long id, Remetente remetente) {
        Remetente remetenteRecuperado = remetenteRepository.getOne(id);
        if (remetenteRecuperado != null) {
            BeanUtils.copyProperties(remetente, remetenteRecuperado, "id");
        }
        return remetenteRepository.save(remetenteRecuperado);
    }

}
