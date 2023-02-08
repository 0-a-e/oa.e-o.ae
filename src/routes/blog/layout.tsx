import { component$, createContext, Slot, useContextProvider, useSignal, useStylesScoped$ } from '@builder.io/qwik';
import Header from '~/components/blog/header/header';
import styles from './index.css?inline';

export const CTX = createContext('title');

export default component$(() => {
  useStylesScoped$(styles);
  const title = useSignal("不明");
  
  useContextProvider(CTX, title);
  return (
    <>
      <main>
        <Header />
        <section>
          <Slot />
        </section>
      </main>
    </>
  );
});
