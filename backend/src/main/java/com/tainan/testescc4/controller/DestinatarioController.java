package com.tainan.testescc4.controller;

import com.tainan.testescc4.UploadFileResponse;
import com.tainan.testescc4.model.Destinatario;
import com.tainan.testescc4.repository.DestinatarioRepository;
import com.tainan.testescc4.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/destinatario")
public class DestinatarioController {

    @Autowired
    FileStorageService fileStorageService;

    @Autowired
    DestinatarioRepository destinatarioRepository;

    @GetMapping
    private Page<Destinatario> getAll(Pageable pageable) {
        return destinatarioRepository.findAll(pageable);
    }

    @GetMapping("/{id}")
    private ResponseEntity<Destinatario> getById(@PathVariable Long id) {
        return ResponseEntity.ok(destinatarioRepository.getOne(id));
    }

    @PostMapping("/importDestinatarios")
    public UploadFileResponse uploadFile(@RequestParam("file") MultipartFile file) {
        String fileName = fileStorageService.storeFile(file);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(fileName)
                .toUriString();

        fileStorageService.importDestinatarios(fileName);

        return new UploadFileResponse(fileName, fileDownloadUri,
                file.getContentType(), file.getSize());
    }

}
