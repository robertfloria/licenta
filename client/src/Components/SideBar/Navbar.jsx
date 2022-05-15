import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import "D:/GitHub/licenta/client/src/App.css";
import { navItems } from './NavItems';
import * as Icons from "react-icons/fa";
import * as Icons2 from "react-icons/ri";
import { interpolateNumber } from 'd3';
import Button from './Button';

export default function Navbar() {

    const [mobile, setMobile] = useState(false);
    const [sidebar, setSidebar] = useState(false);
    const [items, setItems] = useState("");
    const [openItems, setOpenItems] = useState(false);

    useEffect(() => {
        if(window.innerWidth < 1065){
            setMobile(true);
        }       
    },[]);

    useEffect(() => {

        const handleResize = () => {
            if(window.innerWidth < 1065) {
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


    useEffect(() => {

        if(items === "DonutChart"){
            setOpenItems(true);
           
        }
      
        return () => {
            setItems("");
        }
    }, [items]);
    
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
                <Button onClick={() => setSidebar(false)}/>
            </div>                                 
        </>
    );
}