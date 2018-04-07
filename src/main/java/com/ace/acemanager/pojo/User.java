package com.ace.acemanager.pojo;

import java.io.Serializable;
import java.util.Date;

import com.alibaba.fastjson.annotation.JSONField;

/**
 *@author Muqiye
 *@version 2.0
 *@since 2017.7.16
 *
 */
public class User implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -7160923309256016910L;

	/**
	 * 用户主键id
	 */
    private Integer id;
    
    /**
     * 用户登录名
     */
    private String username;
    
    /**
     * 用户密码
     */
    private String password;
    
    /**
     * 用户昵称
     */
    private String name;
    
    /**
     * 用户手机
     */
    private String mobile;
    
    /**
     * 公司品牌
     */
    private String brand;
    
    /**
     * 公司名称 
     */
    private String company;
    
    /**
     * 公司所在省份
     */
    private String province;
    
    /**
     * 公司所在城市
     */
    private String city;
    
    /**
     * 主账号主键id
     * 0为主账号  n为相对应主账号
     */
    private Integer parentId;
    
    /**
     * 公司后缀名
     */
    private String suffix;
    
    /**
     * 推荐人
     */
    private Integer regRecommend;
    
    /**
     * 最后登录时间
     */
    @JSONField(format="yyyy-MM-dd")
    private Date lastLoginTime;
    
    /**
     * 角色id
     */
    private Integer roleId;
    
    /**
     * 角色编码
     */
    private String roleName;
    
    /**
     * 用户类型
     */
    private Integer userType;
    
    /**
     * 用户类型名称
     */
    private String userTypeName;
    
    /**
     * 备注
     */
    private String remark;
    
    /**
     * 修改时间
     */
    @JSONField(format="yyyy-MM-dd")
    private Date modifiedTime;
    
    /**
     * 创建时间
     */
    @JSONField(format="yyyy-MM-dd")
    private Date createTime;
    
    
    private int houseCount;
    
    public User() {
		super();
	}

	public User(Integer id) {
		super();
		this.id = id;
	}
	
	
	
	public User(String username) {
		super();
		this.username = username;
	}

	public User(String username, String password) {
		super();
		this.username = username;
		this.password = password;
	}
	
	
	public User(Integer id, String username, String password) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
	}

	public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username == null ? null : username.trim();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile == null ? null : mobile.trim();
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand == null ? null : brand.trim();
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company == null ? null : company.trim();
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

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    public String getSuffix() {
        return suffix;
    }

    public void setSuffix(String suffix) {
        this.suffix = suffix == null ? null : suffix.trim();
    }

    public Integer getRegRecommend() {
        return regRecommend;
    }

    public void setRegRecommend(Integer regRecommend) {
        this.regRecommend = regRecommend;
    }

    public Date getLastLoginTime() {
        return lastLoginTime;
    }

    public void setLastLoginTime(Date lastLoginTime) {
        this.lastLoginTime = lastLoginTime;
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName == null ? null : roleName.trim();
    }

  

    public Integer getUserType() {
		return userType;
	}

	public void setUserType(Integer userType) {
		this.userType = userType;
	}

	public String getUserTypeName() {
        return userTypeName;
    }

    public void setUserTypeName(String userTypeName) {
        this.userTypeName = userTypeName == null ? null : userTypeName.trim();
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
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
    
    
	public int getHouseCount() {
		return houseCount;
	}

	public void setHouseCount(int houseCount) {
		this.houseCount = houseCount;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", password=" + password + ", name=" + name + ", mobile="
				+ mobile + ", brand=" + brand + ", company=" + company + ", province=" + province + ", city=" + city
				+ ", parentId=" + parentId + ", suffix=" + suffix + ", regRecommend=" + regRecommend
				+ ", lastLoginTime=" + lastLoginTime + ", roleId=" + roleId + ", roleName=" + roleName + ", userType="
				+ userType + ", userTypeName=" + userTypeName + ", remark=" + remark + ", modifiedTime=" + modifiedTime
				+ ", createTime=" + createTime + ", houseCount=" + houseCount + "]";
	}

	
    
}