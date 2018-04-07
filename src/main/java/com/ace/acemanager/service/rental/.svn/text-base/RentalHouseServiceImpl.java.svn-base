package com.ace.acemanager.service.rental;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ace.acemanager.dao.rental.basic.RentalHouseMapper;
import com.ace.acemanager.pojo.RentalHouse;

@Service
public class RentalHouseServiceImpl implements RentalHouseService{
	@Resource
	private RentalHouseMapper  rentalHouseMapper;
	
	/**
	 * 根据所有者id 小区id 级联查询分配者信息
	 * @param rentalHouse
	 * @return
	 */
	public List<RentalHouse>  getRentalHousesByCascade(RentalHouse rentalHouse) {
		return rentalHouseMapper.getRentalHousesByCascade(rentalHouse);
	}

	@Override
	public List<RentalHouse> getHouseListByUserId(Integer userId) {
		return rentalHouseMapper.getHouseListByUserId(userId);
	}
	
	
	
}
