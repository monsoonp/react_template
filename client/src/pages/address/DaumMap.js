/*global daum*/
import React, { useEffect} from 'react';

function DaumMap(props){
//const [modalShow, setModalShow] = useState(true);
    
    const address = `${props.info.sido} ${props.info.sigungu} ${props.info.dong} ${props.info.street} ${props.info.mainNum} ${(props.info.subNum===0? "":(props.info.subNum))} ${props.info.building} ${props.info.buildingDetail}`;
   
    function MapApi(){
        
        let mapContainer = document.getElementById('map');
    
        let geocoder = new daum.maps.services.Geocoder();
        //console.log("address: %s", address);
        geocoder.addressSearch(address, function(result, status) {
            //정상적으로 검색이 완료됐으면 
            //console.log(result);
            //console.log(status);
            if (status === daum.maps.services.Status.OK) {
                const coords = new daum.maps.LatLng(result[0].y, result[0].x); 
                let option = {
                    center: coords,
                    level: 3
                };
                const map = new daum.maps.Map(mapContainer, option);
                // 결과값으로 받은 위치를 마커로 표시합니다
                const marker = new daum.maps.Marker({
                    map: map,
                    position: coords
                });
                
                // 인포윈도우로 장소에 대한 설명을 표시합니다
                /*
                const infowindow = new daum.maps.InfoWindow({
                    content: '<div style="width:150px;text-align:center;padding:6px 0;">'+address+'</div>'
                });
                infowindow.open(map, marker);
                */
                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                //map.setCenter(coords);
           } 
       });  
    }
    useEffect(()=>{
        console.log("DaumMap componentDidMount and DidUpdate");
        if(document.getElementById('map')){
            MapApi(props);
        }
        
        return()=>{
            console.log("DaumMap componentWillUnmount");
        }
    },[])
    return(
        <div>
            <h4>{address}</h4>
            <div className="Map" id="map" style={{width:500, height:500}}></div>
        </div>
    );
}

export default DaumMap;