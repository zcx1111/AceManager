package com.ace.acemanager.pojo;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
/**
 * 房源实体类
 * @author Liuqi
 * 2017-7-11
 */
public class RentalHouse implements Serializable{
	private Integer id;//主键id

	private Integer communityId;//小区id

	private String building;//栋

	private String unit;//单元

	private String floor;//楼层

	private String no;//号

	private String inRenovation;//装修中

	private Date decorationStartTime;//装修开始时间

	private Date decorationEndTime;//装修结束时间

	private String rentalType;//出租类型(整租/合租)

	private Integer roomCount;//房间数量

	private String remark;//备注

	private String status;//状态（停用/可用）

	private Integer createUserId;//PK_创建者id

	private Integer managerUserId;//PK_管理者id

	private Date modifiedTime;//修改时间

	private Date createTime;//创建时间

	private Integer isDelete;//是否删除(0:未删除/1:已删除)

	private List<RentalRoom> rooms;

	private RentalCommunity community;
	
	private List<User> users=new ArrayList<User>();//一个房源下有多少分配者
	
	
	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getCommunityId() {
		return communityId;
	}

	public void setCommunityId(Integer communityId) {
		this.communityId = communityId;
	}

	public String getBuilding() {
		return building;
	}

	public void setBuilding(String building) {
		this.building = building == null ? null : building.trim();
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit == null ? null : unit.trim();
	}

	public String getFloor() {
		return floor;
	}

	public void setFloor(String floor) {
		this.floor = floor == null ? null : floor.trim();
	}

	public String getNo() {
		return no;
	}

	public void setNo(String no) {
		this.no = no == null ? null : no.trim();
	}

	public String getInRenovation() {
		return inRenovation;
	}

	public void setInRenovation(String inRenovation) {
		this.inRenovation = inRenovation == null ? null : inRenovation.trim();
	}

	public Date getDecorationStartTime() {
		return decorationStartTime;
	}

	public void setDecorationStartTime(Date decorationStartTime) {
		this.decorationStartTime = decorationStartTime;
	}

	public Date getDecorationEndTime() {
		return decorationEndTime;
	}

	public void setDecorationEndTime(Date decorationEndTime) {
		this.decorationEndTime = decorationEndTime;
	}

	public String getRentalType() {
		return rentalType;
	}

	public void setRentalType(String rentalType) {
		this.rentalType = rentalType == null ? null : rentalType.trim();
	}

	public Integer getRoomCount() {
		return roomCount;
	}

	public void setRoomCount(Integer roomCount) {
		this.roomCount = roomCount;
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

	public Integer getCreateUserId() {
		return createUserId;
	}

	public void setCreateUserId(Integer createUserId) {
		this.createUserId = createUserId;
	}

	public Integer getManagerUserId() {
		return managerUserId;
	}

	public void setManagerUserId(Integer managerUserId) {
		this.managerUserId = managerUserId;
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

	public List<RentalRoom> getRooms() {
		return rooms;
	}

	public void setRooms(List<RentalRoom> rooms) {
		this.rooms = rooms;
	}

	

	public RentalCommunity getCommunity() {
		return community;
	}

	public void setCommunity(RentalCommunity community) {
		this.community = community;
	}

	public Integer getIsDelete() {
		return isDelete;
	}

	public void setIsDelete(Integer isDelete) {
		this.isDelete = isDelete;
	}

	@Override
	public String toString() {
		return "RentalHouse [id=" + id + ", communityId=" + communityId + ", building=" + building + ", unit=" + unit
				+ ", floor=" + floor + ", no=" + no + ", inRenovation=" + inRenovation + ", decorationStartTime="
				+ decorationStartTime + ", decorationEndTime=" + decorationEndTime + ", rentalType=" + rentalType
				+ ", roomCount=" + roomCount + ", remark=" + remark + ", status=" + status + ", createUserId="
				+ createUserId + ", managerUserId=" + managerUserId + ", modifiedTime=" + modifiedTime + ", createTime="
				+ createTime + ", isDelete=" + isDelete + ", rooms=" + rooms + ", community=" + community + ", users="
				+ users + "]";
	}
	

}