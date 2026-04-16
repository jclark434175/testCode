trigger SoqlTriggerBulk on Account(after update) {
    // Bulkified: single SOQL query outside the loop, grouped by AccountId
    Map<Id, List<Opportunity>> oppsByAccount = new Map<Id, List<Opportunity>>();
    for (Opportunity o : [SELECT Id, Name, CloseDate, AccountId
                          FROM Opportunity
                          WHERE AccountId IN :Trigger.newMap.keySet()]) {
        List<Opportunity> opps = oppsByAccount.get(o.AccountId);
        if (opps == null) {
            opps = new List<Opportunity>();
            oppsByAccount.put(o.AccountId, opps);
        }
        opps.add(o);
    }

    List<Account> accountsToUpdate = new List<Account>();
    for (Account a : Trigger.New) {
        List<Opportunity> opps = oppsByAccount.get(a.Id);
        // Do some other processing using opps
        accountsToUpdate.add(a);
    }
    // Single DML outside the loop
    update accountsToUpdate;
}

public with sharing class utilityClass {
    /*
    Safe version: collect Contacts inside the loop and insert them
    once after the loop, avoiding a DML statement per iteration.
    */
    public void processContacts(List<Account> accounts) {
        List<Contact> contactsToInsert = new List<Contact>();
        for (Account a : accounts) {
            contactsToInsert.add(new Contact(
                firstName = 'default',
                lastName = 'contact',
                accountId = a.Id
            ));
        }
        insert contactsToInsert;
    }
}
