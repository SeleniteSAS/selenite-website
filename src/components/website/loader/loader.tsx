"use client";

import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";

import { type LoaderState, useLoaderStore } from "@/store/3d-store";

import Lenis from "lenis";

export default function Loader() {
  const progress: number = useLoaderStore((state: LoaderState): number => state.moonProgress);
  const isLoaded: boolean = useLoaderStore((state: LoaderState): boolean => state.isMooonLoaded);

  const [isLoadingOver, setIsLoadingOver] = useState<boolean>(false);
  const [isDisplayed, setIsDisplayed] = useState<boolean>(true);
  const [startTime] = useState<number>(Date.now());

  const [currentTime, setCurrentTime] = useState<number>(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const lenis: Lenis | undefined = useLenis();

  useEffect((): void => {
    if (!isLoaded) {
      if (lenis) {
        lenis.stop();
      }
    } else if (lenis) {
      lenis.start();
    }
  }, [lenis, isLoaded]);

  useEffect((): void => {
    if (isLoaded) {
      const elapsed: number = Date.now() - startTime;
      const delay: number = Math.max(2000 - elapsed, 0);

      setTimeout((): void => {
        setIsDisplayed(false);
      }, delay + 1000);

      setTimeout((): void => {
        setIsLoadingOver(true);
      }, delay + 500);
    }
  }, [isLoaded, startTime]);

  useEffect((): void => {
    if (isDisplayed) return;

    document.body.classList.add("is-loaded");
  }, [isDisplayed]);

  if (!isDisplayed) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black"
      style={{
        transition: "opacity 500ms",
        opacity: isLoadingOver ? 0 : 1,
      }}
    >
      <div className="flex w-full items-center justify-between px-16">
        <p className="font-orbitron text-2xl">SELENITE</p>
        <div className="flex items-center gap-4">
          {/* Percentage in the form 001% or 100%*/}
          <p className="font-orbitron text-2xl">{progress.toString().padStart(3, "0")}%</p>

          <p className="flex justify-center font-orbitron text-2xl leading-none">
            {`${Math.floor((currentTime - startTime) / 60000)
              .toString()
              .padStart(2, "0")}:${Math.floor(((currentTime - startTime) % 60000) / 1000)
              .toString()
              .padStart(2, "0")}:${Math.floor(((currentTime - startTime) % 1000) / 10)
              .toString()
              .padStart(2, "0")}`
              .split("")
              .map((char, index) => (
                <span
                  key={`${char}-${index}`}
                  className={`inline-block ${char === ":" ? "w-auto" : "w-[1ch]"} text-center`}
                >
                  {char}
                </span>
              ))}
          </p>
          <svg
            width="30"
            height="30"
            viewBox="0 0 101 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className="animate-spin"
          >
            <rect x="49.54" y="4.09998" width="0.96" height="12.96" fill="url(#pattern0_1_5)" />
            <rect x="43.78" y="4.09998" width="3.36" height="13.2" fill="url(#pattern1_1_5)" />
            <rect x="38.26" y="5.06006" width="5.04" height="13.2" fill="url(#pattern2_1_5)" />
            <rect x="32.98" y="6.73999" width="6.48" height="12.72" fill="url(#pattern3_1_5)" />
            <rect x="27.9399" y="8.90002" width="7.68" height="12.24" fill="url(#pattern4_1_5)" />
            <rect x="23.1399" y="11.78" width="8.88" height="11.52" fill="url(#pattern5_1_5)" />
            <rect x="18.8201" y="15.14" width="10.08" height="10.8" fill="url(#pattern6_1_5)" />
            <rect x="14.98" y="18.98" width="11.04" height="9.84" fill="url(#pattern7_1_5)" />
            <rect x="11.6201" y="23.3" width="11.76" height="8.88" fill="url(#pattern8_1_5)" />
            <rect x="8.97998" y="27.86" width="12.24" height="7.68" fill="url(#pattern9_1_5)" />
            <rect x="6.58008" y="33.14" width="12.96" height="6.24" fill="url(#pattern10_1_5)" />
            <rect x="5.13989" y="38.42" width="12.96" height="4.8" fill="url(#pattern11_1_5)" />
            <rect x="4.17993" y="43.9399" width="13.2" height="3.36" fill="url(#pattern12_1_5)" />
            <rect x="3.93994" y="49.46" width="13.2" height="2.16" fill="url(#pattern13_1_5)" />
            <rect x="4.17993" y="53.78" width="13.2" height="3.36" fill="url(#pattern14_1_5)" />
            <rect x="5.13989" y="57.86" width="12.96" height="4.8" fill="url(#pattern15_1_5)" />
            <rect x="6.58008" y="61.7" width="12.96" height="6.24" fill="url(#pattern16_1_5)" />
            <rect x="8.73999" y="65.3" width="12.48" height="7.68" fill="url(#pattern17_1_5)" />
            <rect x="11.6201" y="68.9" width="11.76" height="8.88" fill="url(#pattern18_1_5)" />
            <rect x="14.98" y="72.02" width="11.04" height="10.08" fill="url(#pattern19_1_5)" />
            <rect x="18.8201" y="75.14" width="10.08" height="10.8" fill="url(#pattern20_1_5)" />
            <rect x="23.1399" y="77.54" width="8.88" height="11.76" fill="url(#pattern21_1_5)" />
            <rect x="27.9399" y="79.7" width="7.68" height="12.48" fill="url(#pattern22_1_5)" />
            <rect x="32.98" y="81.62" width="6.24" height="12.72" fill="url(#pattern23_1_5)" />
            <rect x="38.26" y="82.8199" width="5.04" height="12.96" fill="url(#pattern24_1_5)" />
            <rect x="43.78" y="83.54" width="3.36" height="13.2" fill="url(#pattern25_1_5)" />
            <rect x="49.3" y="84.02" width="2.16" height="12.96" fill="url(#pattern26_1_5)" />
            <rect x="53.6201" y="83.54" width="3.36" height="13.2" fill="url(#pattern27_1_5)" />
            <rect x="57.7" y="82.8199" width="4.8" height="13.2" fill="url(#pattern28_1_5)" />
            <rect x="61.54" y="81.62" width="6.48" height="12.72" fill="url(#pattern29_1_5)" />
            <rect x="65.3799" y="79.9399" width="7.68" height="12.24" fill="url(#pattern30_1_5)" />
            <rect x="68.98" y="77.78" width="8.64" height="11.52" fill="url(#pattern31_1_5)" />
            <rect x="72.1001" y="75.14" width="9.84" height="10.8" fill="url(#pattern32_1_5)" />
            <rect x="74.98" y="72.26" width="11.04" height="9.84" fill="url(#pattern33_1_5)" />
            <rect x="77.6201" y="68.9" width="11.76" height="8.88" fill="url(#pattern34_1_5)" />
            <rect x="79.78" y="65.54" width="12.24" height="7.44" fill="url(#pattern35_1_5)" />
            <rect x="81.46" y="61.7" width="12.96" height="6.24" fill="url(#pattern36_1_5)" />
            <rect x="82.8999" y="57.86" width="12.96" height="4.8" fill="url(#pattern37_1_5)" />
            <rect x="83.6201" y="53.78" width="13.2" height="3.36" fill="url(#pattern38_1_5)" />
            <rect x="83.8601" y="49.46" width="13.2" height="2.16" fill="url(#pattern39_1_5)" />
            <rect x="83.6201" y="43.9399" width="13.2" height="3.36" fill="url(#pattern40_1_5)" />
            <rect x="82.8999" y="38.42" width="12.96" height="4.8" fill="url(#pattern41_1_5)" />
            <rect x="81.46" y="33.14" width="12.96" height="6.24" fill="url(#pattern42_1_5)" />
            <rect x="79.78" y="28.1" width="12.48" height="7.44" fill="url(#pattern43_1_5)" />
            <rect x="77.6201" y="23.3" width="11.76" height="8.88" fill="url(#pattern44_1_5)" />
            <rect x="75.22" y="18.98" width="10.8" height="9.84" fill="url(#pattern45_1_5)" />
            <rect x="72.1001" y="15.14" width="10.08" height="10.8" fill="url(#pattern46_1_5)" />
            <rect x="68.98" y="11.78" width="8.88" height="11.52" fill="url(#pattern47_1_5)" />
            <rect x="65.3799" y="8.90002" width="7.68" height="12.24" fill="url(#pattern48_1_5)" />
            <rect x="61.78" y="6.73999" width="6.24" height="12.72" fill="url(#pattern49_1_5)" />
            <rect x="57.7" y="5.06006" width="5.04" height="13.2" fill="url(#pattern50_1_5)" />
            <rect x="53.8601" y="4.09998" width="3.36" height="13.2" fill="url(#pattern51_1_5)" />
            <rect x="50.5" y="4.09998" width="0.96" height="12.96" fill="url(#pattern52_1_5)" />

            <path
              d="M50.5 54.5C52.7091 54.5 54.5 52.7091 54.5 50.5C54.5 48.2909 52.7091 46.5 50.5 46.5C48.2909 46.5 46.5 48.2909 46.5 50.5C46.5 52.7091 48.2909 54.5 50.5 54.5Z"
              fill="black"
            />
            <defs>
              <pattern id="pattern0_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image0_1_5" transform="scale(0.25 0.0185185)" />
              </pattern>
              <pattern id="pattern1_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image1_1_5" transform="scale(0.0714286 0.0181818)" />
              </pattern>
              <pattern id="pattern2_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image2_1_5" transform="scale(0.047619 0.0181818)" />
              </pattern>
              <pattern id="pattern3_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image3_1_5" transform="scale(0.037037 0.0188679)" />
              </pattern>
              <pattern id="pattern4_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image4_1_5" transform="scale(0.03125 0.0196078)" />
              </pattern>
              <pattern id="pattern5_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image5_1_5" transform="scale(0.027027 0.0208333)" />
              </pattern>
              <pattern id="pattern6_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image6_1_5" transform="scale(0.0238095 0.0222222)" />
              </pattern>
              <pattern id="pattern7_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image7_1_5" transform="scale(0.0217391 0.0243902)" />
              </pattern>
              <pattern id="pattern8_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image8_1_5" transform="scale(0.0204082 0.027027)" />
              </pattern>
              <pattern id="pattern9_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image9_1_5" transform="scale(0.0196078 0.03125)" />
              </pattern>
              <pattern id="pattern10_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image10_1_5" transform="scale(0.0185185 0.0384615)" />
              </pattern>
              <pattern id="pattern11_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image11_1_5" transform="scale(0.0185185 0.05)" />
              </pattern>
              <pattern id="pattern12_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image12_1_5" transform="scale(0.0181818 0.0714286)" />
              </pattern>
              <pattern id="pattern13_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image13_1_5" transform="scale(0.0181818 0.111111)" />
              </pattern>
              <pattern id="pattern14_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image14_1_5" transform="scale(0.0181818 0.0714286)" />
              </pattern>
              <pattern id="pattern15_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image15_1_5" transform="scale(0.0185185 0.05)" />
              </pattern>
              <pattern id="pattern16_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image16_1_5" transform="scale(0.0185185 0.0384615)" />
              </pattern>
              <pattern id="pattern17_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image17_1_5" transform="scale(0.0192308 0.03125)" />
              </pattern>
              <pattern id="pattern18_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image18_1_5" transform="scale(0.0204082 0.027027)" />
              </pattern>
              <pattern id="pattern19_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image19_1_5" transform="scale(0.0217391 0.0238095)" />
              </pattern>
              <pattern id="pattern20_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image20_1_5" transform="scale(0.0238095 0.0222222)" />
              </pattern>
              <pattern id="pattern21_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image21_1_5" transform="scale(0.027027 0.0204082)" />
              </pattern>
              <pattern id="pattern22_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image22_1_5" transform="scale(0.03125 0.0192308)" />
              </pattern>
              <pattern id="pattern23_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image23_1_5" transform="scale(0.0384615 0.0188679)" />
              </pattern>
              <pattern id="pattern24_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image24_1_5" transform="scale(0.047619 0.0185185)" />
              </pattern>
              <pattern id="pattern25_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image25_1_5" transform="scale(0.0714286 0.0181818)" />
              </pattern>
              <pattern id="pattern26_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image26_1_5" transform="scale(0.111111 0.0185185)" />
              </pattern>
              <pattern id="pattern27_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image27_1_5" transform="scale(0.0714286 0.0181818)" />
              </pattern>
              <pattern id="pattern28_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image28_1_5" transform="scale(0.05 0.0181818)" />
              </pattern>
              <pattern id="pattern29_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image29_1_5" transform="scale(0.037037 0.0188679)" />
              </pattern>
              <pattern id="pattern30_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image30_1_5" transform="scale(0.03125 0.0196078)" />
              </pattern>
              <pattern id="pattern31_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image31_1_5" transform="scale(0.0277778 0.0208333)" />
              </pattern>
              <pattern id="pattern32_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image32_1_5" transform="scale(0.0243902 0.0222222)" />
              </pattern>
              <pattern id="pattern33_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image33_1_5" transform="scale(0.0217391 0.0243902)" />
              </pattern>
              <pattern id="pattern34_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image34_1_5" transform="scale(0.0204082 0.027027)" />
              </pattern>
              <pattern id="pattern35_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image35_1_5" transform="scale(0.0196078 0.0322581)" />
              </pattern>
              <pattern id="pattern36_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image36_1_5" transform="scale(0.0185185 0.0384615)" />
              </pattern>
              <pattern id="pattern37_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image37_1_5" transform="scale(0.0185185 0.05)" />
              </pattern>
              <pattern id="pattern38_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image38_1_5" transform="scale(0.0181818 0.0714286)" />
              </pattern>
              <pattern id="pattern39_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image39_1_5" transform="scale(0.0181818 0.111111)" />
              </pattern>
              <pattern id="pattern40_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image40_1_5" transform="scale(0.0181818 0.0714286)" />
              </pattern>
              <pattern id="pattern41_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image41_1_5" transform="scale(0.0185185 0.05)" />
              </pattern>
              <pattern id="pattern42_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image42_1_5" transform="scale(0.0185185 0.0384615)" />
              </pattern>
              <pattern id="pattern43_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image43_1_5" transform="scale(0.0192308 0.0322581)" />
              </pattern>
              <pattern id="pattern44_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image44_1_5" transform="scale(0.0204082 0.027027)" />
              </pattern>
              <pattern id="pattern45_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image45_1_5" transform="scale(0.0222222 0.0243902)" />
              </pattern>
              <pattern id="pattern46_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image46_1_5" transform="scale(0.0238095 0.0222222)" />
              </pattern>
              <pattern id="pattern47_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image47_1_5" transform="scale(0.027027 0.0208333)" />
              </pattern>
              <pattern id="pattern48_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image48_1_5" transform="scale(0.03125 0.0196078)" />
              </pattern>
              <pattern id="pattern49_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image49_1_5" transform="scale(0.0384615 0.0188679)" />
              </pattern>
              <pattern id="pattern50_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image50_1_5" transform="scale(0.047619 0.0181818)" />
              </pattern>
              <pattern id="pattern51_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image51_1_5" transform="scale(0.0714286 0.0181818)" />
              </pattern>
              <pattern id="pattern52_1_5" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image52_1_5" transform="scale(0.25 0.0185185)" />
              </pattern>
              <image
                id="image0_1_5"
                width="4"
                height="54"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAA2CAYAAADgQzjYAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAOklEQVQoU2P8////PwYkwMSABugiwEhQxX+CKugjgOFSDIcR9sug9RwZAoPWt0RGFIogQUMJC1DFcwBn6wpp6VnOWQAAAABJRU5ErkJggg=="
              />
              <image
                id="image1_1_5"
                width="14"
                height="55"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAA3CAYAAAA8PXu0AAAACXBIWXMAAC4jAAAuIwF4pT92AAAAwUlEQVRIS+WTwQ6EMAhER2P0/z93e6knjUVgoDabrPuOTV+GAp1qrSAUAKs8XAB8xNkkL2nM7ILFDGBjlzS0RO3RRR48KlXS3Rw6H2BwqSEOMT0SK5G+83GpaTJisz0ZsWGIKEfidtZLdHd2SKmS75faneiSFc/tkWL4e2UTT5hoNoiJJj8uXkdirh1LHNrVAvSJAGKiWm5EVBsUEVOJ9JdEElX+QCxR8TYST3RHEk28bU9UTJXq8iLxOpKmQUw02QFdgRd6U8c9IwAAAABJRU5ErkJggg=="
              />
              <image
                id="image2_1_5"
                width="21"
                height="55"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAA3CAYAAADjcwGrAAAACXBIWXMAAC4jAAAuIwF4pT92AAAA/UlEQVRYR92YQQ6DMAwEN6gn1P+/FLi6h0oohMRrOxDUzo3KGjnrGKQmEYHCCiABmLWiklfxvOAr6SKJyFL+VquDo9sJwJsVeZlYQYSaVJ2chVs7ZbkKgI3U7LQ67Yrg1uOXdC1ALs1zrR3fnOvQ43dRSlkEJoZ0yjANyys1UZN25zqsUwbN1SJ1R9CSslehiqVTN1GpmmtUqqJJw/d1eKdhmFSLoDksJg3xX1JtZau5WqQ5pvvqlZp4VOpaWatU4zSsK6QnHpeac/VINQ65XiU94JWavrJeaU4z1x5pkyul+7AiUnq1IlLKT0gFwBaVqrlGpRpz+ceMl+qGfQAPZy2YaFlnlAAAAABJRU5ErkJggg=="
              />
              <image
                id="image3_1_5"
                width="27"
                height="53"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAA1CAYAAACwcpATAAAACXBIWXMAAC4jAAAuIwF4pT92AAABIUlEQVRYR82YSw7CMAxE3Yp94f6HBE4QVkhW42T8mVDeqqkiPc0kNRJba00MXup5E5HD2hTldlprCZ2ttfbU69E+IaTb0QYmu4g81No8QBZWMkvYRORtvA/xlel0y/j5mVksqVLLlld5aY3oMyhVeWkyD+l0lgxVmSaTLM1IhtKlqvyLZEuYydBECVfpTUa5lUiGLkoIJEOEqqzKQnhktCo9Mg+uKr2yWTp3Wq8M4booWZk7jSYiQxMFEpEhYJVRWSldVKYJn1tFZjGtMiNLT5SMLE1WhiaKWWVWhjDrXSUzqcjQRemqrMjCVGWzidJdlKosBFMGP3CGzF0lQ6aZpmPJXD89LJlmOL5WyIYwZWiiUGUQtmx0UQ6R/m9bJvfziw/ScTy3uk+LVAAAAABJRU5ErkJggg=="
              />
              <image
                id="image4_1_5"
                width="32"
                height="51"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAzCAYAAAD2OArBAAAACXBIWXMAAC4jAAAuIwF4pT92AAABU0lEQVRYR82Ya27CMBAGPyOOQHv/8xXu4P6J1Q31et8OIyECRGI0TrxSWu8dDE8ADcCDOyGDNhF40t+P9zKJOzmmf7yN1nv/GcfcOcd7SYUbOWYvhkpuAL7J55nE+O41+S0MLXAJQ+CyCh9TALiownsBrUQa3iVIqzATkCqk4inQj1dKBU5gWwVtAU4iXGElQCtwgypMpEDKviAJ0AolSALAn8S4+inhChqBUrQCq9syVEErIOHeKywCms3JXMEiUIJVYHVbumaEVYDiXneKRyD1WvAISJjKeAU0W7SqglcAOG/R76grRAQ0iBWiAqtBpSIqsEI1IzIENIOKJUNAA1shS0DaolmyBCTYGZEpsNoXWDIFAHlz+lchW8BMhYCpQoWAiSoBdYUqATWVAtJt+QJqBSjsjJg9Lc+GexbdgD0FuKXowPlx/W6+gD1LMBhLcZqcv7GMW3+wSuVAAAAAAElFTkSuQmCC"
              />
              <image
                id="image5_1_5"
                width="37"
                height="48"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAwCAYAAACWhbMrAAAACXBIWXMAAC4jAAAuIwF4pT92AAABUklEQVRYR83WQXKDMAyF4R+ml0h6/6OVHIMuijMO2JZkW6Jvw0BYfPOkOFn2faeQDViy+0fpJa+shWfbcS1qI3JGbXwmwV4EZjnG98PnuC7vHdeQMa78geDGcZ2zAt/ZfQ0WOsa0UzmsljBY6dt3+xhzlGaMKa5tnZuSxihhp6Q0vhQJ4NZWCWVpywVWayrBpCPCJa3xaWHT22qhNHGBSSipLZdIKJBh09vSoCAYpkWFxoKS2koZbsuCgjZs2qFqRYWkByW1Nbz0PSiQ92sI1osCGdadEVSe1uKb2xpFaf/mmGCjKHAY4wyUFHNbs1BSWybYLBTIMHVmokA+WEHR1myUNk2YB0rTVjMeKNDtV7UtLxTUYeKPtieqO94ozX5d2vJGQQcsAmVOFMrUVhQKDLBIFOjOr3BUK++27kCJbd2BgvZpzxf/K0+4rym4tvVMH/wCN/VipmjE4uAAAAAASUVORK5CYII="
              />
              <image
                id="image6_1_5"
                width="42"
                height="45"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAtCAYAAADYxvnjAAAACXBIWXMAAC4jAAAuIwF4pT92AAABWUlEQVRYR83XQXLDIAyF4b8+iMv9T9X0Iu6i0IKDhbBB6G3ExCy+kYWZfBzHQSXf2XqvbbDOVvntBeT6HL0sZ+grW7vC5tAcmeIGm6Bf0iYP2fhHVk8VTrq6AaG1CQfY9OpDrFddPT8zx+aHKcQqYfOYYs+fpxCrZl7BEFv74IdYXWFrUOjHTs8VFPqw07sqQcERtgUFJ1gNVJPpWC00xLrsQtBCoR87ND1Q0GFThna1Fwpt7JQRuAOFBdi7UDDGPoGCIfYpFIywI6Cg+5fwKKOg8Is9qHf2cVdHQkEeg0fY0VCQx+A2dgY0RTpc6ZkaOwsaYh121c6CwmDsTCjoD1czs6HQxqrm1QIK7TFoYq2gUGKlUahiLaGgv2rfsNZQaM9sSoFdAYUb2FVQaB+wIiuhcI196+pqqJQC6wEaYpVGYPcABXkEdvD16kOsOfYzLTxBocT+IQF+AN7TcnGmArF7AAAAAElFTkSuQmCC"
              />
              <image
                id="image7_1_5"
                width="46"
                height="41"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAApCAYAAABKvBuPAAAACXBIWXMAAC4jAAAuIwF4pT92AAABc0lEQVRYR9WXS2KDMAwFB66Scv8DpTkL3eBUUeUv/qizCcEshpdnEbbzPDF4XZ8Pa9EDu3HuWxy/cIoWl9IBl/JSXErr/riT366OW0m/r1HfXfR+B56Za1ymH6pijhaBO/kdOK7jfyW/qTkeaqN7HbDOL+m8HocHaaxfZUny1gPoIF2b01ifLm+Jw698zQ1MlY+JQ/mmlUyTT4lDmfyS2uipkuJJfNpgrA2dNrnEJSWbVjI0+ZrEA7lZb611T78m8UBJ7zXd028RBwcPqlZxKO/8kFnf0nGL3MRBrd/u/J3EJbn0oXPyvcRhsnxPcSj7jyNplu8tDvlx2eVB1Wtzxsht2uYNOyJxSUnvA1XJjxaHtHxzbUZXRZKqTfW77IzEA7nkq9KfKQ75zhe/Ds6siubWxJmduCSXvuRP8ivFId97yYf8anFolPcgDg3yKzenRfGs9yYeiN1AOPfwUhVNrDon12j0Kg62/Fc48CwOn/JvaYAf7sB+lrPKWc4AAAAASUVORK5CYII="
              />
              <image
                id="image8_1_5"
                width="49"
                height="37"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAlCAYAAADr2wGRAAAACXBIWXMAAC4jAAAuIwF4pT92AAABTElEQVRYR9WWSw6DMAwFH5yGcv+zUG5DF5Wlp+DEJoTEzKp8Fp1OnHQ6jgMJO31e0ocRmZNrFtCuQ5JKnLLgBSITLacv31feBYIuLynBAsC/yGuqpMspRZPZEUxmBrBZL2UIIzIDWKEvHSb08uLB3pAfaKH0fNjQT8phd0dmiIgmAdwTATrL5CQEjwygv9NNxNpiPUMPDB56qwQTtopVgvFW0Xi0ypUSjFWl6+5VKwHUiwCNZe5ICB6ZQ3mnmUgLCcAWER4Z+lYSgkemuciV3cmDZwfL/b2vpnUJpluV1iWYblWeLMFYVW6dK0+WYKwquWeuKr1KMKUqVUVGSAD28hJcB+QoCcEjY4r0mokcPCu5X9PcvUaXYKwq2TNldAmmZgfbgVglmEs7WKQSTKnK6ZSPWoKxqixRSzClKgvwjhIMV/nIzTeUYFbQlxd+R9CBJ1BoligAAAAASUVORK5CYII="
              />
              <image
                id="image9_1_5"
                width="51"
                height="32"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAgCAYAAAC/40AfAAAACXBIWXMAAC4jAAAuIwF4pT92AAABEUlEQVRYR9XYUQ6DIBBF0UfT7ej+16ELoh/1tWhhGC3IzE0aE+vPyQAxhhgjklYAE5z2yNxbt5+7QjKZEsDNpNLJ7NZbkptJEbNs1xIIcADK7ZkIp1MKMcYFckH4z9R+yk3mWG3pmZmUBgPIIMAIKj2aa8uNScsOGLj0wuENANCjWAl3OyqHYWdQJg4JCcPcoDQYZh51BsM0qNohAXRAXcGwFqimoH8wTINiXU++Fhg2HNUSw4ahemCYFtXs5OuJYRpUE9AdGNYddSeG1VAB77f00/tpBIbVUEyNGolhzVAWMEyDEkGWMOwyyiKG1VA/IMsYpkVNT/ExG83btYT6TMPDZI7lUDOg/9RkqRnfae16AVvqcsH+RdRrAAAAAElFTkSuQmCC"
              />
              <image
                id="image10_1_5"
                width="54"
                height="26"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAaCAYAAAD8K6+QAAAACXBIWXMAAC4jAAAuIwF4pT92AAABAElEQVRYR9XXQRKCMBBE0YnlieD+R5ArxQ2DXXFIejAmw99IKZtXDVKknLNAGxwvcuMSwBBVdjvko3XC3iZ1eLiecKzTJevEvdtcqnopvqzfjO+sQgJxsbIsHC7kiinnbK1lxSC16cDaYmXMPahNXxH/7tnlrBjsUGAqHtDaVSQDFBmAPINhV5DTgQwM8yBZnNYV6YVp4YFXYZgXyT4fRX5A9oBhHqTGIN3A3jDMg2RwGoX8Jwxjkd2Ao2CaF8jej1/I0TCMRWIt5AGcCcO8yBYwDAxjkVVcRBjGIC3g4nltmdG6f9aAuMyBjL6YVWvFVcT3ohml9XN4jrwjDDtFvgFFwFktq/AQmwAAAABJRU5ErkJggg=="
              />
              <image
                id="image11_1_5"
                width="54"
                height="20"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAUCAYAAADGIc7gAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAx0lEQVRYR9XWQQ6EIAyF4ddk7qT3X82cqm5oAg0VW3CAf4lsvlBUYmakfig7sHGUYBql2w75aW1IbXeaT2G65aECk4tG1sZGy0GJmb/WM2Pd2xTk3SgyyqLQKafpuWM5lBAf379A5XVvjaMnL9BqCJSyD3ReD1ROcwQ0jLRgtXqxQHx8pcdQD0zXA5WiQMmE9sBqRbG9QEAhR8N0I6Ch+/o2rFYUCziAM2C6KPQWuQJMNwS6IqyWG7sLTNeCnp5/xZU6K2sF9gId70PpjSVdtgAAAABJRU5ErkJggg=="
              />
              <image
                id="image12_1_5"
                width="55"
                height="14"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAOCAYAAACLroQjAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAnElEQVRIS82VSw6AIAxEh8Rjyen1XnUDiRI+A2krb2VgNm8KGEQEAG60OTt7W3OMAuiLAxvLM3Ijtp26hlyPX8WDiFz5u5v0RUX8PTlppvzFVSbOHstSPDTWPKDFWbmS2pRra6VwzlgV8REP6T8HAPnueWMl+pFj8SyhPP5TRazIsXiWAFTELeVYrEqIqw+KJnEUSEyXsIMcy3QJD+4YJiRRY2pgAAAAAElFTkSuQmCC"
              />
              <image
                id="image13_1_5"
                width="55"
                height="9"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAJCAYAAACWq7SbAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAaElEQVQ4T+WUMQ6AMAwDXcTDEB/naWZgQm0SywOCcmNrD7aSNJIHclrwTkGjslUCh7US4B4iQtFkVAUrdAUr4b5CV/AyUs3C1OGUsYz2KTsijmcE4XkAXOHcY+D4nvIA+PlY7sX/qzkBOccREyIkMuEAAAAASUVORK5CYII="
              />
              <image
                id="image14_1_5"
                width="55"
                height="14"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAOCAYAAACLroQjAAAACXBIWXMAAC4jAAAuIwF4pT92AAAApUlEQVRIS9WVSw6AIAxEh4Sz6Z31cHUjiUGnpVhR35ISeJPxk0QEP2Yl6wJgymT4NkzaRRrcnEe6iCWybhLVnEeawaSbw9RY4Z6UjuZ0T4YvwChRjWYH1lzzAcGE3psRfKCC4PxxOM56mdnAeue8WJLW/Aoqb1F+BYu1cecod9VCjzxwI4CG1Zwm6w3ySACNOpxXuGZ4AI0SzhPqUwE02GP5mwAaG5/BJmeEbSrWAAAAAElFTkSuQmCC"
              />
              <image
                id="image15_1_5"
                width="54"
                height="20"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAUCAYAAADGIc7gAAAACXBIWXMAAC4jAAAuIwF4pT92AAAA3UlEQVRYR9XXUQ7CIBRE0SFhd3a56vbww5LgCMyDthTuj9rwDCdUoy6EgMV70+sA4OFzKyeOEcXc5CemIMXNz3RiChEzncSdMAvEhNj7WTsKdjYiNvxWtECAdoxl/QacA7sKAXxnXPK81MYXemAWSA8CyM/lrv1BOAWzIGK9GEDPSgjHMCtEbUSl5pshnIfGqE3Uapk9jEkr3YotG+Kss6dCOA/7RmpZ3uNSCKe+PLgUoL6Gh0K4+CP4VVljOY3YrZi03IktCeEYplDTQrgIm/JzcqT0j+Zzf1wWk/YBKfk5gGh6UoAAAAAASUVORK5CYII="
              />
              <image
                id="image16_1_5"
                width="54"
                height="26"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAaCAYAAAD8K6+QAAAACXBIWXMAAC4jAAAuIwF4pT92AAABA0lEQVRYR92YQQ6DMAwENxL/a3lp6QvppSttIxsMSSDpnALxZWQ7DqR1XfEHvGX9AIDJCRwBlQGAnwylwTKWywCZ0JfnCBmzZIiblV7FTsnofk+luCUDBIVIDxmL9o1HHjsD94l52YkKWXGzPlwpVtI3QEBGaS1WQyYZ710h0kLM65kk6z00hutdGaWm2N4hcFSIHBIipWKlpQZUlFHOiLWSASoIkahY6fAkzYXIlljprFGalNsWltjQQoRiNfqG3CajTKiToct6Jwpv9yoXFeLQNS+hd8NSjMoA/tDtQohEj3ugk96Joh+ai7HfXe9EsTI2rIyS/xp4GTFDCRGvx4aUUT64yFVBLU8vFwAAAABJRU5ErkJggg=="
              />
              <image
                id="image17_1_5"
                width="52"
                height="32"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAgCAYAAABdP1tmAAAACXBIWXMAAC4jAAAuIwF4pT92AAABIUlEQVRYR92YQRKDIBAE21SeaHxk4h/NIW4KN4CwokD6ogiXrnG0aodlWeicGRhlMXQsNKv1CHD3HGwdLbJJpKeEtAgoGeDRQ0IpIl9aTsgnAmGZBdrsUFYian9qSSg3Eb03QRsJ+b5aAxmpuA9rCsVerWhPVjYiQg2hIx2BgIhwpVCRjuxxhZBFRO8nycC5QlYRCBQ+hTOELB0BYyKakkJVRYQSQk2ICEeErB2RHycUFBEsQkdE3PviMpAnFBKBPJlTRIQUIWtHBPMn2EJM6IjIZYlofELWjkBFEcEVKtURqCQDH6G/EBFkphAdDUW4tPAp6A6liFTvSQx36vOKHaRxEeG2d2ClCxn4ncu5KTVX+BR8/6EuRQTf5PS5XrsSEd4gfGtMhX9OmwAAAABJRU5ErkJggg=="
              />
              <image
                id="image18_1_5"
                width="49"
                height="37"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAlCAYAAADr2wGRAAAACXBIWXMAAC4jAAAuIwF4pT92AAABUElEQVRYR9XZTRLCIAyG4beOl1Tvp8esC5uRaqAkUH6+jWOzyQOkal3WdWWyvLbXm1xYJkK8+M8N4KoURswvYLfyo+9Esvkt95EROQCAdcTjpJ39KADgEin2igUgeYyyE1rzkN6Bh7wZYSeKAND3Fps7uGF917ykF8ICkJoKgPYIy+CG16MAaIuwAhbgHqnv0gJhHVxJFgDOR1hWX2rJo6PlLIRn9V0AOAdhBRzefY5SExE7OguGDy5PaiFS930NULz6YUoRnsGVVAFAGcILqNa8xIOwDm6Y6gCwIzyAKsObSi4i1jx0BkAewnr2w/rpAEgjPEdH6k2al2iIkuahMQD+ER5At+YlgigZXOgIgA/Cs/phugIgPthHgObDm8qF4BH5lqkA8H3uJJCj8z8cAPbHKfWdHwZsXhI+AdR+mA8PAP3/iSeTNC/RnsVOBQB4A2utcIBZOQTSAAAAAElFTkSuQmCC"
              />
              <image
                id="image19_1_5"
                width="46"
                height="42"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAqCAYAAADMKGkhAAAACXBIWXMAAC4jAAAuIwF4pT92AAABQUlEQVRYR9XZS3LCMBAE0Ecq54SzhYs6C+KKv1hjW/LQGyhg8aqrZS24dV3nA/LEffjB18oPM+U5eQW3xI2PoH/p8IDvhS8zZIqetZtxKlvoH/JNZW0es2SaylbTwzyyTGWp6bWkOJxr4LW2H/2bK+HFezYA97lqKuFpTHNF46FDuPZF68ZPQdMWfhqaNlOJgClAU7/xyCGkEE1deDU09eC7L5bS1Nh45GJhB5pz4dGW2YnmPHi0ZQ6gOQceRR8C9zl6OC9Bc6zxKhdLafY2XvUZXZJo402fHO8SaTwNmnJ4KjRl8HRotjcefXLQAM37xqNPDhqhWW58zzRoiGYOj96EfZqiGcNTT2OafuN75nEZmhf849C84KP/Vv6SGs38cG4dxBRo/jd+90FoxhfQO1gqNPObcwmYDs3ylT+EpkTDL15DT0qoXOX5AAAAAElFTkSuQmCC"
              />
              <image
                id="image20_1_5"
                width="42"
                height="45"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAtCAYAAADYxvnjAAAACXBIWXMAAC4jAAAuIwF4pT92AAABPUlEQVRYR9XZS3KDQAxF0WtXdmqWFa+VDAJJAyJIdOuTN3GZ8uDUU4se+DHPM8XyXj5f7cNHMeibbWZgAngef5sWCQnwCXUaPUP+pEKje6SYbKiElEY8fQgPo3I57iWpy6QaNwsScqDqcbdfoqHmJtdknlE4P5eHRDZqWp59oqBdSIiBdiPBHzoECb7Q2xsuxWvrhzW5xqNRbZOmjIZqbx0wtAljoZYmTUgYBz1DXt7h2oxYJrdxt+ltNAQJ/dB9XJDQB9W+K4fkLtR1w6XcgYadyzZWaAoSbNA0JOih4WdyHw3Ucuu45epmsowbnNqEvxstg4RzaCkkyFDL4kAAEo5Q6+KEIEG39elI2EKtIw/NCi078jVP/gESvqGb/3OWlELC7+hbbDkkbJfpRVEkHF9PEigdCfJ7dKIIrs0X86NQ6k3yWhwAAAAASUVORK5CYII="
              />
              <image
                id="image21_1_5"
                width="37"
                height="49"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAxCAYAAABd2WCOAAAACXBIWXMAAC4jAAAuIwF4pT92AAABTElEQVRYR82ZwQ6CMBAFR+PHyh/5t3jQxra29BV3t86FhHCYTHfhwGXfdxbzAO75jWvnwSge1RWAy8JShQiQRLZVUrUQfKSWH1+iKLNCqlWp4DZ6wJjeHOVskaWGhYAN1hxforthUVJyJYiROlz/NxsZEVLTeEtNVwLfV4K0/o17bqWUwe7iJVUjVwIfKaVSVwjspZTBHmItpXBYCWyllEpDIbCTUoRkLKRUIakS2EgpyELwu5Sy/tP88pkxP7bE2VJqoWkhOC/V4vS21ZyRcju2xKyUuxDMS4UwIxVSCXQp122rUaR6QmbbVqNIqZhUgrGUWslMCI4/M+pgmzMqpWBaCfpSaiVzIWhLqevvRi2lDjY4VQJtpkKFoJRS58idJDUzR66V4CX1F3OUo8xUOPkfh7zYskpQlkp/kpYKwffx3QkWaNGbqVwsXPIJ+8xLXwf2PVoAAAAASUVORK5CYII="
              />
              <image
                id="image22_1_5"
                width="32"
                height="52"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAA0CAYAAADrPTp5AAAACXBIWXMAAC4jAAAuIwF4pT92AAABQUlEQVRYR82YQY7CMAwAB7TfpY9ZHpw9sKlM6jZObAdGqgS9dMYxPUAphUXXU7t/K6WwgGfz/VE/3PkMv//Xkgm09QD7Qz81gZ1sgct6YMsWaDmcd6ZAW98+fIM8AW30KlkCLWo95AiY6yFHoMeGIFqg97M7EC3Q460eYgWG6yFWoOV08yVRAkObL4kQsIxerYcYARdeAVc9+AXceATc9eATCGFWIKQe5gXCmBEIq4dxAcvDhxgVsGCuhzGB6ff9FSMCGtNnX7EKpNSDXUDDXQ82gfDNl1gELEzVQ18g7ewrPQGNkLOvXAmk1wP8nNy3Lp6rHuaOIBRNwDp6dz184QTO6kM3X/JVE1heD/0JhL3zz6gCSzdfcsc++hR6RyAJr4eXwP7XuWBJPRz/La/Hkbr5kvYIHugTSeNsB2RxWj3AH6qWn46rpV34AAAAAElFTkSuQmCC"
              />
              <image
                id="image23_1_5"
                width="26"
                height="53"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAA1CAYAAABfsPstAAAACXBIWXMAAC4jAAAuIwF4pT92AAABLUlEQVRYR82Y226DMBAFJ1F/uOE/mk+mD4mR66zZq5POCwgQo3NYLMRl33eKuQPtprd28FIs6iWNHeD6em0ph3S16KBSJNV2UCka6aVbleg0DaxN9Id3iDaoEU3fnZ4KkYmsSEuztZ2syExWpD6bRkZ0V85vdGRELqIi8xA0oiI3/1qkLaAvtUFMJKF+D3hF2hBM8Yo0xNqgXjTFIwrXBj6RxrQ2sIu0kVaxiiRc4oyo57Q2sInStYFNJHG6UktoopI0oIvKOBPN0rhrA3+icI1eUZiZyDIE5trgw4ksQ+AmmshVG8RFbkaRZQhCWBOFXtKeXrQsDdgSpdOALipL2ERLawM9UU+4NniIlqwEI55EKa7At3B8TJOqDeDruT1+SQI/0oVZpOpuFCQY+QV110ViHdh/VwAAAABJRU5ErkJggg=="
              />
              <image
                id="image24_1_5"
                width="21"
                height="54"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAA2CAYAAAAoL9IOAAAACXBIWXMAAC4jAAAuIwF4pT92AAABEUlEQVRYR82Y2xKCMAwFF8dvVn4BfxofNE6BtLmUMu4LXupykmY6jNO6riR5AfLjZ/nF/bg2xfK9rgC3xsIWZUrh9z4rbTGPkA5JmpJq/dyQkWrITWY4T7rhL6TN+RSiUhdnSmd50StVRysi1fo5aQsjUo3upC1mCrxS1ygJXqmG2k/ok1bpkXaVbx11m00CnzRMVnrJIb3Bklrzeegn2FKN6nwKGan5nJSRmrSk4fkUoknN0iEudVGT1ko3dx7iSYeWX90kyEubaNJaP12lw4VJNcxDpMQrdY2SsJd29xP8SUMMl3pKNzcJLkh6GkOl1ikPzn6CndS6kYolTTFM6pnPEN6k7k2Cz38oj91nC528AcZPNQUAOg2wAAAAAElFTkSuQmCC"
              />
              <image
                id="image25_1_5"
                width="14"
                height="55"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAA3CAYAAAA8PXu0AAAACXBIWXMAAC4jAAAuIwF4pT92AAAA2UlEQVRIS92V0Q6DIAxFz8z+euNtfjd7WDAgLW2ZboknMTHI9bZcBXLOGNcqjd/x8aruM8CiTCysZeIeSwhwkwY9wmlHkYsI1Shg3jFFhVsFUeHGBYSrMr4xclQzhBNKNYkIS+kJYsKGQ4XDv6KgOYobVI0mnHbc073IK+zw9tj1fFiPWhTNVwOyoxkFyEKzTDhhVU3+K9Q2KNfB6lpR6IWuDCHmmKj4iWPD13GEogDbUe3ZErocpUkuR2nStGOhCR/sHlUWHMe2xMjRdZSHVhQ+wgfwFJ4NHd+cF0zPblOggAAAAABJRU5ErkJggg=="
              />
              <image
                id="image26_1_5"
                width="9"
                height="54"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAA2CAYAAAAVvbNoAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAb0lEQVQ4T+3U2wrAIAwD0LgPH2U/Xh/mREoKGbvAmHmqcNCAaHF3tBiAvmhxANsCIQcyBbH0oyMqbI4oFqeI5jJKi49Ji9N8Fa0Kknaa6E+Ivt6Ixn8gRWkmOo9evpZnjysKcgUB2JG1WSrOcnOnClRTEObAJXKLAAAAAElFTkSuQmCC"
              />
              <image
                id="image27_1_5"
                width="14"
                height="55"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAA3CAYAAAA8PXu0AAAACXBIWXMAAC4jAAAuIwF4pT92AAAAzklEQVRIS+2V0QqDMAxFr7KfLnuWfXb3oJMmy02aUocPOyAo9TRpEytqrSBXccbwAPDEToVEPwtWANtxv3gvalZnbAFQ2GAruqlpWnFaqi5/0anlR2TdQ2vbE9EkEin3ELt61hL1TpoluWeqJq2YOnumrrGLjChK0it+rZuJ4QYxMSzJ9Igh00VrjeIr0aLXdmKyTKpisowoyIjXp+o2gSeytivARRFdsuKZhSVu6CAb8SQSh/+PtCSRSInE4VQpkchOglD8Xaph94xGfL0BRGU/OCglVdQAAAAASUVORK5CYII="
              />
              <image
                id="image28_1_5"
                width="20"
                height="55"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAA3CAYAAAAMsWqVAAAACXBIWXMAAC4jAAAuIwF4pT92AAAA8klEQVRYR82YWRLCIBBEm1SOHHMI9c74k4UMyGxA8n6MxnrV0yBlJcQYQXhtrxHAl97kmAGs23VmtjBxX9CSCgO5FwAsUDIBeCfvqVQNHdndIxU2T0hR97gLm/VYSujqkRtZTUno2o9dE6YLY6ZrwhRzj90Tujd4LSHd4KKxa8LmCU0MEdYWhu1xSEIXw4TmHoclNHObUNxjTWg6waUJxXiExbE9wiKcUH2Cc0I1XmHWo1eYcYtQtTASIcelxxbCCxZhdWypUHxQSIUcR4+thAePFgYAi0Yo2uAaoYjnC0PhIQbHel4ef5s/+wczbPz95fwAOq0bVX8OFpwAAAAASUVORK5CYII="
              />
              <image
                id="image29_1_5"
                width="27"
                height="53"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAA1CAYAAACwcpATAAAACXBIWXMAAC4jAAAuIwF4pT92AAABHElEQVRYR82YWw6CMBQFTwn7RVeirLj+gJbb0vssOD+EQJzMkURDyjmD8NiOGcBKL3qYt+NzO1bmSCb8RJQEYDm5ZmIC8OJuimIi56lxHlZHZUAtDGOXXTJlq4wSNqVEFkYpK6cc8qDcVjYcKhs65a1lwMC628uGcSYbMuVflHGY6nqy3pQmrGUmPDL1lJwsdEpOxqGq88pUSGRhU0pkHOIppbKQOqmMQ1RnlZnqNDL3H1mNjKL+6fHI1Ghl3JTdOq2MonpQvDIVFpl5SovMTISs9b0166wybsomVhlF9FR6ZFxdNaVHRmHrImUtDnVeGZ2yW+eVqbhC9p0yQiaeMkImIQFYrpIBwJoar22tlC9J9w99lzfMGMNBsvMBGR8fuidfyUIAAAAASUVORK5CYII="
              />
              <image
                id="image30_1_5"
                width="32"
                height="51"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAzCAYAAAD2OArBAAAACXBIWXMAAC4jAAAuIwF4pT92AAABOUlEQVRYR82ZQQ7CMAwENxW/Lc+h7y2XFkxw6o1jB+ZExYHRxAlSWvZ9h2AVnzdMoBwC9+P5wwYTJBa8fxwASvW9LJLCUj3XBdJZADzEc8HkCnWB6ZwCsoJGWoVWgXoZ0pACdYUps/A3M3AyfRasAumzoAlMrWAVAPQKYRItAWtHhMEUaBFS4UrAmoUQegqkzIIlkD4LlgDDUAVGILUCI8DgrsAKMBVcEqxAGj0CKRV6BFLoFQiv0CsQjkcgtIJHQMN9OHkFmH9KqoJXQMO1FCMCTAWTEQGWywqjAsyOuGRUgKVZIUJgaBYiBGq0Sw6gUSFKwF0hSkCDqhAp4KoQKaBhVogWYCu8JKIFuskQYE/HFcgR6KJUt+WRyDtooHEN/OsCW2YBoF3h9Rrghrl8vX/IXgK5I9Qz4gl0xyzEKYa3lwAAAABJRU5ErkJggg=="
              />
              <image
                id="image31_1_5"
                width="36"
                height="48"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAwCAYAAAB5R9gVAAAACXBIWXMAAC4jAAAuIwF4pT92AAABP0lEQVRYR83ZQXLCMBBE0W8fNpwpvqyzCK7YYmS1rJlRegUUi1fdAyxY9n3nlK/T440JWd6gF3CRvZOOWvnFACx3b8zKWjwvUecJU1KCrKSiVuC7eM2aLg1Va2jaPR2gsiUrKS2dG/oX07WOOn26EjR9OquhqdO1JjuShqqBlOlCctfQlOnUyY6Eo1oga7rQr4IWCLR7cmtJAVkJm04FqdMNo1QQ6Kih9IDUDLXUC1IOHAZQvSDQvjDhIeoJyIrbLT0FqQfe3dJTEATd0wjIyvB0oyD36UZB4IzyAPWkifICqS014wUCHXXbkieoJ1WUN0htqRpvEOgos6UIUC0SKgqk/qxAgYoCgT7dJZGgWm6niwbVpquiokHQd08poFrMlrJAcktZINA+dVsmqJUN/v58ycyLay7NzWjoDPiY8Qe1gyvxeTH9MwAAAABJRU5ErkJggg=="
              />
              <image
                id="image32_1_5"
                width="41"
                height="45"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAtCAYAAAAz8ULgAAAACXBIWXMAAC4jAAAuIwF4pT92AAABPklEQVRYR83ZUW6EMAxF0Rt22llYZ6n0o6FKM06wQ+zkSSMk+DmyeTAS6TxPqnzl47u+sCqpQF64MltAj3x8ASn/ykjw8Bz8AstsBz3QZSn0AL6F8/U0YSH0mmQLusXqy3VLUJCnGhrtPVkmfJo1sjXNOqFQaZLbFam17q2K1LsntUVyh94VZwvoHRI2KJMG2UpYmbRI7drBAapFwkKoBQmLoFYk6Is0LSNICH4rjSIh8K30BNnLVOhTZO/+nAZ9igRbkYagM5Dg/GiahQRH6EwkOEFnI3sZhnogLUUCBdQDCba1ww3UCwl9qGn1nkiwr16MNxJsqxenGYGEh9AopDX/oJHI4SJFIsH2rwkyNAlfHyLy6lz7AEVP8orp0bQKCYbGr0SCDvpejewlkT927YBsTfPv/Kp2S7ka/4H+AQ6tM7F59C/tAAAAAElFTkSuQmCC"
              />
              <image
                id="image33_1_5"
                width="46"
                height="41"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAApCAYAAABKvBuPAAAACXBIWXMAAC4jAAAuIwF4pT92AAABTElEQVRYR9WWQY6DMBAEy7xz93XJP8lhmdXgYOxxPPakpUgo4VCU2h3Svu+o/KjrJ4Gzqevf7Df9EOGiwQHS8ZGEhU9HVXLbAKcOEaw6G9fQcDYPwexvwKN2k0oYeOl4CT4RtPf6cH6V+XxV7uBDdT5lf0CS0oG9vJkFi5Mbl9Q6n2e6/ZJxnZJ9WLj1JeM6IXvfAg4B4VuqomOpDThWp9W4xGIeHO1bwSEIfA84BIDvBYfF8J+AQx3ebXGsq1LK3dqAw+J8alxSe7McXp1R4DAZflRV8rj/UY00rlM7tHnM5r3AwRneqyo61tpAQ3U8jUus5qHB/gxwqMObqzMLHAbP5UxwGAg/GxwGwc9YlVJ63m/gWJwVxiU95uGwv9K4pMv8SuOSHvPPCODwB2/a+ijgkpp9CHA4S7mD/3+HiQgO1/Cn76KCwxn07UFeWORQBbf/ZgkAAAAASUVORK5CYII="
              />
              <image
                id="image34_1_5"
                width="49"
                height="37"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAlCAYAAADr2wGRAAAACXBIWXMAAC4jAAAuIwF4pT92AAABUElEQVRYR9WV0XKDIBAAl/6k6RdWv5I+xJteLHCnoMDOOGEkL5uFS4gxolj2z42J+FLr5W/5sR4eLRH2R1iYREYkXuqdFoEJREKM8Rv4uBiK4/sh74o+TimmqBL26VSqIQxbRUr88P9XtximSjj8T0C5Su591yqpO1GqEtSj6VolVUIzxV2xppPnrnSvYpUQpEigXKZLFa+EYB2v1N7tImclwBYhs3+bzBUJwZJ5TKRGAq6JQGMZazpZWNPrkf+V2hIaqwqZ/eoqtSU0VhUy+9VVWpYQPEWgYZU7JASPTBOROyXAJwKVMndLCJZM1Sh+SgJsEeF0lZbTycIzveDCBHuyhKZplV4S4BcBQ6anhOCVyYqMIAF+EUh878mLXcJ76ZOMUkLjqaL3t1FKaDxVZH+DcY7TkTMiQx6nI7njtcpi1BKaVJUVxQwS8BZZyRyxX1u7jvZ9gPtwAAAAAElFTkSuQmCC"
              />
              <image
                id="image35_1_5"
                width="51"
                height="31"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAfCAYAAABKz/VnAAAACXBIWXMAAC4jAAAuIwF4pT92AAABHElEQVRYR9WY2w7CIBAFD8YvrP1M6y/iC6fdIqEsctlOYkLqvkwGN6nOe4/AgjMf3IyHOLvwIQt+BU3jQplX4juPM+ZLyTIxtyvlvPdrOMclYsyXypWJkZUAg6Wc2Ga1hcj0UlKGlEh5HKXMXL+UDCmRIqmZ4VI5GUAnRKaVupIhUsqhTG64VKkMWY9jlRDQUUorQzTXb9j2q5UhGimgc6l/ZQC9ENBJqoUMmS7VUoZMk+ohQ1psPkAh1VOGaErlZi6lRsgAOiGiLjVKhtRIAYW/qdEypIvULBnSVGq2DNFuPiAxp3lt7slbnOPX82KslJFor94+Z1GGaKW259XERHj1iqUsl4nJSW2AnQVQAkvF/7Tu3KmMRFba+PALb5CVzKUhVZcAAAAASUVORK5CYII="
              />
              <image
                id="image36_1_5"
                width="54"
                height="26"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAaCAYAAAD8K6+QAAAACXBIWXMAAC4jAAAuIwF4pT92AAABEklEQVRYR92YbQ6DIBBEZ5ter+1Zqwfc/mHjSCmIgEBfYvwCk+fABhVVheOBjRWTc6djcXvFH0iKS+wZuKfYM5UgJ+Yj2+F8KZqY4DshZjpJUdUXncfkjFibYSRtjuXK+YT6dJUUKvdAuSAwSNHxxZhSya4pxsSMkGCq2DC/2jWVPCLGsKRx5AGpF1JdMlfM8AVPPQQNJc+KMTUkqwvWEDNqCAKVJGuKMWfnolG8CGglZpQKGtmVtbUYU2uoAgeG65VixiWCPcSY0tUNs+vfW8wIpchf9EfgdusoYkxpwVEA6y3VqgNvtzH8oZtCgHGGYoqcgrMAwIiJhfBTFCRSnCWxEKGKutiF2F+q0bEEXwik9wGSpIADSjWXLAAAAABJRU5ErkJggg=="
              />
              <image
                id="image37_1_5"
                width="54"
                height="20"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAUCAYAAADGIc7gAAAACXBIWXMAAC4jAAAuIwF4pT92AAAA5klEQVRYR9WXWw6EIAxFLwmLm5kF6+yu8yNJvfIoDAieHyOa4kkLFiciAPDCmS8ejj+ujsZZFHiYrBORd+klABIZW1rUw0bIqBZcOqse8Y9OwSWrESy0VnXGagRjsPRUUXfsip/E81ZJJhdniGwQ01gkHfpID9uUYmJMSjRQDFBBKla1rEWMyYlWB8vwV/m2iDGW0u2JKas9xDSlstX0mjgap7cYUxLtNfklzmgx5rb1ebeYxiLZ3DTMFGMsZWv9f+4riTGWjKbYrd39DDa616KxvvTEymKMFuVsXk4dK5diDVp0A4AfZCZYIN7cMd4AAAAASUVORK5CYII="
              />
              <image
                id="image38_1_5"
                width="55"
                height="14"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAOCAYAAACLroQjAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAw0lEQVRIS9WVQRKDIAxFwww3sz117dniRtpIv1/IAMW30SEL8pIAQVVFRBb55Q3WbkXcvwHEHuZfQTwxbRGCqlqJK6xkXpDpChClDtRhFkvCaeyDDCxClG9SbFMvSPisQCr47COKimA7ZyVtAj2kEWwqctJRormhscw3QWeLjeBI8iYcpjDsTwHieRao4B/CH5gco4W4xZXEFV45Rgvx/MnxJLn2kGO0Ei+54YfLMVqJJ9baR7wnLxIrFT/c4jPJMVziG6lHNOCNfVisAAAAAElFTkSuQmCC"
              />
              <image
                id="image39_1_5"
                width="55"
                height="9"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAJCAYAAACWq7SbAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAdUlEQVQ4T2P8//8/wyAEdoQUEANYGEgziBFK0zJEGBlQATF2oethYGCAeA6rBAFAjh5yAdl2MRFSMJTBsPYcqckSOf0Tq4+QHpg8shw+Peh5EGc5wIIuQAAQ6yFkQEgPNnl8enDJYYgP62TJOAjqOQdCCsgFAFU4DtnRqFdJAAAAAElFTkSuQmCC"
              />
              <image
                id="image40_1_5"
                width="55"
                height="14"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAOCAYAAACLroQjAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAj0lEQVRIS92VQQ6AIAwEt4mv4v/6LTwYLqbZlgqUOEfsYSaUKLVW/ICinF2HcrgrWgBlt7juAMbquKHyFjLhzS0NIEj05rIDxBoA+FpmBbzF36vlCgOeuKwIwCfqmVGJrqVFWGgkPXFsXTJiTmuAxVnC1vcoprSX9isomCfbGCbtpd3cl7Dl0l7YWm4r7eUGrLIR27NAVywAAAAASUVORK5CYII="
              />
              <image
                id="image41_1_5"
                width="54"
                height="20"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAUCAYAAADGIc7gAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAuklEQVRYR93WMQ6DMAyF4ReJK9H7z+VQ6VJXlmtcJw7E6b8ACoM/kUiUWiv+pP19PQCgLAzbcd6xGYvZsiBfZYY1QWTZYCEMgPK5mXzGohCAYXh3f7HLILKrYSMglAtEjYZFIU3DW42ARTFUFPXkDz2wlBCZB9YLiQ7OMxFaGqwXwouimiEygs3EhBFaG/woPnhFMojMc8Y0gBd1C0LLgnmH502DyAi2NEKLfoIfv15EcojsbCsuhdB6Ae0HGt2ePE1hAAAAAElFTkSuQmCC"
              />
              <image
                id="image42_1_5"
                width="54"
                height="26"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAaCAYAAAD8K6+QAAAACXBIWXMAAC4jAAAuIwF4pT92AAAA9klEQVRYR9XXQRKDIBBE0abKAyX3P4TeiGwyVGsEewgK/NVYunklooYYIybvRfNmQ5gYxiBuA4Alc3LUcpifZoGpoJCGgZeiigEI9G0d8Y79A0qNAvNggAIoXdB5KTYHWT3umIoJACLNnh59xhTQEeABrXxwN0zBWB6EtcNwd8E8IMCHymK4lrDuGK4FTAHZRuDBABUgqxamYIA9REVVYzgvTAUBOgRohOEUmAcD6KDmGK4EuwLVvEBvxXBHmIIpHed6DGQZ7AoE6AjrcQy3oC2qK4azr/sz3HQY7mzzUEBDYjj+H3uXLsQEGE55j00FsnKwKTHcB2YxKqrRLwaEAAAAAElFTkSuQmCC"
              />
              <image
                id="image43_1_5"
                width="52"
                height="31"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAfCAYAAACoE+4eAAAACXBIWXMAAC4jAAAuIwF4pT92AAABBUlEQVRYR93YQRKDIAyF4eeMt7H3P4k9D9302bRCghoh9N/IqJtvIiycUkoYtOV9fcqb04CgBfs21Jx5GLUcZNcIE9Igk1ivQOwJWRORmM/NgBOyIEABA2CNBrIwJchWlE/OggAVGKA/yA2CzoeCdXIlHISw1iALkluX+oKwlqBajFUWwlqArH1Si1Eh7E5QUwi7A9QFwjxBJQhPLa6tTkGYF0jDyKvWJQi7CvI4uVwg7CzIY5+4QthRULiJ/FYLCg9hFijsp1VKA+UwNQDWFMJyIOsItuoCYRJ0dZ90hbAZfwJh2h6yMKEgjD9J5JSGhDA5oaEhTP7GehTeGQLCtD00FIS9AAkxMoJG8sl9AAAAAElFTkSuQmCC"
              />
              <image
                id="image44_1_5"
                width="49"
                height="37"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAlCAYAAADr2wGRAAAACXBIWXMAAC4jAAAuIwF4pT92AAABR0lEQVRYR9WZQZYCIQwFi3lzlvb+txnnMu1C44sItIlAh9r4JJtfBKGl077vLMT2+PzXg2kRiY13niI/hWI0SgJJf4ku0RK4PAeCLqdSeMg68OAasRMWgXshUCdq4aEhAKTfRnEm5tnXRJDwCiTgD86V8IYHJQDnSXgFXsILsyW84aEiAHMlvALV8MIsCauAHm8KwHgJa3jNYXhh5IntFThcPjmjOuERMIcXekt4wkvdJQB9JXKBBOwMmn1ND4nWM/9wAfheovXkWaNbeOEbicO/jZVaVwHwSVjDS717eMF6ToQTgM874dk6h4cXPulEaAE47kRp728xNbxQk7Cu/VPCCyUJi8CwbdOClrCu/VNnXyMSltmXWggBuEtYBEKFF/LfxDKzr5FrzI3FZl8jh93LmxdFeAHg7UJZ7vyXCC/kjx0h9n0rN5d7NLE3nHyiAAAAAElFTkSuQmCC"
              />
              <image
                id="image45_1_5"
                width="45"
                height="41"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAApCAYAAAChi6CMAAAACXBIWXMAAC4jAAAuIwF4pT92AAABRUlEQVRYR9XZQQ7CIBCF4R/jRfT+V1KPUhc6FShpZ5SB8W1swMWXl6EkmpZlIWgu789HvXGqF4Lk8nksnoGY6BqZgGu+EA3dAktWeCT0HlhyBUhBDqIGvO5FaNoEBjjvfME7Fmy+f5vV9OY1dpAVDHMOYgt8OBK8wTB+PCzgDVYysukuYBjXtOXQ7YJhTNOWQ3cIBv+muzYs8WzaBQx+TWvBJqzEo2lXMPRHu4Oh33jk2AQsOIGhT9PdLg1tfm16yDjU+aVpy6UBncDwfdPahmWvGxi+Q2vBXUcij3U8poPBhg4BBv14aMDuWImm6VBgOG66vulaGQqG/aZDgqHdtPbSmAKGLVozv/n6cDCUaA14KlYiM60BS6aC4dW0BhyiYUn99ggPhhL9F2Bg/VG9+E+DoFiJNH1v7IUEQzked14NJwKDAZ7u+y/pQnmNCAAAAABJRU5ErkJggg=="
              />
              <image
                id="image46_1_5"
                width="42"
                height="45"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAtCAYAAADYxvnjAAAACXBIWXMAAC4jAAAuIwF4pT92AAABWElEQVRYR83ZQXLCMAyF4T8Mx2h7/3MB90gXrUFxHEtOZMtvA0Oy+HiKQmZY1nVlknyJ96/84C3/ICgSCfCdnzALVGb5f91gZ4DKNhe2eWOjoTVkyg/AErhMFuT7WFSj+fIcJX2Bx716Wp80NQk8YHyjp5AwHmrJDgljoZY2i0gYB7UsT+1SYMQytTQJhTahf6OtTRaR0LdRlyZTejVqaVKmioR+UBmtTRUJfaAtIzchwR/aBQm+0G5I8INaluc0EnygObLU5iUk+N5H3cctc7VRbeQuSLgGtSyPW85CLUi3NuEcdDgS2qEhSGiDhiGhDZoyHAl26LDb0FEsUG3k3ZGgQ6dAQh06DRKOoRoyZQgSyg8l4YtTSu3pKXzcMvnotTbDIqHadRnWJnxGn5AhvzqW3NDHHY6EP+juzyeRKZDwuUZf7Mc+DRK2y/QU76dCwv729GRCJMAv+b4vJT/BSWUAAAAASUVORK5CYII="
              />
              <image
                id="image47_1_5"
                width="37"
                height="48"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAwCAYAAACWhbMrAAAACXBIWXMAAC4jAAAuIwF4pT92AAABdUlEQVRYR82ZS27DMAwFx0Hv0PT+h0t7CnfRsqEdiaR+dAcIYMheDN6j5ATZ9n3nAt7V9df55u28kIAIbb+f+/mBbCmdkOYgli1lcQc+ALbEmdIpbYX7f2tZSXlCmkeWlFATOqxnSNWGW9BCD1gv1VSbXKyWEkK1CSul9CFZ4qU2YZVU8xxpVklFeRGCNVLecHsDP13Kq01TTAngrXZjEC+hqhDMTcrbbYIpBPOkPCFP9MAsKYtwbcIMKS8lISQEc6QsPNEio1JWSs21CSNS0TOpSQjGpAQrpWYh6JeK1tZFj5RVW/ccaXqkBCuRbiFol4qeSUO0SHlCQ8OtmfEtYcocaaJJeSnBJCGISS3d/iUiUjWm1yZ4Uqm1CZZU5N02XQj8pCBxloSaVORVsiQlKEtZv9uWC4Fd39KKLM5SkTNpaUpwlPoXQtC2+1KE4ClVS+mSuboRE0pLCWL1pQrBU+qS86jGjZ9/kT69BzPR9YnYpSkBfAPLfSlGEd8vxAAAAABJRU5ErkJggg=="
              />
              <image
                id="image48_1_5"
                width="32"
                height="51"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAzCAYAAAD2OArBAAAACXBIWXMAAC4jAAAuIwF4pT92AAABVklEQVRYR8WZQY7CMAwAp6t9Qfn/D5c3lAuBhI1jJ7bDSCuk7iEzbhOkclzXRTIncAD33j+PZIHz+XlU1xqRH/Zze/4BuRPo1Rde17In0Fu8IUvgxEiWAMj19fW/DIFRfbM45E1AvfeFaIGpeogXgIl6iBWYrodYAVAOnR5RAtZ939RDnMAyEQKmM59OPcQISKiLg19gVG/CKyBhqgefgLsefAKw+ODVrApY973KqgAE1MOaQFg9rAlAUD3MC1jqzYvDvIDE8lacEZD2/dLoCzMCKVgFUurBLgCO+zzCIiA9+e56sAlAUj3oAqn1oAvAuN61OIwFLKeeG20CozPfXQ+ywJZ60CfwSWg99AUsp14Y0gRSn/yaTwHLvg+lN4Ft9dAKaPXhi8P/CaSNWqIIfKUe2glsrwf45f06vSbs205j9iQMp35b/nqFzoZ7X6gncEf4VSOTB3i0KUf3eRDaAAAAAElFTkSuQmCC"
              />
              <image
                id="image49_1_5"
                width="26"
                height="53"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAA1CAYAAABfsPstAAAACXBIWXMAAC4jAAAuIwF4pT92AAABNUlEQVRYR8WYXWqGMBQFx9JX2/0v03YB9uHTNupN7m/ogBgkMJ5jFHXZ950C1mO/HPuv+4S3+4EiPo7tl/fOxAgLTz7PQUWiFVlyoULU4yKfKWrZsiJTbTAvUSvfYJ7oQUbUq02sMiOysJ2DqMiVBuIiCxsNM0UXIiJ3bRATWbjUBvNED7wiS22PNOAXhakWiWnAJ7LU1sUjSpEVqYvgxCqSajNVdmIVaQzTgE20UoBFVIJVNLo+am2gi8xvORqaSMKdBmKiECNRWW3gTxSqDfyiMD2R9shxpQFfotQ3qEeUWhiSSHq2pWqDfqLU2UvcRdq9E0oDtmtUks4iKqEVld87Lf+SaEQqDfyJtNWWZpSoVGypLl0bvETaaitBS1SSBmRReRp4ib61SRUswj/V869hWW0APyJGHWhdb16HAAAAAElFTkSuQmCC"
              />
              <image
                id="image50_1_5"
                width="21"
                height="55"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAA3CAYAAADjcwGrAAAACXBIWXMAAC4jAAAuIwF4pT92AAABI0lEQVRYR8WYO5LDIBAFWy4Ha9//rPJm2mBNGcEAbxhK7kTf6hkeiEDbcRw4+QE24NV64d560GF7Hx/FvT1dzEgPPuKcZzq5GQ/DeKUpzx67V2pRFVkhrZbPCmmoUylP8EllolKz86jURJXKeYIutWgWUaWjLk+o0tH+uJOhSl0oUmWSTihSi26RWWnOKU9YI60YSd15wlhqMSwyI82p8oS41MQrHQ4d+tKpSYK+dCQ084S+dLSJNPFmKtGSWnnm182hw8WdhviqVM4TbOn0ok8onboLKFL3R6BIXXlCLQ3nCbW09xXJlNJeftLQQcvUTS5dkidc0GmJeyklLt/5p/NN0mWTBO1Op/OEL8z+NDcW5wn/0t/iXihP+PxDKf/cPAnwB7jmHGKmR9J5AAAAAElFTkSuQmCC"
              />
              <image
                id="image51_1_5"
                width="14"
                height="55"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAA3CAYAAAA8PXu0AAAACXBIWXMAAC4jAAAuIwF4pT92AAAAwElEQVRIS92W2Q6CMBQFB+L//3BN6lOx2LscEAg6T5AyuSuEqdaKwQN4Wgf9A+rZ1N/M7OS+4qo+oKjigCVGnV44NKKEIn42BtBEcycVcRgFaOJhEQFNNFFEKVVra65Ptae0i63iQiaa9UEumh2FXNwd0eUSsdDRi9K3phFFdBsDseiOAv4mYogqrmYIujjgiWF98BY3bQ2ckGrKqeIwCtBEk3uI6fDBFsPXqTGT/CV6ZDWao4BcdPlhUeoofBHxBVZtEmpXpBRBAAAAAElFTkSuQmCC"
              />
              <image
                id="image52_1_5"
                width="4"
                height="54"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAA2CAYAAADgQzjYAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAG0lEQVQoU2P8//8/AzJgYkADowKjAqMC9BUAAHcjA2no+CyXAAAAAElFTkSuQmCC"
              />
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}
