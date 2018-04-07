package com.ace.acemanager.pojo;

import java.util.Date;

import com.alibaba.fastjson.annotation.JSONField;

public class RentalOtherCostInfo {
    private Integer id;

    private String costName;

    private String costType;

    private Float unitPrice;

    private Float totalPrice;

    private String unitName;

    private Integer contractId;

    @JSONField(format="yyyy-MM-dd")
    private Date modifiedTime;

    @JSONField(format="yyyy_MM-dd")
    private Date createTime;

    private RentalMeterRead meterRead;

    /**
     * 读表，用于页面传值
     * @return
     */
    public RentalMeterRead getMeterRead() {
        return meterRead;
    }

    public void setMeterRead(RentalMeterRead meterRead) {
        this.meterRead = meterRead;
    }

    /**
     *
     * @return 单位名称(吨/度/...)
     */
    public String getUnitName() {
        return unitName;
    }

    public void setUnitName(String unitName) {
        this.unitName = unitName;
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
     * @return 杂费名称
     */
    public String getCostName() {
        return costName;
    }

    public void setCostName(String costName) {
        this.costName = costName == null ? null : costName.trim();
    }

    /**
     *
     * @return 固定每月收费/抄表收费
     */
    public String getCostType() {
        return costType;
    }

    public void setCostType(String costType) {
        this.costType = costType == null ? null : costType.trim();
    }

    public Float getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Float unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Float getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Float totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Integer getContractId() {
        return contractId;
    }

    public void setContractId(Integer contractId) {
        this.contractId = contractId;
    }

    public Date getModifiedTime() {
        return modifiedTime;
    }

    public void setModifiedTime(Date modifiedTime) {
        this.modifiedTime = modifiedTime;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("{");
        sb.append("\"id\":")
                .append(id);
        sb.append(",\"costName\":\"")
                .append(costName).append('\"');
        sb.append(",\"costType\":\"")
                .append(costType).append('\"');
        sb.append(",\"unitPrice\":")
                .append(unitPrice);
        sb.append(",\"totalPrice\":")
                .append(totalPrice);
        sb.append(",\"contractId\":")
                .append(contractId);
        sb.append(",\"modifiedTime\":\"")
                .append(modifiedTime).append('\"');
        sb.append(",\"createTime\":\"")
                .append(createTime).append('\"');
        sb.append('}');
        return sb.toString();
    }
}