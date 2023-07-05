#### Tree-shaking
To put it simple it is just removing of the code which we are not using in our application and being done by webpack when angular cli performs production build

#### Tricks
env NG_BUILD_MANGLE=false npm run build
This buil will do tree-shaking but without uglifying

#### Reference
https://angular.io/guide/lightweight-injection-tokens
https://www.youtube.com/watch?v=iBA2VLvqNr4&list=PLX7eV3JL9sfmJ6AaZj9eDlAKrJrEul4Vz&index=6