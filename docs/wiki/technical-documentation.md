### Intro
Volunteering system is designed for non-profit seeking organizations who want to share their projects publicly. Volunteers can register, choose to save or select projects based on their description. This volunteering platform joins people who want to volunteer and people who provide such activities.

### Back-end

#### Structure
Project is structurised using MVC model   
Directory structure:   
```
├── /server
    └── /Base                   -  Base classes: service, repository, controller, models
    └── /Configurations         -  Configurations for automapper, database context etc.
    └── /Controllers
    └── /Entities               -  Other objects
    └── /Enums                  -  Enumerated objects
    └── /Helpers                -  Helper methods, handlers
    └── /Middleware             -  Middleware between methods
    └── /Migrations             -  Migrations from models and db context for postgresql database
    └── /Models                 -  Objects and their relationships
    └── /Repositories           -  Repository layer to comunicate with database
    └── /Services               -  Services for core functionality and algorithms
    └── /Utilities              -  Utilities, crypto helpers, converters etc.
```


#### Technologies used
- PostgreSQL
- Entity Framework
- Swagger
- AutoMapper
- .NET Core

#### Tests
Testing using xUnit tests   
Server can be tested using command: `dotnet test`

#### APIs
- Organizations
- Pictures
- Projects
- Reviews
- Users
- Volunteers

