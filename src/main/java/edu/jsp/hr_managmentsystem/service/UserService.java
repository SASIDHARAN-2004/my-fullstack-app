package edu.jsp.hr_managmentsystem.service;

import java.util.List;
import org.springframework.stereotype.Service;
import edu.jsp.hr_managmentsystem.entity.User;
import edu.jsp.hr_managmentsystem.repository.UserRepository;

@Service
public class UserService {
	
	   
	    private UserRepository userRepo;
	   
	    public UserService(UserRepository userRepo) {
	        this.userRepo = userRepo;
	    }
	    
	   public User createUser(User user) {
	        return userRepo.save(user);
	    }

	    public User getUserById(Long id) {
	        return userRepo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
	    }

	    public List<User> getUsers() {
	        return userRepo.findAll();
	    }

	    public User updateUser(User user) {
	        return userRepo.save(user);
	    }

	    public void deleteUserById(Long id) {
	        userRepo.delete(getUserById(id));
	    }
	}

