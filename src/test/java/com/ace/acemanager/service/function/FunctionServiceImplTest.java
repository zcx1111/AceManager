package com.ace.acemanager.service.function;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.ace.acemanager.pojo.Function;
import com.alibaba.fastjson.JSON;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:applicationContext-mybatis.xml", "classpath:spring-servlet.xml",
		"classpath:mybatis-config.xml" })
public class FunctionServiceImplTest {
	private Logger logger = Logger.getLogger(FunctionServiceImplTest.class);

	@Resource
	private FunctionService functionService;

	@Test
	public void test() {
		String result = "";
		List<Function> fList = new ArrayList<Function>();
		for (int i = 2; i <= 6; i++) {
			Function func = this.recursiveTree(i);
			fList.add(func);
		}
		result = JSON.toJSONString(fList);

		logger.debug("第一次获取result=======" + result);
	}

	public Function recursiveTree(Integer id) {
		Function func = null;
		// 根据id获取节点对象
		try {
			func = functionService.selectByPrimaryKey(id);
			
				List<Function> childFuncs = functionService.getSubFuncList(func);
				for (Function f : childFuncs) {
					logger.debug("打印功能================" + f.toString());
					Function childf = recursiveTree(f.getId());
					logger.debug("打印子功能================" + childf.toString());
					func.getSubFuncs().add(childf);
				}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return func;
	}

}
