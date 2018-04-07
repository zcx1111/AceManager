package com.ace.acemanager.service.rental;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ace.acemanager.dao.rental.basic.RentalCommunityMapper;
import com.ace.acemanager.pojo.RentalCommunity;
@Service
public class RentalCommunityServiceImpl implements RentalCommunityService {

	@Resource
	private RentalCommunityMapper rentalCommunityMapper;
	@Override
	public List<RentalCommunity> getCommunityListByPage(RentalCommunity community) {
		return rentalCommunityMapper.getCommunityListByPage(community);
	}
	@Override
	public int countCommunityListByPage(RentalCommunity community) {
		return rentalCommunityMapper.countCommunityListByPage(community);
	}

}
