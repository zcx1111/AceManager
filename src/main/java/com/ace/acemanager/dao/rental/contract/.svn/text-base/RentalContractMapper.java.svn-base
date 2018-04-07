package com.ace.acemanager.dao.rental.contract;

import com.ace.acemanager.pojo.RentalContract;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface RentalContractMapper {
    int deleteByPrimaryKey(Integer id);

    int insertSelective(RentalContract record);

    RentalContract selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(RentalContract record);

    int updateByPrimaryKey(RentalContract record);

    /**
     * 根据houseId和合同状态获取合同列表，状态为null则查询所有合同列表
     * @param houseId
     * @param Status
     * @return
     */
    List<RentalContract> getContractsByHouseIdAndStatus(@Param("houseId") Integer houseId, @Param("Status") String Status);

    /**
     * 根据houseId 和合同状态获取合同数量
     * @param houseId
     * @param Status
     * @return
     */
    int getContractsCountByHouseIdAndStatus(@Param("houseId") Integer houseId, @Param("Status") String Status);

    /**
     * 根据 roomId 和合同状态获取合同列表，状态为null则查询所有合同列表
     * @param roomId
     * @param Status
     * @return
     */
    List<RentalContract> getContractsByRoomIdAndStatus(@Param("roomId") Integer roomId, @Param("Status") String Status);

    /**
     * 根据 roomId 和合同状态获取合同数量
     * @param roomId
     * @param Status
     * @return
     */
    int getContractsCountByRoomIdAndStatus(@Param("roomId") Integer roomId, @Param("Status") String Status);

    /**
     * 查询当前用户下所有过期的 租房合同
     * @param date
     * @param userId
     * @return
     */
    List<RentalContract> getOutOfDateRoomContracts(@Param("date") String date, @Param("userId") Integer userId);

    /**
     * 查询当前用户下所 有到期的 业主合同
     * @param date
     * @param userId
     * @return
     */
    List<RentalContract> getOutOfDateHouseContracts(@Param("date") String date, @Param("userId") Integer userId);
}