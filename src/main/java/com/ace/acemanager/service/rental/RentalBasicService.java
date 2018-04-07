package com.ace.acemanager.service.rental;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.ace.acemanager.pojo.RentalCommunity;
import com.ace.acemanager.pojo.RentalHouse;
import com.ace.acemanager.pojo.RentalRoom;
import com.ace.acemanager.pojo.User;

/**
 * 房源基础业务Service接口
 * @author Liuqi
 * 2017-7-11
 */
public interface RentalBasicService {

	/**
	 * 查询指定用户下的房源所涉及到的小区列表
	 * @return
	 * @throws Exception
	 */
	public List<RentalCommunity> getCommunityListByUserId(RentalCommunity community) throws Exception;

	/**
	 * 获取当前用户在指定小区下的房源列表
	 * @param community
	 * @return
	 * @throws Exception
	 */
	public List<RentalHouse> getHouseListByCommunityIdAndUserId(@Param("userId") Integer userId, @Param("communityId") Integer communityId) throws Exception;

	/**
	 * 根据房源ID查询房源详情
	 * @param house
	 * @return
	 * @throws Exception
	 */
	public RentalHouse getHouseDetailByHouseId(RentalHouse house) throws Exception;

	/**
	 * 根据房源Id获取其下房间列表
	 * @param house
	 * @return
	 * @throws Exception
	 */
	public List<RentalRoom> getRoomsByHouseId(RentalRoom room) throws Exception;

	/**
	 * 查询指定房源下的在租房间数
	 * @param house
	 * @return
	 * @throws Exception
	 */
	public Integer getOnrentRoomCount(RentalHouse house) throws Exception;

	/**
	 * 配合分页查询，得到满足条件的总记录数
	 * @param room
	 * @return
	 * @throws Exception
	 */
	public Integer count(RentalRoom room) throws Exception;

	/**
	 * 增加房源
	 * @param house
	 * @return
	 * @throws Exception
	 */
	public String aceAddHouse(RentalHouse house) throws Exception;

	/**
	 * 根据房源Id获取房间列表信息
	 * @param house
	 * @return
	 */
	public List<RentalRoom> getRoomsForRoomInfo(RentalHouse house) throws Exception;

	/**
	 * 修改房源
	 * @param house
	 * @return
	 * @throws Exception
	 */
	public boolean aceUpdateHouse(RentalHouse house) throws Exception;

	/**
	 * 为指定房源增加一个房间
	 * @param room
	 * @return
	 */
	public boolean aceAddRoomForHouse(RentalRoom room) throws Exception;

	/**
	 * 根据房间Id获取指定房间详情
	 * @param roomId
	 * @return
	 */
	public RentalRoom getRoomDetailByRoomId(Integer roomId) throws Exception;

	/**
	 * 能否停用指定房源
	 * @param houseId
	 * @return
	 */
	public boolean canDisableHouse(Integer houseId) throws Exception;

	/**
	 * 能否删除指定房源
	 * @param houseId
	 * @return
	 */
	public String canDeleteHouse(Integer houseId) throws Exception;

	/**
	 * 能否删除指定房间
	 * @param roomId
	 * @return
	 * @throws Exception
	 */
	public boolean canDeleteRoom(Integer roomId) throws Exception;

	/**
	 * 停用房源
	 * @param houseId
	 * @return
	 * @throws Exception
	 */
	public boolean aceDisableHouse(Integer houseId) throws Exception;

	/**
	 * 启用房源
	 * @param houseId
	 * @return
	 * @throws Exception
	 */
	public boolean aceAbleHouse(Integer houseId) throws Exception;

	/**
	 * 删除房源
	 * @param houseId
	 * @return
	 * @throws Exception
	 */
	public boolean aceDeleteHouse(Integer houseId) throws Exception;

	/**
	 * 删除房间
	 * @param roomId
	 * @return
	 * @throws Exception
	 */
	public boolean aceDeleteRoom(Integer roomId) throws Exception;

	/**
	 * 根据房间id修改房间信息
	 * @param room
	 * @return
	 * @throws Exception
	 */
	public boolean modifyRoomByRoomId(RentalRoom room) throws Exception;

	/**
	 * 为房间增加tip温馨提示信息
	 * 	到租时间提示，空置天数提示，收租提示...
	 * @param rooms
	 * @return
	 */
	public void addTipsForRoom(RentalRoom room) throws Exception;

	/**
	 * 设置房间的最近的一条待支付账单ID
	 * @param room
	 * @throws Exception
	 */
	public void setFirstPayingBillIdForRoom(RentalRoom room) throws Exception;

	/**
	 * 获取所有小区的涉及的省市级联map JSON串
	 * @param comms
	 * @return
	 * @throws Exception
	 */
	String getProAndCityCascade(User user) throws Exception;

	/**
	 * 获取指定房间状态的的房间数量
	 * @param status
	 * @return
	 */
	Integer getRoomCountByRoomStatus(String status, Integer userId) throws Exception;

}
