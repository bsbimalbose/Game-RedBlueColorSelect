import Head from 'next/head';
import Game from '../components/Game';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Guess the Color</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Game />
      </main>
      <footer></footer>
    </div>
  );
}
