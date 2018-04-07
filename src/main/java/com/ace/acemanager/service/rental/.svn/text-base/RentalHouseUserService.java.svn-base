package com.ace.acemanager.service.rental;

import java.util.List;

import com.ace.acemanager.pojo.RentalHouse;
import com.ace.acemanager.pojo.RentalHouseUser;

public interface RentalHouseUserService {
	/**
	 * 根据房源id 用户id 统计记录数
	 * @param rentalHouse
	 * @return
	 */
	int countByHIdAndUId(RentalHouseUser rentalHouseUser);
	
	/**
	 * 根据用户id删除房源
	 * @param userId
	 * @return
	 */
	int delRentalHouseByUserId(Integer userId);
	
	/**
	 * 批量增加RenalHouseUser
	 * @param list
	 * @return
	 */
	int insertsHU(List<RentalHouseUser> list);
	
	/**
	 * 增加房源用户关系
	 * @param record
	 * @return
	 */
	int addHUR(RentalHouseUser record);
	
	/**
	 * 根据房源id和用户id删除数据
	 * @param rentalHouseUser
	 * @return
	 */
	int delByUserAndHouseId(RentalHouseUser rentalHouseUser);

}
