package com.ace.acemanager.pojo;

import java.util.Date;

public class WorkOrderHistory {
    private Integer id;
    //业务单ID
    private Integer orderId;
    //修改业务单的用户id
    private Integer userId;
    //被更改的业务单属性
    private String orderProperty;
    //被修改之前的属性
    private String orderBefore;
    //修改之后的属性
    private String orderAfter;
    //修改时间
    private Date updateTime;
    //显示用户名
    private User historyUser;

    public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public String getOrderProperty() {
        return orderProperty;
    }

    public void setOrderProperty(String orderProperty) {
        this.orderProperty = orderProperty == null ? null : orderProperty.trim();
    }

    public String getOrderBefore() {
        return orderBefore;
    }

    public void setOrderBefore(String orderBefore) {
        this.orderBefore = orderBefore == null ? null : orderBefore.trim();
    }

    public String getOrderAfter() {
        return orderAfter;
    }

    public void setOrderAfter(String orderAfter) {
        this.orderAfter = orderAfter == null ? null : orderAfter.trim();
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

	public User getHistoryUser() {
		return historyUser;
	}

	public void setHistoryUser(User historyUser) {
		this.historyUser = historyUser;
	}
    
}