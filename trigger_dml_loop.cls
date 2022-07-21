trigger SoqlTriggerNotBulk on Account(after update) {   
    for(Account a : Trigger.New) {
        // Get child records for each account
        // Inefficient SOQL query as it runs once for each account!
        Opportunity[] opps = [SELECT Id,Name,CloseDate 
                             FROM Opportunity WHERE AccountId=:a.Id];
        
        // Do some other processing
	update a;
    }
}

public with sharing utilityClass{
   public void processContact(Account a){
   	
	/* 
	WARNING: This method performs an INSERT DML Statement each 
	time it is called so if it is called within a loop, it 
	inefficiently executes a  DML statement for each iteration 
	of the loop
	*/  
	Contact c= new Contact(firstname='default',lastname='contact',accountId=a.id);
	insert c;
   }
}

