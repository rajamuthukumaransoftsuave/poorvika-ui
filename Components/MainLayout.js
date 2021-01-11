import Head from "next/head";
import { componentCss } from "../Constants";
import Header from "./Header";
import "react-datepicker/dist/react-datepicker.css";

export default function MainLayout({ children }) {
    return (
        <div className={componentCss.mainContainer}>
            <Head>
                <title>Employee Management</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className={componentCss.bodyContainer}>
                {children}
            </div>
        </div>
    )
}