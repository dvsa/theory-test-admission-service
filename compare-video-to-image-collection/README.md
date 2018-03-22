#Compare video to image collection

This is a mock interface (mudule) to help the development of the complete-admission step function, return : `{ "found_maches": true / false  }`

This will need to change for the next version of the complete candidate admission step function  as the API call is divided in **start face search** then check that the SNS associated got a success response then use **get face search** 

This module will be use by **detect impersonator** and **recognise candidate** paths.
