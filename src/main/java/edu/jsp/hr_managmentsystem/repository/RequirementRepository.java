package edu.jsp.hr_managmentsystem.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.jsp.hr_managmentsystem.entity.Requirement;

public interface RequirementRepository  extends  JpaRepository<Requirement,Long> {

		Optional<Requirement>   findByBranchDealCode(String dealCode);

		Optional<Requirement> findByCompanyName(String cname);
}
