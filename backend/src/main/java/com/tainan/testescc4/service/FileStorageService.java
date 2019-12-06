package com.tainan.testescc4.service;

import com.tainan.testescc4.configuration.exception.FileStorageException;
import com.tainan.testescc4.configuration.exception.MyFileNotFoundException;
import com.tainan.testescc4.model.Destinatario;
import com.tainan.testescc4.model.Endereco;
import com.tainan.testescc4.properties.FileStorageProperties;
import com.tainan.testescc4.repository.DestinatarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileStorageService {

    private final Path fileStorageLocation;

    @Autowired
    DestinatarioRepository destinatarioRepository;

    @Autowired
    public FileStorageService(FileStorageProperties fileStorageProperties) {
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
                .toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    public String storeFile(MultipartFile file) {
        // Normalize file name
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // Check if the file's name contains invalid characters
            if (fileName.contains("..")) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
            }

            // Copy file to the target location (Replacing existing file with the same name)
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return fileName;
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    public String importDestinatarios(String file) {
        try {
            BufferedReader br = new BufferedReader(new FileReader("/C:/upload-dir/" + file));
            while (br.ready()) {
                String linha = br.readLine();
                String[] l = linha.split(",");

                String nome = l[0];
                String telefone = l[1];
                String cpf = l[2];
                String email = l[3];
                String cep = l[4];
                String logradouro = l[5];
                String numero = l[6];
                String complemento = l[7];
                String bairro = l[8];
                String localidade = l[9];
                String uf = l[10];

                Destinatario destinatario = new Destinatario();
                Endereco endereco = new Endereco();

                endereco.setCep(cep);
                endereco.setLogradouro(logradouro);
                endereco.setNumero(Integer.parseInt(numero));
                endereco.setComplemento(complemento);
                endereco.setBairro(bairro);
                endereco.setLocalidade(localidade);
                endereco.setUf(uf);

                destinatario.setNome(nome);
                destinatario.setTelefone(telefone);
                destinatario.setCpf(cpf);
                destinatario.setEmail(email);
                destinatario.setEndereco(endereco);

                destinatarioRepository.save(destinatario);

            }
            br.close();

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return "200 OK";
    }


    public Resource loadFileAsResource(String fileName) {
        try {
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return resource;
            } else {
                throw new MyFileNotFoundException("File not found " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new MyFileNotFoundException("File not found " + fileName, ex);
        }
    }
}