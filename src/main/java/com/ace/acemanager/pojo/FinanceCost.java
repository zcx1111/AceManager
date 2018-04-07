package com.ace.acemanager.pojo;

import java.util.Date;

public class FinanceCost extends Base {
	
    private Integer id;//费用明细id

    private String costName;//费用名称

    private Float feeAmount;//费用金额

    private Integer billId;//账单id

    private Date createDate;//创建时间

    private Date updateDate;//修改时间

    private FinanceBill bill;//关联账单
    
    public FinanceBill getBill() {
		return bill;
	}

	public void setBill(FinanceBill bill) {
		this.bill = bill;
	}

	public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCostName() {
        return costName;
    }

    public void setCostName(String costName) {
        this.costName = costName == null ? null : costName.trim();
    }

    public Float getFeeAmount() {
        return feeAmount;
    }

    public void setFeeAmount(Float feeAmount) {
        this.feeAmount = feeAmount;
    }

    public Integer getBillId() {
        return billId;
    }

    public void setBillId(Integer billId) {
        this.billId = billId;
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