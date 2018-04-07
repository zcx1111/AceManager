package com.ace.acemanager.controller;

import com.ace.acemanager.common.Constants;
import com.ace.acemanager.common.RedisAPI;
import com.ace.acemanager.pojo.Authority;
import com.ace.acemanager.pojo.Function;
import com.ace.acemanager.pojo.Menu;
import com.ace.acemanager.pojo.User;
import com.ace.acemanager.service.function.FunctionService;
import com.ace.acemanager.service.user.UserService;
import com.ace.acemanager.util.MessageAPI;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * 用于登陆与注销、以及首页部分功能
 *
 * @author Liuqi
 * 2017-7-11
 */
@Controller
public class LoginController extends BaseController {
    private Logger logger = Logger.getLogger(LoginController.class);

    @Resource
    private UserService userService;
    @Resource
    private FunctionService functionService;
    @Resource
    private RedisAPI redisAPI;

    /**
     * 首页跳转
     *
     * @return
     */
    @RequestMapping(value = "/")
    public String welcome() {
        return "redirect:/login.html";
    }

    @RequestMapping("/login.html")
    public String login() {
        return "login";
    }

    /**
     * 用户登陆
     *
     * @param session
     * @param user
     * @return
     */
    @RequestMapping("/validateLogin.html")
    @ResponseBody
    public Object login(HttpSession session, @RequestParam String user) {
        if (null == user || "".equals(user)) {
            //没接收到Ajax异步提交的数据
            return "noData";
        } else {
            User userObj = JSONObject.parseObject(user, User.class);
            //得到当前执行的用户
            Subject subject = SecurityUtils.getSubject();
            //创建TOken令牌，用户名/密码
            UsernamePasswordToken token = new UsernamePasswordToken(userObj.getUsername(), userObj.getPassword());
            try {
                //身份认证
                subject.login(token);
                User loginUser = userService.getLoginUser(userObj);
                //登陆成功，登录用户存至session
                session.setAttribute(Constants.SESSION_USER, loginUser);
                //记录登陆时间
                User forUpdateLoginTimeUser = new User();
                forUpdateLoginTimeUser.setId(loginUser.getId());
                forUpdateLoginTimeUser.setLastLoginTime(new Date());
                userService.updateByPrimaryKeySelective(forUpdateLoginTimeUser);
                return "loginSuccess";
            } catch (UnknownAccountException e) {
                return "noLoginUsername";
            } catch (IncorrectCredentialsException e) {
                return "pwdError";
            } catch (Exception e) {
                return "failed";
            }
        }
    }

    /**
     * 首页
     *
     * @return
     */
    @RequestMapping("/index.html")
    public ModelAndView index(HttpSession session, Model model) {
        //获取当前Session登陆用户
        User loginUser = this.getCurrentUser();
        List<Menu> mList = null;
        if (null != loginUser) {
            Map<String, Object> baseModel = new HashMap<String, Object>();
            String key = "menuList" + loginUser.getRoleId();
            baseModel.put("loginUser", loginUser);
            //TODO 左侧菜单栏、权限、 Redis缓存等一系列处理...
            /**
             * key :menuList +roleId
             * value:mList
             */
            //redis里有没有数据
            if (!redisAPI.exist(key)) {
                //根据当前用户获取菜单列表mList
                mList = getFuncionByCurrentUser(loginUser.getRoleId());
                //json
                if (mList != null) {
                    String jsonString = JSON.toJSONString(mList);
                    logger.debug("列表json========》" + jsonString);
                    baseModel.put("mList", jsonString);
                    redisAPI.set(key, jsonString);
                }
            } else {//redis里有数据，直接从redis中取
                String redisMenuListKeyString = redisAPI.get(key);
                logger.debug("menuList from redis:" + redisMenuListKeyString);
                ;
                if (null != redisMenuListKeyString && !"".equals(redisMenuListKeyString)) {
                    baseModel.put("mList", redisMenuListKeyString);
                } else {
                    return new ModelAndView("redirect:/");
                }
            }
            session.setAttribute(Constants.SESSION_BASE_MODEL, baseModel);
            return new ModelAndView("redirect:/main.html");
        }
        return new ModelAndView("redirect:/");
    }

