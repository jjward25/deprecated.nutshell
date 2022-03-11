import styles from "../styles/Components.module.scss";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
export default function MobileMenuExtension() {
  const [rotateChevron, setRotateChevron] = useState(false);
  function mobileMenu() {
    setRotateChevron(!rotateChevron);
  }
  return <div></div>;
}
