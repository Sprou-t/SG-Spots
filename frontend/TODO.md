TODO:
LTR:

3. add functions to send button, file button,login/sign in button, logout button, search bar(finish by thurs latest)
  auth buttons (priority 3)
  - or sign up with (google & facebook) 
  - forgot password ***
(1hr)
  

  * review 
  - attach file button(show file  that are already attached )
  - also need to check if i need to change the model of the review becuase of the type of image(string?)

  -edit button for review, as well as date section for creation of review


4. deal with api call
    - dateline: try monday

5. improve upon product: ui and add blog feature compulsory (optional: zustand and write tests)
6. after mvp:
- do authentication with google and facebook(use firebase)
- rewrite review to store photo somewhere else
- find a way to make the main content of some pages to get the correct margin that can avoid the nav height
  (this is prob solved if i construct each individual pagae with the components)
- refactor code to use zustand
- add blog feature
- create tests
- navbar being transparent with white text is not ok for homepage wtf!

7. bugs
- deleting review does not trigger reset of rating
- empty string passed when uploading image

8. clarifications
- why doesnt handleDelete cause a rerender to review section
