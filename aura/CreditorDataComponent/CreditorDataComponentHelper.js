({
    fetchRequiredData : function(component,event){ 
        console.log('fetching data');
        var action = component.get("c.getCreditorData");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS"){
                var oRes = response.getReturnValue();
                component.set("v.creatorDataList", oRes);
                component.set("v.totalRecordsCount", oRes.length);
                var idToDebtMap = {};
                var max = 0;
                oRes.forEach(wrapperElement => {
                    idToDebtMap[wrapperElement.id] = wrapperElement.balance;
                    if(wrapperElement.id > max) {
                        max = wrapperElement.id;
                    }
                });
                component.set("v.debtMap", idToDebtMap);
                component.set("v.maxId", max);
                component.set("v.newDebtObj", {
                    "creditorName" : '',
                    "firstName" : '',
                    "lastName" : '',
                    "balance" : 0
                });
            }
            else{
                alert('Error...');
            }
        });
        $A.enqueueAction(action); 
    }
})