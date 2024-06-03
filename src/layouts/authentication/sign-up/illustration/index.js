/** 

=========================================================
* Vision UI PRO React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Visionware.

*/

import { useState, useRef } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Vision UI Dashboard PRO React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiSwitch from "components/VuiSwitch";
import VuiButton from "components/VuiButton";
// Vision UI Dashboard custom components
import GradientBorder from "examples/GradientBorder";

// Vision UI Dashboard assets
import radialGradient from "assets/theme/functions/radialGradient";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

// Images
import illustrationImage from "assets/images/together-background.png";

// Authentication layout components
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";

// Slick Carousel
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import SignUpModal from 'components/SignUpModal';

function Illustration() {
  const [title, setTitle] = useState('Log In');
  const [description, setDescription] = useState('Enter your phone number and password to login');

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    const phone = phoneNumber.replace(/(60|0|\+)/g, "");

    const data = {
      fname: firstName,
      lname: lastName,
      promo: false,
      pass: password,
      phone: phone,
      phone_country: 60,
    };

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
        body: JSON.stringify(data),
      });

      // Log the response status and statusText
      console.log("Response Status:", response.status);
      console.log("Response Status Text:", response.statusText);

      // Check if the response is OK and of the expected content type
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);

      setPhoneNumber('');
      setPassword('');

      if (result.status === 'fail') {
        setIsOpen(true);
        setMessage(result.message);
      } else {
        window.location.href = '/vision-ui-dashboard-pro-react#/authentication/sign-in/cover';
      }

    } catch (error) {
      console.error("Error:", error);
      setIsOpen(true);
      setMessage(result.message);
    } finally {
      setIsLoading(false);
    }
  };


  const handleLogIn = async () => {
    const phone = phoneNumber.replace(/(60|0|\+)/g, "");

    const data = {
      isAjax: 'true',
      phone: phone,
      phone_country: 60,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
        body: JSON.stringify(data),
      });

      // Log the response status and statusText
      console.log("Response Status:", response.status);
      console.log("Response Status Text:", response.statusText);

      // Check if the response is OK and of the expected content type
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);

      setPhoneNumber('');
      setPassword('');

      if (result.status === 'fail') {
        setIsOpen(true);
        setMessage(result.message);
      } else {
        window.location.href = '/vision-ui-dashboard-pro-react#/authentication/sign-in/cover';
      }

    } catch (error) {
      console.error("Error:", error);
      setIsOpen(true);
      setMessage(result.message);
    } finally {
      setIsLoading(false);
    }
  };


  const closeModal = () => {
    setIsOpen(false);
    setMessage('');
  };


  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
  };

  const swiperRef = useRef(null); 

  const handleSignUpClick = () => {
    setTitle('Sign Up');
    setDescription('Enter your name, phone number and password to sign up');

    if (swiperRef.current) {
      swiperRef.current.slickNext();
    }
  };

  const handleLogInClick = () => {
    setTitle('Log In');
    setDescription('Enter your phone number and password to login');

    if (swiperRef.current) {
      swiperRef.current.slickPrev();
    }
  };

  return (
    <IllustrationLayout
      title={title}
      description={description}
      illustration={{
        image: illustrationImage,
      }}
      top={20}
      p={0}
    >
      <VuiBox component="form" role="form">
        <div className="carousel">
          <Slider {...settings} ref={swiperRef}>
            <VuiBox p={2} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <VuiBox mb={2}>
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography
                    component="label"
                    variant="button"
                    color="white"
                    fontWeight="medium"
                  >
                    Phone Number
                  </VuiTypography>
                </VuiBox>
                <GradientBorder
                  minWidth="100%"
                  borderRadius={borders.borderRadius.lg}
                  padding="1px"
                  backgroundImage={radialGradient(
                    palette.gradients.borderLight.main,
                    palette.gradients.borderLight.state,
                    palette.gradients.borderLight.angle
                  )}
                >
                  <VuiInput
                    type="text"
                    placeholder="Your phone number..."
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    sx={({ typography: { size } }) => ({
                      fontSize: size.sm,
                    })}
                  />
                </GradientBorder>
              </VuiBox>
              <VuiBox mb={2}>
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography
                    component="label"
                    variant="button"
                    color="white"
                    fontWeight="medium"
                  >
                    Password
                  </VuiTypography>
                </VuiBox>
                <GradientBorder
                  minWidth="100%"
                  borderRadius={borders.borderRadius.lg}
                  padding="1px"
                  backgroundImage={radialGradient(
                    palette.gradients.borderLight.main,
                    palette.gradients.borderLight.state,
                    palette.gradients.borderLight.angle
                  )}
                >
                  <VuiInput
                    type="password"
                    placeholder="Your password..."
                    onChange={(e) => setPassword(e.target.value)}
                    sx={({ typography: { size } }) => ({
                      fontSize: size.sm,
                    })}
                  />
                </GradientBorder>
              </VuiBox>
              <VuiBox mt={4} mb={1} onClick={handleLogIn} disabled={isLoading}>
                <VuiButton style={{ background: "#F5367B", color: "#FFFFFF", width: '100%' }}>
                {isLoading ? 'Logging in...' : 'LOG IN'}
                </VuiButton>
              </VuiBox>
              <VuiBox mt={3} textAlign="center">
                <VuiTypography variant="button" color="text" fontWeight="regular">
                  Don't have an account?{"  "}
                  <VuiTypography
                    component="span"
                    onClick={handleSignUpClick}
                    variant="button"
                    color="white"
                    fontWeight="medium"
                    style={{ cursor: "pointer" }}
                  >
                    Sign up
                  </VuiTypography>
                </VuiTypography>
              </VuiBox>
            </VuiBox>
            <VuiBox p={2} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <VuiBox mb={2}>
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography
                    component="label"
                    variant="button"
                    color="white"
                    fontWeight="medium"
                  >
                    First Name
                  </VuiTypography>
                </VuiBox>
                <GradientBorder
                  minWidth="100%"
                  borderRadius={borders.borderRadius.lg}
                  padding="1px"
                  backgroundImage={radialGradient(
                    palette.gradients.borderLight.main,
                    palette.gradients.borderLight.state,
                    palette.gradients.borderLight.angle
                  )}
                >
                  <VuiInput
                    placeholder="Your first name..."
                    onChange={(e) => setFirstName(e.target.value)}
                    sx={({ typography: { size } }) => ({
                      fontSize: size.sm,
                    })}
                  />
                </GradientBorder>
              </VuiBox>
              <VuiBox mb={2}>
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography
                    component="label"
                    variant="button"
                    color="white"
                    fontWeight="medium"
                  >
                    Last Name
                  </VuiTypography>
                </VuiBox>
                <GradientBorder
                  minWidth="100%"
                  borderRadius={borders.borderRadius.lg}
                  padding="1px"
                  backgroundImage={radialGradient(
                    palette.gradients.borderLight.main,
                    palette.gradients.borderLight.state,
                    palette.gradients.borderLight.angle
                  )}
                >
                  <VuiInput
                    placeholder="Your last name..."
                    onChange={(e) => setLastName(e.target.value)}
                    sx={({ typography: { size } }) => ({
                      fontSize: size.sm,
                    })}
                  />
                </GradientBorder>
              </VuiBox>
              <VuiBox mb={2}>
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography
                    component="label"
                    variant="button"
                    color="white"
                    fontWeight="medium"
                  >
                    Phone Number
                  </VuiTypography>
                </VuiBox>
                <GradientBorder
                  minWidth="100%"
                  borderRadius={borders.borderRadius.lg}
                  padding="1px"
                  backgroundImage={radialGradient(
                    palette.gradients.borderLight.main,
                    palette.gradients.borderLight.state,
                    palette.gradients.borderLight.angle
                  )}
                >
                  <VuiInput
                    type="text"
                    placeholder="Your phone number..."
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    sx={({ typography: { size } }) => ({
                      fontSize: size.sm,
                    })}
                  />
                </GradientBorder>
              </VuiBox>
              <VuiBox mb={2}>
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography
                    component="label"
                    variant="button"
                    color="white"
                    fontWeight="medium"
                  >
                    Password
                  </VuiTypography>
                </VuiBox>
                <GradientBorder
                  minWidth="100%"
                  borderRadius={borders.borderRadius.lg}
                  padding="1px"
                  backgroundImage={radialGradient(
                    palette.gradients.borderLight.main,
                    palette.gradients.borderLight.state,
                    palette.gradients.borderLight.angle
                  )}
                >
                  <VuiInput
                    type="password"
                    placeholder="Your password..."
                    onChange={(e) => setPassword(e.target.value)}
                    sx={({ typography: { size } }) => ({
                      fontSize: size.sm,
                    })}
                  />
                </GradientBorder>
              </VuiBox>
              <VuiBox mt={4} mb={1} onClick={handleSignUp} disabled={isLoading}>
                <VuiButton style={{ background: "#F5367B", color: "#FFFFFF" }} fullWidth>
                  {isLoading ? 'Signing up...' : 'SIGN UP'}
                </VuiButton>
              </VuiBox>
              <VuiBox mt={3} textAlign="center">
                <VuiTypography variant="button" color="text" fontWeight="regular">
                  Already have an account?{"  "}
                  <VuiTypography
                    component="span"
                    onClick={handleLogInClick}
                    variant="button"
                    color="white"
                    fontWeight="medium"
                    style={{ cursor: "pointer" }}
                  >
                    Log in
                  </VuiTypography>
                </VuiTypography>
              </VuiBox>
            </VuiBox>
          </Slider>
        </div>
      </VuiBox>
      <SignUpModal isOpen={isOpen} onClose={closeModal} message={message} />
    </IllustrationLayout>
  );
}

export default Illustration;
