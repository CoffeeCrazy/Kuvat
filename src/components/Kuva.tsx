import React, { useState, useEffect } from 'react'
import { Alert, Button, Col, Image } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import {Link  }from 'react-router-dom';
interface Kuva{
    albumId: Number,
    id : Number,
    title : String,
    url : String,
    thumbnailUrl : String,
    tiedotHaettu : boolean,
      virhe : String,
      tiedotOk : boolean
}
interface State{
  nykyinenIndex : any
}
interface Props {
    updateStuff : () => void,
    match : any
}
const Kuva : React.FC<Props> = (props : Props) => {
    
    const [data, setData] = useState<State>({
      nykyinenIndex : 0
    }
    );
    const[kuva,setKuva] = useState<Kuva>({
        albumId: 0,
      id : 0,
      title : "",
      url : "",
      thumbnailUrl : "",
      tiedotHaettu : false,
      virhe : "",
      tiedotOk : false
    })
    //console.log(props.match.params.indeksi);
    //let index = Number(props.match.params.indeksi);
    
    useEffect(()=> {
       
        async function haeTiedot(){
          try{
            let index = Number(props.match.params.indeksi);
            let url = `https://jsonplaceholder.typicode.com/photos/`;
            
            index++;
            url += index.toString();
            let res = await fetch(url);
            if(isNaN(index) || !res.ok){
              setKuva({
                ...kuva,
                tiedotHaettu : false,
                virhe : "Virhe! - Kuvan tietoja ei voitu hakea :(. Ole hyvä ja yritä myöhemmin uudelleen",
                tiedotOk : false
              })
              return;
            }
            let haettuKuva = await res.json();
            setKuva({
                albumId: haettuKuva.albumId,
                id : haettuKuva.id,
                title : haettuKuva.title,
                url : haettuKuva.url,
                thumbnailUrl : haettuKuva.thumbnailUrl,
                tiedotHaettu : true,
                virhe : "",
                tiedotOk : true
            })
            
          }
          catch(err){
            console.log("VIRHE" + err)
            setKuva({
              ...kuva,
              tiedotHaettu : false,
              virhe : "Virhe! - virheelinen api kutsu",
              tiedotOk : false
            });
          }
        }
        haeTiedot();
      }, 
      []);
    return (
      <Container>
        
        {
          (kuva.tiedotOk) &&
          <Card className="text-center">
            <Card.Header>
              <Button variant="primary" as={Link} to={"../photos/"} >Palaa takaisin kuviin</Button>
            </Card.Header>
            <Card.Body>
                <Card.Title>{kuva.title}</Card.Title>
                <Col sm={"auto"}>
                  <Image src={kuva.url.toString()}></Image>
                </Col>
                
            </Card.Body>
          </Card> 
        }
        {
          (!kuva.tiedotOk) &&
          <Alert variant="danger">
            {kuva.virhe}
          </Alert>
        }
        
        
      </Container>
      
        
    )
}
export default Kuva;

