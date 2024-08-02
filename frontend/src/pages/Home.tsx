import { Link } from "react-router-dom";

import { Image, message } from "antd";

import { motion, useScroll, useTransform } from "framer-motion";

import logoLinks from "../assets/logoLinks.json";
import image from "../assets/image.jpg";
import axios from "axios";
import { useState } from "react";

export default function Home() {
    const { scrollY } = useScroll();
    const [userName, setUserName] = useState<string>("UnKnown");

    const yCity = useTransform(scrollY, [0, 200], [0, -100]);
    const opacityCity = useTransform(
        scrollY,
        [0, 200, 300, 500],
        [1, 0.5, 0.5, 0],
    );

    const getUserHandler = async () => {
        try {
            const res = await axios.get("/api/v1/me", {
                withCredentials: true,
            });
            if (res.status === 200) {
                console.log(res.data);
                setUserName(res.data.firstName);
            } else {
                setUserName("UnAuthorized");
            }
        } catch (err) {
            message.error("Error in fetching user data.");
        }
    };
    const yText = useTransform(scrollY, [0, 200, 300, 500], [0, 50, 50, 300]);
    const scaleText = useTransform(scrollY, [0, 300], [1, 1.5]);

    return (
        <div
            style={{
                position: "relative",
            }}
        >
            <motion.div
                style={{
                    opacity: opacityCity,
                    y: yCity,
                }}
            >
                <Image
                    preview={false}
                    src={image}
                    alt="logo"
                    style={{
                        objectFit: "cover",
                        height: "100vh",
                        width: "100vw",
                    }}
                />
            </motion.div>
            <motion.div
                id="welcome-header-content"
                style={{
                    scale: scaleText,
                    y: yText,
                    color: "white",
                    position: "absolute",
                    left: "20%",
                    right: "20%",
                    top: "15%",
                    textAlign: "center",
                }}
            >
                <h1 className="text-9xl text-white tracking-normal">
                    Find your drive
                </h1>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                >
                    <Link
                        to="/cars"
                        className="inline-block px-4 py-2 bg-white text-black border border-black rounded-md mt-4"
                    >
                        Explore Cars
                    </Link>
                </motion.div>
            </motion.div>

            <motion.div>
                <Image
                    preview={false}
                    src={logoLinks["logo-white-png"]}
                    alt="logo"
                    style={{
                        objectFit: "cover",
                        height: "100vh",
                        width: "100vw",
                    }}
                />
            </motion.div>
            <button onClick={getUserHandler}>GetUser</button>
            <h1>{userName}</h1>
        </div>
    );
}
