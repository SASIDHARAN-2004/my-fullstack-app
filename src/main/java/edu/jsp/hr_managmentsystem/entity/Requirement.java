package edu.jsp.hr_managmentsystem.entity;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Requirement {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String branchDealCode;
	private String companyName;
	private String jobTitle;
	private String designation;
	private String jobLocation;
	private String skillsRequired;

	private String noOfVacantPositions;
	private String noOfCandidatesRequired;

	private LocalDate interviewDate;

	private String genderSpecification;
	private String modeOfInterview;

	private Double tenthPercentMin;
	private Double twelfthPercentMin;
	private Double degreePercentMin;
	private String qualificationType;

	@OneToMany(mappedBy = "requirement")
	@JsonIgnore
	private List<RequirementStudent> requirementStudents;
	
	

	public List<RequirementStudent> getRequirementStudents() {
		return requirementStudents;
	}

	public void setRequirementStudents(List<RequirementStudent> requirementStudents) {
		this.requirementStudents = requirementStudents;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getBranchDealCode() {
		return branchDealCode;
	}

	public void setBranchDealCode(String branchDealCode) {
		this.branchDealCode = branchDealCode;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getJobTitle() {
		return jobTitle;
	}

	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public String getJobLocation() {
		return jobLocation;
	}

	public void setJobLocation(String jobLocation) {
		this.jobLocation = jobLocation;
	}

	public String getSkillsRequired() {
		return skillsRequired;
	}

	public void setSkillsRequired(String skillsRequired) {
		this.skillsRequired = skillsRequired;
	}

	public String getNoOfVacantPositions() {
		return noOfVacantPositions;
	}

	public void setNoOfVacantPositions(String noOfVacantPositions) {
		this.noOfVacantPositions = noOfVacantPositions;
	}

	public String getNoOfCandidatesRequired() {
		return noOfCandidatesRequired;
	}

	public void setNoOfCandidatesRequired(String noOfCandidatesRequired) {
		this.noOfCandidatesRequired = noOfCandidatesRequired;
	}

	public LocalDate getInterviewDate() {
		return interviewDate;
	}

	public void setInterviewDate(LocalDate interviewDate) {
		this.interviewDate = interviewDate;
	}

	public String getGenderSpecification() {
		return genderSpecification;
	}

	public void setGenderSpecification(String genderSpecification) {
		this.genderSpecification = genderSpecification;
	}

	public String getModeOfInterview() {
		return modeOfInterview;
	}

	public void setModeOfInterview(String modeOfInterview) {
		this.modeOfInterview = modeOfInterview;
	}

	public Double getTenthPercentMin() {
		return tenthPercentMin;
	}

	public void setTenthPercentMin(Double tenthPercentMin) {
		this.tenthPercentMin = tenthPercentMin;
	}

	public Double getTwelfthPercentMin() {
		return twelfthPercentMin;
	}

	public void setTwelfthPercentMin(Double twelfthPercentMin) {
		this.twelfthPercentMin = twelfthPercentMin;
	}

	public Double getDegreePercentMin() {
		return degreePercentMin;
	}

	public void setDegreePercentMin(Double degreePercentMin) {
		this.degreePercentMin = degreePercentMin;
	}

	public String getQualificationType() {
		return qualificationType;
	}

	public void setQualificationType(String qualificationType) {
		this.qualificationType = qualificationType;
	}

}
