package com.ace.acemanager.pojo;

import com.alibaba.fastjson.annotation.JSONField;

import java.util.Date;

/**
 * 租赁信息类
 * 一个合同可以对应多个租赁信息
 */
public class RentalInfo {

    private Integer id;

    private Float rentMoney;

    @JSONField(format = "yyyy-MM-dd")
    private Date rentStartTime;
    @JSONField(format = "yyyy-MM-dd")
    private Date rentEndTime;

    private Integer contractId;

    private Integer chooseMonth;
    @JSONField(format = "yyyy-MM-dd HH:mm:ss")
    private Date modifiedTime;
    @JSONField(format = "yyyy-MM-dd HH:mm:ss")
    private Date createTime;

    public Integer getChooseMonth() {
        return chooseMonth;
    }

    public void setChooseMonth(Integer chooseMonth) {
        this.chooseMonth = chooseMonth;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("{");
        sb.append("\"id\":")
                .append(id);
        sb.append(",\"rentMoney\":")
                .append(rentMoney);
        sb.append(",\"rentStartTime\":\"")
                .append(rentStartTime).append('\"');
        sb.append(",\"rentEndTime\":\"")
                .append(rentEndTime).append('\"');
        sb.append(",\"contractId\":")
                .append(contractId);
        sb.append(",\"modifiedTime\":\"")
                .append(modifiedTime).append('\"');
        sb.append(",\"createTime\":\"")
                .append(createTime).append('\"');
        sb.append('}');
        return sb.toString();
    }

    /**
     * @return PK 合同id
     */
    public Integer getContractId() {
        return contractId;
    }

    public void setContractId(Integer contractId) {
        this.contractId = contractId;
    }

    /**
     * @return 主键id
     */
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * @return 租金 *元/月
     */
    public Float getRentMoney() {
        return rentMoney;
    }

    public void setRentMoney(Float rentMoney) {
        this.rentMoney = rentMoney;
    }

    /**
     * @return 租赁开始时间
     */
    public Date getRentStartTime() {
        return rentStartTime;
    }

    public void setRentStartTime(Date rentStartTime) {
        this.rentStartTime = rentStartTime;
    }

    /**
     * @return 租赁结束时间
     */
    public Date getRentEndTime() {
        return rentEndTime;
    }

    public void setRentEndTime(Date rentEndTime) {
        this.rentEndTime = rentEndTime;
    }

    /**
     * @return 修改时间
     */
    public Date getModifiedTime() {
        return modifiedTime;
    }

    public void setModifiedTime(Date modifiedTime) {
        this.modifiedTime = modifiedTime;
    }

    /**
     * @return 创建时间
     */
    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
}