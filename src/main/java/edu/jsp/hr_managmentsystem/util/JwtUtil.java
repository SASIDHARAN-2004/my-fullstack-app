package edu.jsp.hr_managmentsystem.util;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
	
    private final String SECRET = "Like, Share and Subscribe to Code io - tamil, Download IDK, Our simple and easy to use IDE";
    private final long EXPIRATION_TIME = 1000 * 60 * 60 ;
    private final Key secretKey = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));
    
    
    private final Set<String> revokedTokens = ConcurrentHashMap.newKeySet();

    
    
    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }
    public String extractEmail (String token) {
		return Jwts.parserBuilder()
		.setSigningKey(secretKey)
		.build()
		.parseClaimsJws(token)
		.getBody()
		.getSubject();
    	
    }
    public boolean validateJwtToken (String token) {
    	try {
             extractEmail(token);
    	return true;
    	} catch (JwtException | IllegalArgumentException exception ) {
    		return false;
    	}
    }

    public void revokeToken(String token) {
        revokedTokens.add(token);
    }

    // NEW: Called by JwtFilter before authenticating a request.
    public boolean isTokenRevoked(String token) {
        return revokedTokens.contains(token);
    }
}