#### Building
To build project type `dotnet build`
For other building and publishing instructions please see [Build & Deploy](https://github.com/youstinus/volunteer/wiki/Build-&-Deploy) page   
For Travis-CI please see [Travis-CI pipeline](https://github.com/youstinus/volunteer/wiki/Travis-CI-pipeline) page   

### Front-end
This site was built using [Ionic 4 Blank App template](https://ionicframework.com/getting-started#cli)

**[Project Structure:](https://ionicframework.com/docs/v3/intro/tutorial/project-structure/?fbclid=IwAR13HMftNMWEp8m4Uqa9IJ-kNlDLygdNRZcQ0HJ4oxrUEgJXMUG9k393USw)**
- ```src/index.html``` is the main entry point for the app, though its purpose is to set up scripts, CSS includes, and bootstrap, or start running our app.
- ```./src/```Inside of the src directory, we find our code. This is where most of the work for an app takes place. 
- ```src/app/app.module.ts```  is the main bootstrap module for our app where all other dependencies described.
- ```./src/app/pages``` All pages are in this directory.

Our goal was a standardised [Ionic 4 project](https://github.com/Robinyo/ionic-angular-schematics?fbclid=IwAR0SunIBdGeiGW421Y5hQk_fw-vLRZJqDlpxCV2A5Gq3Bgl53HgeqM_mozQ), 
[Overall structural guidelines](https://angular.io/guide/styleguide#overall-structural-guidelines) and 
[Folders-by-feature structure](https://angular.io/guide/styleguide#folders-by-feature-structure)

Structure using Angular style guidelines: 
```
├── ionic-ui
        └── /src
            └── /app                                  -  Application
                ├── app.component.ts
                ├── app.html
                ├── app.module.ts
                ├── app.scss
                ├── main.ts
                └── /constants                        - Language objects and other constants
                    ├── /En.ts        
                    ├── /Lt.ts
                    ├── /Objects.ts 
                    ├── /Strings.ts  
                └── /enums                            - Enumerators used in project
                    ├── /GradeType.ts        
                    ├── /UserType.ts 
                └── /guards                           - Route authentication guards 
                └── /models                           - Models/Objects
                    └── /Lang.ts        
                    └── /Organization.ts
                    └── /Picture.ts 
                    └── /Project.ts      
                    └── /Review.ts
                    └── /User.ts 
                    └── /Volunteer.ts                         
                └── /pages                            - Page (Component) Modules
                    └── /home                         - Example page component and content
                        ├── home.page.html
                        ├── home.page.module.ts 
                        ├── home.page.scss   
                        ├── home.page.spec.ts
                        ├── home.page.ts         
                    └── /about
                        ├── ...                       - Page content
                    └── ...                           - All other pages
                    └── /volunteers-settings
                        ├── ...
                └── /services                         - Services for communication with back-end
                └── /shared                           - Shared objects that need to be exported and reused
                └── /templates                        - HTML email templates
                └── /utilities                        - Helper classes for cryptography and other utils
            └── /assets
                    └── /icon
                    ├── /background.jpg
                    ├── /background2.jpg
            └── /environments                         - Environment specific configuration, back-end urls
                ├── environment.dev.ts
                ├── environment.ts                        
            └── /theme
                ├── variables.scss
            ├── ...                                   - Default ionic 4 files
            ├── index.html
        └── /e2e                                      - E2E Test Configuration
            ├── tsconfig.e2e.json
        └── /resources                                - Pictures used in project for android and ios devices
        └── /www                                      - Ionic's built static website directory
            └── /assets
            └── /svg
            ├── index.html
        ├── .dockerignore
        ├── .firebaserc
        ├── .gitignore
        ├── angular.json
        ├── config.xml
        ├── Dockerfile
        ├── firebase.json
        ├── ionic.config.json
        ├── key.keystore
        ├── package-lock.json
        ├── package.json
        ├── procfile
        ├── README-ionic.md
        ├── README.md
        ├── tsconfig.json    
        ├── tslint.json             
```

#### Technologies used
- Ionic Framework 4 with Angular 7
- Typescript, HTML, scss, css
- Cordova
Some other dependencies:   
rxjs, ngx-cookie-service, karma, jasmine, jwt-decode, crypto-js, cors   


#### Pages

##### About page
"About us" page contains minimal functionality. 
- It uses ``` { FormGroup, FormBuilder, Validator } ``` libraries in order to compute with user formed data for sending an email:
  - User must enter a valid email and some type of message, which then will be checked by formBuilder validators.
  - If data has passed the requirements **leaveComment()** method calls **sendEmail()** method. This method then with the information filled by the user sends an email to our volunteering.platypus@gmail.com. This function uses ```HttpClient, HttpHeaders``` libraries. It calls post function to send an email to us.
- It uses ``` { StreamingMedia, StreamingVideoOptions } ``` form '@ionic-native/streaming-media/ngx' to start presentation video, which is called form **startVideo()** method. This method uses a new instance of streamingVideoOptions and calls the **playVideo()** method. It then loads video from [site](https://drive.google.com/uc?authuser=0&id=1m1CcQUV15qzUJpdmG48rgsTMb-UKUjmN&export=download)
- It also uses ``` { NavController, MenuController, ToastController, AlertController, LoadingController } ``` libraries. They used for navigation in pages, on open specific sources in different browser tabs and also about visual information for the user if his actions are done correctly. 


##### Calendar page
"Calendar" page is used for showing project start dates. It is seen and available for every user. This page uses ```{ CalendarComponent } from 'ionic2-calendar/calendar';``` for creating main component from ```CalendarComponent```.
- Calendar component has features of swiping to previous and next month. with **back()** and **next()** methods. On active days users can see projects.
- Each shown project comes up with additional information when clicked. By using **onEventSelected()** method a user can be navigated to the specific project page.


##### Change password page
"Change password" page has two main different states. For deciding which mode it should be on, it uses ```UsersService```. It calls **getRole()** method for setting user role. Then **validateLink()** method takes resetParam which validates the user information. If this process fails, the user will be taken back to the main page.
Then the page role is being added. Both forms uses imports: ```{ FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
``` and ```{ PasswordValidator } from '../registration/password.validator';```. Forms: 
- First one in when a user is already logged in. The "Change password" page loads form with old and new passwords. It uses **changePassword()** method. The updateLoggedInUser method then is being used. Upon successful action, a user will be taken back to the settings page.
- The second one is when a user has forgotten his password. Then "Change password" page form changes, and loads form only with reset password form. Then **changePassword()** method is being called and uses the same ```usersService```, only with upadeLoggedInUser. Upon successful action, a user will be taken to the login page.

Additional functionality:
* For validating passwords a special ```password.validation.ts``` class is created. It uses **mustBeTruthy()** method using parameters from ```AbstractControl```.
* For informing a user about his changes two: **presentSToast()** and **presentFToast()** methods created. They dependantly on failed or succesful change shows information toasts from ```ToastController``` library.


##### Footer
"Footer" page uses libraries: ```{ Component, OnInit } from '@angular/core';``` and ```{ CookieService } from 'ngx-cookie-service';```. This page is created for:
- showing our **Platypus© 2019** credit in the bottom navigation menu.
- showing flags of English ant Lithuania in order for a user to have the possibility to change the language. This button uses ```CookieService``` for setting the chosen language.


##### Header
"Header" page uses only ```{ Component, OnInit } from '@angular/core';```. This page creates the base header component used in other pages.


##### Login page
"Login" page is created for an anonymous user to login to **volunteering.ga** page:
- For a user to log in he must fill both required fields. Imports ``` { FormBuilder, FormGroup, Validators } ``` are being used for making sure this requirement is being fulfilled. When correct data is passed a ```UsersService``` is being used and login method is used. If data was correct **setUser()** method from ```UsersService``` is being used to set a Token to page for latter identification:
```
 if (this.user != null && this.user.token != null) {
        this.usersService.setUser(user);
        this.navCtrl.navigateRoot('main').catch(reason => console.log('Error while signing in'));
      } else {
        this.presentNotLoggedIn();
        console.log('User was not validated');
      }
``` 
If setting token was unsuccessful, or the whole data haven't matched with data in the database, a **presentNotLoggedIn()** method is being called to inform the user about failed action. 
- If a user has forgotten his password an asynchronous function **forgotPass()** is being called. It has some validations itself of ``` boolean can``` parameter in order not to show twice at the same time. It uses ```AlertController``` to create an alert with data input. Confirm button passes given data to **sendEmail()** method. 
  - This method takes given email and codes to secret parameters. Then the same imports as in "about" page are being used ``` { HttpHeaders, HttpClient } ``` for forming a message and using **http.post()**, but in this case, a special **makeContent()** method is also used for coding and making active reset link parameter.


##### Main page
"Main" page is visible for all users, it is not dependable on their role. It always uses the same form. When loading:
- 4 most popular projects (from **getProjects()** method ) are being loaded:
```
   this.projectsService.get().subscribe(items => {
            this.projects = items.map(value => {
               /*Image validation*/
            });
            this.filterNewProjects();
          /*Other actions*/
        });
```
There ```ProjectsService``` is being used for getting all the projects from the database and only **this.filterNewProjects()** filters 4 projects from the list.
- 4 main organizations are being loaded within **getOrganizations()** method. It uses ```OrganizationsService``` to get all organizations from the database.
- All projects and organizations are portraitured in ion-cards, so all of them are active. Dependably is it organization or project card, a special method is called:
  - **onProjectClicked()** for navigating to project information page.
  - **onOrganizationClicked()** for navigating to organization representation page.


##### Menu
"Menu" page is visible for all the users, but what is presented depends on their role. There is 5 different modifications of ```Volunteer, Organization, Moderator, Admin and Anonymous```. Method **getRole()** sets user type. Main atribute in this *menu.page.ts* class is 
```
 public pages = [
        {
            title: /*Page title*/,
            url: /*Page link*/,
            icon: /*Used icon*/,
            roles: /*Visible roles*/
        },
       /*Other links*/
    ];
```
*pages* describe navigation URL, titles of the pages and most important roles to which the specific buttons will be shown. The user logic is called from the .html file but is checked in **check(i: number)** method, which validates a current user position. Buttons which are seen by the user use ```RouterEvent and Router``` **subscribe()** method for accrediting event.url and setting role.
- **Logout()** method uses ```UsersService``` to log out the user. It deletes token from browser, logs user out of his current position and navigates with ```NavController``` him to the main page. 


##### Create project page
"Create project" page is shown only for organizations. The project will not be created for any other user, even if he got to this page by any chance.
- For creating a project **onCreate()** method will be called. For successful submission from **onCreateForm** attribute, all values must be validated. This is provided by libraries```{ FormBuilder, FormGroup, Validators } from '@angular/forms';```. Then ```ProjectService``` is being called for requesting to create a new project with inserted data.
- For additional features ```AlertController``` is used, to provide useful messages for users about their actions.


##### Organization page
"Organization" page is visible for all users but has two different modes. It uses ```usersService``` to set a user role.
- If a user is an owner of the organization, he will have only a presentation view.
- If it is a **volunteer** user, they can leave comments about organization activities. **onCreate()** method is being used for creating a new review. Data must be validated by using imports ```{ FormBuilder, FormGroup }```. For creating and saving reviews a ```ReviewsService``` is being used.
- ```ReviewsService``` is also used when getting the average rating of the organization. Method **getAverage()** uses filtering and additional calculations to get the average rating of the organization.
- ```ReviewsService``` is also used when comments need to be deleted. This button is only seen by comment owner.


##### Organizations list page
"Organization" page is seen by everyone and does not have any additional functionality that depends on the users' role. This page uses ```OrganizationsService``` **get()** method and takes all registered organizations from the database. All organizations are shown for the user as ```ion-card``` which when clicked will call **onOrganizationClicked()** method.


##### Organizations settings page
"Organizations settings" page is only available for the user who is an owner of the organization. This page uses ```UsersService``` for validating user and ```OrganizationsService``` for updating organizations data. 
- For saving data the imports of ``` { FormGroup, FormBuilder, Validators } from '@angular/forms'``` are used. An **onSaveForm** value is used to pass data for updating organizations' credentials. There are no required fields, so with some unfilled fields, the data should still be updated.
- Asynchronous function **onDelete** calls **deleteUser** method. Here ```UsersService``` is called again and by authenticating id a successful deletion of a user account should be provided.


##### Privacy policy page
"Privacy policy" page is visible for all of the users and does not have any of specific functions implemented inside.


##### Project page
"Project" page is visible for every user, but hast 3 different modes.
- Every user and anonymous only see project data. And can only use methods as:
  - **copyToClipboard()** which uses **addEventListener()** with ```ClipboardEvent``` to copy selected data.
  - **onSourceClicked()** which uses ```window``` for creating a new web browser tab.
- Volunteers also are privileged with using methods of:
  - **removeFromSaveList()**, **addToSaveList()**, **addToSelecteDProjectS()**, **removeFromSelectedProjectS()**. All these methods use ```ProjectsService``` and use dependently methods as **removeSavedProject** or **removeSelectedProject**. They do not have any more of specific logic underneath them but do require a user authentification.
- Organizations' owner in addition to anonymous users' functionality can use methods of ```{ NavController } from '@ionic/angular'``` for navigating to "volunteers" or "edit" pages.


##### Project edit page
"Project edit" page is seen only by the organization who is the owner of the project. Only created projects can be edited, in order of unsuccessful attempt to get into edit page *aPageNotFound* will show up.
- For editing project imports of ```{ FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'``` are used for validating data. **onSaved()**  method uses ```ProjectsService``` to update some information.
- For deleting a project a method **Delete()** is called. It also uses ```ProjectsService``` for deleting a project. Then method ```location.assign('projects/type/created')``` is called for a valid move from "edit project" page to "create project".
*Only the owner can edit or delete his projects*.


##### Projects list page
"Projects" page is seen by every user. But it has different forms. It uses imports of ```{ Project } from '../../models/Project'
``` and ```{ ProjectsService } from '../../services/projects.service'```.
Dependantly on type a methods from ```ProjectsService``` are called:
- **getSavedItems()** - returns volunteers' saved projects.
- **getSelectedItems()** - returns volunteers' selected projects .
- **getCreatedItems()** - returns organizations created projects .
- **get()** - returns all projects from the database.
Without that this page filters projects by active and already closed projects using **checkDate()** method.


##### Registration page
"Registration" page is only visible for anonymous users. It uses imports ```{ NavController, MenuController, LoadingController, AlertController, ToastController } from '@ionic/angular'
``` and ```{ PasswordValidator } from './password.validator'``` for navigating through pages, for adding additional information for users and also ```PasswordValidator``` is used for validating inputted password data.
- For a new user, a registration form is required to be filled fully. When data is filled correctly, the register button becomes valid and asynchronous function **singUp()** will be called. This method uses ```UsersService``` method **register()**. Upon unsuccessful registration **presentNotRegistered()** method is called which uses ```ToastController``` for informing user about failed registration.


##### Volunteers list page
"Volunteers list" page is seen only by the owner of the project. This page uses ```ProjectsService``` to load project and volunteers of that project. The data of volunteer is being proceeded in **subscribe()** function. 
- Asynchronous method **onVolunteerClicked()** uses ```{ ModalVolunteerPage } from '../modal-volunteer/modal-volunteer.page'``` to load more information about a volunteers. This modal-page is based on ```ModalController``` and ```LazyLoading``` functions.


##### Volunteers settings page
"Volunteers settings" page is only available for the user who is a volunteer. This page uses ```UsersService``` for validating user and ```VolunteersService``` for updating volunteers data. 
- For saving data the imports of ``` { FormGroup, FormBuilder, Validators } from '@angular/forms'``` are used. An **onSaveForm** value is used to pass data for updating volunteers' credentials. There are no required fields, so with some unfilled fields, the data should still be updated.
- Asynchronous function **onDelete** calls **deleteUser** method. Here ```UsersService``` is called again and by authenticating id a successful deletion of a user account should be provided.
