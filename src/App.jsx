import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

import axios from "axios";

// Animated gradient background
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(-45deg, #0f0c29, #302b63, #24243e);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
  padding: 20px;
  position: relative;
  overflow: hidden;
`;

const ContentBox = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  max-width: 1000px;
  width: 90%;
  z-index: 1;
  position: relative;
`;

const DomainHeader = styled(motion.h1)`
  font-family: "Courier New", monospace;
  font-size: 4rem;
  color: #2c3e50;
  margin: 0 0 20px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const FeatureList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  margin: 40px 0;
`;

const FeatureItem = styled(motion.div)`
  padding: 25px;
  background: rgba(255, 255, 255, 0.98);
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const NewsTicker = styled(motion.div)`
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 15px;
  border-radius: 8px;
  margin: 20px 0;
  width: 100%;
  overflow: hidden;
`;

const CryptoStats = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 30px 0;
  flex-wrap: wrap;
  gap: 20px;
`;

const StatItem = styled(motion.div)`
  text-align: center;
  padding: 15px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  min-width: 150px;
`;

const FloatingBitcoin = styled(motion.div)`
  position: absolute;
  font-size: 2rem;
  opacity: 0.3;
  pointer-events: none;
`;

function App() {
  const [price, setPrice] = useState(null);
  const [stats, setStats] = useState(null);

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
        );
        setPrice(response.data.bitcoin.usd);
      } catch (error) {
        console.error("Error fetching Bitcoin price:", error);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      {[...Array(10)].map((_, i) => (
        <FloatingBitcoin
          key={i}
          initial={{ y: 0, x: Math.random() * 100 }}
          animate={{
            y: [0, 100, 0],
            x: Math.random() * 100,
            rotate: [0, 360],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          ₿
        </FloatingBitcoin>
      ))}

      <ContentBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <DomainHeader
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          b1tcoinx.xyz
        </DomainHeader>

        <NewsTicker
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          🚀 Next-Generation Crypto Trading Platform • 🔒 Secure & Decentralized
          • 💸 Lowest Fees in the Market
        </NewsTicker>

        <CryptoStats>
          <StatItem
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3>BTC Price</h3>
            <p>${price ? price.toLocaleString() : "Loading..."}</p>
          </StatItem>
          <StatItem
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3>24h Volume</h3>
            <p>$42B+</p>
          </StatItem>
          <StatItem
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h3>Market Cap</h3>
            <p>$800B+</p>
          </StatItem>
        </CryptoStats>

        <FeatureList>
          {["Instant Exchange", "Cold Storage", "Margin Trading"].map(
            (feature, i) => (
              <FeatureItem
                key={feature}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 + 0.8 }}
              >
                <h3>{feature}</h3>
                <p>Powered by b1tcoinx.xyz's proprietary technology</p>
              </FeatureItem>
            )
          )}
        </FeatureList>

        <motion.a
          href="https://www.b1tcoin.ai/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            background: "linear-gradient(45deg, #23d5ab, #23a6d5)",
            color: "white",
            padding: "15px 40px",
            borderRadius: "30px",
            textDecoration: "none",
            marginTop: "30px",
            fontSize: "1.2rem",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Launch Trading Platform
        </motion.a>
      </ContentBox>
    </Container>
  );
}

export default App;
