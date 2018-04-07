package com.ace.acemanager.service.finance;

import static org.junit.Assert.fail;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.ace.acemanager.pojo.FinanceBill;
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:applicationContext-mybatis.xml", 
		"classpath:spring-servlet.xml", 
		"classpath:mybatis-config.xml"})
public class FinanceServiceImplTest {

	@Test
	public void testListByCheckBill() {
		fail("Not yet implemented");
	}

	@Test
	public void testSelectByPrimaryKey() {
		System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
		@SuppressWarnings("resource")
		ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext-mybatis.xml");
		System.out.println("///////////////////////////////");
		FinanceBillService service = (FinanceBillService) context.getBean("financeBillService");
		System.out.println("\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\");
		FinanceBill bill = service.selectByPrimaryKey(1);
		System.out.println(bill.getCostList().size());
		
		System.out.println("********************************");
	}

	@Test
	public void testDeleteByPrimaryKey() {
		fail("Not yet implemented");
	}

	@Test
	public void testObject() {
		fail("Not yet implemented");
	}

	@Test
	public void testGetClass() {
		fail("Not yet implemented");
	}

	@Test
	public void testHashCode() {
		fail("Not yet implemented");
	}

	@Test
	public void testEquals() {
		fail("Not yet implemented");
	}

	@Test
	public void testClone() {
		fail("Not yet implemented");
	}

	@Test
	public void testToString() {
		fail("Not yet implemented");
	}

	@Test
	public void testNotify() {
		fail("Not yet implemented");
	}

	@Test
	public void testNotifyAll() {
		fail("Not yet implemented");
	}

	@Test
	public void testWaitLong() {
		fail("Not yet implemented");
	}

	@Test
	public void testWaitLongInt() {
		fail("Not yet implemented");
	}

	@Test
	public void testWait() {
		fail("Not yet implemented");
	}

	@Test
	public void testFinalize() {
		fail("Not yet implemented");
	}

}
