package com.ace.acemanager.dao.rental.basic;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.ace.acemanager.pojo.RentalHouse;
import com.ace.acemanager.pojo.RentalHouseUser;
/**
 * 房源Mapper接口
 * @author Liuqi
 * 2017-7-11
 */
public interface RentalHouseMapper {
	/**
	 * 根据主键id删除房源
	 * @param id
	 * @return
	 */
	int deleteHouseById(Integer id);

	/**
	 * 根据主键删除房源
	 * 	可逆删除(将字段is_delete置为1)
	 * @param id
	 * @return
	 */
	int deleteHouseByIdReversibly(Integer id);

	/**
	 * 增加房源
	 * @param record
	 * @return
	 */
	int addHouse(RentalHouse record);

	/**
	 * 根据主键id查询房源
	 * @param id
	 * @return
	 */
	RentalHouse getHouseById(Integer id);

	/**
	 * 根据主键修改房源
	 * @param record
	 * @return
	 */
	int updateHouseById(RentalHouse record);

	/**
	 * 获取房源列表
	 * @return
	 */
	List<RentalHouse> getHouseList();

	/**
	 * 获取当前用户在指定小区下的房源列表
	 * @param community
	 * @return
	 */
	List<RentalHouse> getHouseListByCommunityIdAndUserId(@Param("userId") Integer userId, @Param("communityId") Integer communityId);

	/**
	 * 获取指定用户下的房源列表
	 * @param community
	 * @return
	 */
	List<RentalHouse> getHouseListByUserId(Integer userId);

	/**
	 * 根据房源ID查询房源详情
	 * @param house
	 * @return
	 */
	RentalHouse getHouseDetailByHouseId(RentalHouse house);

	/**
	 * 获取指定房源下的生效的业主(托管)合同数量
	 * @param houseId
	 * @return
	 */
	Integer getEffectOwnnerContractsCountByHouseId(Integer houseId);

	/**
	 * 获取指定房源下的所有房间的生效的租客合同数量
	 * @param houseId
	 * @return
	 */
	Integer getEffectRenterContractsCountByHouseId(Integer houseId);

	/**
	 * 改变指定房源的状态
	 * @param houseId
	 * @return
	 */
	int changeHouseStatus(@Param("houseId") Integer houseId, @Param("status") String status);
	
	/**
	 * 根据  h.community_id = ? AND h.building = ? AND h.unit = ? AND h.floor = ? AND h.no = ?
	 * 查询房源
	 * @param house
	 * @return
	 */
	RentalHouse getHouseByCommIdAndHouseAddress(RentalHouse house);
	
	
	/**
	 * 根据所有者id 小区id 级联查询分配者信息
	 * @param rentalHouse
	 * @return
	 */
	List<RentalHouse>  getRentalHousesByCascade(RentalHouse rentalHouse);
	
	
}