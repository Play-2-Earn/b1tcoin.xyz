import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRocket,
  faShieldHalved,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";

// Cyberpunk animations
const glitch = keyframes`
  0% { text-shadow: 0.05em 0 0 rgba(255,0,0,.75), -0.05em -0.025em 0 rgba(0,255,0,.75), -0.025em 0.05em 0 rgba(0,0,255,.75); }
  14% { text-shadow: 0.05em 0 0 rgba(255,0,0,.75), -0.05em -0.025em 0 rgba(0,255,0,.75), -0.025em 0.05em 0 rgba(0,0,255,.75); }
  15% { text-shadow: -0.05em -0.025em 0 rgba(255,0,0,.75), 0.025em 0.025em 0 rgba(0,255,0,.75), -0.05em -0.05em 0 rgba(0,0,255,.75); }
  49% { text-shadow: -0.05em -0.025em 0 rgba(255,0,0,.75), 0.025em 0.025em 0 rgba(0,255,0,.75), -0.05em -0.05em 0 rgba(0,0,255,.75); }
  50% { text-shadow: 0.025em 0.05em 0 rgba(255,0,0,.75), 0.05em 0 0 rgba(0,255,0,.75), 0 -0.05em 0 rgba(0,0,255,.75); }
  99% { text-shadow: 0.025em 0.05em 0 rgba(255,0,0,.75), 0.05em 0 0 rgba(0,255,0,.75), 0 -0.05em 0 rgba(0,0,255,.75); }
  100% { text-shadow: -0.025em 0 0 rgba(255,0,0,.75), -0.025em -0.025em 0 rgba(0,255,0,.75), -0.025em -0.05em 0 rgba(0,0,255,.75); }
`;

const scanline = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`;

const Container = styled.div`
  min-height: 100vh;
  background: #0a0a0a;
  color: #00f3ff;
  font-family: "Courier New", monospace;
  position: relative;
  overflow: hidden;
  padding: 2rem;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      transparent 50%,
      rgba(0, 243, 255, 0.1) 50%
    );
    background-size: 5px 5px;
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      0deg,
      transparent 0%,
      rgba(0, 243, 255, 0.1) 2%,
      transparent 4%
    );
    animation: ${scanline} 6s linear infinite;
    pointer-events: none;
  }
`;

const CyberHeader = styled(motion.h1)`
  font-size: 4.5rem;
  text-transform: uppercase;
  text-align: center;
  margin: 2rem 0;
  position: relative;
  animation: ${glitch} 2s infinite;
  text-shadow: 0 0 10px #00f3ff;

  &::before {
    content: "▶▶▶ ${(props) => props.children} ◀◀◀";
    position: absolute;
    color: rgba(0, 243, 255, 0.3);
    width: 100%;
    left: 0;
    top: -0.5em;
    font-size: 0.6em;
  }

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 3rem auto;
  position: relative;
  z-index: 1;
`;

const Card = styled(motion.div)`
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid #00f3ff;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0 0 20px rgba(0, 243, 255, 0.2);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(0, 243, 255, 0.2),
      transparent
    );
    transform: rotate(45deg);
  }
`;

const TerminalText = styled.div`
  color: #00f3ff;
  font-size: 1.1rem;
  line-height: 1.6;
  position: relative;

  strong {
    color: #ff003c;
    font-weight: normal;
  }
`;

const CtaButton = styled(motion.a)`
  display: block;
  width: fit-content;
  margin: 3rem auto;
  padding: 1.5rem 3rem;
  background: #00f3ff;
  color: #0a0a0a;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
  border: 2px solid #00f3ff;
  position: relative;
  overflow: hidden;
  transition: 0.3s all;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const FeatureIcon = styled(FontAwesomeIcon)`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  filter: drop-shadow(0 0 5px #00f3ff);
`;

function App() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Container>
      <CyberHeader initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        b1tcoinx.xyz
      </CyberHeader>

      <Grid>
        <Card
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <FeatureIcon icon={faRocket} />
          <TerminalText>
            INITIALIZING <strong>b1tcoinx.xyz</strong> PROTOCOL
            <br />
            █ LOADING NEXT-GEN TRADING PLATFORM
            <br />
            █ CRYPTO-OPTIMIZED ARCHITECTURE ACTIVE
            <br />█ REAL-TIME BLOCKCHAIN ANALYSIS ENABLED
          </TerminalText>
        </Card>

        <Card
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <FeatureIcon icon={faShieldHalved} />
          <TerminalText>
            SECURITY STATUS
            <br />█ QUANTUM-RESISTANT ENCRYPTION: <strong>ACTIVE</strong>
            <br />█ MULTISIG WALLETS: <strong>ONLINE</strong>
            <br />█ COLD STORAGE VAULTS: <strong>SECURED</strong>
            <br />█ <strong>b1tcoinx.xyz</strong> DEFENSE GRID: OPERATIONAL
          </TerminalText>
        </Card>

        <Card
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <FeatureIcon icon={faChartLine} />
          <TerminalText>
            SYSTEM METRICS
            <br />
            █ PLATFORM UPTIME: 99.999%
            <br />█ TRANSACTION SPEED: <strong>4500 TPS</strong>
            <br />█ ACTIVE USERS: <strong>1.2M+</strong>
            <br />█ CURRENT TIME: {time.toLocaleTimeString()}
          </TerminalText>
        </Card>
      </Grid>

      <CtaButton
        href="https://www.b1tcoin.ai/"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        ACCESS TRADING TERMINAL
      </CtaButton>
    </Container>
  );
}

export default App;
