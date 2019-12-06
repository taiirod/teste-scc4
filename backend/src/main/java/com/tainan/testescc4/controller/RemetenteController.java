package com.tainan.testescc4.controller;

import com.tainan.testescc4.model.Remetente;
import com.tainan.testescc4.repository.RemetenteRepository;
import com.tainan.testescc4.service.RemetenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("/remetente")
public class RemetenteController {


    @Autowired
    RemetenteRepository remetenteRepository;

    @Autowired
    RemetenteService remetenteService;

    @GetMapping
    private List<Remetente> getAll() {
        return remetenteRepository.findAll();
    }

    @GetMapping("/{id}")
    private ResponseEntity<Remetente> getById(@PathVariable Long id) {
        return ResponseEntity.ok(remetenteRepository.getOne(id));
    }

    @PostMapping
    private ResponseEntity<Remetente> add(@RequestBody Remetente remetente) {
        return ResponseEntity.ok(remetenteRepository.save(remetente));
    }

    @PutMapping("/{id}")
    private ResponseEntity<Remetente> update(@PathVariable Long id, @RequestBody Remetente remetente) {
        Remetente r = remetenteService.update(id, remetente);
        return ResponseEntity.ok(r);
    }

    @DeleteMapping("/{id}")
    private Integer delete(@PathVariable Long id, HttpServletResponse response) {
        remetenteRepository.deleteById(id);
        return response.getStatus();
    }


}
