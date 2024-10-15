package com.cesar.school.domain.user;

import com.cesar.school.domain.user.payload.LoginRequestDTO;
import com.cesar.school.domain.user.payload.RegisterRequestDTO;
import com.cesar.school.domain.user.payload.RegisterResponseDTO;
import com.cesar.school.domain.user.payload.TokenResponseDTO;
import com.cesar.school.exception.EmailAlreadyExistsException;
import com.cesar.school.exception.EntityNotFoundException;
import com.cesar.school.infra.security.TokenService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final TokenService tokenService;
    private final ModelMapper mapper;


    public RegisterResponseDTO registerUser(RegisterRequestDTO registerRequestDTO) {
        validateEmailUniqueness(registerRequestDTO.getEmail());
        registerRequestDTO.setPassword(passwordEncoder.encode(registerRequestDTO.getPassword()));
        User newUser = userRepository.save(mapper.map(registerRequestDTO, User.class));
        return new RegisterResponseDTO(newUser.getEmail(), newUser.getName());
    }

    public TokenResponseDTO login(LoginRequestDTO loginRequestDTO) {
        User user = repository.findByEmail(loginRequestDTO.getEmail()).orElseThrow(() -> new EntityNotFoundException("Email or password incorrect"));
        if(passwordEncoder.matches(loginRequestDTO.getPassword(), user.getPassword())) {
            return new TokenResponseDTO(this.tokenService.generateToken(user), user.getName());
        }
        throw new BadCredentialsException("Email or password incorrect");
    }

    public void validateEmailUniqueness(String email) {
        if (userRepository.existsByEmail(email)) {
            throw new EmailAlreadyExistsException("Email already exists: " + email);
        }
    }
}
