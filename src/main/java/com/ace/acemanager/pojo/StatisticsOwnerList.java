package com.ace.acemanager.pojo;

import java.util.Date;

public class StatisticsOwnerList {
    private Integer id;

    private String contractStatus;

    private String houseInfo;

    private String ownerName;

    private String contact;

    private String trusteeshipDuration;

    private Date contractCreateTime;

    private Date contractStartTime;

    private Date contractEndTime;

    private String payType;

    private Float monthRentMoney;

    private Float cashMoney;

    private Integer rerentCount;

    private Date offrentTime;

    private String offrentType;

    private String actualCheckDuration;

    private Date createTime;

    private Date modifiedTime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getContractStatus() {
        return contractStatus;
    }

    public void setContractStatus(String contractStatus) {
        this.contractStatus = contractStatus == null ? null : contractStatus.trim();
    }

    public String getHouseInfo() {
        return houseInfo;
    }

    public void setHouseInfo(String houseInfo) {
        this.houseInfo = houseInfo == null ? null : houseInfo.trim();
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName == null ? null : ownerName.trim();
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact == null ? null : contact.trim();
    }

    public String getTrusteeshipDuration() {
        return trusteeshipDuration;
    }

    public void setTrusteeshipDuration(String trusteeshipDuration) {
        this.trusteeshipDuration = trusteeshipDuration == null ? null : trusteeshipDuration.trim();
    }

    public Date getContractCreateTime() {
        return contractCreateTime;
    }

    public void setContractCreateTime(Date contractCreateTime) {
        this.contractCreateTime = contractCreateTime;
    }

    public Date getContractStartTime() {
        return contractStartTime;
    }

    public void setContractStartTime(Date contractStartTime) {
        this.contractStartTime = contractStartTime;
    }

    public Date getContractEndTime() {
        return contractEndTime;
    }

    public void setContractEndTime(Date contractEndTime) {
        this.contractEndTime = contractEndTime;
    }

    public String getPayType() {
        return payType;
    }

    public void setPayType(String payType) {
        this.payType = payType == null ? null : payType.trim();
    }

    public Float getMonthRentMoney() {
        return monthRentMoney;
    }

    public void setMonthRentMoney(Float monthRentMoney) {
        this.monthRentMoney = monthRentMoney;
    }

    public Float getCashMoney() {
        return cashMoney;
    }

    public void setCashMoney(Float cashMoney) {
        this.cashMoney = cashMoney;
    }

    public Integer getRerentCount() {
        return rerentCount;
    }

    public void setRerentCount(Integer rerentCount) {
        this.rerentCount = rerentCount;
    }

    public Date getOffrentTime() {
        return offrentTime;
    }

    public void setOffrentTime(Date offrentTime) {
        this.offrentTime = offrentTime;
    }

    public String getOffrentType() {
        return offrentType;
    }

    public void setOffrentType(String offrentType) {
        this.offrentType = offrentType == null ? null : offrentType.trim();
    }

    public String getActualCheckDuration() {
        return actualCheckDuration;
    }

    public void setActualCheckDuration(String actualCheckDuration) {
        this.actualCheckDuration = actualCheckDuration == null ? null : actualCheckDuration.trim();
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getModifiedTime() {
        return modifiedTime;
    }

    public void setModifiedTime(Date modifiedTime) {
        this.modifiedTime = modifiedTime;
    }
}