package com.ace.acemanager.controller;

import com.ace.acemanager.common.Constants;
import com.ace.acemanager.pojo.FinanceBill;
import com.ace.acemanager.pojo.RentalContract;
import com.ace.acemanager.pojo.User;
import com.ace.acemanager.service.finance.FinanceBillService;
import com.ace.acemanager.service.finance.FinanceCostService;
import com.ace.acemanager.service.rental.RentalBasicService;
import com.ace.acemanager.service.rental.RentalBillService;
import com.ace.acemanager.service.rental.RentalContractService;
import com.alibaba.fastjson.JSON;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

/**
 * Project <AceManager>
 * Created by zkq on 2017/7/24 9:31.
 */
@Controller
public class GeneralController extends BaseController {
    Logger logger = Logger.getLogger(GeneralController.class);

    @Resource
    RentalContractService contractService;

    @Resource
    RentalBasicService rentalBasicService;

    @Resource
    RentalBillService rentalBillService;

    @Resource
    FinanceCostService costService;

    @Resource
    FinanceBillService financeBillService;


    @RequestMapping(value = "/main.html")
    public String aceMain(Model model) {
        User user = super.getCurrentUser();
        if (user == null) { //  未登录 返回登录页
            return "redirect:/";
        }
        Integer parentId = user.getParentId();
        if (parentId == 0) {
            parentId = user.getParentId();
        }
        try {
            model.addAttribute("emptyRoomCount", rentalBasicService.getRoomCountByRoomStatus(Constants.RENTAL_ROOM_STATUS_EMPTY, user.getId()));//空置房间数
            model.addAttribute("onRentRoomCount", rentalBasicService.getRoomCountByRoomStatus(Constants.RENTAL_ROOM_STATUS_RENTED, user.getId()));//已租房间
            Date now = new Date();
            model.addAttribute("todayIncomeMoney",financeBillService.getRoomTotalMoneyByDate(now,user.getId()));
            model.addAttribute("nonPayedMoney",financeBillService.getRoomNonPayedMoneyByDate(now,user.getId()));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "index";
    }

    @RequestMapping(value = "/main/getNonPayedRoomBills.html",produces = "text/html;charset=UTF-8")
    public @ResponseBody
    String getNonPayedRoomBills(Date date) {
        User user = super.getCurrentUser();
        if (user == null) { //  未登录 返回登录页
            return null;
        }
        List<FinanceBill> bills;
        try {
            bills = financeBillService.getAllNonPayedRoomBills(date, user.getId());
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return JSON.toJSONString(bills);
    }

    @RequestMapping(value = "/main/getNonPayedHouseBills.html",produces = "text/html;charset=UTF-8")
    public @ResponseBody
    String getNonPayedHouseBills(Date date) {
        User user = super.getCurrentUser();
        if (user == null) { //  未登录 返回登录页
            return null;
        }
        List<FinanceBill> bills;
        try {
            bills = financeBillService.getAllNonPayedHouseBills(date, user.getId());
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return JSON.toJSONString(bills);
    }

    @RequestMapping(value = "/main/getOutOfDateRoomContracts.html", produces = "text/html;charset=UTF-8")
    public @ResponseBody
    String getOutOfDateRoomContracts(Date date) {
        User user = super.getCurrentUser();
        if (user == null) {
            return null;
        }
        List<RentalContract> contracts;
        try {
            contracts = contractService.getOutOfDateRoomContracts(date, user.getId());
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return JSON.toJSONString(contracts);
    }

    @RequestMapping(value = "/main/getOutOfDateHouseContracts.html", produces = "text/html;charset=UTF-8")
    public @ResponseBody
    String getOutOfDateHouseContracts(Date date) {
        User user = super.getCurrentUser();
        if (user == null) {
            return null;
        }
        List<RentalContract> contracts;
        try {
            contracts = contractService.getOutOfDateHouseContracts(date, user.getId());
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return JSON.toJSONString(contracts);
    }

    

}
