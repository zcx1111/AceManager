package com.ace.acemanager.service.rental;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ace.acemanager.dao.rental.basic.RentalHouseUserMapper;
import com.ace.acemanager.pojo.RentalHouse;
import com.ace.acemanager.pojo.RentalHouseUser;

@Service
public class RentalHouseUserServiceImpl implements RentalHouseUserService {
	@Resource
	private RentalHouseUserMapper rentalHouseUserMapper;
	
	@Override
	public int countByHIdAndUId(RentalHouseUser rentalHouseUser) {
		return rentalHouseUserMapper.countByHIdAndUId(rentalHouseUser);
	}

	@Override
	public int delRentalHouseByUserId(Integer userId) {
		return rentalHouseUserMapper.delRentalHouseByUserId(userId);
	}

	@Override
	public int insertsHU(List<RentalHouseUser> list) {
		return rentalHouseUserMapper.insertsHU(list);
	}

	@Override
	public int addHUR(RentalHouseUser record) {
		return rentalHouseUserMapper.addHUR(record);
	}

	@Override
	public int delByUserAndHouseId(RentalHouseUser rentalHouseUser) {
		return rentalHouseUserMapper.delByUserAndHouseId(rentalHouseUser);
	}
	
	
}
