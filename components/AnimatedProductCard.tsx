import { Animated, StyleSheet } from "react-native";
import { useEffect, useRef } from "react";

type Props = {
    children: React.ReactNode;

    index?: number;

    staggerDelay?: number;
}

export default function AnimatedProductCard( {children, index, staggerDelay = 20}:Props) {

}