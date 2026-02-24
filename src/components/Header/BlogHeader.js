/** @format */

import React, { useContext, useState } from "react";
import { DiCssdeck } from "react-icons/di";
import {
  Div1,
  Div3,
  SocialIcons,
  ThemeDiv,
  P,
  BlogHeaderContainer,
  BlogLinksDiv,
  SmallHeaderContainer,
  Container,
  Div2,
  NavLink,
  LinksDiv,
  MotionDiv,
  ThemeText,
  HeaderItem,
} from "./HeaderStyles";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import Link from "next/link";
import styles from "./HeaderStyle.module.css";
import { ThemeContext } from "./../../styles/theme";

const BlogHeader = () => {
  const [theme, setTheme] = useContext(ThemeContext);
  const [isChecked, setIsChecked] = useState(theme === "dark" ? true : false);

  const changeTheme = () => {
    let themeToChangeTo = theme === "dark" ? "light" : "dark";
    setTheme(themeToChangeTo);
    localStorage.setItem("theme", themeToChangeTo);
    setIsChecked(!isChecked);
  };

  const getDarkModeToggle = () => (
    <div>
      <input
        className="toggle"
        type="checkbox"
        id="toggle"
        onChange={changeTheme}
        checked={isChecked}
      />
      <label
        className="toggle_label"
        htmlFor="toggle"
        style={{ position: "relative" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={theme === "dark" ? "white" : "black"}
          height="2rem"
          width="2rem"
          style={{ position: "absolute", top: "0.5rem", left: "5px" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={theme === "dark" ? "white" : "black"}
          height="2rem"
          width="2rem"
          style={{
            position: "absolute",
            top: "0.5rem",
            right: "5px",
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </label>
    </div>
  );

  return (
    <div>
      <SmallHeaderContainer>
        <Div1
          style={{
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Link
            href="#"
            className={styles.link_name}
            style={{ display: "flex" }}
          >
            <a
              style={{
                display: "flex",
                alignItems: "center",
                whiteSpace: "nowrap",
              }}
            >
              <ThemeDiv>
                <DiCssdeck size="4rem" />
                {/* <img
                  src="/images/portfolioImage.jpg"
                  height="4rem"
                  width="4rem"
                ></img> */}
              </ThemeDiv>
              <P blog>Abdullah Mohamed</P>
            </a>
          </Link>
        </Div1>
        <Div3>
          <HeaderItem style={{ position: "relative", top: "-10px" }}>
            {getDarkModeToggle()}
          </HeaderItem>
          <SocialIcons target="_blank" href="https://github.com/DeluxeViper">
            <AiFillGithub size="3rem" />
          </SocialIcons>
          <SocialIcons
            target="_blank"
            href="https://linkedin.com/in/abdullah-mohamed"
          >
            <AiFillLinkedin size="3rem" />
          </SocialIcons>
        </Div3>
      </SmallHeaderContainer>
      <BlogHeaderContainer>
        <div
          style={{
            maxWidth: "1040px",
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Div1>
            <Link className={styles.link_name} href="/">
              <a
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ThemeDiv>
                  <DiCssdeck size="5rem" />
                </ThemeDiv>
                <P>Abdullah Mohamed</P>
              </a>
            </Link>
          </Div1>
          <BlogLinksDiv>
            <div style={{ display: "flex", alignItems: "center" }}>
              <HeaderItem style={{ position: "relative", top: "-10px" }}>
                {getDarkModeToggle()}
              </HeaderItem>
              <SocialIcons
                target="_blank"
                href="https://github.com/Atv-Axiomatic"
              >
                <AiFillGithub size="3rem" />
              </SocialIcons>
              <SocialIcons
                target="_blank"
                href="https://linkedin.com/in/abdullah-mohamed"
              >
                <AiFillLinkedin size="3rem" />
              </SocialIcons>
            </div>
          </BlogLinksDiv>
        </div>
      </BlogHeaderContainer>
    </div>
  );
};

export default BlogHeader;
