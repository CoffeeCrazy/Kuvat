import React, { useEffect, useState } from 'react'
interface State{
    kuvat : any[],
    tiedotHaettu : boolean,
    virhe : string
}
interface Pages{
    sivut? : number,
    aloitusIndex? : number,
    lopetusIndex? : number,
    alkuSaavutetttu? : boolean,
    loppuSaavutettu? : boolean
}
export default function Merkkidata() {
    const [data, setData] = useState<State>({
        kuvat : [],
        tiedotHaettu : false,
        virhe : ""
    }
    );
    const [pages, setPages] = useState<Pages>({
        sivut : 0,
        aloitusIndex : 0,
        lopetusIndex : 20,
        alkuSaavutetttu : true,
        loppuSaavutettu : false
    });
    
    useEffect(()=> {
      
        async function haeTiedot(){
          try{
            let res = await fetch("https://jsonplaceholder.typicode.com/photos");
            let kuvat = await res.json();
            
            setData({
              ...data,//Kopsaa data vaihda mitä tarvii
              kuvat : kuvat,
              tiedotHaettu : true,
              virhe : ""
            });
            let a = Number(kuvat.length)/20;
            setPages({
                ...pages,
                sivut : a,
                aloitusIndex :0,
                lopetusIndex : 20
            })
            console.log(a);
          }
          catch(err){
            console.log("VIRHE" + err)
            setData({
              ...data,
              kuvat : [],
              tiedotHaettu : false,
              virhe : "Tietoja ei voitu hakea palvelimelta. Kokeile myöhemmin uudelleen"
            });
          }
        }
        haeTiedot();
      }, 
      []); //TÄYTYY OLLA AINA EMPTY ARRAY ULOS TÄSTÄ TOKANA PARAMETRINÄ
      //KUN SE ON TYHJÄ NIIN SILLOIN TÄMÄ SUORITETAAN VAIN KERRAN
    return data.kuvat;
    
}
