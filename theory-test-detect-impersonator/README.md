#Detect impersonator

This is a mock lambda to test the current version of the complete candidate step function , return 
` { suspect_detected: true / false } `

This will need to change for the next version of the complete candidate admission step function  as the API call is divided in **start face search** then check that the SNS associated got a success response then use **get face search** 
