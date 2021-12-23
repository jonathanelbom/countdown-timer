import Head from "next/head";
import { DurationSelect } from "../components/DurationSelect/DurationSelect";
import styles from "../styles/Index.module.scss";
import { CountdownProvider } from "../components/CountdownProvider/CountdownProvider";
import { Controls } from "../components/Controls/Controls";
import { AnalogDisplay } from "../components/AnalogDisplay/AnalogDisplay";
import { Messaging } from "../components/Messaging/Messaging";

const Index = () => {
    return (
		<CountdownProvider>			
			<Head>
				<title>Jonathan Elbom - Countdown</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<AnalogDisplay />
				<Messaging />
				<DurationSelect />
				<Controls />
			</main>
		</CountdownProvider>
    );
};

export default Index;
