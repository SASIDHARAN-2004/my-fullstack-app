//package edu.jsp.hr_managmentsystem.contoller;
//
//import java.util.Map;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import edu.jsp.hr_managmentsystem.entity.User;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//import edu.jsp.hr_managmentsystem.repository.UserRepository;
//import edu.jsp.hr_managmentsystem.service.UserService;
//import edu.jsp.hr_managmentsystem.util.JwtUtil;
//import lombok.RequiredArgsConstructor;
//@RestController
//@RequiredArgsConstructor
//@RequestMapping("/api/auth")
//public class AuthController {
//	   private final UserService userService;
//	   private final UserRepository userRepo;
//	   private final PasswordEncoder passwordEncoder;
//	   private final JwtUtil jwtUtil;
//	   @PostMapping("/register")
//	    public ResponseEntity<?> registerUser(@RequestBody Map<String, String> body) {
//		   String email = body.get("email");
//		   String password = body.get("password");
//		   if(userRepo.findByEmail(email).isPresent())
//		   {return new ResponseEntity<>("Email already exists", HttpStatus.CONFLICT);}
//		   userService.createUser(User.builder().email(email).password(password).build());
//		   return new ResponseEntity<>("Successfully Registered", HttpStatus.CREATED);
//	  }
//	   
//	   @PostMapping("/login")
//	    public ResponseEntity<String> loginUser(@RequestBody Map<String, String> body) {
//		   
//		   String email = body.get("email");
//		   String password = body.get("password");
//		   
//		   var userOptional = userRepo.findByEmail(email);
//		   if(userOptional.isEmpty()) {
//			   return new ResponseEntity<>("User Not Regisered", HttpStatus.UNAUTHORIZED);
//		   }
//		   User user = userOptional.get();
//		   if(!passwordEncoder.matches(password, user.getPassword())) {
//			   return new ResponseEntity<>("Invalid User", HttpStatus.CREATED);
//		   }
//		   String token = jwtUtil.generateToken(email);
//		   return ResponseEntity.ok(Map.of("token", token));
//	   }   
//}
//
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


package edu.jsp.hr_managmentsystem.contoller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.jsp.hr_managmentsystem.entity.User;
import edu.jsp.hr_managmentsystem.repository.UserRepository;
import edu.jsp.hr_managmentsystem.service.UserService;
import edu.jsp.hr_managmentsystem.util.JwtUtil;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController( UserService userService, UserRepository userRepo, PasswordEncoder passwordEncoder,JwtUtil jwtUtil) {

        this.userService = userService;
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody Map<String, String> body) {

        String email = body.get("email");
        String password = body.get("password");

        if (email == null || email.isBlank()|| password == null || password.isBlank()) {
            return ResponseEntity.badRequest().body("Email and password are required");
        }

        if (userRepo.findByEmail(email).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
        }

        User user = User.builder().email(email).password(passwordEncoder.encode(password)).build();

        userService.createUser(user);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Successfully Registered");
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody Map<String, String> body) {

        String email = body.get("email");
        String password = body.get("password");

        if (email == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email and password are required"));
        }

        var userOptional = userRepo.findByEmail(email);

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "User not registered"));
        }

        User user = userOptional.get();

        if (!passwordEncoder.matches(password, user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid email or password"));
        }

        String token = jwtUtil.generateToken(email);

        return ResponseEntity.ok(Map.of("token", token));
    }
    
    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logoutUser(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Authorization token is required"));
        }

        String token = authHeader.substring(7);

        if (!jwtUtil.validateJwtToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid or expired token"));
        }

        jwtUtil.revokeToken(token);

        return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    }
}
