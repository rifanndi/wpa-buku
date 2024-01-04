import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Fab,
  Toolbar,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import {
  Check,
  Person4,
  QrCodeScanner,
  Stop,
  Book,
  TextFields,
  Edit,
  Laptop,
  PhoneAndroid,
  ContactSupport,
  Assignment,
  AccountCircle,
  HelpOutline,
} from "@mui/icons-material";
import QrScanner from "qr-scanner";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

let stopScan = false;
let hasilScan = "";

const images = [
  
  "https://example.com/image1.jpg",
  "https://example.com/image2.jpg",
  "https://example.com/image3.jpg",
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
};

function App() {
  const [btnScan, setBtnScan] = useState(true);

  const scanNow = async (isScan) => {
    setBtnScan(isScan);
    if (isScan) stopScan = true;
    if (!btnScan) return;
    stopScan = false;
    await new Promise((r) => setTimeout(r, 100));
    const videoElement = document.getElementById("scanView");
    const scanner = new QrScanner(
      videoElement,
      (result) => {
        hasilScan = result.data;
        setBtnScan(true);
        stopScan = true;
      },
      {
        onDecodeError: (error) => {
          console.error(error);
        },
        maxScansPerSecond: 1,
        highlightScanRegion: true,
        highlightCodeOutline: true,
        returnDetailedScanResult: true,
      }
    );
    await scanner.start();
    while (!stopScan) await new Promise((r) => setTimeout(r, 100));
    scanner.stop();
    scanner.destroy();
  };

  const handleButtonClick = (buttonNumber) => {
    alert(`Button ${buttonNumber} clicked`);
  };

  const buttonStyles = {
    borderRadius: "50%",
    width: "40%",
    height: "105%",
    margin: "8px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const buttonIcons = [
    <Book />,
    <TextFields />,
    <Edit />,
    <Laptop />,
    <PhoneAndroid />,
    <ContactSupport />,
    <Assignment />,
    <AccountCircle />,
    <HelpOutline />,
  ];

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar sx={{ bgcolor: "#8B4513" }}>
        <Toolbar>
          <Avatar sx={{ mr: 1, bgcolor: "black" }}>
            <Person4 />
          </Avatar>
          <Typography variant="h6" sx={{ color: "white", fontFamily: "cursive" }}>
            Sobat Buku
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "20px",
          backgroundColor: "cream",
        }}
      >
        {btnScan === false && (
          <video
            id="scanView"
            style={{
              width: "100%",
              height: "100%",
              borderStyle: "dotted",
              marginBottom: "30%",
            }}
          ></video>
        )}
        {btnScan && (
          <Typography variant="h6" align="center">
            <Slider {...settings}>
              {images.map((image, index) => (
                <div key={index}>
                  <img src={image} alt={`Slide ${index}`} style={{ width: "100%" }} />
                </div>
              ))}
            </Slider>
            <br />
            {hasilScan} gambar
            <Box mt={3} display="flex" justifyContent="center">
              {[1, 2, 3].map((buttonNumber, index) => (
                <Grid item key={buttonNumber}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleButtonClick(buttonNumber)}
                    sx={{ ...buttonStyles, borderRadius: "50%" }}
                  >
                    {buttonIcons[index]}
                  </Button>
                </Grid>
              ))}
            </Box>
            <Box mt={3} display="flex" justifyContent="center">
              {[4, 5, 6].map((buttonNumber, index) => (
                <Grid item key={buttonNumber}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleButtonClick(buttonNumber)}
                    sx={{ ...buttonStyles, borderRadius: "50%" }}
                  >
                    {buttonIcons[index + 3]}
                  </Button>
                </Grid>
              ))}
            </Box>
            <Box mt={3} display="flex" justifyContent="center">
              {[7, 8, 9].map((buttonNumber, index) => (
                <Grid item key={buttonNumber}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleButtonClick(buttonNumber)}
                    sx={{ ...buttonStyles, borderRadius: "50%" }}
                  >
                    {buttonIcons[index + 6]}
                  </Button>
                </Grid>
              ))}
            </Box>
          </Typography>
        )}
      </Box>
      <Typography variant="body2" sx={{ ml: 1, color: "white" }}>
        {btnScan ? "Scan Now" : "Stop Scan"}
      </Typography>
      <Fab
        color={btnScan ? "primary" : "secondary"}
        onClick={() => scanNow(!btnScan)}
        sx={{
          position: "fixed",
          bottom: 50,
          right: 16,
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        {btnScan ? <QrCodeScanner /> : <Stop />}
      </Fab>
      {!btnScan && (
        <Fab
          color="primary"
          onClick={() => {
            alert(
              "Buku ini asli,\n" +
                "Judul: cenmetography,\n" +
                "Penerbit: Andi,\n" +
                "Jumlah halaman: 518,\n" +
                "Pengarang: M. Suyanto"
            );
          }}
          sx={{
            position: "fixed",
            bottom: 50,
            right: 96,
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Check />
        </Fab>
      )}
    </React.Fragment>
  );
}

export default App;
