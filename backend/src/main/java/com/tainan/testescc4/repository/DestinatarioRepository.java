package com.tainan.testescc4.repository;

import com.tainan.testescc4.model.Destinatario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import sun.security.krb5.internal.crypto.Des;

public interface DestinatarioRepository extends JpaRepository<Destinatario, Long> {

}
