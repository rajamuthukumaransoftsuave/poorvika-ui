import Head from "next/head";
import { componentCss } from "../Constants";
import Header from "./Header";
import "react-datepicker/dist/react-datepicker.css";

/**
  * This component is used to design the layout of the pages.
  * It use and take components and partition it in header and body and footer.
  @returns {*}
  @typedef Children(List<Object>) List of React children which will be rendered inside the body partition. 
  @param {{
    children Children
  }} props
*/

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