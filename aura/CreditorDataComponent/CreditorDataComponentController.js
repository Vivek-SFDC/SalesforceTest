({
    doInit : function(component, event, helper) {
        helper.fetchRequiredData(component, event);
    },
    selectAllCheckbox : function(component, event, helper) {
        var allRecords = component.get("v.creatorDataList");
        var selectedHeaderCheck = event.getSource().get('v.checked');
        for (let index = 0; index < allRecords.length; index++) {
            if(selectedHeaderCheck) {
                allRecords[index].isChecked = true;
            } else {
                allRecords[index].isChecked = false;
            }
        }
        component.set("v.creatorDataList", allRecords);
        if(selectedHeaderCheck) {
            component.set("v.selectedRecordCount", allRecords.length);
            let totalBalance = 0;
            allRecords.forEach(element => {
                totalBalance += parseInt(element.balance);
            });
            component.set("v.totalDebt", totalBalance);
        } else {
            component.set("v.selectedRecordCount", 0);
            component.set("v.totalDebt", 0);
        }
    },
    selectSingleCheckbox : function(component, event, helper) {
        var selectedHeaderCheck = event.getSource().get('v.checked');
        var selectedCount = component.get("v.selectedRecordCount");
        var balanceMap = component.get("v.debtMap");
        var totalBalance = component.get("v.totalDebt");
        var id = event.getSource().get('v.name');
        var balanceForSelectedRow = balanceMap[id];
        if(selectedHeaderCheck) {
            selectedCount++;
            totalBalance += balanceForSelectedRow;
        } else {
            selectedCount--;
            totalBalance -= balanceForSelectedRow;
        }
        component.set("v.selectedRecordCount", selectedCount);
        component.set("v.totalDebt", totalBalance);
    },
    handleAddDebt : function(component, event, helper) {
        component.set("v.isOpen", true);
    },
    handleRemoveDebt : function(component, event, helper) {
        var allRecords = component.get("v.creatorDataList");
        var elementRemoved = allRecords.pop();
        var totalRecords = component.get("v.totalRecordsCount");
        totalRecords--;
        var balanceMap = component.get("v.debtMap");
        delete balanceMap[elementRemoved.id];
        component.set("v.totalRecordsCount", totalRecords)
        component.set("v.creatorDataList", allRecords);
        component.set("v.debtMap", balanceMap);
    },
    closeModel : function(component, event, helper) {
        component.set("v.isOpen", false);
    },
    saveClose : function(component, event, helper) {
        var maxId = component.get("v.maxId");
        var allRecords = component.get("v.creatorDataList");
        var newDebt = component.get("v.newDebtObj");
        var balanceMap = component.get("v.debtMap");
        var totalRecords = component.get("v.totalRecordsCount");
        totalRecords++;
        newDebt.id = maxId++;
        allRecords.push(newDebt);
        balanceMap[newDebt.id] = parseInt(newDebt.balance);
        component.set("v.maxId", maxId);
        component.set("v.newDebtObj", {
            "creditorName" : '',
            "firstName" : '',
            "lastName" : '',
            "balance" : 0
        });
        component.set("v.isOpen", false);
        component.set("v.totalRecordsCount", totalRecords)
        component.set("v.creatorDataList", allRecords);
        component.set("v.debtMap", balanceMap);
    }
})