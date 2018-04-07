package com.ace.acemanager.service.rental;

import java.util.List;

import com.ace.acemanager.pojo.RentalHouse;

public interface RentalHouseService {
	/**
	 * 根据所有者id 小区id 级联查询分配者信息
	 * @param rentalHouse
	 * @return
	 */
	List<RentalHouse>  getRentalHousesByCascade(RentalHouse rentalHouse);
	
	/**
	 * 获取指定用户下的房源列表
	 * @param community
	 * @return
	 */
	List<RentalHouse> getHouseListByUserId(Integer userId);
	
	

}
