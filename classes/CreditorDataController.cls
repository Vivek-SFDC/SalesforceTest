/**
* @author Vivek Singh
* @date 30April-2021
*
* @description Used to make callouts and send the data back to Lightning Component
*/
public with sharing class CreditorDataController {
    public static final String END_POINT = 'https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json';
    public static final String REST_METHOD = 'GET';

    @AuraEnabled
    public static List<Object> getCreditorData(){
        try {
            Http http = new Http();
            HttpRequest request = new HttpRequest();
            request.setEndpoint(END_POINT);
            request.setMethod(REST_METHOD);
            HttpResponse response = http.send(request);
            System.debug(response.getBody());
            List<CreatorData> result = (List<CreatorData>) JSON.deserialize(response.getBody(),List<CreatorData>.class);
            return result;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    /**
    * @description Used as Mapper Class i.e Used to map the Json Response with the Class Variables.
    */
    public class CreatorData {
        @AuraEnabled public Integer id;
        @AuraEnabled public String creditorName;
        @AuraEnabled public String firstName;
        @AuraEnabled public String lastName;
        @AuraEnabled public Decimal minPaymentPercentage;
        @AuraEnabled public Decimal balance;
    }
}