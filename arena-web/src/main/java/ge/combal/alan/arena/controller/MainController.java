package ge.combal.alan.arena.controller;

import ge.combal.alan.arena.security.SecurityUser;
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



}
