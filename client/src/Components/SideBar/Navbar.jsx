import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import "D:/GitHub/licenta/client/src/App.css";
import { navItems } from './NavItems';
import * as Icons from "react-icons/fa";
import * as Icons2 from "react-icons/ri";
import { interpolateNumber } from 'd3';
import Button from './Button';
import AddIcon from '@mui/icons-material/Logout';
import Axios from 'axios';
//import AddFile from './AddFile';

export default function Navbar() {

    const [mobile, setMobile] = useState(false);
    const [sidebar, setSidebar] = useState(false);
    const [items, setItems] = useState("");
    const [openItems, setOpenItems] = useState(false);
    const [dataFile, setDataFile] = useState(null);
    const [pushData, setPushData] = useState(false);

    useEffect(() => {
        if(window.innerWidth < 1140){
            setMobile(true);
        }       
    },[]);

    useEffect(() => {

        const handleResize = () => {
            if(window.innerWidth < 1140) {
                setMobile(true);
                setSidebar(true);
            } else {
                setMobile(false);
                setSidebar(false);
            }
        }
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const AddFile = (e) => {

        let file = e.target.files[0];
        setDataFile(file);
    }

    const handleUpload = (e) => {

        const dataJson = dataFile;

        Axios.post('http://localhost:3001/api/uploadFile', dataJson, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if(response){
                // setPushData(false);
                // setDataFile(null)
                console.log(dataFile);
            }
        });
    }

    useEffect(()=> {
        
        if(dataFile != null)
            setPushData(true);
        else
            setPushData(false);

        console.log("----"+ pushData)

    }, [dataFile])

    return(
        <>             
            <nav className='navbar'>
                <Link to="/mainpage" className='navbar-logo' onClick={() => setSidebar(false)}>
                    <Icons2.RiReactjsFill className='logo-app'/>
                    D3
                </Link>

                {!mobile && (
                    <>
                        <ul className='nav-items'>
                            {navItems.map((item) => {
                                return(
                                <li key={item.id} className={item.nName}>
                                    <Link to={item.path}>
                                        <button onClick={() => setItems(item.title)}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </button>
                                    </Link>                             
                                </li>
                                );
                            })}
                        </ul>
                        <input type='file' name="uploadFile" accept='.json' className='addBtn' onChange={(e) => {
                            AddFile(e);
                        }}></input>
                        <button className={pushData ? 'pushBtn active' : 'pushBtn'} onClick={(e) => {
                            if(pushData) {
                                handleUpload(e); 
                                alert("File uploaded successfully!");
                            } else
                                alert("There's no data to upload! Please choose a file!")
                        }}>Push</button>
                        <Button />
                    </>
                )}

                {mobile && (
                    <div className='sidebar-toggle'>
                        {sidebar ? (
                            <Icons.FaTimes 
                            className='sidebar-toggle-logo' 
                            onClick={() => setSidebar(!sidebar)} 
                            />
                        ) : (
                            <Icons.FaBars 
                            className='sidebar-toggle-logo' 
                            onClick={() => setSidebar(!sidebar)} 
                            />
                        )}
                    </div>
                )}
            </nav>
                
            <div className={sidebar ? "sidebar active" : "sidebar"}>
                <ul className='sidebar-items'>
                    {navItems.map((item) => {
                        return(
                        <li key={item.id} className={item.sName} onClick={() => setSidebar(false)}>
                            <Link to={item.path}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </li>
                        );
                    })}
                </ul>
                <input type='file' name="uploadFile" accept='.json' className='addBtn' onChange={(e) => {
                    AddFile(e);
                }}></input>
                <button className={pushData ? 'pushBtn active' : 'pushBtn'} onClick={(e) => {
                    if(pushData) {
                        handleUpload(e); 
                        alert("File uploaded successfully!");
                    } else
                        alert("There's no data to upload! Please choose a file!")
                    }}>Push</button>
                <Button onClick={() => setSidebar(false)}/>
            </div>                                 
        </>
    );
}