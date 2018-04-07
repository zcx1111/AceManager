package com.ace.acemanager.util;

import com.ace.acemanager.common.ConcurrentMessage;
import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.IAcsClient;
import com.aliyuncs.dysmsapi.model.v20170525.SendSmsRequest;
import com.aliyuncs.dysmsapi.model.v20170525.SendSmsResponse;
import com.aliyuncs.exceptions.ClientException;
import com.aliyuncs.profile.DefaultProfile;
import com.aliyuncs.profile.IClientProfile;
import org.apache.log4j.Logger;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

/**
 * Project <AceManager>
 * Created by zkq on 2017/7/21 21:48.
 */
public class MessageAPI {

    private static Logger logger = Logger.getLogger(MessageAPI.class);
    //产品名称:云通信短信API产品,开发者无需替换
    private static final String product = "Dysmsapi";
    //产品域名,开发者无需替换
    private static final String domain = "dysmsapi.aliyuncs.com";
    // 通用常量
    private static final String accessKeyId = "LTAIsdhjQ5BUf68c";
    private static final String accessKeySecret = "PYyOU62BqzR35wSdESTUv1m8qzjYaY";
    private static final String SIGN_NAME = "Ace公寓管家";
    private static final String CODE_PRESS_RENT_MONEY = "SMS_78760106";
    private static final String CODE_REGISTER = "SMS_78585116";
    private static final int DEFAULT_VERIFICATION_CODE_SIZE = 6;

    //初始化acsClient,暂不支持region化
    private static IAcsClient getAcsClient() {
        IAcsClient acsClient;
        IClientProfile profile = DefaultProfile.getProfile("cn-hangzhou", accessKeyId, accessKeySecret);
        try {
            DefaultProfile.addEndpoint("cn-hangzhou", "cn-hangzhou", product, domain);
        } catch (ClientException e) {
            e.printStackTrace();
        }
        acsClient = new DefaultAcsClient(profile);
        return acsClient;
    }

    //发送短信
    private static SendSmsResponse sendSms(SendSmsRequest request) throws ClientException {
        //可自助调整超时时间
        System.setProperty("sun.net.client.defaultConnectTimeout", "10000");
        System.setProperty("sun.net.client.defaultReadTimeout", "10000");

        //获取acsClient
        IAcsClient acsClient = getAcsClient();
        //该方法抛出异常
        SendSmsResponse response = acsClient.getAcsResponse(request);
        logger.debug("短信接口返回的数据----------------");
        logger.debug("Code=" + response.getCode());
        logger.debug("Message=" + response.getMessage());
        logger.debug("RequestId=" + response.getRequestId());
        logger.debug("BizId=" + response.getBizId());
        return response;
    }

    //获取验证码
    private static String getRandomNumber(int size) {
        StringBuffer buffer = new StringBuffer();
        Random random = new Random();
        for (int i = 0; i < size; i++) {
            buffer.append(random.nextInt(10));
        }
        return buffer.toString();
    }

    /**
     * ****（短信api数量有限，仅限测试，请勿滥用）****
     * 发送验证码 返回生成的验证码，若发送失败则返回null
     *
     * @param phoneNumber 接收验证码的手机号
     * @return
     * @throws ClientException
     */
    public static String sendRegisterMessage(String phoneNumber) throws ClientException {
        //组装请求对象-具体描述见控制台-文档部分内容
        if (phoneNumber == null) {
            return null;
        }
        if (!ConcurrentMessage.canSendMessage(phoneNumber)) {        //同一个号码不允许频繁发送短信
            return null;
        }
        SendSmsRequest request = new SendSmsRequest();
        //必填:待发送手机号
        request.setPhoneNumbers(phoneNumber);
        //必填:短信签名 Ace公寓管家
        request.setSignName(SIGN_NAME);
        //必填:短信模板Code 注册模版
        request.setTemplateCode(CODE_REGISTER);
        //可选:模板中的变量替换JSON串
        String randomNumber = getRandomNumber(DEFAULT_VERIFICATION_CODE_SIZE);
        request.setTemplateParam("{\"number\":\"" + randomNumber + "\"}");
        SendSmsResponse response = sendSms(request);
        if (response.getCode() != null && response.getCode().equals("OK")) {
            return randomNumber;
        } else {
            ConcurrentMessage.deleteKey(phoneNumber);
            return null;
        }
    }


    /**
     * ****（短信api数量有限，仅限测试，请勿滥用）****
     * 发送催租短信
     *
     * @param phoneNumber 接收短信的电话号码
     * @param name        接收短信人姓名
     * @param money       催租金额
     * @param date        交租时间
     * @return 成功返回true 失败返回false
     * @throws ClientException
     */
    public static boolean sendPressRentMoneyMessage(String phoneNumber, String name, Float money, Date date) throws ClientException {
        if (phoneNumber == null || money == null || date == null || name == null) {
            return false;
        }
        if (!ConcurrentMessage.canSendMessage(phoneNumber)) {        //同一个号码不允许频繁发送短信
            return false;
        }
        String moneyStr = String.valueOf(money);
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        String dateStr = format.format(date);
        SendSmsRequest request = new SendSmsRequest();
        //必填:待发送手机号
        request.setPhoneNumbers(phoneNumber);
        //必填:短信签名 Ace公寓管家
        request.setSignName(SIGN_NAME);
        //必填:短信模板Code 催租模版
        request.setTemplateCode(CODE_PRESS_RENT_MONEY);
        //可选:模板中的变量替换JSON串
        request.setTemplateParam("{\"name\":\"" + name + "\", \"money\":\"" + moneyStr + "\",\"date\":\"" + dateStr + "\"}");
        SendSmsResponse response = sendSms(request);
        if (response.getCode() != null && response.getCode().equals("OK")) {
            return true;
        } else {
            ConcurrentMessage.deleteKey(phoneNumber);
            return false;
        }
    }
}
