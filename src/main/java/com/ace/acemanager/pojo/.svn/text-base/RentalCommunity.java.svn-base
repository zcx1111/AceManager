package com.ace.acemanager.pojo;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
/**
 * 小区实体类
 * @author Liuqi
 * 2017-7-11
 */
public class RentalCommunity extends Base{

	private Integer id;//主键id

	private String province;//省

	private String city;//市

	private String area;//区

	private String communityName;//小区名称

	private String communityAddress;//小区地址

	private Date modifiedTime;//修改时间

	private Date createTime;//创建时间
	
	private Integer userId;//能看到这个小区的用户Id
	
	private List<RentalHouse> rentalHouses = new ArrayList<RentalHouse>();

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province == null ? null : province.trim();
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city == null ? null : city.trim();
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area == null ? null : area.trim();
	}

	public String getCommunityName() {
		return communityName;
	}

	public void setCommunityName(String communityName) {
		this.communityName = communityName == null ? null : communityName.trim();
	}

	public String getCommunityAddress() {
		return communityAddress;
	}

	public void setCommunityAddress(String communityAddress) {
		this.communityAddress = communityAddress == null ? null : communityAddress.trim();
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
		return "RentalCommunity [id=" + id + ", province=" + province + ", city=" + city + ", area=" + area + ", communityName=" + communityName + ", communityAddress=" + communityAddress + ", modifiedTime=" + modifiedTime + ", createTime=" + createTime + "]";
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public List<RentalHouse> getRentalHouses() {
		return rentalHouses;
	}

	public void setRentalHouses(List<RentalHouse> rentalHouses) {
		this.rentalHouses = rentalHouses;
	}

}