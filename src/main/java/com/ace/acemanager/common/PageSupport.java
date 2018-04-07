package com.ace.acemanager.common;
/**
 * 分页工具类
 * @author bdqn_hl
 * @since 2014-2-27
 * @param <E>
 * 
 */
import java.util.ArrayList;
import java.util.List;

/**
 * PageSupport
 * @author bdqn_hl
 * @date 2014-2-24
 */
@SuppressWarnings("rawtypes")
public class PageSupport {

	private Integer totalCount = 0;//总记录数
	private Integer totalPageCount = 1;//总页数
	private Integer pageSize = Constants.PAGESUPPORT_PAGESIZE;//每页显示记录数
	private Integer currPageNo = 1;//当前页
	private Integer num = 2;//当前页之前和之后显示的页数个数 如：假设当前页是 6 共有11页 那么 显示分页条会显示 1 2 3 4 5 [6] 7 8 9 10 11

	private List items = new ArrayList();//当前页记录内容集合
	private List count = new ArrayList(); //业务单查询统计

	/**
	 * 计算总页数
	 * @param totalCount
	 */
	public void setTotalCount(Integer totalCount) {
		if (totalCount > 0) {
			this.totalCount = totalCount;
			this.totalPageCount = (totalCount + pageSize - 1) / pageSize;
		}
	}

	/**
	 * 获取前一页
	 * @return
	 */
	public Integer getPrev() {
		return currPageNo - 1;
	}

	/**
	 * 获取后一页
	 * @return
	 */
	public Integer getNext() {
		return currPageNo + 1;
	}

	/**
	 * 获取最后一页
	 * @return
	 */
	public Integer getLast() {
		return totalPageCount;
	}

	/**
	 * 判断是否有前一页
	 * @return
	 */
	public boolean getIsPrev() {
		if (currPageNo > 1) {
			return true;
		}
		return false;
	}

	/**
	 * 判断是否有后一页
	 * @return
	 */
	public boolean getIsNext() {
		if (totalPageCount != null && currPageNo < totalPageCount) {
			return true;
		}
		return false;
	}

	/**
	 * 当前页的前num条页 假设当前页是 6 共有11页 如：1 2 3 4 5
	 * @return
	 */
	public List<Integer> getPrevPages() {
		List<Integer> list = new ArrayList<Integer>();
		Integer _frontStart = 1;

		if (currPageNo > num) {
			_frontStart = currPageNo - num;
		}

		for (Integer i = _frontStart; i < currPageNo; i++) {
			list.add(i);
		}

		return list;
	}

	/**
	 * 当前页的后num条页 假设当前页是 6 共有11页 如：7 8 9 10 11
	 * @return
	 */
	public List<Integer> getNextPages() {
		List<Integer> list = new ArrayList<Integer>();
		Integer _endCount = num;

		if (totalPageCount != null) {
			if (num < totalPageCount && (currPageNo + num) < totalPageCount) {
				_endCount = currPageNo + _endCount;
			} else {
				_endCount = totalPageCount;
			}

			for (Integer i = currPageNo + 1; i <= _endCount; i++) {
				list.add(i);
			}
		}

		return list;
	}

	/**
	 * 获取每页显示记录数
	 * @return
	 */
	public Integer getPageSize() {
		return pageSize;
	}

	/**
	 * 设置每页显示记录数
	 * @param pageSize
	 */
	public void setPageSize(Integer pageSize) {
		if (pageSize > 0) {
			this.pageSize = pageSize;
		}
	}

	/**
	 * 得到当前页数
	 * @return
	 */
	public Integer getCurrPageNo() {
		return currPageNo;
	}

	/**
	 * 设置当前页数
	 * @param page
	 */
	public void setCurrPageNo(Integer currPageNo) {
		if (currPageNo > 0) {
			this.currPageNo = currPageNo;
		}
		if (currPageNo > this.totalPageCount) {
			this.currPageNo = this.totalPageCount;
		}
	}

	/**
	 * 获取当前页之前或之后显示的页数个数
	 * @return
	 */
	public Integer getNum() {
		return num;
	}

	/**
	 * 设置当前页之前或之后显示的页数个数
	 * @param num
	 */
	public void setNum(Integer num) {
		if (num > 0) {
			this.num = num;
		}
	}

	/**
	 * 获取当前页记录内容集合
	 * @return
	 */
	public List getItems() {
		return items;
	}

	/**
	 * 设置当前页记录内容集合
	 * @param items
	 */
	public void setItems(List items) {
		this.items = items;
	}

	/**
	 * 获取总记录数
	 * @return
	 */
	public Integer getTotalCount() {
		return totalCount;
	}

	/**
	 * 得到总页数
	 * @return
	 */
	public Integer getTotalPageCount() {
		return totalPageCount;
	}

	public List getCount() {
		return count;
	}

	public void setCount(List count) {
		this.count = count;
	}

}
