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
			<div className={styles.container}>
				<Head>
					<title>Jonathan Elbom - Countdown</title>
					<meta
						name="description"
						content="Generated by create next app"
					/>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<main className={styles.main}>
					<AnalogDisplay />
					<Messaging />
					<DurationSelect />
					<Controls />
				</main>
			</div>
		</CountdownProvider>
    );
};

export default Index;
