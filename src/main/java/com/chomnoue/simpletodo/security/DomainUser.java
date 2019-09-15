package com.chomnoue.simpletodo.security;

import com.chomnoue.simpletodo.domain.User;
import java.util.Collection;
import org.springframework.security.core.GrantedAuthority;

public class DomainUser extends org.springframework.security.core.userdetails.User {

    Long id;

    public DomainUser(Long id, String username, String password,
        Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities);
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
