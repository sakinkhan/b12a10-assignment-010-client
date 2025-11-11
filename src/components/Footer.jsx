import React from "react";
import logoImg from "../assets/logo.png";
import { Link } from "react-router";
import { FaFacebookF, FaXTwitter, FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-base-300 text-base-content p-10 font-secondary">
      <aside>
        <div className="flex items-center gap-1 mb-2">
          <img src={logoImg} alt="Logo image" className="w-10" />
          <Link to={"/"} className="font-primary font-bold text-2xl">
            Home<span className="text-[#108251]">Nest</span>
          </Link>
        </div>
        <p className="font-secondary font-medium text-lg border-t pt-3">
          The nest where your next home begins.
        </p>
      </aside>
      <nav>
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact us</a>
        <a className="link link-hover">Career</a>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms & Conditions</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>
      <nav>
        <h6 className="footer-title">Social</h6>
        <div className="flex flex-row items-center gap-4">
          <a className="">
            <p className="text-xl cursor-pointer hover:scale-110">
              <FaXTwitter />
            </p>
          </a>
          <a>
            <p className="text-2xl cursor-pointer hover:scale-110">
              <FaYoutube />
            </p>
          </a>
          <a>
            <p className="text-xl cursor-pointer hover:scale-110">
              <FaFacebookF />
            </p>
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
