package com.ace.acemanager.pojo;
import java.util.Date;
/**
 * 房间实体类
 * @author Liuqi
 * 2017-7-11
 */
public class RentalRoom extends Base {

	private String roomName;//房间名称

	private String remark;//房间备注

	private String status;//房间状态

	private Integer houseId;//PK_房源id

	private Integer isDelete;//是否删除(0:未删除/1:已删除)

	private Date modifiedTime;//修改时间

	private Date createTime;//创建时间

	private RentalHouse house;//所属房源

	private String clienteleName; //租客姓名

	private Date contractStartDate; //入住开始时间

	private Date contractEndDate; //入住结束时间

	private String tips;//温馨提醒

	private Integer firstPayingBillId;//最近的一条待支付账单ID

	public String getRoomName() {
		return roomName;
	}

	public void setRoomName(String roomName) {
		this.roomName = roomName == null ? null : roomName.trim();
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark == null ? null : remark.trim();
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status == null ? null : status.trim();
	}

	public Integer getHouseId() {
		return houseId;
	}

	public void setHouseId(Integer houseId) {
		this.houseId = houseId;
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

	public RentalHouse getHouse() {
		return house;
	}

	public void setHouse(RentalHouse house) {
		this.house = house;
	}

	@Override
	public String toString() {
		return "RentalRoom [id=" + getId() + ", roomName=" + roomName + ", remark=" + remark + ", status=" + status + ", houseId=" + houseId + ", modifiedTime=" + modifiedTime + ", createTime=" + createTime + ", house=" + house + "]";
	}

	public Integer getIsDelete() {
		return isDelete;
	}

	public void setIsDelete(Integer isDelete) {
		this.isDelete = isDelete;
	}

	public String getClienteleName() {
		return clienteleName;
	}

	public void setClienteleName(String clienteleName) {
		this.clienteleName = clienteleName;
	}

	public Date getContractStartDate() {
		return contractStartDate;
	}

	public void setContractStartDate(Date contractStartDate) {
		this.contractStartDate = contractStartDate;
	}

	public Date getContractEndDate() {
		return contractEndDate;
	}

	public void setContractEndDate(Date contractEndDate) {
		this.contractEndDate = contractEndDate;
	}

	public String getTips() {
		return tips;
	}

	public void setTips(String tips) {
		this.tips = tips;
	}

	public Integer getFirstPayingBillId() {
		return firstPayingBillId;
	}

	public void setFirstPayingBillId(Integer firstPayingBillId) {
		this.firstPayingBillId = firstPayingBillId;
	}

}