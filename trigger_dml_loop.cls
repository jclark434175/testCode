Apex Trigger:
trigger sampleTrigger on Account (before update) {
            
    for(Account a: Trigger.new){
    	processContact(a);
    }

}

Apex Class:
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
