package edu.jsp.hr_managmentsystem.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.jsp.hr_managmentsystem.entity.Requirement;
import edu.jsp.hr_managmentsystem.repository.RequirementRepository;

@Service
public class RequirementService {

	@Autowired
	public  RequirementRepository requirementRepo;
	
	
	public   Requirement  createRequirement(Requirement requirement) {
		return   requirementRepo.save(requirement);
	}
	
	public  Requirement  fetchById(Long id) {
		return   requirementRepo.findById(id).orElse(null);
	}
	
	public  Requirement  fetchByBranchDealCode(String dealCode) {
		return   requirementRepo.findByBranchDealCode(dealCode).orElse(null);
	}
	
	public  Requirement  fetchByComanyName(String name) {
		return   requirementRepo.findByCompanyName(name).orElse(null);
	}
	
	public List<Requirement>  fetchAllRequirements(){
		return  requirementRepo.findAll();
	}
	
	public String  deleteRequirement(long id) {
		Optional<Requirement>  o  = requirementRepo.findById(id);
		if(o.isPresent()) {
			requirementRepo.deleteById(id);
			return "Requirement deleted";
		}
		return "Requirements  not found";
	}
}
