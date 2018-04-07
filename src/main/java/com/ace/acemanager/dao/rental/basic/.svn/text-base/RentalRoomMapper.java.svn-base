package com.ace.acemanager.dao.rental.basic;
import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.ace.acemanager.pojo.RentalHouse;
import com.ace.acemanager.pojo.RentalRoom;
/**
 * 房间Mapper接口
 * @author Liuqi
 * 2017-7-11
 */
public interface RentalRoomMapper {

	/**
	 * 根据主键删除房间
	 * @param id
	 * @return
	 */
	int deleteRoomById(Integer id);

	/**
	 * 根据主键删除房间
	 * 	可逆删除(将字段is_delete置为1)
	 * @param id
	 * @return
	 */
	int deleteRoomByIdReversibly(Integer id);

	/**
	 * 可逆删除指定房源下的所有房间
	 * @param houseId
	 * @return
	 */
	int deleteRoomsByHouseIdReversibly(Integer houseId);

	/**
	 * 增加房间
	 * @param record
	 * @return
	 */
	int addRoom(RentalRoom record);

	/**
	 * 根据主键查询房间
	 * @param id
	 * @return
	 */
	RentalRoom getRoomById(Integer id);

	/**
	 * 根据主键修改房间
	 * @param record
	 * @return
	 */
	int updateRoomById(RentalRoom record);

	/**
	 * 查询所有房间列表
	 * @return
	 */
	List<RentalRoom> getRoomList();

	/**
	 * 查询指定房源下的所有房间名称列表
	 * @param houseId
	 * @return
	 */
	List<String> getRoomNameListByHouseId(Integer houseId);

	/**
	 * 根据房源Id获取其下房间列表
	 * @param house
	 * @return
	 */
	List<RentalRoom> getRoomsByHouseId(RentalRoom room);

	/**
	 * 配合分页查询，得到满足条件的总记录数
	 * @param room
	 * @return
	 */
	Integer count(RentalRoom room);

	/**
	 * 查询指定房源下的在租房间数
	 * @param house
	 * @return
	 */
	Integer getOnrentRoomCount(RentalHouse house);

	/**
	 * 根据房源Id获取房间列表信息
	 * @param house
	 * @return
	 */
	List<RentalRoom> getRoomsForRoomInfo(RentalHouse house);

	/**
	 * 根据房间Id获取指定房间详情
	 * @param roomId
	 * @return
	 */
	RentalRoom getRoomDetailByRoomId(Integer roomId);

	/**
	 * 改变指定房源下的所有房间的状态
	 * @param houseId
	 * @return
	 */
	int changeRoomsStatus(@Param("houseId") Integer houseId, @Param("status") String status);

	/**
	 * 查询指定房间下的租客的最后一次退租时间
	 * @param roomId
	 * @return
	 */
	Date getLastAbandanDateByRoomId(Integer roomId);

	/**
	 * 查询指定房间下的最新一条账单的已收款日期
	 * @param roomId
	 * @return
	 */
	Date getFristReceiptDateByRoomId(Integer roomId);

	/**
	 * 根据房间ID查询其下最近的一条待支付账单ID
	 * @param roomId
	 * @return
	 */
	Integer getFirstPayingBillIdByRoomId(Integer roomId);

	/**
	 * 获取指定房间状态的的房间数量
	 * @param status
	 * @param userId
	 * @return
	 */
	Integer getRoomCountByRoomStatus(@Param("status") String status, @Param("userId") Integer userId);

}