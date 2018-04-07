package com.ace.acemanager.pojo;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 *@author Muqiye
 *@version 2.0
 *@since 2017.7.16
 */

public class Function {
	/*
	 * 主键id
	 */
    private Integer id;
    
    /*
     * 功能编码
     */
    private String functionCode;
    
    /*
     * 功能名称
     */
    private String functionName;
    
    /*
     * 功能url
     */
    private String functionUrl;
    
    /*
     * 父级功能id 
     * 0为无父级  n为相对应父级功能id 999为所有账号共有功能
     */
    private Integer parentId;
    
    /*
     * 是否在添加角色权限选择页面中显示
     *  0不显示 1显示
     */
    private Integer display;
    
    /*
     * 修改时间
     */
    private Date modifiedTime;
    
    /*
     * 创建时间
     */
    private Date createTime;
    
    /**
     * 加roleId方便查找
     */
    private Integer roleId;
    
    /**
     * 该功能下的子功能
     */
    private List<Function> subFuncs=new ArrayList<Function>();
    
    
    
    public List<Function> getSubFuncs() {
		return subFuncs;
	}

	public void setSubFuncs(List<Function> subFuncs) {
		this.subFuncs = subFuncs;
	}

	public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFunctionCode() {
        return functionCode;
    }

    public void setFunctionCode(String functionCode) {
        this.functionCode = functionCode == null ? null : functionCode.trim();
    }

    public String getFunctionName() {
        return functionName;
    }

    public void setFunctionName(String functionName) {
        this.functionName = functionName == null ? null : functionName.trim();
    }

    public String getFunctionUrl() {
        return functionUrl;
    }

    public void setFunctionUrl(String functionUrl) {
        this.functionUrl = functionUrl == null ? null : functionUrl.trim();
    }

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    public Integer getDisplay() {
        return display;
    }

    public void setDisplay(Integer display) {
        this.display = display;
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

	public Integer getRoleId() {
		return roleId;
	}

	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}

	@Override
	public String toString() {
		return "Function [id=" + id + ", functionCode=" + functionCode + ", functionName=" + functionName
				+ ", functionUrl=" + functionUrl + ", parentId=" + parentId + ", display=" + display + ", modifiedTime="
				+ modifiedTime + ", createTime=" + createTime + ", roleId=" + roleId + ", subFuncs=" + subFuncs + "]";
	}
    
}