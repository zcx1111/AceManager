package com.ace.acemanager.pojo;

import java.util.Date;
import java.util.List;

import com.alibaba.fastjson.annotation.JSONField;

public class FinanceBill extends Base{
	
    private Integer id;//账单id

    private String transactionObject;//交易对象

    private String transactionObjectName;//交易对象姓名

    @JSONField(format="yyyy-MM-dd")
    private Date billStartDate;//账单开始时间

    @JSONField(format="yyyy-MM-dd")
    private Date billEndDate;//账单结束时间

    @JSONField(format="yyyy-MM-dd")
    private Date receiptDate;//应收租日期

    @JSONField(format="yyyy-MM-dd")
    private Date actualTransactionDate;//实际交易日期

    private String roomName;//房间名称

    private String fundFlow;//资金流向

    private String billNote;//账单备注

    private String paymentMethod;//支付方式

    private String billStatus;//账单状态

    private String batch;//交易流水号

    private Float totalMoney;//费用总金额

    private String houseName;//房源名称

    private Integer rentalRoomId;//房间id
    
    private RentalHouse house;//房源

    private RentalRoom room;//房间
    
    private Integer rentalHouseId;//房源id
    
    private Integer rentalContractId;//合同id

    @JSONField(format="yyyy-MM-dd")
    private Date createDate;//创建时间

    @JSONField(format="yyyy-MM-dd")
    private Date updateDate;//修改时间
    
    private List<FinanceCost> costList;//费用明细
    
    private List<RentalMeterRead> readList;//抄表
    
    private Integer userId;//账单所属主账号id

    public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public RentalHouse getHouse() {
		return house;
	}

	public void setHouse(RentalHouse house) {
		this.house = house;
	}

	public RentalRoom getRoom() {
		return room;
	}

	public void setRoom(RentalRoom room) {
		this.room = room;
	}

	public Integer getRentalContractId() {
		return rentalContractId;
	}

	public void setRentalContractId(Integer rentalContractId) {
		this.rentalContractId = rentalContractId;
	}

	public List<RentalMeterRead> getReadList() {
		return readList;
	}

	public void setReadList(List<RentalMeterRead> readList) {
		this.readList = readList;
	}

	public List<FinanceCost> getCostList() {
		return costList;
	}

	public void setCostList(List<FinanceCost> costList) {
		this.costList = costList;
	}

	public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTransactionObject() {
        return transactionObject;
    }

    public void setTransactionObject(String transactionObject) {
        this.transactionObject = transactionObject == null ? null : transactionObject.trim();
    }

    public String getTransactionObjectName() {
        return transactionObjectName;
    }

    public void setTransactionObjectName(String transactionObjectName) {
        this.transactionObjectName = transactionObjectName == null ? null : transactionObjectName.trim();
    }

    public Date getBillStartDate() {
        return billStartDate;
    }

    public void setBillStartDate(Date billStartDate) {
        this.billStartDate = billStartDate;
    }

    public Date getBillEndDate() {
        return billEndDate;
    }

    public void setBillEndDate(Date billEndDate) {
        this.billEndDate = billEndDate;
    }

    public Date getReceiptDate() {
        return receiptDate;
    }

    public void setReceiptDate(Date receiptDate) {
        this.receiptDate = receiptDate;
    }

    public Date getActualTransactionDate() {
        return actualTransactionDate;
    }

    public void setActualTransactionDate(Date actualTransactionDate) {
        this.actualTransactionDate = actualTransactionDate;
    }

    public String getRoomName() {
        return roomName;
    }

    public void setRoomName(String roomName) {
        this.roomName = roomName == null ? null : roomName.trim();
    }

    public String getFundFlow() {
        return fundFlow;
    }

    public void setFundFlow(String fundFlow) {
        this.fundFlow = fundFlow == null ? null : fundFlow.trim();
    }

    public String getBillNote() {
        return billNote;
    }

    public void setBillNote(String billNote) {
        this.billNote = billNote == null ? null : billNote.trim();
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod == null ? null : paymentMethod.trim();
    }

    public String getBillStatus() {
        return billStatus;
    }

    public void setBillStatus(String billStatus) {
        this.billStatus = billStatus == null ? null : billStatus.trim();
    }

    public String getBatch() {
        return batch;
    }

    public void setBatch(String batch) {
        this.batch = batch == null ? null : batch.trim();
    }

    public Float getTotalMoney() {
        return totalMoney;
    }

    public void setTotalMoney(Float totalMoney) {
        this.totalMoney = totalMoney;
    }

    public String getHouseName() {
        return houseName;
    }

    public void setHouseName(String houseName) {
        this.houseName = houseName == null ? null : houseName.trim();
    }

    public Integer getRentalRoomId() {
        return rentalRoomId;
    }

    public void setRentalRoomId(Integer rentalRoomId) {
        this.rentalRoomId = rentalRoomId;
    }

    public Integer getRentalHouseId() {
        return rentalHouseId;
    }

    public void setRentalHouseId(Integer rentalHouseId) {
        this.rentalHouseId = rentalHouseId;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }
}