    /**
     * 根据当前用户角色id获取功能列表(对应的菜单)
     *
     * @param roleId
     * @return
     */
    private List<Menu> getFuncionByCurrentUser(Integer roleId) {
        List<Menu> menuList = new ArrayList<Menu>();
        Authority authority = new Authority();
        authority.setRoleId(roleId);
        try {
            List<Function> mList = functionService.getMainFunctionList(authority);
            //主菜单不等于空
            if (mList != null) {
                for (Function function : mList) {
                    Menu menu = new Menu();
                    menu.setMainMenu(function);
                    function.setRoleId(roleId);
                    //子菜单列表
                    List<Function> subList = functionService.getSubFunctionList(function);
                    if (null != subList) {
                        menu.setSubMenus(subList);
                    }
                    menuList.add(menu);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return menuList;
    }

    /**
     * 注销
     *
     * @return
     */
    @RequestMapping("/logout.html")
    public String logout(HttpSession session, HttpServletRequest request) {
        session.removeAttribute(Constants.SESSION_USER);
        //FIXME 修复重复 失效 session 的问题，怀疑shiro框架已经做了处理。
        if (request.getSession(false) == null) {
            session.invalidate();
        }
        return "redirect:/";
    }

    @RequestMapping("/unauthor.html")
    public String unauthor() {
        return "unauthor";
    }

    @RequestMapping(value = "/getWallpaper.html", produces = "text/html;charset=UTF-8")
    public @ResponseBody
    String getWallpaperUrl(Integer index) {
        if (index == null || index < 0 || index > 7) { //没有参数或者超出范围（0-7）则随机一张壁纸
            index = ((int) (Math.random() * 8));
        }
        String nowDate = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
        if (redisAPI.exist(Constants.BING_WALLPAPER_DATE)) {
            String s = redisAPI.get(Constants.BING_WALLPAPER_DATE);
            //如果当前日期和redis中相等 且存在要需要的数据，则返回
            if (nowDate.equals(s) && redisAPI.exist(Constants.BING_WALLPAPER_JSON + index)) {
                return redisAPI.get(Constants.BING_WALLPAPER_JSON + index);
            }
        }
        String str;
        String result = null;
        try {
            for (int i = 0; i < 8; i++) {
                StringBuffer json = new StringBuffer();
                URL url = new URL(Constants.BING_IMG_URL + i);
                InputStream is = url.openStream();
                InputStreamReader isr = new InputStreamReader(is, "UTF-8");
                BufferedReader br = new BufferedReader(isr);
                while ((str = br.readLine()) != null)
                    json.append(str);
                br.close();
                logger.debug("获取bing壁纸json >>> " + json.toString());
                redisAPI.set(Constants.BING_WALLPAPER_JSON + i, json.toString());//将bing壁纸json保存到redis
                if (i == index) {
                    result = json.toString();
                }
            }
            redisAPI.set(Constants.BING_WALLPAPER_DATE, nowDate);//重新舍得壁纸日期
        } catch (IOException e) {
            redisAPI.set(Constants.BING_WALLPAPER_DATE, null);//异常则设置日期为null 下次重新获取
            e.printStackTrace();
        }
        return result;
    }

    @RequestMapping(value = "/register.html", produces = "text/html;charset=UTF-8")
    public @ResponseBody
    String register(String phoneNumber, String code, String password, String recommenderPhoneNumber, HttpSession session) {
        logger.debug("phoneNumber = " + phoneNumber);
        logger.debug("code = " + code);
        logger.debug("password = " + password);
        logger.debug("recommenderPhoneNumber = " + recommenderPhoneNumber);
        String sessionCode = (String) session.getAttribute(phoneNumber + "code");
        Long sessionTime = (Long) session.getAttribute(phoneNumber + "time");
        String exist = userIsExist(phoneNumber);
        if (exist != null) return exist;
        if (sessionCode == null || sessionCode.equals("")) {
            return "请先发送验证码！";
        }
        if(new Date().getTime() - sessionTime > 600000){    //超过10min 使验证码过期 移除验证码
            session.removeAttribute(phoneNumber+"code");
            session.removeAttribute(phoneNumber+"time");
            return "验证码过期，请重新获取";
        }
        if (sessionCode.equals(code)) {//FIXME 推荐人该如何设置？
            //验证码匹配 添加用户
            User newUser = new User();
            newUser.setUsername(phoneNumber);
            newUser.setPassword(password);

            newUser.setName(phoneNumber);//设置默认名字为手机号码
            newUser.setMobile(phoneNumber);
            newUser.setParentId(0);//主帐号
            newUser.setRoleId(1);//系统管理员
            newUser.setRoleName("系统管理员");
            newUser.setUserType(0);//创始人
            newUser.setUserTypeName("创始人");
            Date date = new Date();
            newUser.setCreateTime(date);
            newUser.setModifiedTime(date);
            newUser.setSuffix("");
            try {
                userService.insertSelective(newUser);
            } catch (Exception e) {
                e.printStackTrace();
                return "发生错误";
            }
            session.removeAttribute(phoneNumber+"code");//注册成功 移除验证码
            session.removeAttribute(phoneNumber+"time");
            return "success";
        } else {
            return "验证码错误";
        }

    }



    @RequestMapping(value = "/sendCodeMsg.html", produces = "text/html;charset=UTF-8")
    public @ResponseBody
    String sendCodeMsg(String phoneNumber, HttpSession session) {
        String code = null;
        String exist = userIsExist(phoneNumber);
        if (exist != null) return exist;
        try {
            code = MessageAPI.sendRegisterMessage(phoneNumber);
        } catch (Exception e) {
            e.printStackTrace();
            return "发送失败！";
        }
        if (code == null) {
            return "发送失败，请勿频繁发送！";
        } else {
            session.setAttribute(phoneNumber + "code", code);
            session.setAttribute(phoneNumber + "time", new Date().getTime());
            return "success";
        }

    }

    private String userIsExist(String phoneNumber) {
        User user = new User();
        user.setUsername(phoneNumber);
        try {
            if(userService.usernameIsExist(user)>0){
                return "帐号已经存在,请直接登录";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "发生错误，请重试！";
        }
        return null;
    }
    
    
}
