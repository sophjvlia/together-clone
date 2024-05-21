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

import { useState, useEffect } from "react";

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

import DefaultPricingCard from "examples/Cards/PricingCards/DefaultPricingCard";

function Illustration() {
  useEffect(() => {
    $(document).ready(function () {
      $('.carousel').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true
      });
    });
  }, []);

  return (
    <IllustrationLayout
      title="Sign In"
      description="Enter your email and password to sign in"
      illustration={{
        image: illustrationImage,
      }}
      top={20}
    >
      <VuiBox component="form" role="form">
        {/* <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Email
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
            <VuiInput type="email" placeholder="Your email..." />
          </GradientBorder>
        </VuiBox>
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
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
            <VuiInput type="password" placeholder="Your password..." />
          </GradientBorder>
        </VuiBox> */}
        <div class="carousel" style={{ display: "flex", overflowX: "hidden" }}>
          <div style={{ minWidth: "100%" }}>
            <DefaultPricingCard
              badge={{ color: "secondary", label: "premium" }}
              price={{ currency: "$", value: "89" }}
              specifications={[
                { label: "10 team members", includes: true },
                { label: "40GB Cloud storage", includes: true },
                { label: "Integration help", includes: true },
                { label: "Sketch Files", includes: true },
                { label: "API Access", includes: false },
                { label: "Complete documentation", includes: false },
              ]}
              action={{
                type: "internal",
                route: "/",
                color: "info",
                label: "join",
              }}
            />
          </div>
          <div style={{ minWidth: "100%" }}>
            <DefaultPricingCard
              badge={{ color: "secondary", label: "premium" }}
              price={{ currency: "$", value: "89" }}
              specifications={[
                { label: "10 team members", includes: true },
                { label: "40GB Cloud storage", includes: true },
                { label: "Integration help", includes: true },
                { label: "Sketch Files", includes: true },
                { label: "API Access", includes: false },
                { label: "Complete documentation", includes: false },
              ]}
              action={{
                type: "internal",
                route: "/",
                color: "info",
                label: "join",
              }}
            />
          </div>
        </div>
        <VuiBox mt={4} mb={1}>
          <VuiButton style={{ background: "#F5367B", color: "#FFFFFF" }} fullWidth>
            SIGN UP
          </VuiButton>
        </VuiBox>
        <VuiBox mt={4} mb={1}>
          <VuiButton
            style={{ background: "transparent", color: "#F5367B", border: "1px solid #F5367B" }}
            fullWidth
          >
            LOG IN
          </VuiButton>
        </VuiBox>
      </VuiBox>
    </IllustrationLayout>
  );
}

export default Illustration;
