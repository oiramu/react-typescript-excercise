import type { NextPage } from "next";
import Head from "next/head";
import { LazyImage } from "../components/LazyImage";
import { MouseEventHandler, useState } from "react";
import { random } from "lodash";

const myRandom = (): number => random(1, 123);
const generateId = () => Math.random().toString(36).substring(2, 9);

const Home: NextPage = () => {
  const [images, setImages] = useState<Array<IFoxImageItem>>([]);

  const addNewFox: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    const newImageItem: IFoxImageItem = {
      id: generateId(),
      url: `https://randomfox.ca/images/${myRandom()}.jpg`,
    };
    setImages([...images, newImageItem]);
    window.plausible("add_fox");
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <script
          defer
          data-domain="konfii.com"
          src="https://plausible.io/js/script.js"
        ></script>
      </Head>

      <main>
        <h1 className="text-3xl font-bold underline">Hey Platzi 😎!</h1>
        <button onClick={addNewFox}>Add new fox</button>
        {images.map(({ id, url }) => (
          <div key={id} className="p-4">
            <LazyImage
              src={url}
              width={320}
              height="auto"
              className="rounded bg-gray-300"
            />
          </div>
        ))}
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
