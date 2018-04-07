package com.ace.acemanager.controller;

import com.ace.acemanager.common.AcceptPojo;
import com.ace.acemanager.pojo.RentalContract;
import com.ace.acemanager.pojo.RentalHouse;
import com.ace.acemanager.pojo.RentalRoom;
import com.ace.acemanager.service.rental.RentalContractService;
import com.alibaba.fastjson.JSON;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

/**
 * Project <AceManager>
 * Created by zkq on 2017/7/11 16:51.
 */
@Controller
@RequestMapping(value = "/rentalContract", produces = "text/html;charset=UTF-8")
public class RentalContractController extends BaseController {

    @SuppressWarnings("unused")
    private Logger logger = Logger.getLogger(RentalContractController.class);
    @Resource
    private RentalContractService contractService;


    @RequestMapping(value = "/getRoomDetailByRoomId.html")
    public @ResponseBody
    String getRoomDetailByRoomId(Integer roomId) {
        RentalRoom room = null;
        try {
            room = contractService.getRoomDetailByRoomId(roomId);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return JSON.toJSONString(room);
    }

    /**
     * 根据房源id获取生效合同
     *
     * @param houseId 房源id
     * @return 该房源下生效合同
     */
    @RequestMapping(value = "/getOwnerContract.html")
    public @ResponseBody
    String getOwnerContract(Integer houseId) {
        RentalContract contract = null;
        try {
            contract = contractService.getEffectiveContractByHouseId(houseId);//获取生效合同信息
        } catch (Exception e) {
            e.printStackTrace();
        }
        return JSON.toJSONString(contract);
    }

    /**
     * 根据房间id获取生效合同
     *
     * @param roomId 房间id
     * @return 该房间下生效合同
     */
    @RequestMapping(value = "/getRentContract.html")
    public @ResponseBody
    String getRentContract(Integer roomId) {
        RentalContract contract = null;
        try {
            contract = contractService.getEffectiveContractByRoomId(roomId);//获取生效合同信息
        } catch (Exception e) {
            e.printStackTrace();
        }
        return JSON.toJSONString(contract);
    }

    /**
     * 根据合同id获取合同信息和房源信息
     *
     * @param contractId 合同id
     * @return 合同信息和其所关联的房源信息
     */
    @RequestMapping(value = "/getOwnerContractById.html")
    public @ResponseBody
    String getOwnerContractById(Integer contractId) {
        RentalContract contract;
        RentalHouse house;
        try {
            contract = contractService.getContractById(contractId);
            house = new RentalHouse();
            house.setId(contract.getHouseId());
            house = contractService.getHouseDetailByHouseId(house);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return "[" + JSON.toJSONString(contract) + "," + JSON.toJSONString(house) + "]";
    }

    /**
     * 通过合同id 获取房源和合同信息
     *
     * @param contractId 合同id
     * @return
     */
    @RequestMapping(value = "/getRentContractById.html")
    public @ResponseBody
    String getRentContractById(Integer contractId) {
        RentalContract contract;
        RentalHouse house;
        RentalRoom room;
        try {
            contract = contractService.getContractById(contractId);
            room = contractService.getRoomById(contract.getRoomId());
            house = new RentalHouse();
            house.setId(room.getHouseId());
            house = contractService.getHouseDetailByHouseId(house);
            logger.debug("/getRentContractById.html  " + JSON.toJSONString(room));
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return "[" + JSON.toJSONString(contract) + "," + JSON.toJSONString(house) + ","+JSON.toJSONString(room)+ "]";

    }

    /**
     * 添加租房合同
     *
     * @param contract 合同信息
     * @return 添加租房合同结果
     */
    @RequestMapping(value = "/addRentContract.html")
    public @ResponseBody
    String addRentContract(RentalContract contract) {
        logger.debug(JSON.toJSONString(contract));
        String result;//保存租房合同
        try {
            result = contractService.aceSaveRentContract(contract);
        } catch (Exception e) {
            e.printStackTrace();
            return "发生错误，请重试";
        }
        return result;
    }

    /**
     * 签约 业主合同
     *
     * @param contract 合同
     * @return 添加结果
     */
    @RequestMapping(value = "/addOwnerContract.html")
    public @ResponseBody
    String addOwnerContract(RentalContract contract) {
        logger.debug(JSON.toJSONString(contract));
        String result;
        try {
            result = contractService.aceSaveOwnerContract(contract);
        } catch (Exception e) {
            e.printStackTrace();
            return "发生错误，请重试";
        }
        return result;
    }

    /**
     * 更新业主合同
     *
     * @param contract 合同
     * @return 更新结果
     */
    @RequestMapping(value = "/updateContract.html")
    public @ResponseBody
    String updateOwnerContract(RentalContract contract) {
        logger.debug(JSON.toJSONString(contract));
        try {
            contractService.updateContract(contract);
        } catch (Exception e) {
            e.printStackTrace();
            return "发生错误，请重试";
        }
        return "true";
    }

    /**
     * 查询是否能删除合同
     *
     * @param contractId 合同id
     * @return true&false
     */
    @RequestMapping(value = "/canDeleteContract.html")
    public @ResponseBody
    String canDeleteContract(Integer contractId) {
        try {
            if (contractService.canDeleteContract(contractId)) {
                return "true";
            } else {
                return "产生已支付账单，无法删除";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "发生错误，请重试";
        }
    }

    /**
     * 查询是否能续租
     *
     * @param contractId 合同id
     * @return true&false
     */
    @RequestMapping(value = "/canReletContract.html")
    public @ResponseBody
    String canReletContract(Integer contractId) {
        try {
            if (contractService.canReletContract(contractId)) {
                return "true";
            } else {
                return "还有未完成账单，无法续租";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "发生错误，请重试";
        }
    }

    /**
     * 续租业主合同
     *
     * @param contract 续租合同信息
     * @return 续租结果
     */
    @RequestMapping(value = "/reletContract.html")
    public @ResponseBody
    String reletContract(RentalContract contract) {
        logger.debug(JSON.toJSONString(contract));
        RentalContract rentalContract = new RentalContract();
        //只录入有用信息 过滤无效信息
        if (contract == null) {
            return "合同信息不合法";
        }
        rentalContract.setId(contract.getId());//ID
        rentalContract.setRentalInfos(contract.getRentalInfos());//租赁信息
        rentalContract.setRentType(contract.getRentType());//交租方式
        rentalContract.setRentDate(contract.getRentDate());//交租时间
        rentalContract.setPayType(contract.getPayType()); //付款周期
        rentalContract.setSubsectionType(contract.getSubsectionType()); //分段方式
        rentalContract.setOtherCostInfos(contract.getOtherCostInfos());//杂费
        rentalContract.setClienteleName(contract.getClienteleName()); //交易对象
        rentalContract.setContractType(contract.getContractType());// 合同类型
        rentalContract.setHouseId(contract.getHouseId());// 房源id
        rentalContract.setRoomId(contract.getRoomId());// 房源id
        String result;
        try {
            result = contractService.aceReletContract(rentalContract);
        } catch (Exception e) {
            e.printStackTrace();
            return "发生错误，请重试";
        }
        return result;
    }

    /**
     * 删除业主合同
     *
     * @param contractId 合同id
     * @return 删除结果
     */
    @RequestMapping(value = "/deleteOwnerContract.html")
    public @ResponseBody
    String deleteOwnerContract(Integer contractId) {
        try {
            if (contractService.canDeleteContract(contractId)) {//如果符合删除条件
                contractService.aceDeleteOwnerContract(contractId); //删除
            } else {
                return "不满足删除条件";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "发生错误，请重试";
        }
        return "true";
    }

    @RequestMapping(value = "/deleteRentContract.html")
    public @ResponseBody
    String deleteRentContract(Integer contractId) {
        try {
            if (contractService.canDeleteContract(contractId)) {//如果满足删除条件
                contractService.aceDeleteRentContract(contractId);    //删除租房合同
            } else {
                return "不满足删除条件";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "发送错误，请重试";
        }
        return "true";
    }

    /**
     * 获取未支付账单数量
     *
     * @param contractId 合同id
     * @return 未支付账单数量
     */
    @RequestMapping(value = "/getUnpaidBillCountByContractId.html")
    public @ResponseBody
    String getUnpaidBillCountByContractId(Integer contractId) {
        try {
            return String.valueOf(contractService.getUnpaidBillCountByContractId(contractId));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "-1";
    }


    /**
     * 合同退租
     *
     * @param pojo 实体类  包含合同 和杂费
     * @return 退租结果
     */
    @RequestMapping(value = "/abandonContract.html")
    public @ResponseBody
    String abandonContract(AcceptPojo pojo) {
        logger.debug(JSON.toJSONString(pojo));
        try {
            return contractService.aceAbandonContract(pojo.getContract(), pojo.getCost());
        } catch (Exception e) {
            e.printStackTrace();
            return "发生错误，请重试";
        }
    }

    /**
     * 根据房源id 获取历史合同列表
     * @param houseId
     * @return
     */
    @RequestMapping(value = "/getHouseHistoryContracts")
    public @ResponseBody
    String getHouseHistoryContracts(Integer houseId) {
        List<RentalContract> contracts;
        try {
            contracts = contractService.getHistoryContractByHouseId(houseId);
        } catch (Exception e) {
            e.printStackTrace();
            return "发生错误，请重试";
        }
        return JSON.toJSONString(contracts);
    }

    /**
     * 根据房间id 获取历史合同列表
     * @param roomId 房间id
     * @return
     */
    @RequestMapping(value = "/getRoomHistoryContracts")
    public @ResponseBody
    String getRoomHistoryContracts(Integer roomId) {
        List<RentalContract> contracts;
        try {
            contracts = contractService.getHistoryContractByRoomId(roomId);
        } catch (Exception e) {
            e.printStackTrace();
            return "发生错误，请重试";
        }
        return JSON.toJSONString(contracts);
    }

    @RequestMapping(value = "/getRoomStatus")
    public @ResponseBody
    String getRoomStatusById(Integer roomId) {
        RentalRoom room;
        try {
            room = contractService.getRoomById(roomId);
        } catch (Exception e) {
            e.printStackTrace();
            return "发生错误，请重试";
        }
        return room.getStatus();
    }
}
