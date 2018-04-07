package com.ace.acemanager.service.rental;
import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.ace.acemanager.pojo.RentalHouse;
/**
 * @author Liuqi
 * 2017-7-11
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:applicationContext-mybatis.xml", "classpath:spring-servlet.xml"})
public class RentalBasicServiceImplTest {
	private Logger logger = Logger.getLogger(RentalBasicServiceImplTest.class);

	@Resource
	private RentalBasicService rentalBasicService;

	@Test
	public void testGetHouseDetailByHouseId() throws Exception {
		RentalHouse house = new RentalHouse();
		house.setId(1);
		RentalHouse result = rentalBasicService.getHouseDetailByHouseId(house);
		logger.debug("房源===>" + result);
		logger.debug("所属小区===>" + result.getCommunity());
	}

	@Test
	public void testAceAddHouse() throws Exception {
		RentalHouse house = new RentalHouse();
		house.setInRenovation("什么东西");
		rentalBasicService.aceAddHouse(house);
		logger.debug("添加成功");
		logger.debug("增加的房源ID===>" + house.getId());
	}

}
