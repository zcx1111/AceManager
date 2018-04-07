package com.ace.acemanager.pojo;

import java.util.Date;

public class StatisticsHouseList {
    private Integer id;

    private Date enteringTime;

    private String ownerContractStatus;

    private String cityName;

    private String areaName;

    private String plateName;

    private String communityName;

    private String houseNumber;

    private String rentoutType;

    private Integer roomCount;

    private Date createTime;

    private Date modifiedTime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getEnteringTime() {
        return enteringTime;
    }

    public void setEnteringTime(Date enteringTime) {
        this.enteringTime = enteringTime;
    }

    public String getOwnerContractStatus() {
        return ownerContractStatus;
    }

    public void setOwnerContractStatus(String ownerContractStatus) {
        this.ownerContractStatus = ownerContractStatus == null ? null : ownerContractStatus.trim();
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName == null ? null : cityName.trim();
    }

    public String getAreaName() {
        return areaName;
    }

    public void setAreaName(String areaName) {
        this.areaName = areaName == null ? null : areaName.trim();
    }

    public String getPlateName() {
        return plateName;
    }

    public void setPlateName(String plateName) {
        this.plateName = plateName == null ? null : plateName.trim();
    }

    public String getCommunityName() {
        return communityName;
    }

    public void setCommunityName(String communityName) {
        this.communityName = communityName == null ? null : communityName.trim();
    }

    public String getHouseNumber() {
        return houseNumber;
    }

    public void setHouseNumber(String houseNumber) {
        this.houseNumber = houseNumber == null ? null : houseNumber.trim();
    }

    public String getRentoutType() {
        return rentoutType;
    }

    public void setRentoutType(String rentoutType) {
        this.rentoutType = rentoutType == null ? null : rentoutType.trim();
    }

    public Integer getRoomCount() {
        return roomCount;
    }

    public void setRoomCount(Integer roomCount) {
        this.roomCount = roomCount;
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