package com.ace.acemanager.service.function;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ace.acemanager.dao.function.FunctionMapper;
import com.ace.acemanager.pojo.Authority;
import com.ace.acemanager.pojo.Function;

@Service
public class FunctionServiceImpl implements FunctionService {
	
	@Resource
	private FunctionMapper functionMapper;
	@Override
	public List<Function> getMainFunctionList(Authority authority) throws Exception {
		return functionMapper.getMainFunctionList(authority);
	}

	@Override
	public List<Function> getSubFunctionList(Function function) throws Exception {
		return functionMapper.getSubFunctionList(function);
	}

	@Override
	public List<Function> getSubFuncList(Function function) throws Exception {
		return functionMapper.getSubFuncList(function);
	}

	@Override
	public Function selectByPrimaryKey(Integer id) throws Exception {
		return functionMapper.selectByPrimaryKey(id);
	}

}
