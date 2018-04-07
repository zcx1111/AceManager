package com.ace.acemanager.pojo;

import java.util.List;


public class Menu{

	private Function mainMenu;
	
	/**
	 * 子菜单
	 */
	private List<Function> subMenus;
	
	/**
	 * 孙菜单
	 */
	private List<Function> minMenus;
	
	public List<Function> getSubMenus() {
		return subMenus;
	}

	public void setSubMenus(List<Function> subMenus) {
		this.subMenus = subMenus;
	}

	public Function getMainMenu() {
		return mainMenu;
	}

	public void setMainMenu(Function mainMenu) {
		this.mainMenu = mainMenu;
	}

	public List<Function> getMinMenus() {
		return minMenus;
	}

	public void setMinMenus(List<Function> minMenus) {
		this.minMenus = minMenus;
	}
	
}

