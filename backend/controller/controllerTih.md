# An explanation of the various try-catch block

1. Outer try-catch (Top-Level Block)
   Purpose: Handles any errors in the entire process of fetching, saving, and uploading data. If any inner block did not catch the error, this block catches it

2. try-catch Inside map (Attraction-Level Block)
   Purpose: Handles errors related to individual attractions (e.g., saving to MongoDB, processing images).
   error handling: Logs the error and returns an object indicating failure for that specific attraction (e.g., { success: false, uuid, error }).

3. try-catch Inside imagePromises (Image-Level Block)
   Purpose: Handles errors related to fetching or uploading images for a single attraction.
   Error Handling: logs the error and returns the obj indicating failure for the specific image uuid

    - any returned object that indicates failure will lead to a status(400), else the status(500) will activate for any other failures
