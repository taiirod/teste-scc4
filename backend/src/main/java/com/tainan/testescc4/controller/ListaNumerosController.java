package com.tainan.testescc4.controller;

import com.tainan.testescc4.service.ListaNumerosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping()
public class ListaNumerosController {

    @Autowired
    ListaNumerosService listaNumerosService;

    @GetMapping("/listaReversa")
    public String listaReversa(@RequestParam("lista") String lista) {
        return listaNumerosService.listaReversa(lista);
    }

    @RequestMapping("/imprimirImpares")
    public String imprimirImpares(@RequestParam("lista") String lista) {
        return listaNumerosService.imprimirImpares(lista);
    }

    @RequestMapping("/imprimirPares")
    public String imprimirPares(@RequestParam("lista") String lista) {
        return listaNumerosService.imprimirPares(lista);
    }

    @RequestMapping("/tamanho")
    public String tamanho(@RequestParam("palavra") String palavra) {
        return listaNumerosService.tamanhoPalavra(palavra);
    }

    @RequestMapping("/maiusculas")
    public String maiusculas(@RequestParam("palavra") String palavra) {
        return listaNumerosService.palavraMaiuscula(palavra);
    }

    @RequestMapping("/vogais")
    public String vogais(@RequestParam("palavra") String palavra) {
        return listaNumerosService.imprimirVogais(palavra);
    }

    @RequestMapping("/consoantes")
    public String consoantes(@RequestParam("palavra") String palavra) {
        return listaNumerosService.imprimirConsoantes(palavra);
    }

    @RequestMapping("/nomeBibliografico")
    public String nomeBibliografico(@RequestParam("nome") String nome) {
        return listaNumerosService.imprimirNomeBibliografico(nome);
    }


}
