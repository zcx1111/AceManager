package com.ace.acemanager.common;

import com.ace.acemanager.pojo.FinanceBill;
import com.ace.acemanager.pojo.FinanceCost;
import com.ace.acemanager.pojo.RentalContract;
import com.ace.acemanager.pojo.RentalMeterRead;

import java.util.ArrayList;

public class AcceptPojo {

    private ArrayList<FinanceBill> bill;

    private ArrayList<RentalMeterRead> read;

    private ArrayList<FinanceCost> cost;
    
    private ArrayList<FinanceCost> costList;//账单已有明细List

    private RentalContract contract;

    public RentalContract getContract() {
        return contract;
    }

    public void setContract(RentalContract contract) {
        this.contract = contract;
    }

    public ArrayList<RentalMeterRead> getRead() {
        return read;
    }

    public void setRead(ArrayList<RentalMeterRead> read) {
        this.read = read;
    }

    public ArrayList<FinanceCost> getCost() {
        return cost;
    }

    public void setCost(ArrayList<FinanceCost> cost) {
        this.cost = cost;
    }

    public ArrayList<FinanceCost> getCostList() {
		return costList;
	}

	public void setCostList(ArrayList<FinanceCost> costList) {
		this.costList = costList;
	}

	public ArrayList<FinanceBill> getBill() {
        return bill;
    }

    public void setBill(ArrayList<FinanceBill> bill) {
        this.bill = bill;
    }


}
