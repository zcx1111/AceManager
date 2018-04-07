package com.ace.acemanager.pojo;

import com.alibaba.fastjson.annotation.JSONField;

import java.util.Date;
import java.util.List;

public class RentalContract {
    private Integer id;             //主键id

    private String clienteleName;   //顾客姓名

    private String phoneNumber;     //电话号码

    private Float deposit;          //押金

    private String remark;          //备注

    private String certificateType; //证件类型

    private String certificateNo;   //证件号码

    private String contractType;    //合同类型(租房/托管)

    private String subsectionType;  //分段/普通

    private Integer payType;        //支付方式(几月一付)

    private String rentType;        //收租方式(提前日收租/固定日期收租)

    private Integer rentDate;       //收租时间(提前x天/固定x日)

    private String status;          //状态(生效/到期/...)

    @JSONField(format = "yyyy-MM-dd")
    private Date startDate;         //合同开始时间

    @JSONField(format = "yyyy-MM-dd")
    private Date endDate;           //合同结束时间

    @JSONField(format = "yyyy-MM-dd")
    private Date abandonDate;       //退租时间


    private String abandonRemark;   //退租原因

    private Integer roomId;         //PK_房间id

    private Integer houseId;        //PK_房源id

    @JSONField(format = "yyyy-MM-dd HH:mm:ss")
    private Date modifiedTime;

    @JSONField(format = "yyyy-MM-dd HH:mm:ss")
    private Date createTime;

    private List<RentalInfo> rentalInfos;

    private List<RentalOtherCostInfo> otherCostInfos;

    private RentalRoom room;

    private RentalHouse house;

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

    public Date getAbandonDate() {
        return abandonDate;
    }

    public void setAbandonDate(Date abandonDate) {
        this.abandonDate = abandonDate;
    }

    public String getAbandonRemark() {
        return abandonRemark;
    }

    public void setAbandonRemark(String abandonRemark) {
        this.abandonRemark = abandonRemark;
    }

    /**
     * @return 合同开始时间
     */
    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    /**
     * @return 合同结束时间
     */
    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    /**
     * @return 租赁分段信息 list
     */
    public List<RentalInfo> getRentalInfos() {
        return rentalInfos;
    }

    public void setRentalInfos(List<RentalInfo> rentalInfos) {
        this.rentalInfos = rentalInfos;
    }

    /**
     * @return 杂费信息 list
     */
    public List<RentalOtherCostInfo> getOtherCostInfos() {
        return otherCostInfos;
    }

    public void setOtherCostInfos(List<RentalOtherCostInfo> otherCostInfos) {
        this.otherCostInfos = otherCostInfos;
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
     * @return 顾客(业主/租户)
     */
    public String getClienteleName() {
        return clienteleName;
    }

    public void setClienteleName(String clienteleName) {
        this.clienteleName = clienteleName == null ? null : clienteleName.trim();
    }

    /**
     * @return 手机号码
     */
    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber == null ? null : phoneNumber.trim();
    }

    /**
     * @return 押金
     */
    public Float getDeposit() {
        return deposit;
    }

    public void setDeposit(Float deposit) {
        this.deposit = deposit;
    }

    /**
     * @return 备注
     */
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    /**
     * @return 证件类型
     */
    public String getCertificateType() {
        return certificateType;
    }

    public void setCertificateType(String certificateType) {
        this.certificateType = certificateType == null ? null : certificateType.trim();
    }

    /**
     * @return 证件号码
     */
    public String getCertificateNo() {
        return certificateNo;
    }

    public void setCertificateNo(String certificateNo) {
        this.certificateNo = certificateNo == null ? null : certificateNo.trim();
    }

    /**
     * @return 合同类型(租房/托管)
     */
    public String getContractType() {
        return contractType;
    }

    public void setContractType(String contractType) {
        this.contractType = contractType == null ? null : contractType.trim();
    }

    /**
     * @return 分段/普通
     */
    public String getSubsectionType() {
        return subsectionType;
    }

    public void setSubsectionType(String subsectionType) {
        this.subsectionType = subsectionType == null ? null : subsectionType.trim();
    }

    /**
     * @return 支付方式(几月一付)
     */
    public Integer getPayType() {
        return payType;
    }

    public void setPayType(Integer payType) {
        this.payType = payType;
    }

    /**
     * @return 收租方式(提前日收租/固定日期收租)
     */
    public String getRentType() {
        return rentType;
    }

    public void setRentType(String rentType) {
        this.rentType = rentType == null ? null : rentType.trim();
    }

    /**
     * @return 收租时间(提前x天/固定x日)
     */
    public Integer getRentDate() {
        return rentDate;
    }

    public void setRentDate(Integer rentDate) {
        this.rentDate = rentDate;
    }

    /**
     * @return 状态(生效/到期/...)
     */
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status == null ? null : status.trim();
    }

    /**
     * @return PK_房间id
     */
    public Integer getRoomId() {
        return roomId;
    }

    public void setRoomId(Integer roomId) {
        this.roomId = roomId;
    }

    /**
     * @return PK_房源id
     */
    public Integer getHouseId() {
        return houseId;
    }

    public void setHouseId(Integer houseId) {
        this.houseId = houseId;
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

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("{");
        sb.append("\"id\":")
                .append(id);
        sb.append(",\"clienteleName\":\"")
                .append(clienteleName).append('\"');
        sb.append(",\"phoneNumber\":\"")
                .append(phoneNumber).append('\"');
        sb.append(",\"deposit\":")
                .append(deposit);
        sb.append(",\"remark\":\"")
                .append(remark).append('\"');
        sb.append(",\"certificateType\":\"")
                .append(certificateType).append('\"');
        sb.append(",\"certificateNo\":\"")
                .append(certificateNo).append('\"');
        sb.append(",\"contractType\":\"")
                .append(contractType).append('\"');
        sb.append(",\"subsectionType\":\"")
                .append(subsectionType).append('\"');
        sb.append(",\"payType\":")
                .append(payType);
        sb.append(",\"rentType\":\"")
                .append(rentType).append('\"');
        sb.append(",\"rentDate\":")
                .append(rentDate);
        sb.append(",\"status\":\"")
                .append(status).append('\"');
        sb.append(",\"roomId\":")
                .append(roomId);
        sb.append(",\"houseId\":")
                .append(houseId);
        sb.append(",\"modifiedTime\":\"")
                .append(modifiedTime).append('\"');
        sb.append(",\"createTime\":\"")
                .append(createTime).append('\"');
        sb.append(",\"rentalInfos\":")
                .append(rentalInfos);
        sb.append(",\"otherCostInfos\":")
                .append(otherCostInfos);
        sb.append('}');
        return sb.toString();
    }
}