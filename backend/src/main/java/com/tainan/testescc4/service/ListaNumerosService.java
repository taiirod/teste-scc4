package com.tainan.testescc4.service;

import org.springframework.stereotype.Service;

@Service
public class ListaNumerosService {

    public String listaReversa(String lista) {
        String[] listaNumeros = filtrarLista(lista);
        String listaResultado = "{";
        int tamanhoLista = listaNumeros.length - 1;
        for (int i = tamanhoLista; i >= 0; i--) {
            if (i != 0) {
                listaResultado += listaNumeros[i] + ",";
            } else {
                listaResultado += listaNumeros[i];
            }
        }
        listaResultado = listaResultado + "}";
        return "HTTP 200 OK " + listaResultado;
    }

    public String imprimirImpares(String lista) {
        String[] listaNumeros = filtrarLista(lista);
        String listaResultado = "{";
        int tamanhoLista = listaNumeros.length - 1;
        for (int i = tamanhoLista; i >= 0; i--) {
            int num = Integer.parseInt(listaNumeros[i]);
            if (num % 2 != 0 && i != 0) {
                listaResultado += num + ",";
            } else if (i == 0) {
                listaResultado += num;
            }
        }
        listaResultado = listaResultado + "}";
        return "HTTP 200 OK\n" + listaResultado;
    }

    //TODO arrumar virgula que aparece quando tem apenas um valor
    public String imprimirPares(String lista) {
        String[] listaNumeros = filtrarLista(lista);
        String listaResultado = "{";
        int tamanhoLista = listaNumeros.length - 1;
        for (int i = tamanhoLista; i >= 0; i--) {
            int num = Integer.parseInt(listaNumeros[i]);
            if (num % 2 == 0 && i != 0) {
                listaResultado += num + ",";
            } if (i == 0 && num % 2 == 0) {
                listaResultado += num;
            }
        }
        listaResultado = listaResultado + "}";
        return "HTTP 200 OK\n" + listaResultado;
    }

    private String[] filtrarLista(String lista) {
        lista = lista.replace("{", "");
        lista = lista.replace("}", "");
        return lista.split(",");
    }

    public String tamanhoPalavra(String palavra) {
        return "HTTP 200 OK\n" + "tamanho=" + palavra.length();
    }

    public String palavraMaiuscula(String palavra) {
        return "HTTP 200 OK\n" + palavra.toUpperCase();
    }

    public String imprimirVogais(String palavra) {
        return "HTTP 200 OK\n" + palavra.replaceAll("[BCDFGHJKLMNPQRSTVWXYZbcdfghjklmnpqrstvwxyz]", "");
    }

    public String imprimirConsoantes(String palavra) {
        return "HTTP 200 OK\n" + palavra.replaceAll("[AEIOUaeiou]", "");
    }

    public String imprimirNomeBibliografico(String nome) {
        String[] nomeFormatado = nome.split("%");
        int tamanhoLista = nomeFormatado.length - 1;
        String nomeBibliografico = nomeFormatado[tamanhoLista].toUpperCase() + ",";
        for (int i = 0; i < tamanhoLista; i++) {
            nomeBibliografico += " " + nomeFormatado[i].substring(0, 1).toUpperCase() + nomeFormatado[i].substring(1);
        }
        return "HTTP 200 OK\n" + nomeBibliografico;
    }

}
