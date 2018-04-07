package com.ace.acemanager.pojo;

import java.util.Date;

import com.alibaba.fastjson.annotation.JSONField;

public class RentalMeterRead {
    private Integer id;

    private String meterType;

    @JSONField(format="yyyy-MM-dd")
    private Date readTime;

    private Integer meterNumber;

    private Integer otherCostInfoId;

    private RentalOtherCostInfo rentalOtherCostInfo;
    
    private Integer billId;

    @JSONField(format="yyyy-MM-dd")
    private Date modifiedTime;

    private Date createTime;

    /**
     * 杂费
     * @return
     */
    public RentalOtherCostInfo getRentalOtherCostInfo() {
		return rentalOtherCostInfo;
	}

	public void setRentalOtherCostInfo(RentalOtherCostInfo rentalOtherCostInfo) {
		this.rentalOtherCostInfo = rentalOtherCostInfo;
	}

	/**
     * 账单id
     * @return
     */
    public Integer getBillId() {
        return billId;
    }

    public void setBillId(Integer billId) {
        this.billId = billId;
    }

    /**
     *
     * @return 主键id
     */
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    /**
     *
     * @return 抄表类型
     */
    public String getMeterType() {
        return meterType;
    }

    public void setMeterType(String meterType) {
        this.meterType = meterType == null ? null : meterType.trim();
    }


    /**
     *
     * @return 读表时间
     */
    public Date getReadTime() {
        return readTime;
    }

    public void setReadTime(Date readTime) {
        this.readTime = readTime;
    }

    /**
     *
     * @return 本次读数
     */
    public Integer getMeterNumber() {
        return meterNumber;
    }

    public void setMeterNumber(Integer meterNumber) {
        this.meterNumber = meterNumber;
    }

    /**
     *
     * @return PK_杂费id
     */
    public Integer getOtherCostInfoId() {
        return otherCostInfoId;
    }

    public void setOtherCostInfoId(Integer otherCostInfoId) {
        this.otherCostInfoId = otherCostInfoId;
    }

    /**
     *
     * @return 修改时间
     */
    public Date getModifiedTime() {
        return modifiedTime;
    }

    public void setModifiedTime(Date modifiedTime) {
        this.modifiedTime = modifiedTime;
    }

    /**
     *
     * @return 修改时间
     */
    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
}