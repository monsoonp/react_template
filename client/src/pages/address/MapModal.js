import React, { useState, useEffect, useRef } from 'react';
import {Modal, Button, ButtonToolbar} from 'react-bootstrap/'
import DaumMap from './DaumMap';

function LocationModal(props) {
    
    return(
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{opacity:1, margin:'auto'}}
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    위치 정보
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <DaumMap info={props.info} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
        
    );
}

function MapModal(props) {
    const [modalShow, setModalShow ] = useState(false);
    
    // Similar to componentDidMount and componentDidUpdate: 

    useEffect(() => { // Update the document title using the browser API 
        console.log("MapModal componentDidMount and DidUpdate");
        /*
        if(document.getElementById('map')){
            //MapApi(props);
        }
        */
        return () =>{   //unmount
            console.log("MapModal componentWillUnmount");
        }
      
        //console.log("map 2 %s", props.lat);
    },[]);    // Only re-run the effect if props changes    // class component / prevProps, prevState comparison
        // primary, secondary, success, danger, warning, info, light, dark // outline-~~
    return (
        <div>
        <ButtonToolbar>
            <Button variant="outline-primary" onClick={() => setModalShow(true)} style={{margin:'auto'}}>
                위치 보기
            </Button>
            
            <LocationModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                info={props.info}
            />
        </ButtonToolbar>
        </div>
        
    );
    
}

export default MapModal;