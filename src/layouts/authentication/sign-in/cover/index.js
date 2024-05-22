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

import { useState } from "react";

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
import VuiBadge from "components/VuiBadge";
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

// Images
import rebirthnft from "assets/images/rebirthnft.png";
import luckynft from "assets/images/luckynft.png";

function Illustration() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
  };

  return (
    <IllustrationLayout
      title="togethër"
      description="COMMUNITY POWERED COMMERCE"
      illustration={{
        image: illustrationImage,
      }}
      top={5}
    >
      <VuiBox component="form" role="form">
        <div className="carousel">
          <Slider {...settings}>
            <div>
              <VuiBox
                color="white"
                bgColor="dark"
                variant="gradient"
                borderRadius="lg"
                shadow="lg"
                opacity={1}
                p={3}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <VuiBox
                  component="img"
                  src={rebirthnft}
                  alt="rebirthnft"
                  shadow="md"
                  width="100%"
                  mb={2}
                  sx={({ borders: { borderRadius }, breakpoints }) => ({
                    cursor: "pointer",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: borderRadius.md,
                    [breakpoints.up("md")]: {
                      borderRadius: borderRadius.lg,
                    },
                  })}
                />

                <VuiBox
                  color="white"
                  bgColor="dark"
                  borderRadius="xl"
                  shadow="lg"
                  opacity={1}
                  py={1}
                  px={3}
                >
                  <VuiTypography color="inherit" style={{ fontSize: "16px", fontWeight: "900" }}>
                    REBIRTH BLUSH + NFT
                  </VuiTypography>
                </VuiBox>

                <VuiTypography variant="caption" color="white" mt={1} mb={2}>
                  *excluding RM10 flat rate nationwide shipping fee
                </VuiTypography>

                <VuiTypography variant="h4" color="white" mb={2}>
                  RM99
                </VuiTypography>

                <VuiBox
                  color="white"
                  borderRadius="lg"
                  shadow="lg"
                  opacity={1}
                  p={2}
                  mb={3}
                  style={{ fontSize: "12px", lineHeight: "1.1rem", background: "#F5367B" }}
                >
                  Experience unmatched luxury with our exclusive NFT Bundle. Elevate your beauty
                  routine and digital collection with a Tyra Hand-Drawn NFT, sought-after blusher,
                  and complimentary perks. Embrace elegance today!
                </VuiBox>

                <VuiBox display="flex" justifyContent="space-between" bgcolor="lightgray" style={{ width: "100%" }} mb={2}>
                  <VuiTypography variant="p" style={{ fontSize: "15px", color: "#718096" }}>
                    The Cheek Canvas: Rebirth Blusher
                  </VuiTypography>
                  <VuiTypography
                    variant="p"
                    color="white"
                    style={{ fontSize: "15px", fontWeight: "900" }}
                    ml="auto"
                  >
                    RM55
                  </VuiTypography>
                </VuiBox>

                <VuiBox display="flex" justifyContent="space-between" bgcolor="lightgray" style={{ width: "100%" }} mb={2}>
                  <VuiTypography variant="p" style={{ fontSize: "15px", color: "#718096" }}>
                    Tyra Hand-drawn NFT
                  </VuiTypography>
                  <VuiTypography
                    variant="p"
                    color="white"
                    style={{ fontSize: "15px", fontWeight: "900" }}
                    ml="auto"
                  >
                    RM55
                  </VuiTypography>
                </VuiBox>

                <VuiBox display="flex" justifyContent="space-between" bgcolor="lightgray" style={{ width: "100%" }} mb={2}>
                  <VuiTypography variant="p" style={{ fontSize: "15px", color: "#718096" }}>
                    Free Vouchers & Perks
                  </VuiTypography>
                  <VuiTypography
                    variant="p"
                    color="white"
                    style={{ fontSize: "15px", fontWeight: "900" }}
                    ml="auto"
                  >
                    RM99
                  </VuiTypography>
                </VuiBox>

                <VuiBox mt={4} mb={1} style={{ width: "100%" }}>
                  <VuiButton style={{ background: "#F5367B", color: "#FFFFFF", cursor: "pointer" }} fullWidth>
                    PRE-ORDER NOW
                  </VuiButton>
                </VuiBox>
              </VuiBox>
            </div>
            <div>
              <VuiBox
                color="white"
                bgColor="dark"
                variant="gradient"
                borderRadius="lg"
                shadow="lg"
                opacity={1}
                p={3}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <VuiBox
                  component="img"
                  src={luckynft}
                  alt="luckynft"
                  shadow="md"
                  width="100%"
                  mb={2}
                  sx={({ borders: { borderRadius }, breakpoints }) => ({
                    cursor: "pointer",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: borderRadius.md,
                    [breakpoints.up("md")]: {
                      borderRadius: borderRadius.lg,
                    },
                  })}
                />

                <VuiBox
                  color="white"
                  bgColor="dark"
                  borderRadius="xl"
                  shadow="lg"
                  opacity={1}
                  py={1}
                  px={3}
                >
                  <VuiTypography color="inherit" style={{ fontSize: "16px", fontWeight: "900" }}>
                    LUCKY BLUSH + NFT
                  </VuiTypography>
                </VuiBox>

                <VuiTypography variant="caption" color="white" mt={1} mb={2}>
                  *excluding RM10 flat rate nationwide shipping fee
                </VuiTypography>

                <VuiTypography variant="h4" color="white" mb={2}>
                  RM99
                </VuiTypography>

                <VuiBox
                  color="white"
                  borderRadius="lg"
                  shadow="lg"
                  opacity={1}
                  p={2}
                  mb={3}
                  style={{ fontSize: "12px", lineHeight: "1.1rem", background: "#F5367B" }}
                >
                  Experience unmatched luxury with our exclusive NFT Bundle. Elevate your beauty
                  routine and digital collection with a Tyra Hand-Drawn NFT, sought-after blusher,
                  and complimentary perks. Embrace elegance today!
                </VuiBox>

                <VuiBox display="flex" justifyContent="space-between" bgcolor="lightgray" style={{ width: "100%" }} mb={2}>
                  <VuiTypography variant="p" style={{ fontSize: "15px", color: "#718096" }}>
                    The Cheek Canvas: Lucky Blusher
                  </VuiTypography>
                  <VuiTypography
                    variant="p"
                    color="white"
                    style={{ fontSize: "15px", fontWeight: "900" }}
                    ml="auto"
                  >
                    RM55
                  </VuiTypography>
                </VuiBox>

                <VuiBox display="flex" justifyContent="space-between" bgcolor="lightgray" style={{ width: "100%" }} mb={2}>
                  <VuiTypography variant="p" style={{ fontSize: "15px", color: "#718096" }}>
                    Tyra Hand-drawn NFT
                  </VuiTypography>
                  <VuiTypography
                    variant="p"
                    color="white"
                    style={{ fontSize: "15px", fontWeight: "900" }}
                    ml="auto"
                  >
                    RM55
                  </VuiTypography>
                </VuiBox>

                <VuiBox display="flex" justifyContent="space-between" bgcolor="lightgray" style={{ width: "100%" }} mb={2}>
                  <VuiTypography variant="p" style={{ fontSize: "15px", color: "#718096" }}>
                    Free Vouchers & Perks
                  </VuiTypography>
                  <VuiTypography
                    variant="p"
                    color="white"
                    style={{ fontSize: "15px", fontWeight: "900" }}
                    ml="auto"
                  >
                    RM99
                  </VuiTypography>
                </VuiBox>

                <VuiBox mt={4} mb={1} style={{ width: "100%" }}>
                  <VuiButton style={{ background: "#F5367B", color: "#FFFFFF", cursor: "pointer" }} fullWidth>
                    PRE-ORDER NOW
                  </VuiButton>
                </VuiBox>
              </VuiBox>
            </div>
          </Slider>
        </div>
        <VuiBox mt={4} mb={1}>
          <VuiButton
            style={{ background: "transparent", color: "#F5367B", border: "1px solid #F5367B" }}
            fullWidth
          >
            LOG OUT
          </VuiButton>
        </VuiBox>
      </VuiBox>
    </IllustrationLayout>
  );
}

export default Illustration;
