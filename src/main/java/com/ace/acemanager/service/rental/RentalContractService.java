package com.ace.acemanager.service.rental;

import com.ace.acemanager.pojo.FinanceCost;
import com.ace.acemanager.pojo.RentalContract;
import com.ace.acemanager.pojo.RentalHouse;
import com.ace.acemanager.pojo.RentalRoom;

import java.util.Date;
import java.util.List;

/**
 * Project <AceManager>
 * Created by Administrator on 2017/7/11 16:30.
 */
public interface RentalContractService {

//    int addContract(RentalContract contract) throws Exception;

//    int delContractById(Integer id) throws Exception;

    int updateContract(RentalContract contract) throws Exception;

    RentalContract getContractById(Integer id) throws Exception;

    /**
     * 根据id查找room
     *
     * @param id
     * @return
     * @throws Exception
     */
    RentalRoom getRoomById(Integer id) throws Exception;

    /**
     * 根据房源id判断是否有生效合同
     *
     * @param houseId
     * @return
     * @throws Exception
     */
    Boolean hasEffectiveContractByHouseId(Integer houseId) throws Exception;

    /**
     * 根据房间id判断是否有生效合同
     *
     * @param roomId
     * @return
     * @throws Exception
     */
    Boolean hasEffectiveContractByRoomId(Integer roomId) throws Exception;

    /**
     * 根据houseId获取合同状态为"生效"的合同，没有则返回null
     *
     * @param houseId
     * @return
     */
    RentalContract getEffectiveContractByHouseId(Integer houseId) throws Exception;

    /**
     * 根据 roomId 获取生效合同
     *
     * @param roomId
     * @return
     * @throws Exception
     */
    RentalContract getEffectiveContractByRoomId(Integer roomId) throws Exception;

//    /**
//     * 根据houseid和合同状态获取合同列表，状态为null则查询所有合同列表
//     *
//     * @param houseId
//     * @param Status
//     * @return
//     */
//    List<RentalContract> getContractsByHouseIdAndStatus(Integer houseId, String Status) throws Exception;

    /**
     * 保存业主合同
     *
     * @param contract
     * @return
     * @throws Exception
     */
    String aceSaveOwnerContract(RentalContract contract) throws Exception;

    /**
     * 保存租房合同
     *
     * @param contract
     * @return
     * @throws Exception
     */
    String aceSaveRentContract(RentalContract contract) throws Exception;

    /**
     * 根据 houseid 和合同状态获取合同数量
     *
     * @param houseId
     * @param status
     * @return
     * @throws Exception
     */
    Integer getContractsCountByHouseIdAndStatus(Integer houseId, String status) throws Exception;

    /**
     * 根据 roomId 和合同状态获取合同数量
     *
     * @param roomId
     * @param status
     * @return
     * @throws Exception
     */
    Integer getContractsCountByRoomIdAndStatus(Integer roomId, String status) throws Exception;

    /**
     * 获取房源详情
     *
     * @param house
     * @return
     * @throws Exception
     */
    RentalHouse getHouseDetailByHouseId(RentalHouse house) throws Exception;


    /**
     * 能否续租  （有未支付的账单则不能续租）
     *
     * @param contractId
     * @return
     * @throws Exception
     */
    Boolean canReletContract(Integer contractId) throws Exception;

    /**
     * 能否删除合同， (所有账单均为未支付才可删除)
     *
     * @param contractId
     * @return
     * @throws Exception
     */
    Boolean canDeleteContract(Integer contractId) throws Exception;

    /**
     * 续租  合同
     *
     * @param contract
     * @return
     * @throws Exception
     */
    String aceReletContract(RentalContract contract) throws Exception;

    /**
     * 根据id删除合同 以及关联的 分段信息 杂费 读表 账单 明细等等
     *
     * @param contractId 合同id
     * @return
     */
    Boolean aceDeleteOwnerContract(Integer contractId) throws Exception;

    /**
     * 根据id删除合同 以及关联的 分段信息 杂费 读表 账单 明细等等
     *
     * @param contractId 合同id
     * @return
     */
    Boolean aceDeleteRentContract(Integer contractId) throws Exception;

    /**
     * 根据合同id 获取未支付合同数量
     *
     * @param contractId 合同id
     * @return 未支付帐单数量
     * @throws Exception
     */
    Integer getUnpaidBillCountByContractId(Integer contractId) throws Exception;

    /**
     * 合同退租
     *
     * @param contract
     * @param costs
     * @return
     * @throws Exception
     */
    String aceAbandonContract(RentalContract contract, List<FinanceCost> costs) throws Exception;

    /**
     * 根据房间id获取房间房源小区信息
     *
     * @param roomId
     * @return
     * @throws Exception
     */
    RentalRoom getRoomDetailByRoomId(Integer roomId) throws Exception;

    /**
     * 根据房间id获取历史 租房合同
     *
     * @param roomId
     * @return
     */
    List<RentalContract> getHistoryContractByRoomId(Integer roomId) throws Exception;

    /**
     * 根据房源id获取历史 业主合同
     *
     * @param houseId
     * @return
     */
    List<RentalContract> getHistoryContractByHouseId(Integer houseId) throws Exception;

    /**
     * 获取过期的 租房合同列表！
     * @param date
     * @param userId
     * @return
     */
    List<RentalContract> getOutOfDateRoomContracts(Date date, Integer userId) throws Exception;

    /**
     *  获取到期的 业主合同列表
     * @param date
     * @param userId
     * @return
     * @throws Exception
     */
    List<RentalContract> getOutOfDateHouseContracts(Date date, Integer userId) throws Exception;

}
