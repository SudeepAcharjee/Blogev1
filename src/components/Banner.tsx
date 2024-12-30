import React, { useEffect, useState, useRef } from 'react';
import { ReactComponent as Forest } from 'assets/source.svg';
import styles from './Banner.module.css';

export default function Banner() {
  const bannerRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [clientWidth, setClientWidth] = useState(
    document.documentElement.clientWidth
  );
  const [bannerHeight, setBannerHeight] = useState(0);

  const updateBannerHeight = () => {
    if (bannerRef.current) {
      //@ts-ignore
      const newHeight = bannerRef.current.clientHeight;
      setBannerHeight(newHeight);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      setClientWidth(document.documentElement.clientWidth);
      updateBannerHeight();
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    updateBannerHeight();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (clientWidth > 800) {
      const sun = document.getElementById('sun') as HTMLElement;
      const grayClouds = document.getElementById('gray-clouds') as HTMLElement;
      const whiteClouds = document.getElementById(
        'white-clouds'
      ) as HTMLElement;
      const bird1 = document.getElementById('bird1') as HTMLElement;
      const bird2 = document.getElementById('bird2') as HTMLElement;
      const bird3 = document.getElementById('bird3') as HTMLElement;
      const mountain0 = document.getElementById('mountain0') as HTMLElement;
      const mountain1 = document.getElementById('mountain1') as HTMLElement;
      const mountain2 = document.getElementById('mountain2') as HTMLElement;
      const mountain3 = document.getElementById('mountain3') as HTMLElement;
      const mountain4 = document.getElementById('mountain4') as HTMLElement;
      const mountain5 = document.getElementById('mountain5') as HTMLElement;
      const mountain6 = document.getElementById('mountain6') as HTMLElement;
      const mountain7 = document.getElementById('mountain7') as HTMLElement;

      sun.style.transform = `translateY(${scrollY * 1.05}px)`;
      grayClouds.style.transform = `translateX(${scrollY * 0.125}px)`;
      whiteClouds.style.transform = `translateX(${scrollY * -0.125}px)`;
      bird1.style.transform = `translateX(${scrollY}px)`;
      bird2.style.transform = `translateX(-${scrollY * 3.5}px)`;
      bird3.style.transform = `translateX(-${scrollY * 0.5}px)`;
      mountain0.style.transform = `translateY(${scrollY * 0.95}px)`;
      mountain1.style.transform = `translateY(${scrollY * 0.93}px)`;
      mountain2.style.transform = `translateY(${scrollY * 0.9}px)`;
      mountain3.style.transform = `translateY(${scrollY * 0.8}px)`;
      mountain4.style.transform = `translateY(${scrollY * 0.7}px)`;
      mountain5.style.transform = `translateY(${scrollY * 0.6}px)`;
      mountain6.style.transform = `translateY(${scrollY * 0.3}px)`;
      mountain7.style.transform = `translateY(${scrollY * 0.1}px)`;
    }
  }, [scrollY, clientWidth]);

  useEffect(() => {
    const bannerGap = document.getElementById('bannerGap') as HTMLElement;

    if (clientWidth > 800) {
      bannerGap.style.height = `${bannerHeight}px`;
    } else {
      bannerGap.style.height = `${bannerHeight - 40}px`;
    }
  }, [bannerHeight, clientWidth]);

  return (
    <div>
      <div id="bannerGap" />
      <div ref={bannerRef} className={styles.bannerWrapper}>
        <Forest />
      </div>
    </div>
  );
}
