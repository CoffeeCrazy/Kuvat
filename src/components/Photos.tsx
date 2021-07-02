import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

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
interface Props {
    updateStuff : () => void,
    match : any
}
interface addIndexes {
  indexAdded : any
}
interface itemsPerRow {
    items : any,
    yritettyItems : any
  }
const Etusivu : React.FC<Props> = (props : Props) => {
    
    const [pages, setPages] = useState<Pages>({
        sivut : 0,
        aloitusIndex : 0,
        lopetusIndex : 20,
        alkuSaavutetttu : true,
        loppuSaavutettu : false
    })
    const final = [];
    const [data, setData] = useState<State>({
        kuvat : [],
        tiedotHaettu : false,
        virhe : ""
    }
    );
    //let index = Number(props.match.params.indeksi);
    const[addIndexes, SetAddIndexes] = useState<addIndexes>({
      indexAdded : 0
    })
    const[itemsPerRow, SetItemsPerRow] = useState<itemsPerRow>({
        items : 3,
        yritettyItems : 0
      })
    useEffect(()=> {
      
      async function haeTiedot(){
        try{
          let index = Number(props.match.params.indeksi);
          //let index = Number(props.match.params.shit);
          let yritettyIndex = index;
          
          let res = await fetch("https://jsonplaceholder.typicode.com/photos");
          let merkit = await res.json();
          
          //console.log(res);
          if(!res.ok)
            throw new Error('Virhe');
          //"Validate index"
          // if(index % 2 === 1)
          //   index++;
          if(isNaN(index))
            index = 4;
          else if(index === 0)
            index = 1;
        else if(index > 6)
            index = 6;
          SetItemsPerRow({
              items : index,
              yritettyItems : yritettyIndex
          });
          setData({
            ...data,//Kopsaa data vaihda mitä tarvii
            kuvat : merkit,
            tiedotHaettu : true,
            virhe : ""
          });
          let a = Number(merkit.length)/20;
          setPages({
              ...pages,
              sivut : a,
              aloitusIndex :0,
              lopetusIndex : 20
          })
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
    []);
    const seuraavaSivu = (): void => {

        let oldAloitus = (pages.aloitusIndex) ? pages.aloitusIndex : 0;
        let oldLopetus = (pages.lopetusIndex) ? pages.lopetusIndex : 0;
        
        let oldAddedIndex = (addIndexes.indexAdded) ? addIndexes.indexAdded : 0;
        SetAddIndexes({
          indexAdded : oldAddedIndex + 20
        })
        if(oldLopetus+20 == data.kuvat.length){
            setPages({      //END REACHED
                ...pages,
                aloitusIndex : oldAloitus + 20,
                lopetusIndex : oldLopetus + 20,
                loppuSaavutettu : true
        })
        }else{              //END NOT YET REACHED
            setPages({
                aloitusIndex : oldAloitus + 20,
                lopetusIndex : oldLopetus + 20,
                alkuSaavutetttu : false
            });
        }
    }
    const edellinenSivu = (): void => {

        let oldAloitus = (pages.aloitusIndex) ? pages.aloitusIndex : 0;
        let oldLopetus = (pages.lopetusIndex) ? pages.lopetusIndex : 0;
        let oldAddedIndex = (addIndexes.indexAdded) ? addIndexes.indexAdded : 0;
        SetAddIndexes({
          indexAdded : oldAddedIndex - 20
        })
        if(oldAloitus - 20 == 0){//Reached START!
            setPages({
                ...pages,
                aloitusIndex : oldAloitus - 20,
                lopetusIndex : oldLopetus - 20,
                alkuSaavutetttu : true
        })
        }else{                  //START NOT YET REACHED
            setPages({
                aloitusIndex : oldAloitus - 20,
                lopetusIndex : oldLopetus - 20
            });
        }
    }
  return (
      <Container>
        <h1>Kuvat </h1>
            {
                (itemsPerRow.yritettyItems > 6) && <Alert variant="danger">Kuvia saa olla maksimissaan 6 per rivi</Alert>
            }
        
        <Row >
            <Col sm={6}>
                <Button disabled={pages.alkuSaavutetttu} block onClick={edellinenSivu}>Edellinen</Button>
            </Col>
            <Col sm={6}>
                <Button disabled={pages.loppuSaavutettu} block onClick={seuraavaSivu}>Seuraava</Button>
            </Col>
        </Row>
        {
            (data.tiedotHaettu === false) &&
            <Alert variant="danger" >
              Virhe! - Tietoja ei voitu hakea palvelimelta!
            </Alert>
        }
        {
          (data.tiedotHaettu === true) &&
            <Row noGutters={false}>
              {
                data.kuvat.slice(pages.aloitusIndex, pages.lopetusIndex).map( (kuva, index) => {
                    
                  return<Col key={index+1 + addIndexes.indexAdded} sm={Math.floor(12/itemsPerRow.items)} as={Link} to={`/kuva/${index + addIndexes.indexAdded}`}>
                              {/* sm={Math.floor(12/itemsPerRow.items)}  */}
                            <Card >
                                <Card.Img  variant="top" src={kuva.thumbnailUrl} />
                                {/* <Image src={kuva.thumbnailUrl}></Image> */}
                            </Card>
                        </Col>
                }) 
                
              } 
            </Row>
            
          } 
          
      </Container>
    
  )
}
export default Etusivu;