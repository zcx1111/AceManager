package com.ace.acemanager.dao.rental.basic;
import java.util.List;

import com.ace.acemanager.pojo.RentalHouseUser;
/**
 * 房源用户关系Mapper接口
 * @author Liuqi
 * 2017-7-12
 */
public interface RentalHouseUserMapper {
	/**
	 * 根据主键删除房源用户关系
	 * @param id
	 * @return
	 */
	int deleteHURById(Integer id);

	/**
	 * 增加房源用户关系
	 * @param record
	 * @return
	 */
	int addHUR(RentalHouseUser record);

	/**
	 * 根据主键查询房源用户关系
	 * @param id
	 * @return
	 */
	RentalHouseUser selectHURById(Integer id);

	/**
	 * 根据主键更新房源用户关系
	 * @param record
	 * @return
	 */
	int updateHURById(RentalHouseUser record);
	
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
	 * 根据房源id和用户id删除数据
	 * @param rentalHouseUser
	 * @return
	 */
	int delByUserAndHouseId(RentalHouseUser rentalHouseUser);

}