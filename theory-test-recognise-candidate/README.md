#Recognise candidate

This is a mock lambda to test the current version of the complete candidate step function , return 
`{ ResemblesLicence: true / false , LicenceImageThreshold: output.threshold } `

This will need to change for the next version of the complete candidate admission step function  as the API call is divided in **start face search** then check that the SNS associated got a success response then use **get face search** 
