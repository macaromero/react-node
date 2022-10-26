//  IMPORTS  //

// CSS
import './ContactView.css';

// Material UI
import { Button } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';


//  Component  //
const ContactView = () => {

    //  HTML  //
    return (                       
        <div className='container-contactView'>
            <div className="row-contactView m-0">
                <h3 className="title-contactView">Contactanos</h3>
            </div>
            <div className="row-contactView m-0">
                <div className='recuadro-contactView'></div>
            </div>
            <div className="row-contactView spaceAround-contactView">
                <div className="col-contactView">
                    <div>
                        <Button id='btnWapp-contactView' size='large' startIcon={<WhatsAppIcon />} href='https://api.whatsapp.com/send?phone=541153882232&app=facebook&entry_point=page_cta&fbclid=IwAR19T2feRHoxnjGggw3exR21foISUDZDTjj0S_hna6sWwJ7ETSOJiTWLouE' target="_blank">
                            +54 9 11 5388 2232
                        </Button>
                    </div>
                    <div>
                        <Button id="btnIg-contactView" size='large' startIcon={<InstagramIcon />} href='https://www.instagram.com/mechacalzados/' target="_blank">
                            @mechacalzados
                        </Button>
                    </div>
                </div>
            </div> 
        </div>
    )
}


export default ContactView;