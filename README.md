# React Native App

> Husk å kjøre `npm i`  i nativeClient-mappa og i backend-mappa (hver for seg) første gang du kjører prosjektet.
___
## Kjøre backend

Gå inn i backend-mappa
#### `cd backend`
#### `npm run dev`
Alternativt (uten hot reloading):
#### `npm run deploy`
Du finner så serveren på [http://localhost:4000/graphql](http://localhost:4000/graphql/)  
Merk: du må være på eduroam eller NTNU-VPN for at backend skal kunne aksessere databasen. Serveren vil ikke starte uten dette.
___
## Kjøre Native Client 

Gå inn i nativeClient-mappa

#### `cd nativeClient`
#### `npx expo start `
Da kan bruker velge om de vil kjøre appen på android `(a)` /iOS `(i)`, virtuell enhet eller i web `(w)`. For å kjøre prosjektet på en enhet, må bruker ha en virtuell enhet åpen eller en mobil tilkoblet til PC-en. En annen måte å teste applikasjonen er å scanne QR-koden som kommer opp etter kjørt kommando. Da må man først installere Expo Go på mobilen.  

Du finner så serveren på [http://localhost:19000](http://localhost:19000)
___
## React Native Paper
I prosjekt 3 brukte vi Material UI komponenter til styling og responsive web design, disse måtte byttes ut til prosjekt 4 da MUI ikke er kompatibelt med React Native. Vi benyttet oss stort sett av react-native-paper biblioteket, som hadde mange ekvivalente komponenter til de MUI komponentene vi brukte i forrige prosjekt. Paper er et bibliotek med komponenter for React Native, og er i henhold til Googles retningslinjer for materialdesign.  

## Theme
Vi bestemte oss for å endre noen farger på noen elementer i theme slik at nettsiden ville se finere ut på en mobil, men vi har valgt å beholde grønn som hovedfarge på nettsiden. For å definere egne farger i light og dark theme brukte vi react-native-paper theming Provider komponent. 

## Gjenbruk av kode 
Vi har stort sett gjenbrukt alt av koden fra prosjekt 3, og det var bare noen få tilpasninger. Alle stil komponenter måtte bli erstattet, men funksjoner ble stort sett beholdt som i prosjekt 3. Noen komponenter som for eksempel Rating eller TextInput i søkefeltet trengte noen små endringer for å tilpasse dem til de nye komponentene.  

## Testing
Applikasjon ble testet på Android Studio virtuell enhet, XCode iOS virtuell enhet og ved å inspisere visning i nettleser. Mot slutten av utviklingen ble applikasjon også testet på en faktisk mobil, både android og iOS. Alt av funksjonalitet virket som forventet. 

## Fra prosjekt 3 
Fra prosjekt 3 har vi tatt med oss Apollo Client for å feche data med GraphQL. Det blir brukt UseMutation- og UseQuery hooks for å hente ut dataen. Apollo Client håndterer også state management. 