
npm i validator
npm i bootstrap
npm i @ngrx/store
npm i @ngrx/effects
npm i @ngx-translate/core
npm i @ngx-translate/http-loader
npm i @ngrx/store
ng add @ng-bootstrap/ng-bootstrap

$mainComponents = "footer" , "header" , "layout"
$services = "http", "loader", "local-storage"
$interceptors = "language"

# Create All App modules
$modules = "errors-pages" , "home" , "login" , "notes"
$homePages = "create-note" , "note-item" 
$pagesErrors = "error404" , "error403" , "error500"

# Shared
$sharedComponents = "input-text"  , "form-spinner"
$pipes = "desc"
$services = "custom-validators"


# Create Core Module
ng g m core
ng g c core/components/loader --skip-tests


foreach ($component in $mainComponents) {
  ng g c core/components/main-layout/$component --skip-tests
}
# Creating index file
New-Item  core/components/main-layout/index.ts


#Services in Core
foreach ($service in $services) {
  #create modules
  ng g s core/services/$service/$service --skip-tests
}
#create interceptors
foreach ($interceptor in $interceptors) {
  ng g interceptor core/services/interceptors/$interceptor/$interceptor --skip-tests
}

#create guards
foreach ($guard in $guards) {
  ng g guard core/guards/$guard/$guard --implements CanActivate  --skip-tests
}



foreach ($module in $modules) {

  ng g m modules/$module --routing
  ng g c modules/$module/pages/$module --skip-tests
  ng g c  modules/$module/components/$module --skip-tests
  New-Item  modules/$module/pages/index.ts
  New-Item  modules/$module/components/index.ts

  if ($module -eq "errors-pages") {
    foreach ($page in $pagesErrors) {
      ng g c modules/$module/pages/$page --skip-tests
    }
    continue
  }



  ng g i  modules/$module/interfaces/$module
  ng g s  modules/$module/services/$module/$module --skip-tests
  mkdir modules/$module/store/
  mkdir modules/$module/store/actions
  New-Item  modules/$module/store/actions/$module-type.ts
  New-Item  modules/$module/store/actions/$module-actions.ts
  mkdir modules/$module/store/effects
  New-Item  modules/$module/store/effects/$module-effects.ts
  mkdir modules/$module/store/reducers
  New-Item  modules/$module/store/reducers/$module-reducers.ts
  mkdir modules/$module/store/selectors
  New-Item  modules/$module/store/selectors/$module-selectors.ts
  if ($module -lt "home") {
    foreach ($component in $homePages) {
      ng g c modules/notes/pages/$component --skip-tests
    }
  }


}

# Create Shared Module
ng g m Shared



foreach ($share in $sharedComponents) {
  #create pages
  ng g c  shared/components/$share --skip-tests
}
New-Item  shared/components/index.ts


foreach ($share in $directives) {
  #create directives
  ng g directive shared/directives/$share/$share --skip-tests
}


foreach ($share in $pipes) {
  #create pipes
  ng g pipe shared/pipes/$share/$share --skip-tests
}

foreach ($share in $services) {
  #create services
  ng g s shared/services/$share/$share --skip-tests
}

#create state

mkdir store
New-Item  store/state.ts


mkdir ../assets/styles
mkdir ../assets/config
mkdir ../assets/styles/base


New-Item  ../assets/styles/app.scss
New-Item  ../assets/styles/layout.scss
New-Item  ../assets/styles/base/_buttons.scss
New-Item  ../assets/styles/base/_colors.scss
New-Item  ../assets/styles/base/_form.scss
New-Item  ../assets/styles/base/_mixins.scss
New-Item  ../assets/styles/base/_typography.scss
New-Item  ../assets/styles/base/_variables.scss
New-Item  ../assets/styles/base/_fon-size.scss
New-Item  ../assets/config/config.ts




