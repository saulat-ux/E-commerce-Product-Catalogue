import React from 'react'
import './footerLinks.scss'
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import logoImg from "../../assets/shopito_logo.png"
import styles from '../header/header.module.scss';


const FooterLinks = () => {
  return (
    <>
      <section className="contact-section">
        <div className="container contact">
            <div className="contact-icon">
                <FaFacebookF className='i'/>
                <FaTwitter className='i'/>
                <FaInstagram className='i'/>
                <FaYoutube className='i'/>


            </div>
            <h2>Let's Talk?</h2>
            <a href="#home" className='btn btn-dark'>Make an enquiry!</a>
        </div>
      </section>
      <section className="footer-section">
        <div className="container footer">
        <div className="footer-logo">
                          
                <a href="#home" >
                <h2 className='white'>ShopLike<span className='orange'>Elite</span>.
                </h2>
                </a>   
               
        </div>

        <div className="footer-menu">
            <p className='link-heading'>
                Features
            </p>
            <ul className='nav-ul footer-links'>
                <li>
                    <a href="#home">Link shortning</a>
                </li>
                <li>
                    <a href="#home">Branded Links</a>
                </li>   <li>
                    <a href="#home">Analytics</a>
                </li>   <li>
                    <a href="#home">Blog</a>
                </li>
            </ul>
        </div>

        <div className="footer-menu">
            <p className='link-heading'>
                Resources
            </p>
            <ul className='nav-ul footer-links'>
                <li>
                    <a href="#home">Blog</a>
                </li>
                <li>
                    <a href="#home">Develoer</a>
                </li>   <li>
                    <a href="#home">Support</a>
                </li>   <li>
                    <a href="#home">Docs</a>
                </li>
            </ul>
        </div>

        <div className="footer-menu">
            <p className='link-heading'>
                Company
            </p>
            <ul className='nav-ul footer-links'>
                <li>
                    <a href="#home">About</a>
                </li>
                <li>
                    <a href="#home">Our team</a>
                </li>   <li>
                    <a href="#home">Career</a>
                </li>   <li>
                    <a href="#home">Contact</a>
                </li>
            </ul>
        </div>

        <div className="footer-menu">
            <p className='link-heading'>
                Partners
            </p>
            <ul className='nav-ul footer-links'>
                <li>
                    <a href="#home">About</a>
                </li>
                <li>
                    <a href="#home">Our team</a>
                </li>   <li>
                    <a href="#home">Career</a>
                </li>   <li>
                    <a href="#home">Contact</a>
                </li>
            </ul>
        </div>

       
        </div>
      </section>
    </>
  )
}

export default FooterLinks
