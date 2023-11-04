import React, {useState,useEffect} from "react"
import { Link } from 'react-router-dom';
import Header from '../layout/header'
import Footer from '../layout/footer'
import { useLocation } from "react-router-dom";
import authFunc from '../serviceApi/auth'

function Confirmaccount() {
    const styles = {
        body: {
            fontFamily: 'Arial, sans-serif',
            // margin: 0,
            // padding: 0,
            backgroundColor: '#f4f4f4',
        },
        container: {
            maxWidth: '600px',
            margin: '0 auto',
            padding: '20px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        header: {
            textAlign: 'center',
            padding: '20px 0',
        },
        logo: {
            fontSize: '24px',
            fontWeight: 700,
            color: '#333',
        },
        message: {
            margin: '20px 0',
            fontSize: '16px',
            color: '#333',
        },
    };
    const search = useLocation().search;
    const [showMessage, setshowMessage] = useState('');

    useEffect(() => {
        console.log('path', search);
        const id = new URLSearchParams(search).get("id");
        console.log(id); 
        confirmAccount(id)
    }, []);

    const confirmAccount = async (id) => {
        const submitInfo = await authFunc.confirmAccount(id);
        if(submitInfo?.response?.data?.message){
            setshowMessage(submitInfo?.response?.data?.message)
        }
        
    }
    return (
        <>
            <Header />
            <div style={styles.body} className="marginTopBottom">
                <div style={styles.container}>
                    <div style={styles.header}>
                        {/* <div style={styles.logo}>Your Brand/Logo</div> */}
                    </div>
                    <div style={styles.message}>
                        {/* <p>Hello [User],</p> */}
                        <p>{showMessage.length ? showMessage : "Your account has been confirmed! Thank you for joining our platform."}</p>
                        {/* <p>{showMessage}Your account has been confirmed! Thank you for joining our platform.</p> */}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Confirmaccount;
