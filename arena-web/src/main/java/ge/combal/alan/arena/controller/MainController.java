package ge.combal.alan.arena.controller;

import ge.combal.alan.arena.domain.Test;
import ge.combal.alan.arena.repository.TestRepository;
import ge.combal.alan.arena.security.SecurityUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("alan")
public class MainController {

    @RequestMapping("get-user")
    public SecurityUser user(Principal principal){

        SecurityUser user = (SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return user;
    }

    @Autowired
    TestRepository repository;

    @RequestMapping("test")
    public Test test(String name) {
        return repository.save(new Test(name));
    }

}
