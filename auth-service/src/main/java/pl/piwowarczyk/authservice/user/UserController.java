package pl.piwowarczyk.authservice.user;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pl.piwowarczyk.authservice.user.domain.UserEditionEntity;
import pl.piwowarczyk.authservice.user.domain.UserRegisterEntity;
import pl.piwowarczyk.authservice.user.service.UserServiceImpl;
import pl.piwowarczyk.authservice.user.validator.UserExistence;

import java.security.Principal;
import java.util.List;

import static pl.piwowarczyk.authservice.user.validator.order.UserEditionValidationOrder.IdGroupSequence;
import static pl.piwowarczyk.authservice.user.validator.order.UserRegisterValidationOrder.*;

@RestController
@RequestMapping("api/user")
@AllArgsConstructor
@Validated(UsernameGroupSequence.class)
// TODO: 26.07.18 Create function for validating specified fields 
public class UserController {
    
    
    private UserServiceImpl userService;

    
    
    
    /**
     * Returns all users from database
     * 
     * @return list of {@link User} objects
     */
    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<User> findAll() {
        return userService.findAll();
    }

    
    
    /**
     * Finds {@link User} object from database by it's {@link User#username}
     * @param username - mustn't be null and user with provided username myst exists
     * @return {@link User} object if exists or
     *                      "bad Request" status code if user with provided username
     *                      not exists
     */
    @GetMapping("{username}")
    public User findByUsername(
            @UserExistence(property = "username", 
                    exists = true,
                    message = "Użytkownik o podanej nazwie użytkownika nie istnieje",
                    groups = UsernameExistenceProperty.class
            )
            @PathVariable String username
    ) {
        return userService.findByUsername(username);
    }


    /**
     * Get authenticated user data
     * @param principal - authentication principal mustn't be null
     * @return {@link User} - login user
     */
    @GetMapping("account")
    public User account(@AuthenticationPrincipal Principal principal) {
        return userService.findByUsername(principal.getName());
    }
    
    
    /**
     * Adds {@link User} to database
     * @param user {@link UserRegisterEntity} - user model, must be valid
     * @return {@link User} object
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User addUser(
            @Validated({
                    UsernameGroupSequence.class,
                    PasswordGroupSequence.class,
                    FirstNameNotBlankProperty.class,
                    LastNameGroupSequence.class,
                    EmailGroupSequence.class
            })
            @RequestBody UserRegisterEntity user
    ) {
        return userService.addUser(user);
    }

    
    
    
    /**
     * Edits user with provided correct {@link UserEditionEntity#id}
     * @param user {@link UserEditionEntity} - must be valid
     * @return updated {@link User} object
     */
    @PutMapping
    public User editUser(
            @Validated({
                    IdGroupSequence.class,
                    UsernameGroupSequence.class,
                    PasswordGroupSequence.class,
                    FirstNameNotBlankProperty.class,
                    LastNameGroupSequence.class,
                    EmailGroupSequence.class
            })
            @RequestBody UserEditionEntity user,
            @AuthenticationPrincipal Principal principal) {
        return userService.editUser(user, principal);
    }
}
