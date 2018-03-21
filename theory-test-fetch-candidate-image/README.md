#Fetch candidate image

Copy and image from the DVLA mock storage to the DVSA candidate image storage

This is production ready lambda for the aplha version,  

This lambda receives a reference to the source image and a reference to where the image should be copy to 

It uses the following evironment variables
```$xslt
DVLA_IMAGES_ENDPOINT; //  composite bucket and folder of the sourse image
ADMISSION_BUCKET; // destination bucket 
DVLA_LICENCE_IMAGES_DIR; // destination folder

```