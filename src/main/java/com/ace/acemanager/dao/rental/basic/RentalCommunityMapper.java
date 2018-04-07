package com.ace.acemanager.dao.rental.basic;
import java.util.List;

import com.ace.acemanager.pojo.RentalCommunity;
/**
 * 小区Mapper接口
 * @author Liuqi
 * 2017-7-11
 */
public interface RentalCommunityMapper {

	/**
	 * 根据主键删除小区
	 * @param id
	 * @return
	 */
	int deleteCommunityById(Integer id);

	/**
	 * 增加小区
	 * @param record
	 * @return
	 */
	int addCommunity(RentalCommunity record);

	/**
	 * 根据主键查询小区
	 * @param id
	 * @return
	 */
	RentalCommunity getCommunityById(Integer id);

	/**
	 * 根据主键更新小区
	 * @param record
	 * @return
	 */
	int updateCommunityById(RentalCommunity record);

	/**
	 * 查询小区列表
	 * @return
	 */
	List<RentalCommunity> getCommunityList();

	/**
	 * 查询分配到指定用户下的小区列表
	 * @return
	 */
	List<RentalCommunity> getCommunityListByUserId(RentalCommunity community);

	/**
	 * 获取所有小区所涉及到的省市
	 * @param community
	 * @return
	 */
	List<RentalCommunity> getAllProAndCityFromComm(RentalCommunity community);
	
	/**
	 * 根据 c.province = '' AND c.city = '' AND c.area = '' AND c.community_name = ''
	 * 获取小区
	 * @param community
	 * @return
	 */
	RentalCommunity getCommunityByAddressAndName(RentalCommunity community);
	
	/**
	 * 分页查询主账号下的小区列表
	 * @param community
	 * @return
	 */
	List<RentalCommunity> getCommunityListByPage(RentalCommunity community);
	
	/**
	 * 统计记录总条数
	 * @param community
	 * @return
	 */
	int countCommunityListByPage(RentalCommunity community);

}