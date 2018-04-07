package com.ace.acemanager.common;

import java.util.Date;
import java.util.concurrent.ConcurrentHashMap;

public class ConcurrentUpdate {
	private static final ConcurrentHashMap<String, Long> U_LOCK = new ConcurrentHashMap<>();

	/**
	 * 修改前调用此方法 设置锁定 如为true 可做修改 false 表示此时有人修改
	 * 
	 * @param id
	 * @return
	 */
	public static boolean isUpdate(String id) {
		Long time = new Date().getTime();
		Long result = U_LOCK.putIfAbsent(id, time);
		if (result == null) {
			return true;
		} else {
			if ((time - result) / (1000 * 60) >= 30) { //30分钟后的请求会刷新id,time
				U_LOCK.put(id, time);
				return true;
			}
		}
		return false;
	}

	/**
	 * 修改完成调用此方法 删除锁定记录
	 * 
	 * @param key
	 */
	public static void deleteKey(String key) {
		U_LOCK.remove(key);
	}
}
