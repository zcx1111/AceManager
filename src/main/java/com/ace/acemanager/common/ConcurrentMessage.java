package com.ace.acemanager.common;

import java.util.Date;
import java.util.concurrent.ConcurrentHashMap;

public class ConcurrentMessage {
    private static final ConcurrentHashMap<String, Long> U_LOCK = new ConcurrentHashMap<>();

    /**
     * 发送短信前调用此方法 设置锁定 如为true 可做修改
     * 如为false 则3min内已经发送过一次
     *
     * @param phoneNumber 电话号码
     * @return true|false
     */
    public static boolean canSendMessage(String phoneNumber) {
        Long time = new Date().getTime();
        Long result = U_LOCK.putIfAbsent(phoneNumber, time);
        if (result == null) {
            return true;
        } else {
            if ((time - result) / 60000 >= 1) { // 超过一分钟才可重新发送短信
                U_LOCK.put(phoneNumber, time);
                return true;
            }
        }
        return false;
    }

    /**
     * 修改完成调用此方法 删除锁定记录
     *
     * @param phoneNumber
     */
    public static void deleteKey(String phoneNumber) {
        U_LOCK.remove(phoneNumber);
    }
}
